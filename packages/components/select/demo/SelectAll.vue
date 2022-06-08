<template>
  <IxSelect v-model:value="selectedKeys" :dataSource="dataSource" multiple :overlayRender="overlayRender"></IxSelect>
</template>

<script setup lang="ts">
import { VNode, computed, h, normalizeClass, ref } from 'vue'

import { IxCheckbox } from '@idux/components/checkbox'

const dataSource = ref([
  { key: 'tom', label: 'Tom' },
  { key: 'jerry', label: 'Jerry' },
  { key: 'speike', label: 'Speike' },
])

const selectedKeys = ref(['tom', 'jerry', 'speike'])

const isSelectedAll = computed(() => selectedKeys.value.length === dataSource.value.length)
const isSelectedIndeterminate = computed(() => {
  const selectedLength = selectedKeys.value.length
  return selectedLength > 0 && selectedLength !== dataSource.value.length
})
const onSelectedAll = () => {
  if (isSelectedAll.value) {
    selectedKeys.value = []
  } else {
    selectedKeys.value = dataSource.value.map(item => item.key)
  }
}

const overlayRender = (children: VNode[]) => {
  const prefixCls = `ix-select-option`
  const classes = normalizeClass({
    [prefixCls]: true,
    [`${prefixCls}-selected`]: isSelectedAll.value,
  })
  const customOption = h(
    'div',
    {
      class: classes,
      onClick: onSelectedAll,
    },
    [
      h(IxCheckbox, { checked: isSelectedAll.value, indeterminate: isSelectedIndeterminate.value }),
      h('span', { class: `${prefixCls}-label` }, ['Select All']),
    ],
  )
  return h('div', [customOption, children])
}
</script>
