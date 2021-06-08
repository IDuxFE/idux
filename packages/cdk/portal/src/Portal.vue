<template>
  <teleport :disabled="disabled" :to="to">
    <slot />
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { portalProps } from './types'
import { useContainer } from './useContainer'

export default defineComponent({
  name: 'IxPortal',
  props: portalProps,
  setup(props) {
    const to = computed(() => useContainer(props.target))

    return { to }
  },
})
</script>
