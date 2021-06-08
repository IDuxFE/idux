<template>
  <ix-portal target="ix-container" :show="show">
    <div>Portal</div>
  </ix-portal>
  <ix-button @click="show = !show">Show</ix-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const show = ref(false)
    return { show }
  },
})
</script>
