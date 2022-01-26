<template>
  <IxSpace vertical>
    <IxTextarea showCount placeholder="Textarea showCount" />
    <IxTextarea showCount maxCount="100" placeholder="Textarea showCount with maxCount" />
    <IxTextarea showCount :computeCount="computeCount" placeholder="Textarea showCount with computeCount" />
  </IxSpace>
</template>
<script setup lang="ts">
const computeCount = (value: string) => `${value.length * 2} - 100`
</script>
