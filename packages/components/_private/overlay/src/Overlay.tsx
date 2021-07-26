import type { Slots } from 'vue'
import type { PopperElement } from '@idux/cdk/popper'
import type { OverlayProps } from './types'

import { cloneVNode, defineComponent, onMounted, ref, Transition, withDirectives } from 'vue'
import { IxPortal } from '@idux/cdk/portal'
import { clickOutside } from '@idux/cdk/click-outside'
import { getFirstValidNode, getSlotNodes } from '@idux/cdk/utils'
import { useLogger, useOverlay, useRenderValid, useWatcher } from './hooks'
import { overlayProps } from './types'
import { convertElement } from './utils'

export default defineComponent({
  name: 'IxOverlay',
  props: overlayProps,
  setup(props, { slots }) {
    useLogger()

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
    } = useOverlay(props)
    const renderValid = useRenderValid()

    onMounted(initialize)

    useWatcher(visibility, placement, update)

    return () => {
      if (!renderValid.value) {
        return null
      }

      const trigger = getTrigger(props, slots, { ref: triggerRef, ...triggerEvents.value }, hide, popperRef.value)
      const overlay = getFirstValidNode(getSlotNodes(slots, 'overlay'))

      const content = (
        <div ref={popperRef} class={[props.clsPrefix, 'ix-overlay']} {...popperEvents.value}>
          {props.showArrow && (
            <div ref={arrowRef} class={['ix-overlay-arrow', `${props.clsPrefix}-arrow`]}>
              <div class={['ix-overlay-arrow-inner', `${props.clsPrefix}-arrow-inner`]} />
            </div>
          )}
          <div class={`${props.clsPrefix}-content`}>{overlay}</div>
        </div>
      )
      return (
        <>
          {trigger}
          <IxPortal target={`${props.clsPrefix}-container`} load={visibility.value}>
            <Transition name={props.visibleTransition}>
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
  extraProps: Record<string, any>,
  hide: () => void,
  popper: PopperElement | null,
) {
  const overlayElement = convertElement(ref(popper))
  const element = cloneVNode(getFirstValidNode(getSlotNodes(slots, 'trigger'))!, extraProps)
  if (props.trigger === 'click') {
    return withDirectives(element, [
      [
        clickOutside,
        {
          exclude: [overlayElement],
          handler: () => hide(),
        },
      ],
    ])
  }
  return element
}
