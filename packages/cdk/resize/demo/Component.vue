<template>
  <IxSpace vertical>
    <IxSwitch v-model:checked="enabled" :labels="['Enable', 'Disable']"></IxSwitch>
    <CdkResizeObserver :disabled="!enabled" @resize="onResize">
      <IxTextarea :value="text" />
    </CdkResizeObserver>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(true)
const text = ref('')

const onResize = (entry: ResizeObserverEntry) => {
  const { contentRect } = entry
  text.value = `height: ${contentRect.height}`
}
</script>
