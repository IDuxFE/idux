/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, ref } from 'vue'

import { isObject } from 'lodash-es'

import ProgressInfo from './ProgressInfo'
import { progressContext } from './tokens'
import { handleGradient } from './util'

export default defineComponent({
  name: 'IxProgressLine',
  setup(_, { slots }) {
    const { props, mergedPrefixCls, mergedSize, mergedStrokeLinecap, percent, successPercent } =
      inject(progressContext)!

    const lineMergedPrefixCls = computed(() => `${mergedPrefixCls.value}-line`)

    const elementRef = ref<HTMLDivElement>()
    const classes = computed(() => {
      const prefixCls = lineMergedPrefixCls.value

      return {
        [prefixCls]: true,
        [`${prefixCls}-${mergedSize.value}`]: true,
        [`${prefixCls}-round`]: mergedStrokeLinecap.value === 'round',
      }
    })
    const innerStyle = computed(() => ({
      background: props.trailColor,
    }))
    const successStyle = computed(() => ({
      height: `${props.strokeWidth}px`,
      width: `${successPercent.value}%`,
      background: props.success?.strokeColor,
    }))
    const bgStyle = computed(() => ({
      height: `${props.strokeWidth}px`,
      width: `${percent.value}%`,
      background: isObject(props.strokeColor) ? handleGradient(props.strokeColor, elementRef.value) : props.strokeColor,
    }))

    return () => {
      const prefixCls = lineMergedPrefixCls.value

      return (
        <div ref={elementRef} class={classes.value}>
          <div class={`${prefixCls}-outer`}>
            <div class={`${prefixCls}-inner`} style={innerStyle.value}>
              {!!successPercent.value && <div class={`${prefixCls}-success-bg`} style={successStyle.value}></div>}
              <div class={`${prefixCls}-bg`} style={bgStyle.value}></div>
            </div>
          </div>
          <ProgressInfo v-slots={slots} />
        </div>
      )
    }
  },
})
