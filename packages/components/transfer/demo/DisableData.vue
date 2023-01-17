<template>
  <IxSpace vertical>
    <IxTransfer v-model:value="targetKeys" :data-source="dataSource" :disabled="disabled" :disable-data="disableData" />
  </IxSpace>
</template>

<script setup lang="ts">
import type { TransferData } from '@idux/components/transfer'

import { ref } from 'vue'

interface Data extends TransferData {
  key: number
  value: number
  label: string
  customDisabled: boolean
}

const targetKeys = ref<number[]>([])

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  customDisabled: [1, 6].includes(idx),
  disabled: idx === 10,
}))

const disabled = ref(false)
const disableData = (data: Data) => !!data.customDisabled
</script>
