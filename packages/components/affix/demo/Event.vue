<template>
  <ix-affix :offset="offset" @status-changed="onChanged">
    <ix-button mode="primary">event</ix-button>
  </ix-affix>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const offset = ref(0)
    function onChanged(isAffix) {
      console.log(`status changed:${isAffix}`)
    }
    return {
      onChanged,
      offset,
    }
  },
})
</script>
