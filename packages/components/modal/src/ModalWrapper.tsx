import { ComputedRef, onBeforeUnmount, onMounted, Ref, watch } from 'vue'

import { computed, defineComponent, inject, ref, toRef, Transition } from 'vue'
import { callEmit, getOffset, isFunction, toCssPixel } from '@idux/cdk/utils'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import { modalInnerToken, modalToken } from './token'
import { ModalConfig } from '@idux/components/config'
import { ModalProps } from './types'

export default defineComponent({
  inheritAttrs: false,
  setup() {
    const { props, config, visible, animatedVisible } = inject(modalInnerToken)!
    const { close } = inject(modalToken)!
    const { centered, width, mask, maskClosable, closeOnEsc, zIndex } = useConfig(props, config)

    const classes = useClasses(props, centered)
    const modalTransformOrigin = ref<string>()
    const modalStyle = computed(() => ({ width: width.value, transformOrigin: modalTransformOrigin.value }))

    const wrapperRef = ref<HTMLDivElement>()
    const modalRef = ref<HTMLDivElement>()
    const sentinelStartRef = ref<HTMLDivElement>()
    const sentinelEndRef = ref<HTMLDivElement>()

    const { onModalMousedown, onModalMouseup, onWrapperClick, onWrapperKeydown } = useEvent(
      close,
      mask,
      maskClosable,
      closeOnEsc,
      sentinelStartRef,
      sentinelEndRef,
    )

    let lastOutSideActiveElement: HTMLElement | null = null
    const onEnter = () => {
      const wrapperElement = wrapperRef.value!
      const activeElement = document.activeElement
      if (!wrapperElement.contains(activeElement)) {
        lastOutSideActiveElement = activeElement as HTMLElement
      }

      // first show modal
      if (!modalTransformOrigin.value && lastOutSideActiveElement) {
        const modalElement = modalRef.value!
        const previouslyDOMRect = lastOutSideActiveElement.getBoundingClientRect()
        const lastPosition = getOffset(lastOutSideActiveElement)
        const x = lastPosition.left + previouslyDOMRect.width / 2
        const y = lastPosition.top + previouslyDOMRect.height / 2
        modalTransformOrigin.value = `${x - modalElement.offsetLeft}px ${y - modalElement.offsetTop}px`
      }
    }

    const onAfterEnter = () => {
      const wrapperElement = wrapperRef.value!
      const activeElement = document.activeElement
      if (!wrapperElement.contains(activeElement)) {
        wrapperElement.focus()
      }

      callEmit(props.onAfterOpen)
    }

    const onAfterLeave = () => {
      if (lastOutSideActiveElement && isFunction(lastOutSideActiveElement.focus)) {
        const wrapperElement = wrapperRef.value!
        const activeElement = document.activeElement

        if (
          !activeElement ||
          activeElement === document.body ||
          activeElement === wrapperElement ||
          wrapperElement.contains(activeElement)
        ) {
          lastOutSideActiveElement.focus()
        }
      }

      callEmit(props.onAfterClose)

      animatedVisible.value = false
    }

    onMounted(() => {
      watchVisibleChange(wrapperRef, sentinelStartRef, props, mask)
    })

    return {
      classes,
      zIndex,
      modalStyle,
      animatedVisible,
      visible,
      destroyOnHide: toRef(props, 'destroyOnHide'),
      wrapperRef,
      modalRef,
      sentinelStartRef,
      sentinelEndRef,
      onModalMousedown,
      onModalMouseup,
      onWrapperClick,
      onWrapperKeydown,
      onEnter,
      onAfterEnter,
      onAfterLeave,
    }
  },
  render() {
    return (
      <div
        v-show={this.animatedVisible}
        ref="wrapperRef"
        class={this.classes}
        tabindex={-1}
        style={{ zIndex: this.zIndex }}
        onClick={this.onWrapperClick}
        onKeydown={this.onWrapperKeydown}
      >
        <Transition
          name="ix-zoom"
          appear
          onEnter={this.onEnter}
          onAfterEnter={this.onAfterEnter}
          onAfterLeave={this.onAfterLeave}
        >
          <div
            v-show={this.visible}
            ref="modalRef"
            role="document"
            class="ix-modal"
            style={this.modalStyle}
            onMousedown={this.onModalMousedown}
            onMouseup={this.onModalMouseup}
            {...this.$attrs}
          >
            <div ref="sentinelStartRef" tabindex={0} class="ix-modal-sentinel" aria-hidden="true"></div>
            <div class="ix-modal-content">
              <ModalHeader></ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter></ModalFooter>
            </div>
            <div ref="sentinelEndRef" tabindex={0} class="ix-modal-sentinel" aria-hidden="true"></div>
          </div>
        </Transition>
      </div>
    )
  },
})

