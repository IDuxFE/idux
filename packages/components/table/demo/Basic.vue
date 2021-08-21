<template>
  <ix-table :columns="columns" :dataSource="data">
    <template #nameTitle="{ title }">
      <ix-icon name="star"></ix-icon>
      <span> {{ title }}</span>
    </template>
    <template #nameRender="{ value }">
      <a>{{ value }}</a>
    </template>
    <template #customExpand="{ record }">
      <p>{{ record.name }}</p>
    </template>
  </ix-table>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { TableColumn, TableColumnRenderOption } from '@idux/components/table'
import { IxTag } from '@idux/components/tag'
import { IxSpace } from '@idux/components/space'

interface Data {
  id: string
  name: string
  age: number
  address: string
  tags: string[]
  children?: Data[]
}

const columns: TableColumn<Data>[] = [
  { type: 'selectable', onChange: console.log, disabled: record => !!record.children },
  { type: 'expandable' },
  {
    title: 'Name',
    dataKey: 'name',
    customRender: 'nameRender',
    customTitle: 'nameTitle',
  },
  {
    title: 'Age',
    dataKey: 'age',
  },
  {
    title: 'Address',
    dataKey: 'address',
  },
  {
    title: 'Tags',
    dataKey: 'tags',
    customRender: ({ value }: TableColumnRenderOption<Data['tags'], Data>) =>
      value.map(tag => {
        let color = tag.length > 5 ? 'warning' : 'success'
        if (tag === 'loser') {
          color = 'error'
        }
        return h(IxTag, { color }, { default: () => tag.toUpperCase() })
      }),
  },
  {
    title: 'Action',
    key: 'action',
    customRender: ({ record }) =>
      h(IxSpace, null, { default: () => [h('a', `Invite ${record.name}`), h('a', `Delete`)] }),
  },
]
const data: Data[] = []
for (let index = 0; index < 100; index++) {
  let children: Data[] | undefined
  if (index % 3 !== 0) {
    children = []
    for (let j = 0; j < 3; j++) {
      children.push({
        id: `${index}-${j}`,
        name: `name ${index}-${j}`,
        age: index,
        address: `New York No. ${index}-${j} Lake Park`,
        tags: [],
      })
    }
  }

  data.push({
    id: `${index}`,
    name: `name ${index}`,
    age: index,
    address: `New York No. ${index} Lake Park`,
    tags: ['nice', 'developer'],
    children,
  })
}
</script>
