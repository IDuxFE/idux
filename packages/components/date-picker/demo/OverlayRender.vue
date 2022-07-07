<template>
  <IxSpace vertical>
    <IxDateRangePicker
      v-model:value="rangeValue"
      :type="pickerType"
      :overlayRender="customOverlayRender"
    ></IxDateRangePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import type { DatePickerType } from '@idux/components/date-picker'

import { type VNodeChild, h, ref } from 'vue'

import { addDays, addHours, addMonths } from 'date-fns'

const rangeValue = ref<[Date, Date] | undefined>()
const now = new Date()
const pickerType = ref<DatePickerType>('datetime')

const renderShortcut = (label: string, value: [Date, Date] | undefined, type?: DatePickerType) =>
  h(
    'li',
    {
      class: 'demo-custom-panel__overlay__shortcut',
      onClick() {
        if (value) {
          rangeValue.value = value
        }

        if (type) {
          pickerType.value = type
        }
      },
    },
    label,
  )
const customOverlayRender = (children: VNodeChild) => {
  return h(
    'div',
    {
      class: 'demo-custom-panel__overlay',
    },
    [
      h(
        'ul',
        {
          class: 'demo-custom-panel__overlay__shortcuts',
        },
        [
          renderShortcut('Last 7days', [addDays(now, -7), now]),
          renderShortcut('Last 1month', [addMonths(now, -1), now]),
          renderShortcut('Last 24hours', [addHours(now, -24), now]),
          renderShortcut('Pick Weeks', undefined, 'week'),
          renderShortcut('Pick Months', undefined, 'month'),
          renderShortcut('Pick Datetime', undefined, 'datetime'),
        ],
      ),
      h('div', [children]),
    ],
  )
}
</script>
<style lang="less">
.demo-custom-panel__overlay {
  display: flex;

  &__shortcuts {
    width: 120px;
    padding: 8px 0;
    margin-right: 16px;
    margin-left: -16px;
    margin-top: -16px;
    border-right: 1px solid #e1e5eb;
  }
  &__shortcut {
    width: 100%;
    list-style: none;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background: #f7f9fc;
      color: #1c6eff;
    }
  }
}
</style>
