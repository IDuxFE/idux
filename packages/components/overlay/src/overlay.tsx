import type { SetupContext } from 'vue'
import type { OverlayProps } from './types'

import { cloneVNode, computed, defineComponent, Fragment, KeepAlive, onMounted, Transition } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'
import { IxPortal } from '@idux/cdk/portal' // todo remove to components
import { getSlotNodes, getFirstValidNode, hasSlot, Logger } from '@idux/cdk/utils'

import { getOverlayOptions, useWatcher } from './utils'
import { overlayPropsDef } from './types'

export default defineComponent({
  name: 'IxOverlay',
  components: { IxPortal },
  props: overlayPropsDef,
  emits: ['update:visible', 'update:placement'],
  setup(props: OverlayProps, { slots, attrs }: SetupContext) {
    const { clsPrefix } = attrs

    if (!clsPrefix) {
      Logger.warn('Your overlay may need class name prefix.')
    }

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
    } = useOverlay(getOverlayOptions())

    onMounted(initialize)

    useWatcher(visibility, placement, update)

    const arrowStyle = computed(() => {
      if (!props.arrowOffset) {
        return {}
      }
      if (placement.value.startsWith('top') || placement.value.startsWith('bottom')) {
        return { left: `${props.arrowOffset}px` }
      }
      return { top: `${props.arrowOffset}px` }
    })

    return { overlayRef, overlayEvents, triggerRef, triggerEvents, visibility, arrowStyle, clsPrefix, placement }
  },
  render() {
    const {
      $slots,
      overlayEvents,
      triggerEvents,
      visibility,
      showArrow,
      arrowStyle,
      visibleTransition,
      clsPrefix,
      placement,
      destroyOnHide,
    } = this

    const trigger = cloneVNode(getFirstValidNode(getSlotNodes($slots, 'trigger'))!, {
      ...triggerEvents,
      ref: 'triggerRef',
    })

    const overlay = getFirstValidNode(getSlotNodes($slots, 'overlay'))

    const Container = destroyOnHide ? Fragment : KeepAlive

    return (
      <>
        {trigger}
        <IxPortal target={`${clsPrefix}-container`}>
          <Container>
            <Transition name={visibleTransition}>
              {visibility && (
                <div
                  class={[clsPrefix, 'ix-overlay']}
                  ref="overlayRef"
                  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                  // @ts-ignore
                  placement={placement}
                  {...overlayEvents}
                >
                  {showArrow && <div style={arrowStyle} class={['ix-overlay-arrow', `${clsPrefix}-arrow`]} />}
                  <div class={`${clsPrefix}-content`}>{overlay}</div>
                </div>
              )}
            </Transition>
          </Container>
        </IxPortal>
      </>
    )
  },
})
