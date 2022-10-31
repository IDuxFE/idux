<template>
  <IxProTransfer
    :value="targetKeys"
    type="table"
    :scroll="{ width: { source: 500 } }"
    mode="immediate"
    :data-source="dataSource"
    :table-props="tableProps"
    :on-change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { TableColumn } from '@idux/components/table'

interface Data {
  key: number
  disabled: boolean
  name: string
  age: number
  address: string
}

const maxSelectedCount = 10

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

const targetKeys = ref<number[]>([])
const dataSource = ref<Data[]>(
  Array.from(new Array(20)).map((_, idx) => ({
    key: idx,
    disabled: false,
    name: 'Candidate' + idx,
    age: idx,
    address: 'London No.1 Lake Park',
  })),
)

const handleChange = (keys: number[] | undefined, oldKeys: number[] | undefined) => {
  const _targetKeys = keys?.slice(0, maxSelectedCount) ?? []

  if (_targetKeys.length === maxSelectedCount) {
    dataSource.value.forEach(item => {
      item.disabled = !_targetKeys.includes(item.key)
    })
  } else if (oldKeys?.length === maxSelectedCount) {
    dataSource.value.forEach(item => {
      item.disabled = false
    })
  }

  targetKeys.value = _targetKeys
}
</script>
