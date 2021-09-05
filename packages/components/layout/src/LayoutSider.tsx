import { watch } from 'vue'
import type { LayoutSiderProps, CollapseType } from './types'

import { computed, defineComponent, ref } from 'vue'
import { layoutSiderProps } from './types'
import { BREAKPOINTS, useBreakpoints } from '@idux/cdk/breakpoint'
import { callEmit, hasSlot } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { isUndefined } from 'lodash-es'

export default defineComponent({
  name: 'IxLayoutHeader',
  props: layoutSiderProps,
  setup(props, { slots }) {
    const isDefinedBreakPoint = !isUndefined(props.breakpoint)
    const isDefinedCollapsed = !isUndefined(props.collapsed)
    const collapsible = isDefinedBreakPoint || isDefinedCollapsed

    const hasTriggerSlot =  !!props.trigger || hasSlot(slots, 'trigger')
    const { isCollapsed, handleClick} = useCollapsed(props, isDefinedBreakPoint, isDefinedCollapsed, hasTriggerSlot)

    const style = computed(() => {
      return {
        width: isCollapsed.value ? `${Math.min(props.width, props.collapsedWidth)}px` : `${props.width}px`,
      }
    })

    const classes = computed(() => {
        return {
            'ix-layout-sider': true,
            'bordered': !props.borderless,
            'right': props.direction === 'right',
            'collapsed': collapsible && isCollapsed.value,
            'collapsed-width-zero': collapsible && isCollapsed.value && props.collapsedWidth === 0
        }
    })

    return () => {
      const trigger = collapsible && (
        props.trigger ? props.trigger :
        slots.trigger ? slots.trigger() : <IxIcon class="ix-layout-sider-trigger" name="menu" onClick={handleClick} />
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

const useCollapsed = (props: LayoutSiderProps, isDefinedBreakPoint: boolean, isDefinedCollapsed: boolean, hasTriggerSlot:boolean) => {
  let isCollapsed = ref(false)
  let handleClick = () => {}

  if(isDefinedBreakPoint || isDefinedCollapsed) {
    isCollapsed = ref(props.collapsed ?? false)

    const changeCollapsed = (collapsed: boolean, type: CollapseType) => {
      isCollapsed.value = collapsed
      callEmit(props['onUpdate:collapsed'], collapsed)
      callEmit(props.onCollapse, collapsed, type)
      type === 'breakpoint' && callEmit(props.onBreakpoint, collapsed)
    }

    if(isDefinedBreakPoint) {
        const matchBreakpointsMaxWidth = props.breakpoint && BREAKPOINTS[props.breakpoint]?.match(/\(max-width.*\)/)?.[0]
        const breakpointsState = matchBreakpointsMaxWidth && useBreakpoints(matchBreakpointsMaxWidth)

        watch(
          () => breakpointsState && breakpointsState.matches,
          value => {
            changeCollapsed(value as boolean, 'breakpoint')
          },
          {
            // When breakpoint and collapsed exist at the same time, the collapsed value takes precedence
            immediate: !isDefinedCollapsed
          }
        )
      }

      handleClick = () => {
        changeCollapsed(!isCollapsed.value, 'trigger')
      }

      if(hasTriggerSlot && isDefinedCollapsed) {
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
