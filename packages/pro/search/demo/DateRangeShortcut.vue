<template>
  <IxProSearch
    v-model:value="value"
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
    :onSearch="onSearch"
  ></IxProSearch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useDateConfig } from '@idux/components/config'
import { RangeShortcut, getPresetRangeShortcutValue } from '@idux/components/date-picker'
import { SearchField, SearchValue } from '@idux/pro/search'

const dateConfig = useDateConfig()

const oneDayDuration = 24 * 60 * 60 * 1000

const now = new Date()
const nowValue = now.valueOf()
const _30daysAgo = new Date(nowValue - oneDayDuration * 30)

const last30dValue = getPresetRangeShortcutValue(dateConfig, 'last30d')

const shortcuts: RangeShortcut[] = [
  'today',
  'yesterday',
  'last24h',
  'last7d',
  'last30d',
  'last180d',
  {
    key: 'lastMonth',
    value: [_30daysAgo, now],
    label: 'Last month',
    selectedLabel: 'Last month',
  },
  'custom',
]

const value = ref<SearchValue[]>([
  {
    key: 'date_range',
    value: last30dValue(),
  },
])
const searchFields: SearchField[] = [
  {
    type: 'datePicker',
    label: 'Date',
    key: 'date',
    fieldConfig: {
      type: 'datetime',
    },
  },
  {
    type: 'dateRangePicker',
    label: 'Date Range',
    key: 'date_range',
    fieldConfig: {
      type: 'datetime',
      shortcuts,
    },
  },
]

const onChange = (value: SearchValue[] | undefined, oldValue: SearchValue[] | undefined) => {
  console.log(value, oldValue)
}
const onSearch = () => {
  console.log('onSearch')
}
</script>

<style scoped lang="less"></style>
