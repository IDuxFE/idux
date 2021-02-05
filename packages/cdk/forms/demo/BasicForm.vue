<template>
  <form><slot /></form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideControl } from '@idux/cdk/forms'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['control'],
  setup(props) {
    provideControl(props.control)
  },
})
</script>
