<template>
  <IxTextarea v-model:value="valueRef" placeholder="Basic usage" />
  <br /><br />
  <IxTextarea v-model:value="valueRef" placeholder="Textarea usage" rows="4" />
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
