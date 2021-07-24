import type { Slots } from 'vue'
import type { PopperElement } from '@idux/cdk/popper'
import type { OverlayProps } from './types'

import { cloneVNode, defineComponent, onMounted, ref, resolveDirective, Transition, withDirectives } from 'vue'
import { IxPortal } from '@idux/cdk/portal'
import { clickOutside } from '@idux/cdk/click-outside'
import { getFirstValidNode, getSlotNodes } from '@idux/cdk/utils'
import { useLogger, useOverlay, useRenderValid, useWatcher } from './hooks'
import { overlayProps } from './types'
import { convertElement } from './utils'

export default defineComponent({
  name: 'IxOverlay',
  directives: { clickOutside },
  props: overlayProps,
  setup(props) {
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

    return { arrowRef, popperRef, popperEvents, triggerRef, triggerEvents, visibility, hide, renderValid }
  },
  render() {
    const {
      renderValid,
      $props,
      $slots,
      triggerEvents,
      popperRef,
      clsPrefix,
      visibleTransition,
      destroyOnHide,
      visibility,
      popperEvents,
      showArrow,
      hide,
    } = this

    if (!renderValid) {
      return null
    }

    const trigger = getTrigger($props, $slots, { ref: 'triggerRef', ...triggerEvents }, hide, popperRef)
    const overlay = getFirstValidNode(getSlotNodes($slots, 'overlay'))!

    const content = (
      <div ref="popperRef" class={[clsPrefix, 'ix-overlay']} {...popperEvents}>
        {showArrow && (
          <div ref="arrowRef" class={['ix-overlay-arrow', `${clsPrefix}-arrow`]}>
            <div class={['ix-overlay-arrow-inner', `${clsPrefix}-arrow-inner`]} />
          </div>
        )}
        <div class={`${clsPrefix}-content`}>{overlay}</div>
      </div>
    )

    return (
      <>
        {trigger}
        <IxPortal target={`${clsPrefix}-container`}>
          <Transition name={visibleTransition}>
            {destroyOnHide ? visibility && content : <div v-show={visibility}>{content}</div>}
          </Transition>
        </IxPortal>
      </>
    )
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
        resolveDirective('click-outside')!,
        {
          exclude: [overlayElement],
          handler: () => hide(),
        },
      ],
    ])
  }
  return element
}
