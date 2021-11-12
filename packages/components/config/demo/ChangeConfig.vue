<template>
  <p>Default size of button: {{ config.size }}</p>
  <br />
  <IxSpace>
    <IxButton @click="changeConfig({ size: 'sm' })">Small</IxButton>
    <IxButton @click="changeConfig({ size: 'md' })">Medium</IxButton>
    <IxButton @click="changeConfig({ size: 'lg' })">Large</IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  setup() {
    const { config, changeConfig } = useGlobalConfig('button', { size: 'md' })
    return { config, changeConfig }
  },
})
</script>
