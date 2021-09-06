import type { ComputedRef } from 'vue'
import type { LayoutSiderProps, LayoutSiderCollapseType } from './types'

import { computed, defineComponent, ref, watch } from 'vue'
import { layoutSiderProps } from './types'
import { BREAKPOINTS, useBreakpoints } from '@idux/cdk/breakpoint'
import { callEmit, hasSlot } from '@idux/cdk/utils'
import Trigger from './Trigger'
import { isUndefined } from 'lodash-es'

export default defineComponent({
  name: 'IxLayoutHeader',
  props: layoutSiderProps,
  setup(props, { slots }) {
    const isDefinedBreakPoint =  computed(()=>{
      return !isUndefined(props.breakpoint)
    })
    const isDefinedCollapsed = computed(()=>{
      return !isUndefined(props.collapsed)
    })

    const collapsible = computed(()=>{
      return isDefinedBreakPoint.value || isDefinedCollapsed.value
    })

    const hasTriggerSlot =  hasSlot(slots, 'trigger')
    const { isCollapsed, handleClick} = useCollapsed(props, isDefinedBreakPoint, isDefinedCollapsed, hasTriggerSlot)

    const style = computed(() => {
      return {
        width: isCollapsed.value ? `${Math.min(props.width, props.collapsedWidth)}px` : `${props.width}px`,
      }
    })

    const classes = computed(() => {
        return {
            'ix-layout-sider': true,
            'ix-layout-sider-end': props.placement === 'end',
            'ix-layout-sider-collapsed': collapsible.value && isCollapsed.value,
        }
    })

    return () => {
      const trigger = collapsible.value && (
        slots.trigger ? slots.trigger() : <Trigger collapsed={isCollapsed.value} onClick={handleClick} />
      )
      return (
        <aside class={classes.value} style={style.value}>
            <div class="ix-layout-sider-children">
              { slots.default?.() }
            </div>
            { trigger }
        </aside>
      )
    }
  }
})

const useCollapsed = (
  props: LayoutSiderProps, 
  isDefinedBreakPoint: ComputedRef<boolean>, 
  isDefinedCollapsed: ComputedRef<boolean>, 
  hasTriggerSlot:boolean
) => {
  let isCollapsed = ref(false)
  let handleClick = () => {}

  if(isDefinedBreakPoint.value || isDefinedCollapsed.value) {
    isCollapsed = ref(props.collapsed ?? false)

    const changeCollapsed = (collapsed: boolean, type: LayoutSiderCollapseType) => {
      isCollapsed.value = collapsed
      callEmit(props['onUpdate:collapsed'], collapsed)
      callEmit(props.onCollapse, collapsed, type)
    }

    if(isDefinedBreakPoint.value) {
        const matchBreakpointsMaxWidth = props.breakpoint && BREAKPOINTS[props.breakpoint]?.match(/\(max-width.*\)/)?.[0]
        const breakpointsState = matchBreakpointsMaxWidth && useBreakpoints(matchBreakpointsMaxWidth)

        watch(
          () => breakpointsState && breakpointsState.matches,
          value => {
            changeCollapsed(value as boolean, 'breakpoint')
          },
          {
            // When breakpoint and collapsed exist at the same time, the collapsed value takes precedence
            immediate: !isDefinedCollapsed.value
          }
        )
      }

      handleClick = () => {
        changeCollapsed(!isCollapsed.value, 'trigger')
      }

      if(hasTriggerSlot && isDefinedCollapsed.value) {
        watch(
          () => props.collapsed,
          value => {
            changeCollapsed(value!, 'trigger')
          },
        )
      }
    }

  return {
    isCollapsed,
    handleClick,
  }
}
