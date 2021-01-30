<template>
  <ix-portal :target="container">
    <div>Portal</div>
  </ix-portal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxPortal } from '@idux/cdk/portal'

export default defineComponent({
  name: 'Element',
  components: { IxPortal },
  setup() {
    const container = document.createElement('div')
    container.classList.add('custom-container')
    document.body.appendChild(container)

    return { container }
  },
})
</script>
