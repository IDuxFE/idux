<template>
  <IxProSearch
    v-model:value="value"
    disabled
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
  ></IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchValue } from '@idux/pro/search'

import { ref } from 'vue'

const value = ref<SearchValue[]>([
  {
    key: 'level',
    name: 'Level',
    operator: '=',
    value: 'level1',
  },
  {
    key: 'security_state',
    name: 'Security State',
    value: ['high', 'low'],
  },
])
const searchFields: SearchField[] = [
  {
    type: 'select',
    label: 'Level',
    key: 'level',
    operators: ['=', '!='],
    defaultOperator: '=',
    fieldConfig: {
      multiple: false,
      searchable: true,
      dataSource: [
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
      ],
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
</script>

<style scoped lang="less"></style>
