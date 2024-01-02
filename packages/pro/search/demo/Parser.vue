<template>
  <IxProSearch v-model:value="value" style="width: 100%" :searchFields="searchFields"></IxProSearch>
  <IxTable :columns="tableColums" :dataSource="tableData"></IxTable>
</template>

<script setup lang="ts">
import type { TableColumn } from '@idux/components/table'

import { computed, ref } from 'vue'

import { type SearchField, type SearchValue, useParser } from '@idux/pro/search'

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
  {
    key: 'keyword',
    name: '',
    value: 'custom keyword',
  },
])
const searchFields = ref<SearchField[]>([
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    multiple: true,
    placeholder: 'please input keyword',
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
    type: 'treeSelect',
    label: 'Tree Data',
    key: 'tree_data',
    fieldConfig: {
      multiple: true,
      searchable: true,
      checkable: true,
      cascaderStrategy: 'all',
      dataSource: [
        {
          label: 'Node 0',
          key: '0',
          children: [
            {
              label: 'Node 0-0',
              key: '0-0',
              children: [
                {
                  label: 'Node 0-0-0',
                  key: '0-0-0',
                },
                {
                  label: 'Node 0-0-1',
                  key: '0-0-1',
                },
              ],
            },
            {
              label: 'Node 0-1',
              key: '0-1',
              children: [
                { label: 'Node 0-1-0', key: '0-1-0' },
                { label: 'Node 0-1-1', key: '0-1-1' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    type: 'cascader',
    key: 'cascader',
    label: 'Cascader',
    fieldConfig: {
      fullPath: true,
      multiple: true,
      searchable: true,
      dataSource: [
        {
          key: 'components',
          label: 'Components',
          children: [
            {
              key: 'general',
              label: 'General',
              children: [
                {
                  key: 'button',
                  label: 'Button',
                },
                {
                  key: 'header',
                  label: 'Header',
                },
                {
                  key: 'icon',
                  label: 'Icon',
                },
              ],
            },
            {
              key: 'layout',
              label: 'Layout',
              children: [
                {
                  key: 'divider',
                  label: 'Divider',
                },
                {
                  key: 'grid',
                  label: 'Grid',
                },
                {
                  key: 'space',
                  label: 'Space',
                },
              ],
            },
            {
              key: 'navigation',
              label: 'Navigation',
              children: [
                {
                  key: 'breadcrumb',
                  label: 'Breadcrumb',
                },
                {
                  key: 'dropdown',
                  label: 'Dropdown',
                },
                {
                  key: 'menu',
                  label: 'Menu',
                },
                {
                  key: 'pagination',
                  label: 'Pagination',
                },
              ],
            },
          ],
        },
        {
          key: 'pro',
          label: 'Pro',
          children: [
            {
              key: 'pro-layout',
              label: 'Layout',
            },
            {
              key: 'pro-table',
              label: 'Table',
              disabled: true,
            },
            {
              key: 'pro-transfer',
              label: 'Transfer',
            },
          ],
        },
        {
          key: 'cdk',
          label: 'CDK',
          disabled: true,
          children: [
            {
              key: 'a11y',
              label: 'Accessibility',
            },
            {
              key: 'breakpoint',
              label: 'Breakpoint',
            },
            {
              key: 'click-outside',
              label: 'ClickOutside',
            },
            {
              key: 'clipboard',
              label: 'Clipboard',
            },
            {
              key: 'forms',
              label: 'Forms',
            },
          ],
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
])

const tableColums: TableColumn[] = [
  {
    key: 'index',
    type: 'indexable',
  },
  {
    dataKey: 'name',
    title: 'Name',
    width: 100,
  },
  {
    dataKey: 'input',
    title: 'Search Input',
  },
]

const { parse } = useParser(searchFields)
const tableData = computed(() => {
  const parseRes = parse(value.value)

  return parseRes.map(res => {
    const { label, segments, key } = res

    return {
      key,
      name: label,
      input: segments.map(seg => seg.input).join(' '),
    }
  })
})
</script>

<style scoped lang="less"></style>
