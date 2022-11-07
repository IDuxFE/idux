<template>
  <IxSpace class="demo-select-all-wrapper">
    <IxSelect v-model:value="selectedKeys" :dataSource="dataSource" multiple :overlayRender="overlayRender"></IxSelect>
    <IxSelect
      v-model:value="selectedKeys"
      :maxLabel="isSelectedAll ? 1 : undefined"
      :dataSource="dataSource"
      multiple
      :overlayRender="overlayRender"
    >
      <template #selectedItem="node">
        <div :class="node.prefixCls">
          <span :class="node.prefixCls + '-label'">{{ isSelectedAll ? 'All' : node.label }}</span>
          <span :class="node.prefixCls + '-remove'" @click.stop="handleClear(node.onRemove, node.key)">
            <IxIcon name="close" />
          </span>
        </div>
      </template>
    </IxSelect>
  </IxSpace>
</template>

<script setup lang="ts">
import { VNode, computed, h, normalizeClass, ref } from 'vue'

import { type VKey } from '@idux/cdk/utils'
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

const handleClear = (onRemove: (key: VKey) => void, key: VKey) => {
  if (isSelectedAll.value) {
    selectedKeys.value.splice(0)
  } else {
    onRemove(key)
  }
}
</script>
<style lang="less">
.demo-select-all-wrapper .ix-selector {
  width: 280px;
  .ix-overflow-rest {
    display: none;
  }
}
</style>
