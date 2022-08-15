<template>
  <IxSpace vertical>
    <IxProTextarea showCount placeholder="Textarea showCount" />
    <IxProTextarea showCount maxCount="100" placeholder="Textarea showCount with maxCount" />
    <IxProTextarea showCount :computeCount="computeCount" placeholder="Textarea showCount with computeCount" />
  </IxSpace>
</template>
<script setup lang="ts">
const computeCount = (value: string) => `${value.length * 2} - 100`
</script>
<style scoped lang="less">
.ix-pro-textarea {
  width: 480px;
  height: 210px;
}
</style>
