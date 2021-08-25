<template>
  <IxInput v-model:value="valueRef" placeholder="Basic usage" />
  <br /><br />
  <IxInput :value="valueRef" disabled placeholder="Disabled" />
  <br /><br />
  <IxInput :value="valueRef" readonly placeholder="Readonly" />
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
