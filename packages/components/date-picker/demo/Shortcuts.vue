<template>
  <div class="demo-shortcut-date-picker__wrapper">
    <div class="shortcut-date-picker">
      <div :class="selectClass">
        <IxSelect
          class="shortcut-date-picker-select__inner"
          borderless
          :value="selectValue"
          :onUpdate:value="handleSelectValueUpdate"
          :onUpdate:open="handleSelectOpen"
          :data-source="shortcuts"
        />
      </div>
      <IxDateRangePicker
        v-model:open="open"
        class="shortcut-date-picker-picker"
        borderless
        allow-input="overlay"
        :value="dateValue"
        :onUpdate:value="handleValueUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const oneDayDuration = 24 * 60 * 60 * 1000

const now = new Date()
const nowValue = now.valueOf()
const lastDay = new Date(nowValue - oneDayDuration)
const _7daysAgo = new Date(nowValue - oneDayDuration * 7)
const _30daysAgo = new Date(nowValue - oneDayDuration * 30)
const _180daysAgo = new Date(nowValue - oneDayDuration * 180)

const shortcutsMap = {
  today: [now, now],
  lastday: [lastDay, lastDay],
  '7days': [_7daysAgo, now],
  '30days': [_30daysAgo, now],
  '180days': [_180daysAgo, now],
  custom: 'custom',
}

const shortcuts = [
  {
    key: 'today',
    value: 'today',
    label: 'today',
  },
  {
    key: 'lastday',
    value: 'lastday',
    label: 'lastday',
  },
  {
    key: '7days',
    value: '7days',
    label: '7days',
  },
  {
    key: '30days',
    value: '30days',
    label: '30days',
  },
  {
    key: '180days',
    value: '180days',
    label: '180days',
  },
  {
    key: 'custom',
    value: 'custom',
    label: 'custom',
  },
]

const selectValue = ref<keyof typeof shortcutsMap>('180days')
const dateValue = ref<Date[] | undefined>(shortcutsMap['180days'])
const open = ref(false)
const selectOpen = ref(false)
const selectClass = computed(() => {
  const prefix = 'shortcut-date-picker-select'
  return {
    [prefix]: true,
    [`${prefix}-opened`]: selectOpen.value,
  }
})

const handleSelectOpen = (open: boolean) => {
  selectOpen.value = !!open
}

const handleSelectValueUpdate = (value: keyof typeof shortcutsMap) => {
  if (value !== 'custom') {
    dateValue.value = shortcutsMap[value]
  } else {
    setTimeout(() => {
      open.value = true
    }, 100)
  }

  selectValue.value = value
}
const handleValueUpdate = (value: Date[] | undefined) => {
  dateValue.value = value
  selectValue.value = 'custom'
}
</script>
<style lang="less">
.demo-shortcut-date-picker__wrapper {
  .shortcut-date-picker {
    width: 350px;
    height: 32px;
    display: flex;
    align-items: center;
    background: #fff;
    &-select {
      width: 90px;
      height: 100%;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #d3d7de;
      background-color: #f7f9fc;
      &:hover {
        border: 1px solid #1c6eff;

        & + .shortcut-date-picker-divider {
          display: none;
        }
      }

      &-opened {
        border: 1px solid #1c6eff;

        & + .shortcut-date-picker-divider {
          display: none;
        }
      }

      &__inner {
        width: 90px;
      }
    }
    &-picker {
      flex: auto;
      border: 1px solid #d3d7de;
      border-left: 0;
      border-radius: 0 2px 2px 0;
    }
  }
}
</style>
