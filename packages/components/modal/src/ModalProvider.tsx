/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ModalInstance, ModalOptions, ModalRef } from './types'
import type { MaybeArray, VKey } from '@idux/cdk/utils'

import { cloneVNode, defineComponent, isVNode, provide, shallowRef } from 'vue'

import { NoopFunction, callEmit, convertArray, uniqueId } from '@idux/cdk/utils'

import Modal from './Modal'
import { MODAL_PROVIDER_TOKEN } from './token'

export default defineComponent({
  name: 'IxModalProvider',
  setup(_, { expose, slots }) {
    const { modals, setModalRef, open, confirm, info, success, warning, error, update, destroy, destroyAll } =
      useModal()
    const apis = { open, confirm, info, success, warning, error, update, destroy, destroyAll }

    provide(MODAL_PROVIDER_TOKEN, apis)
    expose(apis)

    return () => {
      const children = modals.value.map(item => {
        // The default value for `visible`, onDestroy should not be passed in Modal
        const { key, visible = true, destroyOnHide, onDestroy, content, contentProps, onOk, ...restProps } = item
        const setRef = (instance: unknown) => setModalRef(key!, instance as ModalInstance | null)
        const onUpdateVisible = (visible: boolean) => update(key!, { visible })
        const _onOk: MaybeArray<(evt?: unknown) => unknown> = []

        if (destroyOnHide) {
          _onOk.push(() => destroy(key!))
        }
        if (onOk) {
          Array.isArray(onOk) ? _onOk.unshift(...onOk) : _onOk.unshift(onOk)
        }

        const mergedProps = { key, visible, ref: setRef, 'onUpdate:visible': onUpdateVisible, onOk: _onOk }
        const contentNode = isVNode(content) ? cloneVNode(content, contentProps, true) : content
        return <Modal {...mergedProps} {...restProps} __content_node={contentNode} />
      })
      return (
        <>
          {slots.default?.()}
          {children}
        </>
      )
    }
  },
})

function useModal() {
  const modals = shallowRef<Array<ModalOptions & { ref?: (instance: unknown) => void }>>([])
  const modalRefMap = new Map<VKey, ModalRef>()

  const setModalRef = (key: VKey, instance: ModalInstance | null) => {
    const ref = modalRefMap.get(key)
    if (instance) {
      if (ref && !ref.open) {
        ref.open = instance.open
        ref.close = instance.close
        ref.cancel = instance.cancel
        ref.ok = instance.ok
      }
    } else {
      if (ref) {
        modalRefMap.delete(key)
        ref.open = NoopFunction
        ref.close = NoopFunction as (evt?: unknown) => Promise<void>
        ref.cancel = NoopFunction as (evt?: unknown) => Promise<void>
        ref.ok = NoopFunction as (evt?: unknown) => Promise<void>
      }
    }
  }

  const getCurrIndex = (key: VKey) => {
    return modals.value.findIndex(message => message.key === key)
  }

  const add = (item: ModalOptions) => {
    const currIndex = item.key ? getCurrIndex(item.key) : -1
    const tempModals = [...modals.value]
    if (currIndex !== -1) {
      tempModals.splice(currIndex, 1, item)
      modals.value = tempModals
      return item.key!
    }
    item.key = item.key ?? uniqueId('ix-modal')
    tempModals.push(item)
    modals.value = tempModals
    return item.key
  }

  const update = (key: VKey, item: ModalOptions) => {
    const currIndex = getCurrIndex(key)
    if (currIndex !== -1) {
      const tempModals = [...modals.value]
      const newItem = { ...modals.value[currIndex], ...item }
      tempModals.splice(currIndex, 1, newItem)
      modals.value = tempModals
    }
  }

  const destroy = (key: VKey | VKey[]) => {
    const keys = convertArray(key)
    keys.forEach(key => {
      const currIndex = getCurrIndex(key)
      if (currIndex !== -1) {
        const tempModals = [...modals.value]
        const item = tempModals.splice(currIndex, 1)
        modals.value = tempModals
        callEmit(item[0].onDestroy, key)
      }
    })
  }

  const destroyAll = () => {
    modals.value = []
  }

  const open = (options: ModalOptions): ModalRef => {
    const key = add(options)
    const modalRef = {
      key,
      update: (options: ModalOptions) => update(key, options),
      destroy: () => destroy(key),
    } as ModalRef
    modalRefMap.set(key, modalRef)
    return modalRef
  }

  const modalTypes = ['confirm', 'info', 'success', 'warning', 'error'] as const
  const [confirm, info, success, warning, error] = modalTypes.map(type => {
    return (options: Omit<ModalOptions, 'type'>) => open({ ...options, type })
  })

  return { modals, setModalRef, open, confirm, info, success, warning, error, update, destroy, destroyAll }
}
