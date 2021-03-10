<template>
  <div :class="classes" :style="style"><slot></slot></div>
</template>
<script lang="ts">
import type { ComputedRef, CSSProperties } from 'vue'
import type { ColProps } from './types'
import { GutterType } from './gutter'

import { inject, defineComponent, computed } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { getAllBreakpointCls, getSingleSizeCls, parseFlex } from './col'
import { gutterToken } from './gutter'

const breakpointConfig = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.shape({
    span: PropTypes.number,
    order: PropTypes.number,
    offset: PropTypes.number,
    push: PropTypes.number,
    pull: PropTypes.number,
  }).loose,
])

const singleProp = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default defineComponent({
  name: 'IxCol',
  props: {
    span: singleProp,
    order: singleProp,
    offset: singleProp,
    push: singleProp,
    pull: singleProp,
    xs: breakpointConfig,
    sm: breakpointConfig,
    md: breakpointConfig,
    lg: breakpointConfig,
    xl: breakpointConfig,
    flex: singleProp,
  },
  setup(props: ColProps) {
    const gutter = inject(gutterToken)

    const classes = useClasses(props)
    const style = useColStyle(props, gutter)

    return {
      classes,
      style,
    }
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
      const horizontalGutter = gutter.value[0]
      const verticalGutter = gutter.value[1]

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
