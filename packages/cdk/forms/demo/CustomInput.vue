<template>
  <input class="custom-input" :value="accessor.value" :disabled="accessor.disabled" @blur="onBlur" @input="onInput" />
</template>

<script setup lang="ts">
import { useAccessorAndControl } from '@idux/cdk/forms'

defineProps<{
  control?: string | number | (string | number)[] | object
  disabled?: boolean
  value?: string
}>()

// useAccessorAndControl 内部对 props 中的 control, disabled, value 进行了处理
const { accessor } = useAccessorAndControl()

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
