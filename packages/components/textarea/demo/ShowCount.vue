<template>
  <IxTextarea showCount placeholder="Textarea showCount" />
  <br /><br />
  <IxTextarea showCount maxCount="100" placeholder="Textarea showCount with maxCount" />
  <br /><br />
  <IxTextarea showCount :computeCount="computeCount" placeholder="Textarea showCount with computeCount" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const computeCount = (value: string) => `${value.length * 2} - 100`
    return { computeCount }
  },
})
</script>
<style lang="less" scoped></style>
