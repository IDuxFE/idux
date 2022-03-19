<template>
  <IxSpace vertical>
    <IxTransfer
      ref="transferRef"
      v-model:value="selectedKeys"
      :data-source="dataSource"
      virtual
      :scroll="{ height: 300, fullHeight: false }"
    />
    <IxSpace>
      <IxButton :onClick="handleSourceScrollTo">SourceScrollTo</IxButton>
      <IxInputNumber v-model:value="sourceScrollToIdx" />
      <IxButton :onClick="handleTargetScrollTo">TargetScrollTo</IxButton>
      <IxInputNumber v-model:value="targetScrollToIdx" />
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import type { TransferInstance } from '@idux/components/transfer'

import { ref } from 'vue'

interface Data {
  key: number
  value: number
  label: string
}

const selectedKeys = ref<number[]>(Array.from(new Array(1000)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(2000)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  disabled: [1, 6, 12, 16, 1001, 1006, 1012, 1016].includes(idx),
}))

const transferRef = ref<TransferInstance>()
const sourceScrollToIdx = ref(0)
const targetScrollToIdx = ref(0)

const handleSourceScrollTo = () => {
  transferRef.value?.scrollTo({ index: sourceScrollToIdx.value }, true)
}
const handleTargetScrollTo = () => {
  transferRef.value?.scrollTo({ index: targetScrollToIdx.value }, false)
}
</script>
