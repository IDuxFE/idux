/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutSiderProps } from './types'

import { WatchStopHandle, computed, defineComponent, normalizeClass, provide, watch, watchEffect } from 'vue'

import { BREAKPOINTS_KEYS, useSharedBreakpoints } from '@idux/cdk/breakpoint'
import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { layoutSiderToken } from './token'
import { layoutSiderProps } from './types'

export default defineComponent({
  name: 'IxLayoutSider',
  props: layoutSiderProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-sider`)

    const { collapsed, setCollapsed } = useCollapsed(props)
    provide(layoutSiderToken, { collapsed, setCollapsed })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value,
      })
    })

    return () => {
      return <aside class={classes.value}>{slots.default?.()}</aside>
    }
  },
})

const useCollapsed = (props: LayoutSiderProps) => {
  const [collapsed, _setCollapsed] = useControlledProp(props, 'collapsed', false)

  const changeCollapsed = (collapsed: boolean, type: 'trigger' | 'breakpoint') => {
    _setCollapsed(collapsed)
    callEmit(props.onCollapse, collapsed, type)
  }

  const breakpointIndex = computed(() => {
    const { breakpoint } = props
    return breakpoint ? BREAKPOINTS_KEYS.indexOf(breakpoint) : -1
  })
  const useBreakpoint = computed(() => breakpointIndex.value > -1)

  let stopBreakpoints: WatchStopHandle | undefined
  watch(
    useBreakpoint,
    breakpoint => {
      stopBreakpoints?.()

      if (breakpoint) {
        const breakpoints = useSharedBreakpoints()
        stopBreakpoints = watchEffect(() => {
          const currBreakpointIndex = BREAKPOINTS_KEYS.findIndex(key => breakpoints[key])
          changeCollapsed(currBreakpointIndex <= breakpointIndex.value, 'breakpoint')
        })
      }
    },
    { immediate: true },
  )

  const setCollapsed = (collapsed: boolean) => {
    changeCollapsed(collapsed, 'trigger')
  }

  return { collapsed, setCollapsed }
}
