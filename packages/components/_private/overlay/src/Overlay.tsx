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
  type VNode,
  cloneVNode,
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  vShow,
  watch,
  withDirectives,
} from 'vue'

import { isFunction } from 'lodash-es'

import { vClickOutside } from '@idux/cdk/click-outside'
import { type PopperElement, type PopperEvents, usePopper } from '@idux/cdk/popper'
import { CdkPortal } from '@idux/cdk/portal'
import { Logger, callEmit, convertElement, getFirstValidNode, uniqueId } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { useZIndex } from '@idux/components/utils'

import Content from './Content'
import { useMergedEvents } from './composables/useMergedEvents'
import { useOverlayStates } from './composables/useOverlayState'
import { usePopperOptions } from './composables/usePopperOptions'
import { useVisible } from './composables/useVisible'
import { type OverlayProps, overlayProps } from './types'

export default defineComponent({
  name: 'ɵOverlay',
  inheritAttrs: false,
  props: overlayProps,
  setup(props, { slots, attrs, expose }) {
    const common = useGlobalConfig('common')
    const { globalHashId } = useThemeToken()
    const overlayId = ref(props.triggerId != null ? `__IDUX_OVERLAY-${props.triggerId}` : uniqueId('control-overlay'))

    const mergedPrefixCls = computed(() => `${common.prefixCls}-overlay`)
    const contentArrowRef = ref<HTMLElement>()
    const { options: popperOptions, update: updateOptions } = usePopperOptions(props, contentArrowRef)
    const { isHovered, isFocused, statePopperEvents, stateTriggerEvents } = useOverlayStates()
    const { visible, visibleLocked, updateVisible, lock, unlock } = useVisible(
      props,
      popperOptions.trigger,
      isHovered,
      isFocused,
    )

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
    } = usePopper({ ...popperOptions, visible, onVisibleChange: updateVisible })

    const { mergedTriggerEvents, mergedPopperEvents } = useMergedEvents(
      triggerEvents,
      popperEvents,
      stateTriggerEvents,
      statePopperEvents,
    )

    const currentZIndex = useZIndex(toRef(props, 'zIndex'), toRef(common, 'overlayZIndex'), visibility)
    const mergedContainer = computed(() => {
      const { container = common.overlayContainer } = props
      return (isFunction(container) ? container(convertElement(triggerRef)!) : container) ?? props.containerFallback
    })

    onMounted(() => initialize())
    onBeforeUnmount(() => destroy())

    watch(visibility, value => {
      if (value) {
        nextTick(updateOptions)
        props.destroyOnHide && initialize()
      }
    })
    watch(placement, value => callEmit(props['onUpdate:placement'], value))
    watch(
      contentArrowRef,
      () => {
        arrowRef.value = contentArrowRef.value
      },
      { immediate: true },
    )

    const onAfterLeave = () => {
      if (props.destroyOnHide) {
        destroy()
      }
      callEmit(props.onAfterLeave)
    }

    expose({
      updatePopper: update,
      getPopperElement: () => convertElement(popperRef),
    })

    const handleClickOutside = (evt: Event) => {
      if (visibleLocked.value) {
        return
      }

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
      const trigger = renderTrigger(
        props,
        triggerNode,
        { ref: triggerRef, ...mergedTriggerEvents.value },
        handleClickOutside,
        overlayId,
      )
      const contentNode = slots.content?.()
      if (!getFirstValidNode(contentNode)) {
        // 避免没有 content 时, trigger 被重新创建
        return (
          <>
            {trigger}
            <CdkPortal target={mergedContainer.value} load={false}></CdkPortal>
          </>
        )
      }

      const content = renderContent(
        props,
        globalHashId,
        mergedPrefixCls,
        visibility,
        currentZIndex,
        contentNode!,
        contentArrowRef,
        popperRef,
        mergedPopperEvents,
        attrs,
        lock,
        unlock,
        overlayId,
      )

      return (
        <>
          {trigger}
          <CdkPortal target={mergedContainer.value} load={props.lazy ? visibility.value : true}>
            <Transition appear name={props.transitionName} onAfterLeave={onAfterLeave}>
              {content}
            </Transition>
          </CdkPortal>
        </>
      )
    }
  },
})

function renderContent(
  props: OverlayProps,
  globalHashId: ComputedRef<string>,
  mergedPrefixCls: ComputedRef<string>,
  visibility: ComputedRef<boolean>,
  currentZIndex: ComputedRef<number>,
  contentNode: VNode[],
  arrowRef: Ref<PopperElement | undefined>,
  popperRef: Ref<PopperElement | undefined>,
  popperEvents: ComputedRef<PopperEvents>,
  attrs: Record<string, unknown>,
  lock: () => void,
  unlock: () => void,
  overlayId: Ref<string>,
) {
  if (props.destroyOnHide && !visibility.value) {
    return null
  }

  const prefixCls = mergedPrefixCls.value

  const style = `z-index: ${currentZIndex.value}`

  const overlay = (
    <Content
      ref={popperRef}
      class={[prefixCls, globalHashId.value]}
      style={style}
      lock={lock}
      unlock={unlock}
      id={overlayId.value}
      {...popperEvents.value}
      {...attrs}
    >
      {contentNode}
      {props.showArrow && <div ref={arrowRef} class={`${prefixCls}-arrow`}></div>}
    </Content>
  )

  return props.destroyOnHide ? overlay : withDirectives(overlay, [[vShow, visibility.value]])
}

function renderTrigger(
  props: OverlayProps,
  triggerNode: VNode,
  extraProps: Record<string, unknown>,
  handleClickOutside: (evt: Event) => void,
  overlayId: Ref<string>,
) {
  const triggerProps = {
    ...extraProps,
    'aria-controls': overlayId.value,
  }
  const element = cloneVNode(triggerNode, triggerProps, true)

  if (props.clickOutside) {
    return withDirectives(element, [[vClickOutside, handleClickOutside]])
  }
  return element
}
