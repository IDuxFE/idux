<template>
  <IxCheckbox v-model:checked="checked" buttoned label="选项" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    return {
      checked,
    }
  },
})
</script>
