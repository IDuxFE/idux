<template>
  <div class="ix-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import { buttonGroupProps } from './types'
import { buttonToken } from './token'

export default defineComponent({
  name: 'IxButtonGroup',
  props: buttonGroupProps,
  setup(props) {
    provide(buttonToken, props)
  },
})
</script>
