<template>
  <ix-portal :target="container">
    <div>Portal</div>
  </ix-portal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Element',
  setup() {
    const container = document.createElement('div')
    container.classList.add('custom-container')
    document.body.appendChild(container)

    return { container }
  },
})
</script>
