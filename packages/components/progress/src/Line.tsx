/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { isObject } from 'lodash-es'

import ProgressInfo from './ProgressInfo'
import { useProps } from './composables/useProps'
import { progressContext } from './tokens'
import { handleGradient } from './util'

export default defineComponent({
  name: 'IxProgressLine',
  setup() {
    const { props, config, mergedPrefixCls, percent, formattedSuccess } = inject(progressContext)!
    const computedProps = useProps(props, config)
    const lineMergedPrefixCls = computed(() => `${mergedPrefixCls.value}-line`)

    const lineClasses = computed(() => {
      const prefixCls = lineMergedPrefixCls.value

      return {
        [prefixCls]: true,
        [`${prefixCls}-${computedProps.value.size}`]: true,
        [`${prefixCls}-round`]: computedProps.value.strokeLinecap === 'round',
      }
    })
    const successStyle = computed(() => ({
      height: computedProps.value.strokeWidth && `${computedProps.value.strokeWidth}px`,
      width: `${formattedSuccess.value.percent ?? 0}%`,
      background: formattedSuccess.value.strokeColor ?? '',
    }))
    const bgStyle = computed(() => ({
      height: computedProps.value.strokeWidth && `${computedProps.value.strokeWidth}px`,
      width: `${percent.value}%`,
      background: isObject(computedProps.value.strokeColor)
        ? handleGradient(computedProps.value.strokeColor)
        : computedProps.value.strokeColor ?? '',
    }))

    return () => {
      const prefixCls = lineMergedPrefixCls.value

      return (
        <div class={lineClasses.value}>
          <div class={`${prefixCls}-outer`}>
            <div class={`${prefixCls}-inner`}>
              {computedProps.value.success?.percent && (
                <div class={`${prefixCls}-success-bg`} style={successStyle.value}></div>
              )}
              <div class={`${prefixCls}-bg`} style={bgStyle.value}></div>
            </div>
          </div>
          <ProgressInfo />
        </div>
      )
    }
  },
})
