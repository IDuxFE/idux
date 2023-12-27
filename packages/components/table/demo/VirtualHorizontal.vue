<template>
  <IxTable :columns="columns" :dataSource="data" :pagination="false" virtualHorizontal :virtualColWidth="150">
  </IxTable>
</template>

<script lang="ts" setup>
import { TableColumn } from '@idux/components/table'

interface Data {
  key: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any
}

const columns: TableColumn<Data>[] = []

const columnCount = 100

for (let index = 0; index < columnCount; index++) {
  const key = `column${index}`
  columns.push({
    title: key,
    dataKey: key,
    width: index % 2 === 1 ? 150 : 170,
  })
}

const data: Data[] = []
for (let index = 0; index < 8; index++) {
  const item: Data = { key: index }

  for (let colIndex = 0; colIndex < columnCount; colIndex++) {
    item[`column${colIndex}`] = `row-${index} col-${colIndex}`
  }

  data.push(item)
}
</script>
