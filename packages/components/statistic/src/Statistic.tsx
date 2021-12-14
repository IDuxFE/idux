/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { StatisticProps } from './types'
import type { StatisticConfig } from '@idux/components/config'

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { statisticProps } from './types'

export default defineComponent({
  name: 'IxStatistic',
  props: statisticProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-statistic`)
    const statisticConfig = useGlobalConfig('statistic')
    const formatedValue = useFomat(props, statisticConfig)

    return () => {
      const prefixCls = mergedPrefixCls.value
      const { title, prefix, suffix } = props
      const titleNode = (title ?? slots.title) && <div class={`${prefixCls}-title`}>{slots.title?.() ?? title}</div>
      const prefixNode = (prefix ?? slots.prefix) && (
        <span class={`${prefixCls}-content-prefix`}>{slots.prefix?.() ?? prefix}</span>
      )
      const suffixNode = (suffix ?? slots.suffix) && (
        <span class={`${prefixCls}-content-suffix`}>{slots.suffix?.() ?? suffix}</span>
      )
      return (
        <div class={prefixCls}>
          {titleNode}
          <div class={`${prefixCls}-content`}>
            {prefixNode}
            <span class={`${prefixCls}-content-value`}>
              {slots.default?.() ?? (
                <>
                  <span class={`${prefixCls}-content-value-int`}>
                    {formatedValue.value.int || formatedValue.value.value}
                  </span>
                  {formatedValue.value.decimal && (
                    <span class={`${prefixCls}-content-value-decimal`}> {formatedValue.value.decimal} </span>
                  )}
                </>
              )}
            </span>
            {suffixNode}
          </div>
        </div>
      )
    }
  },
})

const useFomat = (props: StatisticProps, config: StatisticConfig) => {
  return computed(() => {
    const precision = props.precision || config.precision
    const formatter = props.formatter || config.formatter
    return formatter(props.value, precision)
  })
}
