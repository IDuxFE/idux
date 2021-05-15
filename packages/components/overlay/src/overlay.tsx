import { cloneVNode, defineComponent, onMounted, Transition } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'
import { IxPortal } from '@idux/cdk/portal' // todo remove to components
import { getSlotNodes, getFirstValidNode } from '@idux/cdk/utils'

import { getOverlayOptions, useArrowStyle, useLogger, useRenderValid, useWatcher } from './utils'
import { overlayPropsDef } from './types'

export default defineComponent({
  name: 'IxOverlay',
  components: { IxPortal },
  inheritAttrs: false,
  props: overlayPropsDef,
  emits: ['update:visible', 'update:placement'],
  setup() {
    useLogger()

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

    const renderValid = useRenderValid()

    const arrowStyle = useArrowStyle(placement)

    return {
      renderValid,
      overlayRef,
      overlayEvents,
      triggerRef,
      triggerEvents,
      visibility,
      arrowStyle,
      placement,
    }
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
      renderValid,
    } = this

    if (!renderValid) {
      return null
    }

    const trigger = cloneVNode(getFirstValidNode(getSlotNodes($slots, 'trigger'))!, {
      ...triggerEvents,
      ref: 'triggerRef',
    })

    const overlay = getFirstValidNode(getSlotNodes($slots, 'overlay'))

    return (
      <>
        {trigger}
        <IxPortal target={`${clsPrefix}-container`}>
          <Transition name={visibleTransition}>
            {destroyOnHide ? (
              visibility && (
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
              )
            ) : (
              <div
                class={[clsPrefix, 'ix-overlay']}
                ref="overlayRef"
                v-show={visibility}
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
        </IxPortal>
      </>
    )
  },
})
