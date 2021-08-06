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
        // The default value for `visible` and `destroyOnHide` is true
        const { id, content, visible = true, destroyOnHide = true, ...rest } = item
        return (
          <Modal
            {...rest}
            visible={visible}
            onAfterClose={() => destroyOnHide && apis.destroy(id!)}
            ref={(instance: any) => setModalRef(id!, instance)}
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
  const setModalRef = (id: string, instance: ModalInstance | null) => {
    const ref = modalRefMap.get(id)
    if (instance) {
      if (ref && !ref.open) {
        ref.open = instance.open
        ref.close = instance.close
        ref.cancel = instance.cancel
        ref.ok = instance.ok
      }
    } else {
      if (ref) {
        modalRefMap.delete(id)
        ref.open = noop
        ref.close = noop as any
        ref.cancel = noop as any
        ref.ok = noop as any
      }
    }
  }
  return { modalRefMap, setModalRef }
}

const useModal = () => {
  const modals = ref<ModalOptions[]>([])

  const getCurrIndex = (id: string) => {
    return modals.value.findIndex(message => message.id === id)
  }

  const add = (item: ModalOptions) => {
    const currIndex = item.id ? getCurrIndex(item.id) : -1
    if (currIndex !== -1) {
      modals.value.splice(currIndex, 1, item)
      return item.id!
    }

    const id = item.id ?? uniqueId('ix-modal')
    modals.value.push({ ...item, id })
    return id
  }

  const update = (id: string, item: ModalOptions) => {
    const currIndex = getCurrIndex(id)
    if (currIndex !== -1) {
      const newItem = { ...modals.value[currIndex], ...item }
      modals.value.splice(currIndex, 1, newItem)
    }
  }

  const destroy = (id: string | string[]) => {
    const ids = convertArray(id)
    ids.forEach(id => {
      const currIndex = getCurrIndex(id)
      if (currIndex !== -1) {
        const item = modals.value.splice(currIndex, 1)
        callEmit(item[0].onDestroy, id)
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
    const id = add(options)
    const ref = {
      id,
      update: (options: ModalOptions) => update(id, options),
      destroy: () => destroy(id),
    } as ModalRef
    modalRefMap.set(id, ref)
    return ref
  }

  const modalTypes = ['confirm', 'info', 'success', 'warning', 'error'] as const
  const [confirm, info, success, warning, error] = modalTypes.map(type => {
    return (options: Omit<ModalOptions, 'type'>) => open({ ...options, type })
  })

  const apis = { open, confirm, info, success, warning, error, update, destroy, destroyAll }

  return { modals, apis }
}
