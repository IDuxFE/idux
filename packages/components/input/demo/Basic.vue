<template>
  <ix-input v-model:value="valueRef" placeholder="Basic usage" />
  <br /><br />
  <ix-input :value="valueRef" disabled placeholder="Disabled" />
  <br /><br />
  <ix-input :value="valueRef" readonly placeholder="Readonly" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const valueRef = ref('')
    watch(valueRef, value => console.log(value))
    return { valueRef }
  },
})
</script>
<style lang="less" scoped></style>
