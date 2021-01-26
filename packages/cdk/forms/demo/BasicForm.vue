<template>
  <form><slot /></form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideControl } from '@idux/cdk/forms'

export default defineComponent({
  props: ['control'],
  setup(props) {
    provideControl(props.control)
  },
  template: `<form><slot /></form>`,
})
</script>
