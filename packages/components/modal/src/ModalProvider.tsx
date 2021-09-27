import type { ModalInstance, ModalOptions, ModalRef } from './types'

import { defineComponent, ref, provide } from 'vue'
import { callEmit, noop, convertArray, uniqueId } from '@idux/cdk/utils'
import Modal from './Modal'
import { modalProviderToken } from './token'

export default defineComponent({
  name: 'IxModalProvider',
  setup(_, { expose, slots }) {
    const { modalRefMap, setModalRef } = useModalRef()
    const { modals, apis } = useModalApis(modalRefMap)
    provide(modalProviderToken, apis)
    expose(apis)

    return () => {
      const child = modals.value.map(item => {
        // The default value for `visible`
        const { key, content, visible = true, destroyOnHide, ...rest } = item
        return (
          <Modal
            {...rest}
            key={key}
            visible={visible}
            onAfterClose={() => destroyOnHide && apis.destroy(key!)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={(instance: any) => setModalRef(key!, instance)}
          >
            {content}
          </Modal>
        )
      })

      return (
        <>
          {slots.default?.()}
          {child}
        </>
      )
    }
  },
})

const useModalRef = () => {
  const modalRefMap = new Map<string, ModalRef>()
  const setModalRef = (key: string, instance: ModalInstance | null) => {
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
        ref.open = noop
        ref.close = noop as (evt?: unknown) => Promise<void>
        ref.cancel = noop as (evt?: unknown) => Promise<void>
        ref.ok = noop as (evt?: unknown) => Promise<void>
      }
    }
  }
  return { modalRefMap, setModalRef }
}

const useModal = () => {
  const modals = ref<ModalOptions[]>([])

  const getCurrIndex = (key: string) => {
    return modals.value.findIndex(message => message.key === key)
  }

  const add = (item: ModalOptions) => {
    const currIndex = item.key ? getCurrIndex(item.key) : -1
    if (currIndex !== -1) {
      modals.value.splice(currIndex, 1, item)
      return item.key!
    }

    const key = item.key ?? uniqueId('ix-modal')
    modals.value.push({ ...item, key })
    return key
  }

  const update = (key: string, item: ModalOptions) => {
    const currIndex = getCurrIndex(key)
    if (currIndex !== -1) {
      const newItem = { ...modals.value[currIndex], ...item }
      modals.value.splice(currIndex, 1, newItem)
    }
  }

  const destroy = (key: string | string[]) => {
    const keys = convertArray(key)
    keys.forEach(key => {
      const currIndex = getCurrIndex(key)
      if (currIndex !== -1) {
        const item = modals.value.splice(currIndex, 1)
        callEmit(item[0].onDestroy, key)
      }
    })
  }

  const destroyAll = () => {
    modals.value = []
  }

  return { modals, add, update, destroy, destroyAll }
}

const useModalApis = (modalRefMap: Map<string, ModalRef>) => {
  const { modals, add, update, destroy, destroyAll } = useModal()

  const open = (options: ModalOptions): ModalRef => {
    const key = add(options)
    const ref = {
      key,
      update: (options: ModalOptions) => update(key, options),
      destroy: () => destroy(key),
    } as ModalRef
    modalRefMap.set(key, ref)
    return ref
  }

  const modalTypes = ['confirm', 'info', 'success', 'warning', 'error'] as const
  const [confirm, info, success, warning, error] = modalTypes.map(type => {
    return (options: Omit<ModalOptions, 'type'>) => open({ ...options, type })
  })

  const apis = { open, confirm, info, success, warning, error, update, destroy, destroyAll }

  return { modals, apis }
}
