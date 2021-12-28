<template>
  <form class="custom-form"><slot /></form>
</template>

<script setup lang="ts">
import { provide } from 'vue'

import { FORMS_CONTROL_TOKEN, useValueControl } from '@idux/cdk/forms'

defineProps<{
  control?: string | object
}>()

// 使用 valueControl 接管 props.control 的控制
const control = useValueControl()

// 注入父 control, 以便子组件通过 key 获取对应的子 control
provide(FORMS_CONTROL_TOKEN, control)
</script>

<style scoped lang="less">
.custom-form {
  border: 1px solid #ccc;
  padding: 16px;
}
</style>
