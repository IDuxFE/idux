<template>
  <IxTable v-model:expandedRowKeys="expandedRowKeys" :dataSource="data" :pagination="false">
    <IxTableColumn type="expandable" :disabled="expandDisabled" @change="onExpandChange">
      <template #expand="{ record }">
        <span>{{ record.description }}</span>
      </template>
    </IxTableColumn>
    <IxTableColumn title="Name" dataKey="name">
      <template #cell="{ value }">
        <a>{{ value }}</a>
      </template>
    </IxTableColumn>
    <IxTableColumn title="Age" dataKey="age"></IxTableColumn>
    <IxTableColumn title="Address" dataKey="address"></IxTableColumn>
  </IxTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Data {
  key: number
  name: string
  age: number
  address: string
  description?: string
}

const expandedRowKeys = ref([1])
const expandDisabled = (record: Data) => !record.description
const onExpandChange = (expendedRowKeys: number[]) => console.log(expendedRowKeys)

const data: Data[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 4,
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
]
</script>
