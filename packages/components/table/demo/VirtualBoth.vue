<template>
  <IxTable
    :columns="columns"
    :dataSource="data"
    :pagination="false"
    virtual
    virtualHorizontal
    :scroll="scroll"
    :virtualColWidth="150"
  >
  </IxTable>
</template>

<script lang="ts" setup>
import { h } from 'vue'

import { TableColumn } from '@idux/components/table'
import { IxText } from '@idux/components/text'

interface Data {
  key: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any
}

const columns: TableColumn<Data>[] = []

const columnCount = 1000
const rowCount = 1000

const customCell = ({ value }: { value: string }) => {
  return h(IxText, { ellipsis: true, tooltip: 'native' }, () => value)
}
for (let index = 0; index < columnCount; index++) {
  const key = `column${index}`
  columns.push({
    title: key,
    dataKey: key,
    width: index % 2 === 1 ? 150 : 170,
    fixed: index === 0 ? 'start' : index === columnCount - 1 ? 'end' : undefined,
    customCell,
  })
}

const data: Data[] = []
for (let index = 0; index < rowCount; index++) {
  const item: Data = { key: index }

  for (let colIndex = 0; colIndex < columnCount; colIndex++) {
    item[`column${colIndex}`] = `row-${index} col-${colIndex} hahahahahahahahahahah`
  }

  data.push(item)
}

const scroll = { height: 800 }
</script>
