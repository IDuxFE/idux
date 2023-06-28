<template>
  <form class="custom-form"><slot /></form>
</template>

<script setup lang="ts">
import { provide } from 'vue'

import { FORMS_CONTROL_TOKEN, useControl } from '@idux/cdk/forms'

defineProps<{
  control?: string | number | (string | number)[] | object
}>()

// 通过 props.control 拿到真正的 control(AbstractControl)
const controlRef = useControl()

// 注入 control, 以便子组件通过 key 获取对应的子 control
provide(FORMS_CONTROL_TOKEN, controlRef)
</script>

<style scoped lang="less">
.custom-form {
  border: 1px solid #ccc;
  padding: 16px;
}
</style>
