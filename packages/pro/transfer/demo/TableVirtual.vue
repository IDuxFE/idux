<template>
  <IxSpace vertical>
    <IxProTransfer
      ref="transferRef"
      v-model:value="targetKeys"
      type="table"
      virtual
      :data-source="dataSource"
      :table-props="tableProps"
      :scroll="{ width: { source: 600 } }"
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
import type { TableColumn } from '@idux/components/table'
import type { ProTransferInstance, TransferData } from '@idux/pro/transfer'

import { ref } from 'vue'

interface Data extends TransferData {
  key: number
  disabled: boolean
  name: string
  age: number
  address: string
}

const sourceColumns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
  },
  {
    title: 'Address',
    dataKey: 'address',
  },
]

const targetColumns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
  },
]

const tableProps = {
  sourceColumns,
  targetColumns,
}

const targetKeys = ref<number[]>(Array.from(new Array(500)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(1000)).map((_, idx) => ({
  key: idx,
  disabled: [1, 6, 12, 16].includes(idx),
  name: 'Candidate' + idx,
  age: idx,
  address: 'London No.1 Lake Park',
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
