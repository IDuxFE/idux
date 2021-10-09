<template>
  <p>Default size of button: {{ config.size }}</p>
  <br />
  <IxSpace>
    <IxButton @click="changeConfig({ size: 'small' })">Small</IxButton>
    <IxButton @click="changeConfig({ size: 'medium' })">Medium</IxButton>
    <IxButton @click="changeConfig({ size: 'large' })">Large</IxButton>
  </IxSpace>
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
