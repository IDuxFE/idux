<template>
  <IxTreeSelect placeholder="自定义下拉框" :dataSource="treeData" :overlayRender="overlayRender" />
</template>

<script setup lang="ts">
import type { TreeSelectNode } from '@idux/components/tree-select'
import type { VNode } from 'vue'

import { h, ref } from 'vue'

import { IxButton } from '@idux/components/button'
import { IxDivider } from '@idux/components/divider'
import { IxInput } from '@idux/components/input'

const treeData = ref<TreeSelectNode[]>([
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
])

const inputValue = ref('')
const onChange = (value: string) => {
  inputValue.value = value
}
const onAdd = () => {
  const currTreeData = treeData.value
  const label = inputValue.value
  treeData.value = [...currTreeData, { key: currTreeData.length, label }]
  inputValue.value = ''
}

const overlayRender = (children: VNode[]) => {
  const divider = h(IxDivider)
  const input = h(IxInput, { style: { flex: 'auto' }, value: inputValue.value, onChange: onChange })
  const button = h(IxButton, { style: { flex: 'none', marginLeft: '8px' }, icon: 'plus', onClick: onAdd }, () => 'Add')
  const addItem = h('div', { style: { display: 'flex', padding: '0 16px 8px' } }, [input, button])
  return h('div', [children, divider, addItem])
}
</script>
