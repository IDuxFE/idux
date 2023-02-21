<template>
  <IxProSearch
    v-model:value="value"
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
    :onSearch="onSearch"
  ></IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchValue } from '@idux/pro/search'

import { computed, ref } from 'vue'

import { filterTree } from '@idux/cdk/utils'

interface SelectData {
  key: number
  label: string
}
interface TreeSelectData {
  key: string
  label: string
  children?: TreeSelectData[]
}

const labels = ['Archer', 'Berserker', 'Lancer', 'Rider', 'Saber', 'Caster', 'Assassin']
const baseSelectData: SelectData[] = Array.from(new Array(50)).map((_, idx) => {
  const label = `${labels[idx % labels.length]}-${Math.ceil(idx / labels.length)}`

  return {
    key: idx,
    label,
  }
})
const baseTreeSelectData: TreeSelectData[] = Array.from(new Array(20)).map((_, idx) => {
  const label = labels[idx % labels.length]

  return {
    key: `${idx}`,
    label: `${label} ${idx}`,
    children: [
      {
        label: `${label} ${idx}-0`,
        key: `${idx}-0`,
        children: [
          {
            label: `${label} ${idx}-0-0`,
            key: `${idx}-0-0`,
          },
          {
            label: `${label} ${idx}-0-1`,
            key: `${idx}-0-1`,
          },
        ],
      },
      {
        label: `${label} ${idx}-1`,
        key: `${idx}-1`,
        children: [
          { label: `${label} ${idx}-1-0`, key: `${idx}-1-0` },
          { label: `${label} ${idx}-1-1`, key: `${idx}-1-1` },
        ],
      },
    ],
  }
})
const createSelectData = (searchValue: string) => {
  return baseSelectData.filter(item => new RegExp(searchValue.toLowerCase()).test(item.label.toLowerCase()))
}
const createTreeSelectData = (searchValue: string) => {
  return filterTree(baseTreeSelectData, 'children', item =>
    new RegExp(searchValue.toLowerCase()).test(item.label.toLowerCase()),
  )
}

const value = ref<SearchValue[]>()
const selectData = ref<SelectData[]>(createSelectData(''))
const treeSelectData = ref<TreeSelectData[]>(createTreeSelectData(''))

const selectOnSearch = (searchValue: string) => {
  selectData.value = createSelectData(searchValue)
}
const treeSelectOnSearch = (searchValue: string) => {
  treeSelectData.value = createTreeSelectData(searchValue)
}

const searchFields = computed<SearchField[]>(() => [
  {
    type: 'select',
    label: 'Select Data',
    key: 'Select Data',
    fieldConfig: {
      multiple: true,
      searchable: true,
      dataSource: selectData.value,
      searchFn: () => true,
      onSearch: selectOnSearch,
    },
  },
  {
    type: 'treeSelect',
    label: 'Tree Data',
    key: 'tree_data',
    fieldConfig: {
      multiple: true,
      searchable: true,
      checkable: true,
      cascaderStrategy: 'all',
      dataSource: treeSelectData.value,
      searchFn: () => true,
      onSearch: treeSelectOnSearch,
    },
  },
])

const onChange = (value: SearchValue[] | undefined, oldValue: SearchValue[] | undefined) => {
  console.log(value, oldValue)
}
const onSearch = () => {
  console.log('onSearch')
}
</script>

<style scoped lang="less"></style>
