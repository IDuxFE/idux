import { ComputedRef, Ref, shallowRef, VNode } from 'vue'
import type { PopperElement, PopperEvents } from '@idux/cdk/popper'
import type { OverlayProps } from './types'

import {
  cloneVNode,
  computed,
  defineComponent,
  onMounted,
  onBeforeUnmount,
  Transition,
  vShow,
  watch,
  withDirectives,
} from 'vue'
import { clickOutside, ClickOutsideOptions } from '@idux/cdk/click-outside'
import { usePopper, convertElement } from '@idux/cdk/popper'
import { IxPortal } from '@idux/cdk/portal'
import { callEmit, getFirstValidNode, Logger } from '@idux/cdk/utils'
import { overlayProps } from './types'

export default defineComponent({
  name: 'IxOverlay',
  inheritAttrs: false,
  props: overlayProps,
  setup(props, { slots, attrs }) {
    const popperOptions = usePopperOptions(props)
    const {
      arrowRef,
      popperRef,
      popperEvents,
      triggerRef,
      triggerEvents,
      visibility,
      placement,
      initialize,
      update,
      hide,
      destroy,
    } = usePopper(popperOptions.value)

    const clickOutsideOptions = shallowRef<ClickOutsideOptions>({
      exclude: [convertElement(popperRef.value)],
      handler: () => hide(),
    })

    onMounted(() => initialize())
    onBeforeUnmount(() => destroy())

    watch(visibility, value => callEmit(props['onUpdate:visible'], value))
    watch(placement, value => callEmit(props['onUpdate:placement'], value))
    watch(popperOptions, options => update(options))

    const onAfterLeave = () => {
      if (props.destroyOnHide) {
        destroy()
      }
    }

    return () => {
      const triggerNode = getFirstValidNode(slots.default?.())
      if (!triggerNode) {
        __DEV__ && Logger.warn('components/overlay', 'Trigger must is single rooted node')
        return null
      }
      const contentNode = slots.content?.()
      if (!getFirstValidNode(contentNode)) {
        return triggerNode
      }
      const trigger = renderTrigger(
        props,
        triggerNode,
        { ref: triggerRef, ...triggerEvents.value },
        clickOutsideOptions.value,
      )
      const content = renderContent(props, visibility, contentNode!, arrowRef, popperRef, popperEvents, attrs)
      return (
        <>
          {trigger}
          <IxPortal target={props.target} load={visibility.value}>
            <Transition appear name={props.transitionName} onAfterLeave={onAfterLeave}>
              {content}
            </Transition>
          </IxPortal>
        </>
      )
    }
  },
})

function usePopperOptions(props: OverlayProps) {
  return computed(() => {
    const { visible, allowEnter, autoAdjust, delay, disabled, offset, placement, trigger } = props
    return { visible, allowEnter, autoAdjust, delay, disabled, offset, placement, trigger }
  })
}

function renderContent(
  props: OverlayProps,
  visibility: ComputedRef<boolean>,
  contentNode: VNode[],
  arrowRef: Ref<PopperElement | null>,
  popperRef: Ref<PopperElement | null>,
  popperEvents: ComputedRef<PopperEvents>,
  attrs: Record<string, unknown>,
) {
  if (props.destroyOnHide && !visibility.value) {
    return null
  }

  const arrow = props.showArrow ? <div ref={arrowRef} class="ix-overlay-arrow"></div> : null

  const overlay = (
    <div ref={popperRef} class="ix-overlay" {...popperEvents.value} {...attrs}>
      {contentNode}
      {arrow}
    </div>
  )

  return props.destroyOnHide ? overlay : withDirectives(overlay, [[vShow, visibility.value]])
}

function renderTrigger(
  props: OverlayProps,
  triggerNode: VNode,
  extraProps: Record<string, unknown>,
  clickOutsideOptions: ClickOutsideOptions,
) {
  const element = cloneVNode(triggerNode, extraProps, true)
  if (props.clickOutside) {
    return withDirectives(element, [[clickOutside, clickOutsideOptions]])
  }
  return element
}
