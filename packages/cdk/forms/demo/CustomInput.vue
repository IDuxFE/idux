<template>
  <input class="custom-input" :value="valueRef" :disabled="isDisabled" @blur="onBlur" @input="onInput" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'

defineProps<{
  value?: string
  control?: string | object
  disabled?: boolean
}>()

// 使用 valueAccessor 接管 props.value 的控制
const { accessor } = useValueAccessor()

// 表单绑定的值
const valueRef = computed(() => accessor.valueRef.value)
// 表单禁用状态
const isDisabled = computed(() => accessor.disabled.value)
// 表单 blur 状态
const onBlur = () => {
  accessor.markAsBlurred()
}
// 表单值发生变更后的回调
const onInput = (evt: Event) => {
  const { value } = evt.target as HTMLInputElement
  accessor.setValue(value)
}
</script>

<style scoped lang="less">
.custom-input {
  outline: none;
  border: 1px solid #ccc;
  margin-bottom: 16px;
}
</style>
