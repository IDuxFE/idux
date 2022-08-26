/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayProps } from './types'
import type { PopperElement, PopperEvents } from '@idux/cdk/popper'

import {
  type ComputedRef,
  type Ref,
  Transition,
  type VNode,
  cloneVNode,
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  toRef,
  vShow,
  watch,
  withDirectives,
} from 'vue'

import { vClickOutside } from '@idux/cdk/click-outside'
import { usePopper } from '@idux/cdk/popper'
import { CdkPortal } from '@idux/cdk/portal'
import { Logger, callEmit, convertElement, getFirstValidNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useZIndex } from '@idux/components/utils'

import { overlayProps } from './types'

export default defineComponent({
  name: 'ɵOverlay',
  inheritAttrs: false,
  props: overlayProps,
  setup(props, { slots, attrs, expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-overlay`)
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
      forceUpdate,
      show,
      hide,
      destroy,
    } = usePopper({ ...popperOptions.value, visible: props.visible })

    const { currentZIndex } = useZIndex(toRef(props, 'zIndex'), toRef(common, 'zIndex'), visibility)

    onMounted(() => initialize())
    onBeforeUnmount(() => destroy())

    watch(visibility, value => callEmit(props['onUpdate:visible'], value))
    watch(placement, value => callEmit(props['onUpdate:placement'], value))
    watch(popperOptions, options => update(options))
    watch(
      () => props.visible,
      visible => (visible ? show() : hide()),
    )

    const onAfterLeave = () => {
      if (props.destroyOnHide) {
        destroy()
      }
      callEmit(props.onAfterLeave)
    }

    expose({
      updatePopper: update,
      forceUpdatePopper: forceUpdate,
    })

    const handleClickOutside = (evt: Event) => {
      const popperElement = convertElement(popperRef)
      const target = evt.target as Node
      if (!popperElement || popperElement === target || popperElement.contains(target)) {
        return
      }

      hide()
    }

    return () => {
      const triggerNode = getFirstValidNode(slots.default?.())
      if (!triggerNode) {
        __DEV__ && Logger.warn('components/overlay', 'Trigger must is single rooted node')
        return null
      }
      const trigger = renderTrigger(props, triggerNode, { ref: triggerRef, ...triggerEvents.value }, handleClickOutside)
      const contentNode = slots.content?.()
      if (!getFirstValidNode(contentNode)) {
        // 避免没有 content 时, trigger 被重新创建
        return (
          <>
            {trigger}
            <CdkPortal target={props.target} load={false}></CdkPortal>
          </>
        )
      }

      const content = renderContent(
        props,
        mergedPrefixCls,
        visibility,
        currentZIndex,
        contentNode!,
        arrowRef,
        popperRef,
        popperEvents,
        attrs,
      )

      return (
        <>
          {trigger}
          <CdkPortal target={props.target} load={visibility.value}>
            <Transition appear name={props.transitionName} onAfterLeave={onAfterLeave}>
              {content}
            </Transition>
          </CdkPortal>
        </>
      )
    }
  },
})

function usePopperOptions(props: OverlayProps) {
  return computed(() => {
    const { allowEnter, autoAdjust, delay, disabled, offset, placement, trigger } = props
    return { allowEnter, autoAdjust, delay, disabled, offset, placement, trigger }
  })
}

function renderContent(
  props: OverlayProps,
  mergedPrefixCls: ComputedRef<string>,
  visibility: ComputedRef<boolean>,
  currentZIndex: ComputedRef<number>,
  contentNode: VNode[],
  arrowRef: Ref<PopperElement | undefined>,
  popperRef: Ref<PopperElement | undefined>,
  popperEvents: ComputedRef<PopperEvents>,
  attrs: Record<string, unknown>,
) {
  if (props.destroyOnHide && !visibility.value) {
    return null
  }
  const prefixCls = mergedPrefixCls.value
  const { triggerId } = props
  const overlayId = triggerId != null ? `overlay-${triggerId}` : undefined
  const style = currentZIndex.value ? `z-index: ${currentZIndex.value}` : undefined
  const overlay = (
    <div ref={popperRef} id={overlayId} class={prefixCls} style={style} {...popperEvents.value} {...attrs}>
      {contentNode}
      {props.showArrow && <div ref={arrowRef} class={`${prefixCls}-arrow`}></div>}
    </div>
  )

  return props.destroyOnHide ? overlay : withDirectives(overlay, [[vShow, visibility.value]])
}

function renderTrigger(
  props: OverlayProps,
  triggerNode: VNode,
  extraProps: Record<string, unknown>,
  handleClickOutside: (evt: Event) => void,
) {
  const element = cloneVNode(triggerNode, extraProps, true)
  if (props.clickOutside) {
    return withDirectives(element, [[vClickOutside, handleClickOutside]])
  }
  return element
}
