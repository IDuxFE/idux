<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="strategy" :dataSource="strategyData" />
    <IxCascader
      v-model:value="singleValue"
      :dataSource="dataSource"
      :strategy="strategy"
      placeholder="Please select"
      clearable
      @change="onChange"
    />
    <IxCascader
      v-model:value="multipleValue"
      :dataSource="dataSource"
      :strategy="strategy"
      placeholder="Please select"
      clearable
      multiple
      @change="onChange"
    />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { CascaderData, CascaderStrategy } from '@idux/components/cascader'

const singleValue = ref()
const multipleValue = ref([])
const strategy = ref<CascaderStrategy>('all')

const onChange = console.log

const dataSource: CascaderData[] = [
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
]

const strategyData = [
  { label: 'All', value: 'all' },
  { label: 'Parent', value: 'parent' },
  { label: 'Child', value: 'child' },
  { label: 'Off', value: 'off' },
]
</script>

<style scoped lang="less"></style>
