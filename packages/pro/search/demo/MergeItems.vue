<template>
  <IxProSearch
    :value="value"
    style="width: 100%"
    :searchFields="searchFields"
    :onSearch="onSearch"
    :onUpdate:value="handleValueUpdate"
  ></IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchValue } from '@idux/pro/search'

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

const handleValueUpdate = (searchValues: SearchValue[] | undefined) => {
  const securityStateValues = searchValues?.filter(v => v.key === 'security_state') as
    | SearchValue<string[]>[]
    | undefined

  if (!securityStateValues?.length) {
    value.value = searchValues ?? []
    return
  }

  const currentValue = securityStateValues.pop()!
  value.value = !securityStateValues.length
    ? searchValues!
    : [...searchValues!.filter(v => v.key !== 'security_state'), currentValue]

  securityStateField.defaultValue = currentValue.value
}
const onSearch = () => {
  console.log('onSearch')
}
</script>

<style scoped lang="less"></style>
