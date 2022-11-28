/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type WatchStopHandle, computed, defineComponent, normalizeClass, provide, watch, watchEffect } from 'vue'

import { BREAKPOINTS_KEYS, useSharedBreakpoints } from '@idux/cdk/breakpoint'
import { useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { layoutSiderToken } from './token'
import { layoutSiderProps } from './types'

export default defineComponent({
  name: 'IxLayoutSider',
  props: layoutSiderProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-sider`)

    const [collapsed, setCollapsed] = useControlledProp(props, 'collapsed', false)
    provide(layoutSiderToken, { mergedPrefixCls, collapsed, setCollapsed })

    const breakpointIndex = computed(() => {
      const { breakpoint } = props
      return breakpoint ? BREAKPOINTS_KEYS.indexOf(breakpoint) : -1
    })
    const useBreakpoint = computed(() => breakpointIndex.value > -1)
    const breakpoints = useSharedBreakpoints()

    let stopBreakpoints: WatchStopHandle | undefined
    watch(
      useBreakpoint,
      breakpoint => {
        stopBreakpoints?.()

        if (breakpoint) {
          stopBreakpoints = watchEffect(() => {
            const currBreakpointIndex = BREAKPOINTS_KEYS.findIndex(key => breakpoints[key])
            setCollapsed(currBreakpointIndex <= breakpointIndex.value, 'breakpoint')
          })
        }
      },
      { immediate: true },
    )

    let timer: number | undefined
    const setCollapsedWithDelay = (collapsed: boolean) => {
      const { pointerDelay } = props
      const [showDelay, hideDelay] = Array.isArray(pointerDelay) ? pointerDelay : [pointerDelay, pointerDelay]
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(
        () => {
          setCollapsed(collapsed, 'pointer')
          timer = undefined
        },
        collapsed ? showDelay : hideDelay,
      )
    }

    const pointerEvents = computed(() => {
      if (!props.pointer) {
        return undefined
      }
      return {
        onPointerenter: () => setCollapsedWithDelay(false),
        onPointerleave: () => setCollapsedWithDelay(true),
      }
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value,
      })
    })

    return () => (
      <aside class={classes.value} {...pointerEvents.value}>
        {slots.default?.()}
      </aside>
    )
  },
})
