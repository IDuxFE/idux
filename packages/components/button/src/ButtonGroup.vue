<template>
  <div class="ix-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { ButtonGroupProps } from './types'

import { defineComponent, provide } from 'vue'
import { buttonGroupPropsDef } from './types'
import { buttonToken } from './utils'

export default defineComponent({
  name: 'IxButtonGroup',
  props: buttonGroupPropsDef,
  setup(props: ButtonGroupProps) {
    provide(buttonToken, props)
  },
})
</script>
