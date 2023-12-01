<template>
  <IxSpace align="center" size="16px">
    <IxBadge :count="count">
      <a href="#"></a>
    </IxBadge>
    <IxBadge :dot="count > 0">
      <a href="#"></a>
    </IxBadge>
    <IxButtonGroup>
      <IxButton icon="plus" @click="count++"></IxButton>
      <IxButton icon="minus" @click="count--"></IxButton>
    </IxButtonGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(9)
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
