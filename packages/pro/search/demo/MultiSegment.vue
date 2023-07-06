<template>
  <IxProSearch
    v-model:value="searchValue"
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
    :onSearch="onSearch"
    overlayContainer="demo-pro-search-custom"
  />
</template>

<script setup lang="ts">
import type { SearchField, SearchValue } from '@idux/pro/search'

import { ref } from 'vue'

const searchValue = ref<SearchValue[]>([])
const searchFields: SearchField[] = [
  {
    type: 'multiSegment',
    key: 'multi_segment_field',
    label: 'User',
    defaultValue: ['is', 'evil', 'designer'],
    fieldConfig: {
      segments: [
        {
          name: 'custom:operator',
          extends: 'select',
          config: {
            dataSource: [
              {
                key: 'is',
                label: 'is',
              },
              {
                key: 'is_not',
                label: 'is not',
              },
            ],
          },
        },
        {
          name: 'segment1',
          extends: 'select',
          config: {
            dataSource: [
              {
                key: 'righteous',
                label: 'righteous',
              },
              {
                key: 'evil',
                label: 'evil',
              },
            ],
          },
        },
        {
          name: 'segment2',
          extends: 'select',
          config: {
            dataSource: [
              {
                key: 'designer',
                label: 'designer',
              },
              {
                key: 'developer',
                label: 'developer',
              },
            ],
          },
        },
      ],
    },
  },
]

const onChange = (value: SearchValue[] | undefined, oldValue: SearchValue[] | undefined) => {
  console.log(value, oldValue)
}
const onSearch = () => {
  console.log('onSearch')
}
</script>
