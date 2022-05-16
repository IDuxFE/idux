<template>
  <IxSpace vertical>
    <IxButton @click="disabled = !disabled">Change disabled</IxButton>
    <CdkResizeObserver :disabled="disabled" @resize="onResize">
      <IxTextarea :value="text" />
    </CdkResizeObserver>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
const text = ref('')

const onResize = (entry: ResizeObserverEntry) => {
  const { contentRect } = entry
  text.value = `height: ${contentRect.height}`
}
</script>
