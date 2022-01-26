<template>
  <IxSpace vertical>
    <IxInput prefix="user" suffix="info-circle" placeholder="Prefix and suffix" />
    <IxInput placeholder="Prefix and suffix">
      <template #prefix><span>￥</span></template>
      <template #suffix><span>RMB</span></template>
    </IxInput>
    <IxInput placeholder="Password input" :type="showPassword ? 'text' : 'password'">
      <template #suffix><IxIcon :name="showPassword ? 'eye-invisible' : 'eye'" @click="onSuffixClick" /></template>
    </IxInput>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showPassword = ref(false)
const onSuffixClick = () => {
  showPassword.value = !showPassword.value
}
</script>
