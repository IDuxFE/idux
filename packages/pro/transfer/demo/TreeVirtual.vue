<template>
  <IxSpace vertical>
    <IxProTransfer ref="transferRef" v-model:value="targetKeys" type="tree" virtual :data-source="dataSource" />
    <IxSpace>
      <IxButton :onClick="handleSourceScrollTo">SourceScrollTo</IxButton>
      <IxInputNumber v-model:value="sourceScrollToIdx" />
      <IxButton :onClick="handleTargetScrollTo">TargetScrollTo</IxButton>
      <IxInputNumber v-model:value="targetScrollToIdx" />
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import type { ProTransferInstance, TransferData } from '@idux/pro/transfer'

import { ref } from 'vue'

interface Data extends TransferData {
  key: string
  disabled: boolean
  label: string
  children?: Data[]
}

const targetKeys = ref<string[]>(['1-2', '1-2-1', '1-2-2'])

const dataSource: Data[] = Array.from(new Array(1000)).map((_, idx) => ({
  key: `${idx}`,
  disabled: false,
  label: `Selection-${idx}`,
  children: [
    {
      key: `${idx}-1`,
      disabled: false,
      label: `Selection-${idx}-1`,
    },
    {
      key: `${idx}-2`,
      disabled: false,
      label: `Selection-${idx}-2`,
      children: [
        {
          key: `${idx}-2-1`,
          disabled: false,
          label: `Selection-${idx}-2-1`,
        },
        {
          key: `${idx}-2-2`,
          disabled: true,
          label: `Selection-${idx}-2-2`,
        },
      ],
    },
    {
      key: `${idx}-3`,
      disabled: false,
      label: `Selection-${idx}-3`,
    },
  ],
}))

const transferRef = ref<ProTransferInstance>()
const sourceScrollToIdx = ref(0)
const targetScrollToIdx = ref(0)

const handleSourceScrollTo = () => {
  transferRef.value?.scrollTo(true, { index: sourceScrollToIdx.value })
}
const handleTargetScrollTo = () => {
  transferRef.value?.scrollTo(false, { index: targetScrollToIdx.value })
}
</script>
