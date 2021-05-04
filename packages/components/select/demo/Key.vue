<template>
  <ix-select v-model:value="singleValue" :options="options" labelKey="text" valueKey="id"> </ix-select>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const singleValue = ref('tom')

    const options = [
      { text: 'Tom', id: 'tom' },
      { text: 'Jerry', id: 'jerry' },
      { text: 'Speike', id: 'speike', disabled: true },
    ]

    return { singleValue, options }
  },
})
</script>
