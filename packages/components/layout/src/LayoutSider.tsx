/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutSiderCollapseType, LayoutSiderProps } from './types'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, ref, watch } from 'vue'

import { isUndefined } from 'lodash-es'

import { BREAKPOINTS, useBreakpoints } from '@idux/cdk/breakpoint'
import { callEmit, hasSlot } from '@idux/cdk/utils'

import Trigger from './Trigger'
import { layoutSiderProps } from './types'

export default defineComponent({
  name: 'IxLayoutHeader',
  props: layoutSiderProps,
  setup(props, { slots }) {
    const isDefinedBreakPoint = computed(() => {
      return !isUndefined(props.breakpoint)
    })

    const hasTriggerSlot = hasSlot(slots, 'trigger')
    const { isCollapsed, handleClick } = useCollapsed(props, isDefinedBreakPoint, hasTriggerSlot)

    const style = computed(() => {
      return {
        width: isCollapsed.value ? `${Math.min(props.width, props.collapsedWidth)}px` : `${props.width}px`,
      }
    })

    const classes = computed(() => {
      return {
        'ix-layout-sider': true,
        'ix-layout-sider-end': props.placement === 'end',
        'ix-layout-sider-collapsed': isCollapsed.value,
      }
    })

    return () => {
      const trigger =
        props.showTrigger &&
        (slots.trigger ? slots.trigger() : <Trigger collapsed={isCollapsed.value} onClick={handleClick} />)
      return (
        <aside class={classes.value} style={style.value}>
          <div class="ix-layout-sider-children">{slots.default?.()}</div>
          {trigger}
        </aside>
      )
    }
  },
})

const useCollapsed = (props: LayoutSiderProps, isDefinedBreakPoint: ComputedRef<boolean>, hasTriggerSlot: boolean) => {
  const isCollapsed = ref(props.collapsed)
  let handleClick = () => {}

  const changeCollapsed = (collapsed: boolean, type: LayoutSiderCollapseType) => {
    isCollapsed.value = collapsed
    callEmit(props['onUpdate:collapsed'], collapsed)
    callEmit(props.onCollapse, collapsed, type)
  }

  if (isDefinedBreakPoint.value) {
    const matchBreakpointsMaxWidth = props.breakpoint && BREAKPOINTS[props.breakpoint]?.match(/\(max-width.*\)/)?.[0]
    const breakpointsState = matchBreakpointsMaxWidth && useBreakpoints(matchBreakpointsMaxWidth)

    watch(
      () => breakpointsState && breakpointsState.matches,
      value => {
        changeCollapsed(value as boolean, 'breakpoint')
      },
      {
        // When breakpoint and collapsed exist at the same time, the breakpoint value takes precedence
        immediate: true,
      },
    )
  }

  handleClick = () => {
    changeCollapsed(!isCollapsed.value, 'trigger')
  }

  if (hasTriggerSlot) {
    watch(
      () => props.collapsed,
      value => {
        changeCollapsed(value!, 'trigger')
      },
    )
  }

  return {
    isCollapsed,
    handleClick,
  }
}
