<template>
  <IxProSearch
    v-model:value="searchValues"
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
    :onSearch="onSearch"
  ></IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchValue } from '@idux/pro/search'

import { ref } from 'vue'

const levelDataSource = [
  {
    key: 'level1',
    label: 'Level 1',
  },
  {
    key: 'level2',
    label: 'Level 2',
  },
  {
    key: 'level3',
    label: 'Level 3',
  },
]

const searchValues = ref<SearchValue[]>([])
const searchFields: SearchField[] = [
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    multiple: true,
    keywordFallback: true,
    fieldConfig: {
      trim: true,
    },
  },
  {
    key: 'asset_name',
    type: 'input',
    label: 'Asset Name',
    multiple: true,
    keywordFallback: true,
    fieldConfig: {
      trim: true,
    },
  },
  {
    type: 'select',
    label: 'Level',
    key: 'level',
    operators: ['=', '!='],
    defaultOperator: '=',
    keywordFallback: {
      parse: input => {
        const item = levelDataSource.find(data => data.key === input || data.label === input)

        if (item) {
          return item.key
        }

        return 'level1'
      },
    },
    fieldConfig: {
      multiple: false,
      searchable: true,
      dataSource: levelDataSource,
    },
  },
  {
    type: 'select',
    label: 'Security State',
    key: 'security_state',
    fieldConfig: {
      multiple: true,
      searchable: true,
      dataSource: [
        {
          key: 'fatal',
          label: 'fatal',
        },
        {
          key: 'high',
          label: 'high',
        },
        {
          key: 'mediumn',
          label: 'mediumn',
        },
        {
          key: 'low',
          label: 'low',
        },
      ],
    },
  },
  {
    type: 'datePicker',
    label: 'Date',
    key: 'date',
    fieldConfig: {
      type: 'datetime',
    },
  },
  {
    type: 'dateRangePicker',
    label: 'Date Range',
    key: 'date_range',
    fieldConfig: {
      type: 'datetime',
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

<style scoped lang="less"></style>
