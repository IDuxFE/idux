<template>
  <IxSpace vertical>
    <IxTransfer v-model:value="selectedKeys" :data-source="dataSource" :disabled="disabled" mode="immediate" />
    <IxSpace align="center">
      <label>disabled:</label>
      <IxSwitch v-model:checked="disabled" />
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import type { TransferData } from '@idux/components/transfer'

import { ref } from 'vue'

interface Data extends TransferData {
  key: number
  value: number
  label: string
}

const selectedKeys = ref<number[]>(Array.from(new Array(10)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  disabled: [1, 6, 12, 16].includes(idx),
}))

const disabled = ref(false)
</script>
