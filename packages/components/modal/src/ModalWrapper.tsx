import { ComputedRef, onBeforeUnmount, onMounted, Ref, watch } from 'vue'

import { computed, defineComponent, inject, ref, Transition } from 'vue'
import { isFunction } from 'lodash-es'
import { callEmit, getOffset, convertCssPixel } from '@idux/cdk/utils'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import { modalToken, MODAL_TOKEN } from './token'
import { ModalConfig } from '@idux/components/config'
import { ModalProps } from './types'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    const { props, config, visible, animatedVisible } = inject(modalToken)!
    const { close } = inject(MODAL_TOKEN)!
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

    const { onEnter, onAfterEnter, onAfterLeave } = useEvents(
      props,
      wrapperRef,
      modalTransformOrigin,
      modalRef,
      animatedVisible,
    )

    onMounted(() => {
      watchVisibleChange(wrapperRef, sentinelStartRef, props, mask)
    })

    return () => {
      return (
        <div
          v-show={animatedVisible.value}
          ref={wrapperRef}
          class={classes.value}
          tabindex={-1}
          style={{ zIndex: zIndex.value }}
          onClick={onWrapperClick}
          onKeydown={onWrapperKeydown}
        >
          <Transition name="ix-zoom" appear onEnter={onEnter} onAfterEnter={onAfterEnter} onAfterLeave={onAfterLeave}>
            <div
              v-show={visible.value}
              ref={modalRef}
              role="document"
              class="ix-modal"
              style={modalStyle.value}
              onMousedown={onModalMousedown}
              onMouseup={onModalMouseup}
              {...attrs}
            >
              <div ref={sentinelStartRef} tabindex={0} class="ix-modal-sentinel" aria-hidden="true"></div>
              <div class="ix-modal-content">
                <ModalHeader></ModalHeader>
                <ModalBody></ModalBody>
                <ModalFooter></ModalFooter>
              </div>
              <div ref={sentinelEndRef} tabindex={0} class="ix-modal-sentinel" aria-hidden="true"></div>
            </div>
          </Transition>
        </div>
      )
    }
  },
})

const useConfig = (props: ModalProps, config: ModalConfig) => {
  const centered = computed(() => props.centered ?? config.centered)
  const closeOnEsc = computed(() => props.closeOnEsc ?? config.closeOnEsc)
  const mask = computed(() => props.mask ?? config.mask)
  const maskClosable = computed(() => props.maskClosable ?? config.maskClosable)
  const width = computed(() => convertCssPixel(props.width ?? config.width))
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
  let timeId: NodeJS.Timeout | null = null
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

const useEvents = (
  props: ModalProps,
  wrapperRef: Ref<HTMLDivElement | undefined>,
  modalTransformOrigin: Ref<string | undefined>,
  modalRef: Ref<HTMLDivElement | undefined>,
  animatedVisible: Ref<boolean>,
) => {
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
  return { onEnter, onAfterEnter, onAfterLeave }
}
