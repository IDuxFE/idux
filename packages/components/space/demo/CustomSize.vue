<template>
  <ix-space :size="size">
    Space
    <ix-button mode="primary">Button</ix-button>
    <ix-button>Button</ix-button>
  </ix-space>
  <br />
  <input v-model="num" type="number" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomSize',
  setup() {
    const num = ref(20)
    const size = computed(() => +num.value)

    return { num, size }
  },
})
</script>
