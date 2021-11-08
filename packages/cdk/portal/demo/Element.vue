<template>
  <CdkPortal :target="container">
    <div>Portal</div>
  </CdkPortal>
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
