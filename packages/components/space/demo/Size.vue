<template>
  <IxSpace :size="size">
    Space
    <IxButton>Button</IxButton>
    <IxButton mode="primary">Button</IxButton>
  </IxSpace>
  <br />
  <select v-model="size">
    <option value="sm">small</option>
    <option value="md">medium</option>
    <option value="lg">large</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { SpaceSize } from '@idux/components/space'

export default defineComponent({
  name: 'Size',
  setup() {
    const size = ref<SpaceSize>('sm')
    return { size }
  },
})
</script>
