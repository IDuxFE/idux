<template>
  <div class="demo-shortcut-date-picker__wrapper">
    <IxDateRangePicker
      v-model:value="dateValue"
      style="width: 280px"
      clearable
      class="shortcut-date-picker-picker"
      :shortcuts="{ showPanel: false, shortcuts }"
      allow-input="overlay"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useDateConfig } from '@idux/components/config'
import { RangeShortcut, getPresetRangeShortcutValue } from '@idux/components/date-picker'

const dateConfig = useDateConfig()

const oneDayDuration = 24 * 60 * 60 * 1000

const now = new Date()
const nowValue = now.valueOf()
const _30daysAgo = new Date(nowValue - oneDayDuration * 30)

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
    label: '近1个月',
    selectedLabel: '近1个月',
  },
  'custom',
]

const last30dValue = getPresetRangeShortcutValue(dateConfig, 'last30d')

const dateValue = ref<Date[] | undefined>(last30dValue())
</script>
