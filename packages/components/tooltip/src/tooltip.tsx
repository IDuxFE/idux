import type { SetupContext, VNode } from 'vue'
import type { TooltipProps } from './types'

import {
  cloneVNode,
  computed,
  defineComponent,
  onMounted,
  resolveDirective,
  Transition,
  withDirectives,
  watch,
  onUpdated,
} from 'vue'
import { isUndefined, PropTypes } from '@idux/cdk/utils'
import { IxPortal } from '@idux/cdk/portal'
import { useOverlay } from '@idux/cdk/overlay'
import { clickOutside } from '@idux/cdk/click-outside'
import { useOverlayOptions } from './useOverlayOptions'
import { useChildren } from './useChildren'

export default defineComponent({
  name: 'IxTooltip',
  components: { IxPortal },
  directives: { clickOutside },
  inheritAttrs: false,
  props: {
    title: PropTypes.string,
    placement: PropTypes.oneOf([
      'auto',
      'auto-start',
      'auto-end',
      'top',
      'left',
      'bottom',
      'right',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'right-start',
      'right-end',
      'left-start',
      'left-end',
    ] as const),
    visible: PropTypes.bool,
    trigger: PropTypes.oneOf(['click', 'focus', 'hover'] as const),
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    destroyOnHide: PropTypes.bool,
    autoAdjust: PropTypes.bool,
  },
  emits: ['update:visible'],
  setup(props: TooltipProps, { attrs, emit, slots }: SetupContext) {
    const children = useChildren(slots)
    const { clsPrefix = 'ix-tooltip' } = attrs
    const options = useOverlayOptions()

    const { initialize, visibility, hide, show, ...rest } = useOverlay(options)

    const useTitle = computed(() => {
      const title = useChildren(slots, 'title') ?? props.title
      return <>{title}</>
    })

    const hasTitle = computed(() => !!useChildren(slots, 'title') || !!props.title)

    const beDestroyed = computed(() => {
      return props.destroyOnHide && !visibility.value
    })

    onMounted(initialize)

    onUpdated(() => {
      if (!isUndefined(props.visible) && props.visible !== visibility.value) {
        props.visible ? show() : hide()
      }
    })

    watch(visibility, () => {
      emit('update:visible', visibility.value)
    })

    return { children, clsPrefix, useTitle, hasTitle, beDestroyed, visibility, hide, options, ...rest }
  },
  render() {
    const {
      children,
      triggerEvents,
      clsPrefix,
      useTitle,
      hasTitle,
      overlayEvents,
      beDestroyed,
      visibility,
      hide,
      options,
    } = this
    if (!children) {
      return null
    }
    if (!hasTitle) {
      return children
    }

    let trigger: VNode
    if (options.trigger === 'click') {
      trigger = withDirectives(cloneVNode(children, { ...triggerEvents, ref: 'triggerRef' }), [
        [resolveDirective('click-outside')!, () => hide()],
      ])
    } else {
      trigger = cloneVNode(children, { ...triggerEvents, ref: 'triggerRef' })
    }
    return (
      <>
        {trigger}
        <IxPortal target={`${clsPrefix}-container`}>
          <Transition name="ix-fade-fast">
            <div
              v-show={visibility}
              class={clsPrefix}
              ref="overlayRef"
              onMouseenter={overlayEvents.onMouseenter}
              onMouseleave={overlayEvents.onMouseleave}
              onClick={overlayEvents.onClick}
            >
              {!beDestroyed && (
                <div class={`${clsPrefix}-content`} role="tooltip">
                  {useTitle}
                </div>
              )}
              <div class={`${clsPrefix}-arrow`} ref="arrowRef">
                <span class={`${clsPrefix}-arrow-inner`} />
              </div>
            </div>
          </Transition>
        </IxPortal>
      </>
    )
  },
})
