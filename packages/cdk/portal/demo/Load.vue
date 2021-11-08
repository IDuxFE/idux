<template>
  <CdkPortal target="ix-container" :load="load">
    <div>Portal</div>
  </CdkPortal>
  <IxButton @click="load = !load">Load</IxButton>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const load = ref(false)
    return { load }
  },
})
</script>
