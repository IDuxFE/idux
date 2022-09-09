<template>
  <IxProSearch v-model:value="value" style="width: 100%" :searchFields="searchFields"></IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchValue } from '@idux/pro/search'

import { reactive, ref } from 'vue'

type SelectField = SearchField & { type: 'select' }

const value = ref<SearchValue[]>([])

const selectField = reactive<SelectField>({
  type: 'select',
  label: 'Security State',
  key: 'security_state',
  fieldConfig: {
    multiple: true,
    searchable: true,
    dataSource: [],
  },
  onPanelVisibleChange: visible => {
    if (visible) {
      setTimeout(
        () =>
          (selectField.fieldConfig.dataSource = [
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
              disabled: true,
            },
          ]),
        500,
      )
    }
  },
})
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
  selectField,
]
</script>

<style scoped lang="less"></style>