const useConfig = (props: ModalProps, config: ModalConfig) => {
  const centered = computed(() => props.centered ?? config.centered)
  const closeOnEsc = computed(() => props.closeOnEsc ?? config.closeOnEsc)
  const mask = computed(() => props.mask ?? config.mask)
  const maskClosable = computed(() => props.maskClosable ?? config.maskClosable)
  const width = computed(() => toCssPixel(props.width ?? config.width))
  const zIndex = computed(() => props.zIndex ?? config.zIndex)

  return { centered, width, mask, maskClosable, closeOnEsc, zIndex }
}

const useClasses = (props: ModalProps, centered: ComputedRef<boolean>) => {
  return computed(() => {
    const containerClassName = props.containerClassName
    return {
      'ix-modal-wrapper': true,
      'ix-modal-centered': centered.value,
      [containerClassName || '']: containerClassName,
    }
  })
}

const watchVisibleChange = (
  wrapperRef: Ref<HTMLDivElement | undefined>,
  sentinelStartRef: Ref<HTMLDivElement | undefined>,
  props: ModalProps,
  mask: ComputedRef<boolean>,
) => {
  let lastOutSideActiveElement: HTMLElement | null = null
  watch(
    () => props.visible,
    visible => {
      if (visible) {
        const wrapperElement = wrapperRef.value!
        const activeElement = document.activeElement
        if (!wrapperElement.contains(activeElement)) {
          lastOutSideActiveElement = activeElement as HTMLElement
          sentinelStartRef.value?.focus()
        }
      } else {
        if (mask.value) {
          lastOutSideActiveElement?.focus?.()
          lastOutSideActiveElement = null
        }
      }
    },
    { immediate: true },
  )
}

const useEvent = (
  close: (evt: Event) => void,
  mask: ComputedRef<boolean>,
  maskClosable: ComputedRef<boolean>,
  closeOnEsc: ComputedRef<boolean>,
  sentinelStartRef: Ref<HTMLDivElement | undefined>,
  sentinelEndRef: Ref<HTMLDivElement | undefined>,
) => {
  let timeId: number | null = null
  let mouseDown = false
  const onModalMousedown = () => {
    if (timeId) {
      clearTimeout(timeId)
      timeId = null
    }
    mouseDown = true
  }

  const onModalMouseup = () => {
    if (mouseDown) {
      timeId = setTimeout(() => (mouseDown = false))
    }
  }

  const onWrapperClick = (evt: MouseEvent) => {
    if (evt.target === evt.currentTarget && !mouseDown && mask.value && maskClosable.value) {
      close(evt)
    }
  }

  const onWrapperKeydown = (evt: KeyboardEvent) => {
    if (closeOnEsc.value && evt.code === 'Escape') {
      evt.stopPropagation()
      close(evt)
      return
    }

    if (evt.code === 'Tab') {
      const activeElement = document.activeElement
      const sentinelStartElement = sentinelStartRef.value
      const sentinelEndElement = sentinelEndRef.value
      if (evt.shiftKey) {
        if (activeElement === sentinelStartElement) {
          sentinelEndElement?.focus()
        }
      } else if (activeElement === sentinelEndElement) {
        sentinelStartElement?.focus()
      }
    }
  }

  onBeforeUnmount(() => {
    if (timeId) {
      clearTimeout(timeId)
    }
  })

  return { onModalMousedown, onModalMouseup, onWrapperClick, onWrapperKeydown }
}
