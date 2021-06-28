<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { controlProp, provideControl, useValueControl } from '@idux/cdk/forms'

export default defineComponent({
  name: 'IxFormWrapper',
  props: { control: controlProp },

  setup() {
    const control = useValueControl()
    watchEffect(() => {
      provideControl(control.value!)
    })
  },
})
</script>
