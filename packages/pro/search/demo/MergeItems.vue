<template>
  <IxProSearch
    v-model:value="value"
    style="width: 100%"
    :searchFields="searchFields"
    :onSearch="onSearch"
    :onItemConfirm="handleItemConfirm"
  ></IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchItemConfirmContext, SearchValue } from '@idux/pro/search'

import { reactive, ref } from 'vue'

const value = ref<SearchValue[]>([
  {
    key: 'level',
    name: 'Level',
    operator: '=',
    value: 'level1',
  },
  {
    key: 'keyword',
    name: '',
    value: 'custom keyword',
  },
])
const securityStateField = reactive<SearchField>({
  type: 'select',
  label: 'Security State',
  key: 'security_state',
  multiple: true,
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
})
const searchFields: SearchField[] = reactive([
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
  securityStateField,
])

const handleItemConfirm = (item: SearchItemConfirmContext) => {
  if (item.key !== 'security_state') {
    return
  }

  const tempValue = (value.value ?? []).filter(v => v.key !== 'security_state')
  if (!item.removed && item.value) {
    tempValue.push({ key: 'security_state', operator: item.operator, value: item.value })
  }

  value.value = tempValue
  securityStateField.defaultValue = item.value
}
const onSearch = () => {
  console.log('onSearch')
}
</script>

<style scoped lang="less"></style>
