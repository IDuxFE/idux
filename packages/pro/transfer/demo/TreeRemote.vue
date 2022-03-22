<template>
  <IxProTransfer
    v-model:value="targetKeys"
    type="tree"
    mode="immediate"
    :data-source="dataSource"
    :default-target-data="defaultTargetData"
    :search-value="searchValue"
    :pagination="pagination"
    :spin="spin"
    :searchable="{ source: true, target: false }"
    :scroll="{ height: 300, fullHeight: true }"
    :on-search="handleSearchChange"
  />
</template>

<script setup lang="ts">
import type { TransferPaginationProps } from '@idux/components/transfer'

import { computed, onMounted, ref } from 'vue'

interface Data {
  key: string
  label: string
  disabled?: boolean
  children?: Data[]
}

const createData = (idx: number): Data => ({
  key: `${idx}`,
  disabled: false,
  label: `Selection-${idx}`,
  children: [
    {
      key: `${idx}-1`,
      disabled: false,
      label: `Selection-${idx}-1`,
    },
    {
      key: `${idx}-2`,
      disabled: false,
      label: `Selection-${idx}-2`,
      children: [
        {
          key: `${idx}-2-1`,
          disabled: false,
          label: `Selection-${idx}-2-1`,
        },
        {
          key: `${idx}-2-2`,
          disabled: true,
          label: `Selection-${idx}-2-2`,
        },
      ],
    },
    {
      key: `${idx}-3`,
      disabled: false,
      label: `Selection-${idx}-3`,
    },
  ],
})

const allData = Array.from(new Array(50)).map((_, idx) => createData(idx))
const defaultTargetData: Data[] = [createData(21)]

const targetKeys = ref<string[]>(['21-2', '21-2-1', '21-2-2'])

const spin = ref(false)
const searchValue = ref<string | undefined>()

const dataSource = ref<Data[]>([])
const filteredData = ref<Data[]>([])

const sourcePageIndex = ref(1)
const pagination = computed<TransferPaginationProps>(() => ({
  pageIndex: sourcePageIndex.value,
  pageSize: [20, 20],
  total: filteredData.value.length,
  onChange(isSource, pageIndex) {
    if (!isSource) {
      return
    }
    sourcePageIndex.value = pageIndex
    loadSourceData()
  },
}))

function filterData(data: Data[], fn: (item: Data) => boolean): Data[] {
  return data
    .map(item => {
      let children: Data[] | undefined

      if (Array.isArray(item.children)) {
        children = filterData(item.children, fn)
      }

      let itemValid = fn(item)
      itemValid = !!(children && children.length > 0) || itemValid

      return (
        itemValid && {
          ...item,
          children: item.children && children,
        }
      )
    })
    .filter(item => !!item) as Data[]
}

const loadSourceData = () => {
  spin.value = true
  setTimeout(() => {
    filteredData.value = filterData(allData, data => !searchValue.value || data.label.indexOf(searchValue.value) > -1)
    dataSource.value = filteredData.value.slice((sourcePageIndex.value - 1) * 20, sourcePageIndex.value * 20)
    spin.value = false
  }, 1500)
}

const handleSearchChange = (isSource: boolean, value: string | undefined) => {
  if (!isSource) {
    return
  }

  searchValue.value = value
  loadSourceData()
}

onMounted(() => {
  loadSourceData()
})
</script>
