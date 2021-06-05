<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { controlPropTypeDef, provideControl, useValueControl } from '@idux/cdk/forms'

export default defineComponent({
  name: 'IxFormWrapper',
  props: { control: controlPropTypeDef },

  setup() {
    const control = useValueControl()
    watchEffect(() => {
      provideControl(control.value!)
    })
  },
})
</script>
