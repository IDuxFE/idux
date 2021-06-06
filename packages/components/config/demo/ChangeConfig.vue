<template>
  <p>Default size of button: {{ config.size }}</p>
  <br />
  <ix-space>
    <ix-button @click="changeConfig({ size: 'small' })">Small</ix-button>
    <ix-button @click="changeConfig({ size: 'medium' })">Medium</ix-button>
    <ix-button @click="changeConfig({ size: 'large' })">Large</ix-button>
  </ix-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  setup() {
    const { config, changeConfig } = useGlobalConfig('button', { size: 'large' })
    return { config, changeConfig }
  },
})
</script>
