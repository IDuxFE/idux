<template>
  <IxSpace direction="vertical">
    <IxDatePicker v-model:value="value" type="week" :format="weekFormat"></IxDatePicker>
    <IxDatePicker v-model:value="value" type="quarter" :format="quarterFormat"></IxDatePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'

import { DATE_CONFIG_TOKEN, DateConfig, useDateConfig } from '@idux/components/config'

const dateConfig = useDateConfig()
const separator = '~'
const weekFormat = 'week'
const quarterFormat = 'quarter'

const customConfig: DateConfig = {
  ...dateConfig,
  format: (date, format) => {
    if (format === weekFormat || format === quarterFormat) {
      const { format: formatFn, startOf, endOf } = dateConfig
      return `${formatFn(startOf(date, format), 'MM-dd')} ${separator} ${formatFn(endOf(date, format), 'MM-dd')}`
    }
    return dateConfig.format(date, format)
  },
  parse: (dateString, format) => {
    if (format === weekFormat || format === quarterFormat) {
      const { startOf, parse } = dateConfig
      const [start, end] = dateString.split(separator).map(item => item.trim())
      return startOf(parse(end || start, 'MM-dd'), format)
    }
    return dateConfig.parse(dateString, format)
  },
}

provide(DATE_CONFIG_TOKEN, customConfig)

const value = ref(new Date())
</script>
