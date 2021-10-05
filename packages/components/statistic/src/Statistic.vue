<template>
  <div :class="`${prefixCls}-statistic`">
    <div v-if="title || $slots.title" :class="`${prefixCls}-statistic-title`">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="`${prefixCls}-statistic-content`">
      <span v-if="prefix || $slots.prefix" :class="`${prefixCls}-statistic-content-prefix`">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span :class="`${prefixCls}-statistic-content-value`">
        <slot>
          <span :class="`${prefixCls}-statistic-content-value-int`">{{
            formatedValue.int || formatedValue.value
          }}</span>
          <span v-if="formatedValue.decimal" :class="`${prefixCls}-statistic-content-value-decimal`">
            {{ formatedValue.decimal }}
          </span>
        </slot>
      </span>
      <span v-if="suffix || $slots.suffix" :class="`${prefixCls}-statistic-content-suffix`">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import type { StatisticConfig } from '@idux/components/config'
import type { StatisticProps } from './types'

import { computed, defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { statisticProps } from './types'

export default defineComponent({
  name: 'IxStatistic',
  props: statisticProps,
  setup(props) {
    const { prefixCls } = useGlobalConfig('common')
    const statisticConfig = useGlobalConfig('statistic')
    const formatedValue = useFomat(props, statisticConfig)

    return {
      prefixCls,
      formatedValue,
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
</script>
