<template>
  <IxButton mode="primary" icon="search" loading>Primary</IxButton>
  <IxButton icon="search" loading>Default</IxButton>
  <IxButton mode="dashed" loading>Dashed</IxButton>
  <IxButton mode="text" loading>Text</IxButton>
  <IxButton mode="link" loading href="https://github.com/IDuxFE/idux" target="_blank">Link</IxButton>
  <br />
  <IxButton icon="search" :loading="isLoading">Loading: {{ isLoading }}</IxButton>
  <IxButton @click="changeLoading">Change Loading</IxButton>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isLoading = ref(false)
    const changeLoading = () => {
      isLoading.value = !isLoading.value
    }
    return { isLoading, changeLoading }
  },
})
</script>
