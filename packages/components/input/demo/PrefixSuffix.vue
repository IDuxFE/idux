<template>
  <IxInput prefix="user" suffix="info-circle" placeholder="Prefix and suffix" />
  <br /><br />
  <IxInput placeholder="Prefix and suffix">
    <template #prefix><span>￥</span></template>
    <template #suffix><span>RMB</span></template>
  </IxInput>
  <br /><br />
  <IxInput placeholder="Password input" :type="showPassword ? 'text' : 'password'">
    <template #suffix><IxIcon :name="showPassword ? 'eye-invisible' : 'eye'" @click="onSuffixClick" /></template>
  </IxInput>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showPassword = ref(false)
    const onSuffixClick = () => {
      showPassword.value = !showPassword.value
    }
    return { showPassword, onSuffixClick }
  },
})
</script>
