/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Ref,
  Transition,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import { isFunction } from 'lodash-es'

import { useDraggable } from '@idux/cdk/drag-drop'
import { callEmit, convertCssPixel, getOffset } from '@idux/cdk/utils'
import { ɵFooter } from '@idux/components/_private/footer'
import { ɵHeader } from '@idux/components/_private/header'
import { type ModalConfig } from '@idux/components/config'

import ModalBody from './ModalBody'
import { MODAL_TOKEN, modalToken } from './token'
import { type ModalProps } from './types'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    const {
      props,
      slots,
      common,
      locale,
      config,
      mergedPrefixCls,
      visible,
      animatedVisible,
      mergedVisible,
      cancelLoading,
      okLoading,
      currentZIndex,
    } = inject(modalToken)!
    const { close, cancel, ok } = inject(MODAL_TOKEN)!
    const { centered, closable, closeIcon, closeOnEsc, width, mask, maskClosable } = useConfig(props, config)

    const cancelVisible = computed(() => props.type === 'default' || props.type === 'confirm')

    const cancelText = computed(() => props.cancelText ?? locale.modal.cancelText)
    const okText = computed(() => {
      if (props.okText) {
        return props.okText
      }
      return cancelVisible.value ? locale.modal.okText : locale.modal.justOkText
    })

    const placementStyle = computed(() => {
      const top = centered.value ? 0 : convertCssPixel(props.offset)
      return { top, width: width.value }
    })

    const wrapperClasses = computed(() => {
      const { wrapperClassName = '' } = props
      const prefixCls = mergedPrefixCls.value

      return {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-centered`]: centered.value,
        [`${prefixCls}-with-mask`]: mask.value,
        [wrapperClassName]: !!wrapperClassName,
      }
    })

    const wrapperStyle = computed(() => {
      return { zIndex: currentZIndex.value }
    })

    const modalTransformOrigin = ref<string>()
    const contentStyle = computed(() => {
      return { transformOrigin: modalTransformOrigin.value, ...placementStyle.value }
    })

    const wrapperRef = ref<HTMLDivElement>()
    const modalRef = ref<HTMLDivElement>()
    const contentRef = ref<HTMLDivElement>()
    const headerRef = ref<HTMLDivElement>()
    const sentinelStartRef = ref<HTMLDivElement>()
    const sentinelEndRef = ref<HTMLDivElement>()

    const { onWrapperClick, onWrapperKeydown, onContentMousedown, onContentMouseup } = useEvent(
      props,
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
      modalRef,
      animatedVisible,
      modalTransformOrigin,
    )
    const draggableResult = ref()

    const handleOk = (evt?: unknown) => {
      if (visible.value) {
        ok(evt)
      }
    }
    const handleCancel = (evt?: unknown) => {
      if (visible.value) {
        cancel(evt)
      }
    }

    onMounted(() => watchVisibleChange(props, wrapperRef, sentinelStartRef, mask, draggableResult))

    watch(
      () => props.draggable,
      draggable => {
        if (draggableResult.value) {
          draggableResult.value.stop()
          draggableResult.value = undefined
        }
        if (draggable) {
          draggableResult.value = useDraggable(contentRef, { handle: headerRef, free: true, boundary: window })
        }
      },
      { immediate: true },
    )

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div
          v-show={mergedVisible.value}
          ref={wrapperRef}
          class={wrapperClasses.value}
          style={wrapperStyle.value}
          tabindex={-1}
          onClick={onWrapperClick}
          onKeydown={onWrapperKeydown}
        >
          <Transition
            name={props.animatable ? `${common.prefixCls}-zoom` : undefined}
            appear
            onEnter={onEnter}
            onAfterEnter={onAfterEnter}
            onAfterLeave={onAfterLeave}
          >
            <div
              v-show={visible.value}
              ref={modalRef}
              role="document"
              class={prefixCls}
              style={contentStyle.value}
              onMousedown={onContentMousedown}
              onMouseup={onContentMouseup}
              {...attrs}
            >
              <div ref={sentinelStartRef} tabindex={0} class={`${prefixCls}-sentinel`} aria-hidden={true}></div>
              <div ref={contentRef} class={`${prefixCls}-content`}>
                <ɵHeader
                  ref={headerRef}
                  v-slots={slots}
                  closable={closable.value}
                  closeIcon={closeIcon.value}
                  header={props.header}
                  onClose={close}
                />
                <ModalBody></ModalBody>
                <ɵFooter
                  v-slots={slots}
                  class={`${prefixCls}-footer`}
                  cancel={handleCancel}
                  cancelButton={props.cancelButton}
                  cancelLoading={cancelLoading.value}
                  cancelText={cancelText.value}
                  cancelVisible={cancelVisible.value}
                  footer={props.footer}
                  ok={handleOk}
                  okButton={props.okButton}
                  okLoading={okLoading.value}
                  okText={okText.value}
                ></ɵFooter>
              </div>
              <div ref={sentinelEndRef} tabindex={0} class={`${prefixCls}-sentinel`} aria-hidden={true}></div>
            </div>
          </Transition>
        </div>
      )
    }
  },
})

function useConfig(props: ModalProps, config: ModalConfig) {
  const centered = computed(() => props.centered ?? config.centered)
  const closable = computed(() => props.closable ?? config.closable)
  const closeIcon = computed(() => props.closeIcon ?? config.closeIcon)
  const closeOnEsc = computed(() => props.closeOnEsc ?? config.closeOnEsc)
  const mask = computed(() => props.mask ?? config.mask)
  const maskClosable = computed(() => props.maskClosable ?? config.maskClosable)
  const width = computed(() => convertCssPixel(props.width ?? config.width))

  return { centered, closable, closeIcon, closeOnEsc, width, mask, maskClosable }
}

function watchVisibleChange(
  props: ModalProps,
  wrapperRef: Ref<HTMLDivElement | undefined>,
  sentinelStartRef: Ref<HTMLDivElement | undefined>,
  mask: ComputedRef<boolean>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  draggableResult: Ref<any>,
) {
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
        draggableResult.value?.reset()
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

function useEvent(
  props: ModalProps,
  close: (evt: Event) => void,
  mask: ComputedRef<boolean>,
  maskClosable: ComputedRef<boolean>,
  closeOnEsc: ComputedRef<boolean>,
  sentinelStartRef: Ref<HTMLDivElement | undefined>,
  sentinelEndRef: Ref<HTMLDivElement | undefined>,
) {
  let timeId: number | undefined
  let mouseDown = false

  const clearTimer = () => {
    if (timeId) {
      clearTimeout(timeId)
      timeId = undefined
    }
  }

  const onWrapperClick = (evt: MouseEvent) => {
    if (evt.target === evt.currentTarget && (!mouseDown || props.draggable) && mask.value && maskClosable.value) {
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

  const onContentMousedown = () => {
    clearTimer()
    mouseDown = true
  }

  const onContentMouseup = () => {
    if (mouseDown) {
      timeId = setTimeout(() => (mouseDown = false))
    }
  }

  onBeforeUnmount(() => clearTimer())

  return { onWrapperClick, onWrapperKeydown, onContentMousedown, onContentMouseup }
}

function useEvents(
  props: ModalProps,
  wrapperRef: Ref<HTMLDivElement | undefined>,
  modalRef: Ref<HTMLDivElement | undefined>,
  animatedVisible: Ref<boolean | undefined>,
  modalTransformOrigin: Ref<string | undefined>,
) {
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
    animatedVisible.value = true
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
