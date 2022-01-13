<template>
  <IxTable :columns="columns" :dataSource="data">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
    <template #action="{ record }">
      <a style="margin-right: 8px">Invite {{ record.name }}</a>
      <a>Delete</a>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { h } from 'vue'

import { TableColumn } from '@idux/components/table'
import { IxTag } from '@idux/components/tag'

interface Data {
  key: string
  eventName: string
  desc: string
  cnt: number
  tags: string[]
  children?: Data[]
}

const columns: TableColumn<Data>[] = [
  {
    type: 'selectable',
  },
  {
    width: 400,
    type: 'expandable',
    indent: 10,
    title: 'Event Name',
    dataKey: 'eventName',
    slots: { cell: 'name' },
  },
  {
    title: 'Description',
    dataKey: 'desc',
  },
  {
    title: 'Count',
    dataKey: 'cnt',
    align: 'end',
    sortable: {
      sorter: (curr, next) => curr.cnt - next.cnt,
    },
  },
  {
    title: 'Tags',
    dataKey: 'tags',
    slots: {
      cell: ({ value }) =>
        value.map((tag: string) => {
          let color = tag.length > 5 ? 'warning' : 'success'
          if (tag === 'attack' || tag === 'damage') {
            color = 'error'
          }
          return h(IxTag, { color }, { default: () => tag.toUpperCase() })
        }),
    },
    filterable: {
      menus: [
        { key: 'attack', label: 'Attack' },
        { key: 'damage', label: 'Damage' },
        { key: 'infiltrate', label: 'Infiltrate' },
      ],
      filter: (tags, record) => {
        return tags.some(tag => record.tags.includes(tag as string))
      },
    },
  },
  {
    title: 'Action',
    key: 'action',
    slots: { cell: 'action' },
  },
]

const data: Data[] = [
  {
    key: '1',
    eventName: 'event A',
    desc: 'this is event A',
    cnt: 3,
    tags: ['attack', 'system', 'creater'],
    children: [
      {
        key: '1-1',
        eventName: 'sub event A1',
        desc: 'this is sub event A1',
        cnt: 8,
        tags: ['infiltrate'],
      },
      {
        key: '1-2',
        eventName: 'sub event A2',
        desc: 'this is sub event A2',
        cnt: 18,
        tags: ['damage'],
        children: [
          {
            key: '1-2-1',
            eventName: 'sub event A2-1',
            desc: 'this is sub event A2-1',
            cnt: 2,
            tags: ['attack'],
          },
          {
            key: '1-2-2',
            eventName: 'sub event A2-2',
            desc: 'this is sub event A2-2',
            cnt: 3,
            tags: ['damage'],
          },
          {
            key: '1-2-3',
            eventName: 'sub event A2-3',
            desc: 'this is sub event A2-3',
            cnt: 1,
            tags: ['infiltrate'],
          },
        ],
      },
      {
        key: '1-3',
        eventName: 'sub event A3',
        desc: 'this is sub event A3',
        cnt: 1,
        tags: ['system'],
      },
    ],
  },
  {
    key: '2',
    eventName: 'event B',
    desc: 'this is event B',
    cnt: 10,
    tags: ['damage', 'system', 'creater'],
    children: [
      {
        key: '2-1',
        eventName: 'sub event B1',
        desc: 'this is sub event B1',
        cnt: 23,
        tags: ['infiltrate'],
      },
      {
        key: '2-2',
        eventName: 'sub event B2',
        desc: 'this is sub event B2',
        cnt: 22,
        tags: ['damage'],
      },
      {
        key: '2-3',
        eventName: 'sub event B3',
        desc: 'this is sub event B3',
        cnt: 7,
        tags: ['attack'],
      },
    ],
  },
  {
    key: '3',
    eventName: 'event C',
    desc: 'this is event C',
    cnt: 5,
    tags: ['infiltrate'],
  },
]
</script>
