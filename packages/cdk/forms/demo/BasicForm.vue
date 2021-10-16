<template>
  <form><slot /></form>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'

import { controlToken, useValueControl } from '@idux/cdk/forms'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['control'],
  setup() {
    const control = useValueControl()
    provide(controlToken, control)
  },
})
</script>
