<template>
  <ix-portal target="ix-container" :load="load">
    <div>Portal</div>
  </ix-portal>
  <ix-button @click="load = !load">Load</ix-button>
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
