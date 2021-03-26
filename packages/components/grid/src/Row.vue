<template>
  <div :class="classes" :style="rowStyle"><slot></slot></div>
</template>
<script lang="ts">
import type { RowConfig } from '@idux/components/config'
import type { Ref, ComputedRef, CSSProperties } from 'vue'
import type { RowProps } from './types'
import type { ScreenMatch } from '@idux/cdk/breakpoint'

import { defineComponent, watchEffect, ref, computed, provide } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { observeBreakpoint, Breakpoints, convertMediaToScreen } from '@idux/cdk/breakpoint'
import { haveBreakpointGutter, normalizeGutter, gutterToken } from './gutter'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  name: 'IxRow',
  props: {
    align: PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch'] as const),
    justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between'] as const),
    gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]).def(0),
    warp: PropTypes.bool,
  },
  setup(props: RowProps) {
    const rowConfig = useGlobalConfig('row')

    const screens = ref<ScreenMatch>({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
    })

    watchScreenBreakpoints(props, screens)

    const classes = useClasses(props, rowConfig)
    const gutter = useGutter(props, screens)
    const rowStyle = useRowStyle(gutter)

    provide(gutterToken, gutter)

    return {
      classes,
      rowStyle,
    }
  },
})

function watchScreenBreakpoints(props: RowProps, screens: Ref<ScreenMatch>) {
  const layoutChanges = observeBreakpoint(Object.values(Breakpoints))
  watchEffect(() => {
    if (haveBreakpointGutter(props.gutter)) {
      screens.value = convertMediaToScreen(layoutChanges.value.breakpoints)
    }
  })
}

function useClasses(props: RowProps, config: RowConfig) {
  return computed(() => {
    const row = 'ix-row'
    return {
      [row]: true,
      [`${row}-no-wrap`]: (props.wrap ?? config.wrap) === false,
      [`${row}-${props.justify}`]: props.justify,
      [`${row}-${props.align}`]: props.align,
    }
  })
}

function useGutter(props: RowProps, screens: Ref<ScreenMatch>) {
  return computed(() => {
    return normalizeGutter(props.gutter, screens)
  })
}

function useRowStyle(gutter: ComputedRef<[number, number]>) {
  return computed(() => {
    const style: CSSProperties = {}
    const horizontalGutter = gutter.value[0]
    const verticalGutter = gutter.value[1]

    if (horizontalGutter > 0) {
      style.marginLeft = `${horizontalGutter / -2}px`
      style.marginRight = style.marginLeft
    }
    if (verticalGutter > 0) {
      style.marginTop = `${verticalGutter / -2}px`
      style.marginBottom = style.marginTop
    }

    return style
  })
}
</script>
