<template>
  <IxButton @click="changeSize('large')">Large</IxButton>
  <IxButton @click="changeSize('medium')">Medium</IxButton>
  <IxButton @click="changeSize('small')">Small</IxButton>
  <br />
  <IxButton mode="primary" :size="size">Primary</IxButton>
  <IxButton :size="size">Default</IxButton>
  <IxButton mode="dashed" :size="size">Dashed</IxButton>
  <IxButton mode="text" :size="size">Text</IxButton>
  <IxButton mode="link" :size="size" href="https://github.com/IDuxFE/idux" target="_blank">Link</IxButton>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const size = ref('large')
    const changeSize = (value: string) => {
      size.value = value
    }
    return { size, changeSize }
  },
})
</script>
