<template>
  <IxButton mode="primary" @click="visible = !visible">Change visible</IxButton>
  <IxModal v-model:visible="visible" header="This is header">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </IxModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    return { visible }
  },
})
</script>
