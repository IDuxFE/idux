<template>
  <div :class="classes" :style="style"><slot></slot></div>
</template>
<script lang="ts">
import type { ComputedRef, CSSProperties } from 'vue'
import type { ColProps } from './types'
import type { GutterType } from './gutter'

import { inject, defineComponent, computed } from 'vue'
import { getAllBreakpointCls, getSingleSizeCls, parseFlex } from './col'
import { gutterToken } from './gutter'
import { colPropsDef } from './types'

export default defineComponent({
  name: 'IxCol',
  props: colPropsDef,
  setup(props: ColProps) {
    const gutter = inject(gutterToken)

    const classes = useClasses(props)
    const style = useColStyle(props, gutter)

    return { classes, style }
  },
})

function useClasses(props: ColProps) {
  return computed(() => {
    const col = `ix-col`
    const allBreakpointCls = getAllBreakpointCls(col, props)

    return {
      [col]: true,
      ...getSingleSizeCls(col, '', props),
      ...allBreakpointCls,
    }
  })
}

function useColStyle(props: ColProps, gutter: ComputedRef<GutterType> | undefined) {
  return computed(() => {
    const style: CSSProperties = {}

    if (gutter) {
      const [horizontalGutter, verticalGutter] = gutter.value
      if (horizontalGutter > 0) {
        style.paddingLeft = `${horizontalGutter / 2}px`
        style.paddingRight = style.paddingLeft
      }
      if (verticalGutter > 0) {
        style.paddingTop = `${verticalGutter / 2}px`
        style.paddingBottom = style.paddingTop
      }
    }
    if (props.flex) {
      style.flex = parseFlex(props.flex)
    }

    return style
  })
}
</script>
