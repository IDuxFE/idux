<template>
  <IxSpace vertical :size="32">
    <IxSwitch v-model:checked="processing"></IxSwitch>
    <IxSpace :size="32">
      <IxBadge count="HOT" :processing="processing">
        <a href="#"></a>
      </IxBadge>
      <IxBadge dot :processing="processing">
        <a href="#"></a>
      </IxBadge>
      <IxBadge dot="inline" :processing="processing" status="error">Error</IxBadge>
    </IxSpace>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const processing = ref(true)
</script>
<style lang="less" scoped>
a {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid var(--ix-color-border);
  border-radius: var(--ix-border-radius-sm);
}
</style>
