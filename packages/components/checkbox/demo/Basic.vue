<template>
  <IxCheckbox v-model:checked="checked" label="选项" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(false)
    return {
      checked,
    }
  },
})
</script>
