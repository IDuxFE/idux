<template>
  <IxSpace vertical>
    <IxCascader v-model:value="valueRef" :dataSource="dataSource" disabled :fullPath="false" />
    <IxCascader v-model:value="valueRef" :dataSource="dataSource" :disableData="disableData" :fullPath="false" />
  </IxSpace>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { CascaderData } from '@idux/components/cascader'

const valueRef = ref('button')
const disableData = computed(() => (data: CascaderData) => valueRef.value === data.key)

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
</script>

<style scoped lang="less"></style>
