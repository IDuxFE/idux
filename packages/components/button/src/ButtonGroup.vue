<template>
  <div class="ix-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { buttonToken } from './utils'

import type { ButtonGroupProps } from './types'

export default defineComponent({
  name: 'IxButtonGroup',
  props: {
    mode: PropTypes.oneOf(['primary', 'default', 'dashed', 'text', 'link'] as const),
    size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
    shape: PropTypes.oneOf(['circle', 'round'] as const),
  },
  setup(props: ButtonGroupProps) {
    provide(buttonToken, props)
  },
})
</script>
