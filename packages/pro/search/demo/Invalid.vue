<template>
  <IxProSearch
    v-model:value="searchValues"
    v-model:errors="errors"
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
    :onSearch="onSearch"
  ></IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchItemError, SearchValue } from '@idux/pro/search'

import { ref } from 'vue'

const searchValues = ref<SearchValue[]>([])
const errors = ref<SearchItemError[]>([])
const searchFields: SearchField[] = [
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    multiple: true,
    fieldConfig: {
      trim: true,
    },
    validator(searchValue) {
      if (/[?^<>/+\-=]/.test(searchValue.value)) {
        return { message: "keyword mustn't contain ?^<>+-=" }
      }

      return
    },
  },
  {
    type: 'datePicker',
    label: 'Creation Time',
    key: 'date',
    operators: ['=', '>', '<'],
    fieldConfig: {
      type: 'datetime',
    },
    validator(searchValue) {
      const { operator, value } = searchValue
      const currentYear = new Date().getFullYear()
      if ((operator === '>' || operator === '=') && value.getFullYear() > currentYear) {
        return { message: `cannot select date after year ${currentYear}` }
      }

      if ((operator === '<' || operator === '=') && value.getFullYear() < 2000) {
        return { message: `cannot select date before year 2000` }
      }

      return
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
