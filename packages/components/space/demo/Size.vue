<template>
  <IxSpace :size="size">
    Space
    <IxButton>Button</IxButton>
    <IxButton mode="primary">Button</IxButton>
  </IxSpace>
  <br />
  <select v-model="size">
    <option value="small">small</option>
    <option value="medium">medium</option>
    <option value="large">large</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Size',
  setup() {
    const size = ref('small')
    return { size }
  },
})
</script>
