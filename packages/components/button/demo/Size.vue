<template>
  <ix-button @click="changeSize('large')">Large</ix-button>
  <ix-button @click="changeSize('medium')">Medium</ix-button>
  <ix-button @click="changeSize('small')">Small</ix-button>
  <br />
  <ix-button mode="primary" :size="size">Primary</ix-button>
  <ix-button :size="size">Default</ix-button>
  <ix-button mode="dashed" :size="size">Dashed</ix-button>
  <ix-button mode="text" :size="size">Text</ix-button>
  <ix-button mode="link" :size="size" href="https://github.com/IduxFE/idux" target="_blank">Link</ix-button>
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
