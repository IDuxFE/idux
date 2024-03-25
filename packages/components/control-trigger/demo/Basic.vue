<template>
  <IxControlTrigger
    v-model:open="open"
    class="demo-control-trigger-basic__trigger"
    :value="value"
    overlayMatchWidth
    placeholder="please select"
    clearable
    :onClear="onClear"
  >
    {{ selectedLabel }}
    <template #overlay>
      <div class="demo-control-trigger-basic__panel">
        <IxRadioGroup
          v-model:value="value"
          class="demo-control-trigger-basic__inner"
          :dataSource="dataSource"
          vertical
          :onChange="onChange"
        >
        </IxRadioGroup>
      </div>
    </template>
  </IxControlTrigger>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { RadioData } from '@idux/components/radio'

const dataSource: RadioData[] = Array.from(new Array(10)).map((_, index) => ({
  key: index,
  label: `item-${index}`,
}))

const open = ref(false)
const value = ref<number | undefined>(0)
const selectedLabel = computed(() => dataSource.find(data => data.key === value.value)?.label)

const onChange = () => {
  open.value = false
}
const onClear = () => {
  value.value = undefined
}
</script>

<style lang="less">
.demo-control-trigger-basic {
  &__trigger {
    width: 240px;
  }

  &__panel {
    padding: var(--ix-padding-size-sm);
  }
  &__inner {
    width: 100%;
    .ix-space-item {
      width: 100%;
    }
    .ix-radio {
      width: 100%;
    }
  }
}
</style>
