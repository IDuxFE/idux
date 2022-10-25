<template>
  <IxTransfer v-model:value="targetKeys" :data-source="dataSource" :disabled="disabled">
    <template
      #operations="{
        triggerAppend,
        triggerRemove,
        triggerAppendAll,
        triggerClear,
        appendDisabled,
        removeDisabled,
        appendAllDisabled,
        clearDisabled,
      }"
    >
      <div class="demo-transfer-custom-operations__operations">
        <IxButton
          class="demo-transfer-custom-operations__operations-btn"
          size="xs"
          :disabled="appendAllDisabled"
          :onClick="() => triggerAppendAll()"
          >all</IxButton
        >
        <IxButton
          class="demo-transfer-custom-operations__operations-btn"
          size="xs"
          :disabled="appendDisabled"
          :onClick="() => triggerAppend()"
          >append</IxButton
        >
        <IxButton
          class="demo-transfer-custom-operations__operations-btn"
          size="xs"
          :disabled="removeDisabled"
          :onClick="() => triggerRemove()"
          >remove</IxButton
        >
        <IxButton
          class="demo-transfer-custom-operations__operations-btn"
          size="xs"
          :disabled="clearDisabled"
          :onClick="() => triggerClear()"
          >clear</IxButton
        >
      </div>
    </template>
  </IxTransfer>
</template>

<script setup lang="ts">
import type { TransferData } from '@idux/components/transfer'

import { ref } from 'vue'

interface Data extends TransferData {
  key: number
  value: number
  label: string
}

const targetKeys = ref<number[]>(Array.from(new Array(10)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  disabled: [1, 6, 12, 16].includes(idx),
}))

const disabled = ref(false)
</script>
<style lang="less">
.demo-transfer-custom-operations__operations {
  height: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-btn {
    width: 40px;

    & + & {
      margin-top: 8px;
    }
  }
}
</style>
