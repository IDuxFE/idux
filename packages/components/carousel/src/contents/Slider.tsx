/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { carouselToken } from '../token'

export default defineComponent({
  props: { isActive: { type: Boolean, required: true }, index: { type: Number, required: true } },
  setup(props, { slots }) {
    const { mergedPrefixCls, unitWidth, unitHeight } = inject(carouselToken)!

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-slider`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-active`]: props.isActive,
      })
    })

    const style = computed(() => {
      const width = unitWidth.value
      const height = unitHeight.value
      if (width <= 0 || height <= 0) {
        return undefined
      }
      return `position: relative;width: ${width}px;height: ${height}px;`
    })

    return () => {
      return (
        <div class={classes.value} style={style.value}>
          {slots.default!()}
        </div>
      )
    }
  },
})
