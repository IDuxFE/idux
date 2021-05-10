import type { SetupContext } from 'vue'
import type { OverlayProps } from './types'

import { cloneVNode, computed, defineComponent, onMounted, Transition } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'
import { IxPortal } from '@idux/cdk/portal' // todo remove to components
import { getSlotNodes, getFirstValidNode, hasSlot, Logger } from '@idux/cdk/utils'

import useWatcher from './useWatcher'
import { overlayPropsDef } from './types'

export default defineComponent({
  name: 'IxOverlay',
  components: { IxPortal },
  props: overlayPropsDef,
  emits: ['update:visible', 'update:placement'],
  setup(props: OverlayProps, { slots }: SetupContext) {
    if (!hasSlot(slots, 'trigger')) {
      Logger.error('The component must contain trigger slot.')
    }

    if (!hasSlot(slots, 'overlay')) {
      Logger.error('The component must contain overlay slot.')
    }

    const {
      initialize,
      overlayRef,
      overlayEvents,
      triggerRef,
      triggerEvents,
      visibility,
      placement,
      update,
    } = useOverlay(props)

    onMounted(initialize)

    useWatcher(visibility, placement, update)

    const arrowStyle = computed(() => {
      return { left: `${props.arrowOffset}px` } // todo placement
    })

    return { overlayRef, overlayEvents, triggerRef, triggerEvents, visibility, arrowStyle }
  },
  render() {
    const {
      $slots,
      overlayEvents,
      triggerEvents,
      visibility,
      showArrow,
      arrowClassName,
      arrowStyle,
      visibleTransition,
    } = this

    const trigger = cloneVNode(getFirstValidNode(getSlotNodes($slots, 'trigger'))!, {
      ...triggerEvents,
      ref: 'triggerRef',
    })

    const overlay = cloneVNode(getFirstValidNode(getSlotNodes($slots, 'overlay'))!, {
      ...overlayEvents,
      ref: 'overlayRef',
    })

    return (
      <>
        {trigger}
        <Transition name={visibleTransition}>
          {visibility && (
            <IxPortal target="ix-overlay">
              {showArrow && <div style={arrowStyle} class={['ix-overlay-arrow', arrowClassName]} />}
              {overlay}
            </IxPortal>
          )}
        </Transition>
      </>
    )
  },
})
