<template>
  <div class="header-search-box">
    <IxSelect
      virtual
      borderless
      searchable
      suffix="search"
      style="width: 180px"
      :dataSource="allOptions"
      :placeholder="placeholder"
      :searchFn="filterSearch"
      @change="onSelectChange"
    ></IxSelect>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

import { useRouter } from 'vue-router'

import { appContextToken } from '../../../context'
// eslint-disable-next-line import/no-unresolved
import { config } from '../../../sideNav'

const router = useRouter()
const { lang } = inject(appContextToken)!
const placeholder = computed(() => {
  return lang.value == 'zh' ? '在 idux.site 中搜索' : 'Search in idux.site'
})

const filterSearch = (optionData, searchVal: string) => {
  return optionData.label.toLowerCase().includes(searchVal.toLowerCase())
}

const onSelectChange = (newVal: string) => {
  newVal && router.push(newVal)
}

const validConfig = config => config.path && config.title

const getLabel = config => [config.title, config.subtitle].join(' ').trim()

const allOptions = computed(() => {
  const optionMap: Record<string, string> = {}
  Object.values(config)
    .reduce((total, currentList) => total.concat(currentList.filter(curr => curr.lang === lang.value)), [])
    .forEach(item => {
      ;(item.children ?? []).forEach(child => {
        validConfig(child) && (optionMap[child.path] = getLabel(child))
      })
      validConfig(item) && (optionMap[item.path] = getLabel(item))
    })

  return Object.entries(optionMap).map(([k, v]) => ({
    key: k,
    label: v,
    value: k,
  }))
})
</script>
