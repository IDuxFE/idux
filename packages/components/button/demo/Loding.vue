<template>
  <ix-button mode="primary" icon="search" loading>Primary</ix-button>
  <ix-button icon="search" loading>Default</ix-button>
  <ix-button mode="dashed" loading>Dashed</ix-button>
  <ix-button mode="text" loading>Text</ix-button>
  <ix-button mode="link" loading href="https://github.com/IduxFE/idux" target="_blank">Link</ix-button>
  <br />
  <ix-button icon="search" :loading="isLoading">Loading: {{ isLoading }}</ix-button>
  <ix-button @click="changeLoading">Change Loading</ix-button>
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
