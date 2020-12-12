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
    mode: String as PropType<ButtonMode>,
    size: String as PropType<ComponentSize>,
    shape: String as PropType<ButtonShape>,
  },
  setup(props: ButtonGroupProps) {
    provide(buttonGroupInjectionKey, props)
  },
})
</script>
