<template>
  <IxSelect
    v-model:value="value"
    :dataSource="dataSource"
    :overlayRender="overlayRender"
    style="width: 200px"
  ></IxSelect>
</template>

<script setup lang="ts">
import { VNode, h, ref } from 'vue'

import { IxButton } from '@idux/components/button'
import { IxDivider } from '@idux/components/divider'
import { IxInput } from '@idux/components/input'
import { SelectData } from '@idux/components/select'

const dataSource = ref<SelectData[]>([
  { key: 1, label: 'Tom', value: 'tom' },
  { key: 2, label: 'Jerry', value: 'jerry' },
  { key: 3, label: 'Speike', value: 'speike' },
])

const value = ref('tom')

const inputValue = ref('')
const onChange = (value: string) => {
  inputValue.value = value
}
const onAdd = () => {
  const currOptions = dataSource.value
  const label = inputValue.value
  dataSource.value = [...currOptions, { key: label, label, value: label }]
  inputValue.value = ''
}

const overlayRender = (children: VNode[]) => {
  const divider = h(IxDivider)
  const input = h(IxInput, { style: { width: '100px' }, value: inputValue.value, onChange: onChange })
  const button = h(IxButton, { icon: 'plus', onClick: onAdd }, () => 'Add')
  const addItem = h('div', { style: { display: 'flex', padding: '0 16px 8px', gap: '8px' } }, [input, button])
  return h('div', [children, divider, addItem])
}
</script>
