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
import { OverlayPlacementPropDef, OverlayTriggerPropDef, useOverlay } from '@idux/cdk/overlay'
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
    placement: OverlayPlacementPropDef,
    visible: PropTypes.bool,
    trigger: OverlayTriggerPropDef,
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
    const { children, clsPrefix, useTitle, hasTitle, beDestroyed, visibility, hide, options } = this
    if (!children) {
      return null
    }
    if (!hasTitle) {
      return children
    }

    let trigger: VNode
    if (options.trigger === 'click') {
      trigger = withDirectives(cloneVNode(children, { ref: 'triggerRef' }), [
        [resolveDirective('click-outside')!, () => hide()],
      ])
    } else {
      trigger = cloneVNode(children, { ref: 'triggerRef' })
    }

    return (
      <>
        {trigger}
        <IxPortal target={`${clsPrefix}-container`}>
          <Transition name="ix-fade-fast">
            <div v-show={visibility} class={clsPrefix} ref="overlayRef">
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
