import { computed, defineComponent, onBeforeUnmount, provide, ref, watch, watchEffect } from 'vue'
import { IxPortal } from '@idux/cdk/portal'
import { ScrollLocker } from '@idux/cdk/scroll'
import { callEmit, isPromise } from '@idux/cdk/utils'
import { IxMask } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import ModalWrapper from './ModalWrapper'
import { modalToken, MODAL_TOKEN } from './token'
import { ModalProps, modalProps } from './types'

export default defineComponent({
  name: 'IxModal',
  inheritAttrs: false,
  props: modalProps,
  setup(props, { slots, expose, attrs }) {
    const config = useGlobalConfig('modal')
    const mask = computed(() => props.mask ?? config.mask)
    const zIndex = computed(() => props.zIndex ?? config.zIndex)
    const { updateVisible, visible, animatedVisible } = useVisible(props)
    const { cancelLoading, okLoading, open, close, cancel, ok } = useTrigger(props, updateVisible)

    provide(modalToken, { props, slots, config, visible, animatedVisible, cancelLoading, okLoading })
    provide(MODAL_TOKEN, { open, close, cancel, ok })

    expose({ open, close, cancel, ok })

    return () => {
      if (!animatedVisible.value && props.destroyOnHide) {
        return null
      }

      return (
        <IxPortal target="ix-modal-container" load={visible.value}>
          <IxMask mask={mask.value} visible={visible.value} zIndex={zIndex.value}></IxMask>
          <ModalWrapper {...attrs}></ModalWrapper>
        </IxPortal>
      )
    }
  },
})

const useVisible = (props: ModalProps) => {
  const visible = ref(props.visible)
  const animatedVisible = ref(props.visible)
  watch(
    () => props.visible,
    value => {
      if (value) {
        animatedVisible.value = value
      }
      visible.value = value!
    },
  )

  const updateVisible = (value: boolean) => {
    if (value) {
      animatedVisible.value = value
    }
    visible.value = value
    callEmit(props['onUpdate:visible'], value)
  }

  const scrollLocker = new ScrollLocker()

  watchEffect(() => {
    if (animatedVisible.value) {
      scrollLocker.lock()
    } else {
      scrollLocker.unLock()
    }
  })

  onBeforeUnmount(() => scrollLocker.unLock())

  return { updateVisible, visible, animatedVisible }
}

const useTrigger = (props: ModalProps, updateVisible: (value: boolean) => void) => {
  const open = () => updateVisible(true)

  const close = async (evt?: Event | unknown) => {
    const result = await Promise.resolve(callEmit(props.onClose, evt))
    if (result === false) {
      return
    }
    updateVisible(false)
  }

  const cancelLoading = ref(false)
  const cancel = async (evt?: Event | unknown) => {
    let result = callEmit(props.onCancel, evt)
    if (isPromise(result)) {
      cancelLoading.value = true
      result = await result
      cancelLoading.value = false
    }
    if (result === false) {
      return
    }
    updateVisible(false)
  }

  const okLoading = ref(false)
  const ok = async (evt?: Event | unknown) => {
    let result = callEmit(props.onOk, evt)
    if (isPromise(result)) {
      okLoading.value = true
      result = await result
      okLoading.value = false
    }
    if (result === false) {
      return
    }
    updateVisible(false)
  }

  return { cancelLoading, okLoading, open, close, cancel, ok }
}
