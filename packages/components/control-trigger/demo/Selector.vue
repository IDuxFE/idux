<template>
  <IxControlTrigger
    v-model:open="open"
    class="demo-control-trigger-selector__trigger"
    :value="value"
    overlayMatchWidth
    clearable
  >
    <template
      #trigger="{ borderless, disabled, readonly, focused, size, status, suffix, suffixRotate, clearable, clearIcon }"
    >
      <IxSelector
        multiple
        :borderless="borderless"
        :disabled="disabled"
        :readonly="readonly"
        :focused="focused"
        placeholder="please select"
        :size="size"
        :status="status"
        :suffix="suffix"
        :suffixRotate="suffixRotate"
        :clearable="clearable"
        :clearIcon="clearIcon"
        :dataSource="selectedData"
        :onClear="onClear"
        :onItemRemove="onItemRemove"
        :maxLabel="5"
      ></IxSelector>
    </template>
    <template #overlay>
      <div class="demo-control-trigger-selector__panel">
        <IxCheckboxGroup
          v-model:value="value"
          class="demo-control-trigger-selector__inner"
          :dataSource="dataSource"
          vertical
        >
        </IxCheckboxGroup>
      </div>
    </template>
  </IxControlTrigger>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { CheckboxData } from '@idux/components/checkbox'
import { IxSelector, type SelectorData } from '@idux/components/selector'

const dataSource: CheckboxData[] = Array.from(new Array(30)).map((_, index) => ({
  key: index,
  label: `item-${index}`,
}))

const dataSourceMap = new Map<number, CheckboxData>(dataSource.map(data => [data.key as number, data]))

const open = ref(false)
const value = ref<number[] | undefined>()
const selectedData = computed(() => value.value?.map(key => dataSourceMap.get(key) as SelectorData))

const onClear = () => {
  value.value = undefined
}
const onItemRemove = (itemValue: number) => {
  value.value = value.value?.filter(v => v !== itemValue)
}
</script>

<style lang="less">
.demo-control-trigger-selector {
  &__trigger {
    width: 240px;
  }

  &__panel {
    padding: var(--ix-padding-size-sm);
    max-height: 300px;
    overflow-y: auto;
  }
  &__inner {
    width: 100%;
    .ix-space-item {
      width: 100%;
    }
    .ix-checkbox {
      width: 100%;
    }
  }
}
</style>
