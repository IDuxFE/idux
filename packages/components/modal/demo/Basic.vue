<template>
  <ix-button mode="primary" @click="visible = !visible">Change visible</ix-button>
  <ix-modal v-model:visible="visible" header="This is header">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </ix-modal>
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
