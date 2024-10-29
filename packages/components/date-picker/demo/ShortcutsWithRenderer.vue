<template>
  <div class="demo-shortcut-date-picker__wrapper">
    <IxDateRangePicker
      v-model:value="dateValue"
      style="width: 320px"
      type="datetime"
      class="shortcut-date-picker-picker"
      :shortcuts="{ showPanel: false, shortcuts }"
      allow-input="overlay"
    >
      <template #recents="{ setBuffer }">
        <div class="demo-shortcut-date-picker__recents">
          <IxSpace vertical :size="8" class="demo-shortcut-date-picker__recents__content">
            <span>仅显示最近10次查询记录</span>
            <IxTag
              v-for="(record, idx) in recents"
              :key="idx"
              class="demo-shortcut-date-picker__recents__item"
              @click="
                () => {
                  setBuffer([new Date(record[0]), new Date(record[1])])
                }
              "
            >
              {{ record[0] }} 至 {{ record[1] }}
            </IxTag>
          </IxSpace>
          <IxDateRangePickerOverlayFooter />
        </div>
      </template>
    </IxDateRangePicker>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { RangeShortcut } from '@idux/components/date-picker'

const oneDayDuration = 24 * 60 * 60 * 1000

const now = new Date()
const nowValue = now.valueOf()
const _30daysAgo = new Date(nowValue - oneDayDuration * 30)

const recents = [
  ['2023-04-21 12:00', '2023-04-21 16:00'],
  ['2023-05-21 12:00', '2023-05-21 16:00'],
  ['2023-06-21 12:00', '2023-06-21 16:00'],
  ['2023-07-21 12:00', '2023-07-21 16:00'],
  ['2023-08-21 12:00', '2023-08-21 16:00'],
]

const shortcuts: RangeShortcut[] = [
  {
    key: 'recents',
    label: '最近访问',
    panelRenderer(context) {
      return context.slots.recents?.(context)
    },
  },
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

const dateValue = ref<Date[] | undefined>(undefined)
</script>

<style>
.demo-shortcut-date-picker__recents {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.demo-shortcut-date-picker__recents__content {
  flex: 1;
}

.demo-shortcut-date-picker__recents__item {
  cursor: pointer;
}
</style>
