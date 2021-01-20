<template>
  <ix-input prefix="user" suffix="info-circle" placeholder="Prefix and suffix" />
  <br /><br />
  <ix-input placeholder="Prefix and suffix">
    <template #prefix><span>￥</span></template>
    <template #suffix><span>RMB</span></template>
  </ix-input>
  <br /><br />
  <ix-input
    placeholder="Password input"
    :type="showPassword ? 'text' : 'password'"
    :suffix="showPassword ? 'eye-invisible' : 'eye'"
    @suffixClick="onSuffixClick"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showPassword = ref(false)
    const onSuffixClick = (value: string) => {
      console.log(value)
      showPassword.value = !showPassword.value
    }
    return { showPassword, onSuffixClick }
  },
})
</script>
