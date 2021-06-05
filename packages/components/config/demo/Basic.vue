<template>
  <p>Default size of button: {{ buttonConfig.size }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  setup() {
    const buttonConfig = useGlobalConfig('button')
    return { buttonConfig }
  },
})
</script>
