import type { Slots } from 'vue'
import type { PopperElement } from '@idux/cdk/popper'
import type { OverlayProps } from './types'

import { cloneVNode, defineComponent, onMounted, Transition, withDirectives } from 'vue'
import { clickOutside } from '@idux/cdk/click-outside'
import { usePopper } from '@idux/cdk/popper'
import { IxPortal } from '@idux/cdk/portal'
import { getFirstValidNode, getSlotNodes } from '@idux/cdk/utils'
import { useRenderValid, useWatcher } from './hooks'
import { overlayProps } from './types'
import { convertElement, getPopperOptions } from './utils'

export default defineComponent({
  name: 'IxOverlay',
  props: overlayProps,
  setup(props, { slots }) {
    const renderValid = useRenderValid()

    const {
      arrowRef,
      initialize,
      popperRef,
      popperEvents,
      triggerRef,
      triggerEvents,
      visibility,
      placement,
      update,
      hide,
    } = usePopper(getPopperOptions(props))

    onMounted(initialize)

    useWatcher(props, visibility, placement, update)

    return () => {
      if (!renderValid.value) {
        return null
      }

      const trigger = getTrigger(props, slots, popperRef.value, { ref: triggerRef, ...triggerEvents.value }, hide)

      const arrowNode = props.showArrow ? (
        <div ref={arrowRef} class={['ix-overlay-arrow', `${props.clsPrefix}-arrow`]}>
          <div class={['ix-overlay-arrow-inner', `${props.clsPrefix}-arrow-inner`]} />
        </div>
      ) : null

      const content = (
        <div ref={popperRef} class={[props.clsPrefix, 'ix-overlay']} {...popperEvents.value}>
          {arrowNode}
          <div class={`${props.clsPrefix}-content`}>{slots.overlay?.()}</div>
        </div>
      )
      return (
        <>
          {trigger}
          <IxPortal target={`${props.clsPrefix}-container`} load={visibility.value}>
            <Transition name={props.transitionName}>
              {props.destroyOnHide ? visibility.value && content : <div v-show={visibility.value}>{content}</div>}
            </Transition>
          </IxPortal>
        </>
      )
    }
  },
})

function getTrigger(
  props: OverlayProps,
  slots: Slots,
  popper: PopperElement | null,
  extraProps: Record<string, any>,
  hide: () => void,
) {
  const popperElement = convertElement(popper)
  const element = cloneVNode(getFirstValidNode(getSlotNodes(slots, 'trigger'))!, extraProps)
  if (props.trigger === 'click') {
    return withDirectives(element, [
      [
        clickOutside,
        {
          exclude: [popperElement],
          handler: hide,
        },
      ],
    ])
  }
  return element
}
