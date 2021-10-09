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
import type { StatisticProps } from './types'
import type { StatisticConfig } from '@idux/components/config'

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { statisticProps } from './types'

export default defineComponent({
  name: 'IxStatistic',
  props: statisticProps,
  setup(props) {
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
