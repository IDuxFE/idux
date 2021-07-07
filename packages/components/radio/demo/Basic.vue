<template>
  <ix-radio v-model:checked="checked">Checked: {{ checked }}</ix-radio>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(false)
    return { checked }
  },
})
</script>
