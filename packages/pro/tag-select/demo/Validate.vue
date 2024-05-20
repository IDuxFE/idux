<template>
  <IxProTagSelect
    v-model:value="selectedValue"
    placeholder="请选择标签"
    :dataSource="tagSelectData"
    :tagLabelValidator="tagLabelValidator"
    :onTagDataRemove="handleTagDataRemove"
    :onTagDataAdd="handleTagDataAdd"
    :onTagDataChange="handleTagDataChange"
    style="width: 336px"
  >
    <template #removeConfirmTitle="{ label }"> 确定删除“{{ label }}”标签吗？ </template>
    <template #removeConfirmContent> 操作说明 </template>
  </IxProTagSelect>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { TagSelectData } from '@idux/pro/tag-select'

const selectedValue = ref<string[]>([])
const tagSelectData = ref<TagSelectData[]>([
  {
    key: 'emphasis',
    label: '重点关注',
    color: 'yellow',
  },
  {
    key: 'alarm',
    label: '告警标签',
    color: 'blue',
  },
  {
    key: 'track',
    label: '持续追踪',
    color: 'blue',
  },
  {
    key: 'care-and-track',
    label: '持续关注并追踪',
    color: 'green',
  },
  {
    key: 'keeps-alarm',
    label: '持续告警',
    color: 'red',
  },
])

const tagLabelValidator = (input: string) => {
  if (!input) {
    return '不能为空'
  }

  if (/[%+-.]/.test(input)) {
    return '不能输入特殊字符'
  }

  return
}

const handleTagDataRemove = (data: TagSelectData) => {
  tagSelectData.value = tagSelectData.value.filter(d => d.key !== data.key)
}
const handleTagDataAdd = (data: TagSelectData) => {
  tagSelectData.value.push(data)
}
const handleTagDataChange = (data: TagSelectData) => {
  const index = tagSelectData.value.findIndex(d => d.key === data.key)
  if (index < 0) {
    return
  }

  tagSelectData.value.splice(index, 1, data)
}
</script>

<style scoped lang="less"></style>
