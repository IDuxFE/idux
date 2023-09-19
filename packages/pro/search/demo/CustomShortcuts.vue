<template>
  <IxProSearch
    v-model:value="value"
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
    :onSearch="onSearch"
  >
    <template #shortcuts="shortcutFields">
      <div class="demo-pro-search-custom-shortcuts__shortcuts">
        <section
          v-for="section in shortcutSections"
          :key="section.label"
          class="demo-pro-search-custom-shortcuts__shortcuts__section"
        >
          <label class="demo-pro-search-custom-shortcuts__shortcuts__section__label">{{ section.label }}:</label>
          <div class="demo-pro-search-custom-shortcuts__shortcuts__section__tags">
            <IxProSearchShortcut
              v-for="field in filterFields(shortcutFields, section.fieldKeys)"
              :key="field.key"
              :fieldKey="field.key"
            >
              <template #label> {{ field.label }}</template>
              <template #icon>
                <IxIcon :name="field.icon ?? 'search'"></IxIcon>
              </template>
            </IxProSearchShortcut>
          </div>
        </section>
      </div>
    </template>
  </IxProSearch>
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
interface CascaderData {
  key: string
  label: string
  children?: TreeSelectData[]
}

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
const baseCascaderData = baseTreeSelectData as CascaderData[]

const createSelectData = (searchValue: string) => {
  return baseSelectData.filter(item => new RegExp(searchValue.toLowerCase()).test(item.label.toLowerCase()))
}
const createTreeSelectData = (searchValue: string) => {
  return filterTree(baseTreeSelectData, 'children', item =>
    new RegExp(searchValue.toLowerCase()).test(item.label.toLowerCase()),
  )
}
const createCascaderData = (searchValue: string) => {
  return filterTree(baseCascaderData, 'children', item =>
    new RegExp(searchValue.toLowerCase()).test(item.label.toLowerCase()),
  )
}

const remoteSelectData = ref<SelectData[]>(createSelectData(''))
const remoteTreeSelectData = ref<TreeSelectData[]>(createTreeSelectData(''))
const remoteCascaderData = ref<CascaderData[]>(createCascaderData(''))

const selectOnSearch = (searchValue: string) => {
  remoteSelectData.value = createSelectData(searchValue)
}
const treeSelectOnSearch = (searchValue: string) => {
  remoteTreeSelectData.value = createTreeSelectData(searchValue)
}
const cascaderOnSearch = (searchValue: string) => {
  remoteCascaderData.value = createCascaderData(searchValue)
}

const shortcutSections = [
  {
    label: 'common',
    fieldKeys: ['keyword', 'level', 'security_state', 'tree_data', 'cascader'],
  },
  {
    label: 'date',
    fieldKeys: ['date', 'date_range'],
  },
]

const filterFields = (fields: SearchField[], keys: string[]) => {
  return fields.filter(field => keys.includes(field.key as string))
}

const searchFields = computed<SearchField[]>(() => [
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    icon: 'search',
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
    quickSelect: true,
    operators: ['=', '!='],
    defaultOperator: '=',
    operatorPlaceholder: 'please select',
    placeholder: 'please select',
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
    quickSelect: true,
    placeholder: 'please select',
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
    placeholder: 'please select',
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
    placeholder: 'please select',
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
    type: 'select',
    label: 'Remote Select',
    key: 'remote_select_data',
    quickSelect: { searchable: true },
    placeholder: 'please select',
    fieldConfig: {
      multiple: true,
      searchable: true,
      dataSource: remoteSelectData.value,
      virtual: true,
      searchFn: () => true,
      onSearch: selectOnSearch,
    },
  },
  {
    type: 'treeSelect',
    label: 'Remote Tree',
    key: 'remote_tree_data',
    quickSelect: { searchable: true },
    fieldConfig: {
      multiple: true,
      searchable: true,
      checkable: true,
      cascaderStrategy: 'all',
      dataSource: remoteTreeSelectData.value,
      virtual: true,
      searchFn: () => true,
      onSearch: treeSelectOnSearch,
    },
  },
  {
    type: 'cascader',
    label: 'Remote Cascader',
    key: 'remote_cascader_data',
    placeholder: 'please select',
    fieldConfig: {
      multiple: true,
      searchable: true,
      cascaderStrategy: 'all',
      dataSource: remoteCascaderData.value,
      searchFn: () => true,
      onSearch: cascaderOnSearch,
    },
  },
  {
    type: 'datePicker',
    label: 'Date',
    key: 'date',
    placeholder: 'please select',
    fieldConfig: {
      type: 'datetime',
    },
  },
  {
    type: 'dateRangePicker',
    label: 'Date Range',
    key: 'date_range',
    quickSelect: true,
    placeholder: 'please select',
    fieldConfig: {
      type: 'datetime',
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

<style scoped lang="less">
.demo-pro-search-custom-shortcuts__shortcuts {
  width: 100%;
  &__section {
    width: 100%;
    display: flex;
    align-items: flex-start;

    &__label {
      width: 60px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-shrink: 0;
    }
    &__tags {
      flex: auto;
      width: 0;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
