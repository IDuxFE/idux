<template>
  <IxProSearch
    v-model:value="searchValues"
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
    :onSearch="onSearch"
    :onItemConfirm="onItemConfirm"
  ></IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchItemConfirmContext, SearchValue } from '@idux/pro/search'

import { ref } from 'vue'

const searchValues = ref<SearchValue[]>([])
const searchFields: SearchField[] = [
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    multiple: true,
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
const onSearch = () => {
  console.log('onSearch')
}
const onItemConfirm = (context: SearchItemConfirmContext) => {
  const { removed, nameInput, operatorInput, valueInput } = context
  if (removed) {
    return
  }

  searchValues.value.push({
    key: 'keyword',
    value: (nameInput ?? '') + (operatorInput ?? '') + (valueInput ?? ''),
  })
}
</script>

<style scoped lang="less"></style>
