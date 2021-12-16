<template>
  <div :style="style"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'GlobalGap',
  props: {
    size: { type: Number, default: 24 },
  },
  setup(props) {
    const style = computed(() => {
      return {
        height: `${props.size}px`,
      }
    })
    return { style }
  },
})
</script>
