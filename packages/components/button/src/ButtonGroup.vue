<template>
  <div class="ix-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { ButtonMode, ComponentSize } from '@idux/components/core/types'
import type { ButtonGroupProps, ButtonShape } from './types'

import { defineComponent, provide } from 'vue'
import { buttonGroupInjectionKey } from './button'

export default defineComponent({
  name: 'IxButtonGroup',
  props: {
    mode: { type: String as PropType<ButtonMode>, default: undefined },
    size: { type: String as PropType<ComponentSize>, default: undefined },
    shape: { type: String as PropType<ButtonShape>, default: undefined },
  },
  setup(props: ButtonGroupProps) {
    provide(buttonGroupInjectionKey, props)
  },
})
</script>
