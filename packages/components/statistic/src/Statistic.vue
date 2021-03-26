<template>
  <div class="ix-statistic">
    <div v-if="title || $slots.title" class="ix-statistic-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="ix-statistic-content">
      <span v-if="prefix || $slots.prefix" class="ix-statistic-content-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="ix-statistic-content-value">
        <slot>
          <span class="ix-statistic-content-value-int">{{ formatedValue.int || formatedValue.value }}</span>
          <span v-if="formatedValue.decimal" class="ix-statistic-content-value-decimal">
            {{ formatedValue.decimal }}
          </span>
        </slot>
      </span>
      <span v-if="suffix || $slots.suffix" class="ix-statistic-content-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { StatisticProps } from './types'
import { PropTypes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import type { StatisticConfig } from '@idux/components/config'

export default defineComponent({
  name: 'IxStatistic',
  props: {
    formatter: PropTypes.func,
    precision: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).def(''),
  },
  setup(props: StatisticProps) {
    const statisticConfig = useGlobalConfig('statistic')
    const formatedValue = useFomat(props, statisticConfig)

    return {
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
