<template>
  <IxTable
    class="custom-additional-demo-table"
    :columns="columns"
    :customAdditional="customAdditional"
    :dataSource="data"
    :pagination="false"
  >
    <template #name="{ value }">
      <IxButton mode="link">{{ value }}</IxButton>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { TableColumn, TableCustomAdditional } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  address: string
}

const customAdditional: TableCustomAdditional<Data> = {
  bodyCell: ({ record }) => {
    return {
      class: 'custom-class',
      onClick: () => console.log('cell click', record.key),
    }
  },
  bodyRow: ({ record, rowIndex }) => {
    return {
      class: (rowIndex + 1) % 2 === 0 ? 'even-row' : 'odd-row',
      onClick: () => console.log('row click', record.key),
    }
  },
}

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    customCell: 'name',
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

const data: Data[] = []
for (let index = 0; index < 4; index++) {
  data.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + index,
    address: `London Park no. ${index}`,
  })
}
</script>

<style scoped lang="less">
.custom-additional-demo-table {
  :deep(.even-row) td {
    background-color: #fafafa;
  }
  :deep(.odd-row) td {
    background-color: #fff;
  }
}
</style>
