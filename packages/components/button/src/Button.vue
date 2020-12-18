<template>
  <component :is="tag" class="ix-button" :class="classes" :disabled="disabled || loading">
    <ix-icon v-if="loading" name="loading" />
    <ix-icon v-else-if="icon" :name="icon" />
    <slot></slot>
  </component>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { ButtonMode, ComponentSize } from '@idux/components/core/types'
import type { ButtonConfig } from '@idux/components/core/config'
import type { ButtonGroupProps, ButtonProps, ButtonShape } from './types'

import { computed, defineComponent, inject } from 'vue'
import { useGlobalConfig } from '@idux/components/core/config'
import { buttonGroupInjectionKey } from './button'
import { IxIcon } from '@idux/components/icon'

export default defineComponent({
  name: 'IxButton',
  components: { IxIcon },
  props: {
    mode: String as PropType<ButtonMode>,
    danger: Boolean,
    ghost: Boolean,
    disabled: Boolean,
    loading: Boolean,
    size: String as PropType<ComponentSize>,
    shape: String as PropType<ButtonShape>,
    block: Boolean,
    icon: String,
  },
  setup(props: ButtonProps) {
    const groupProps = inject(buttonGroupInjectionKey, {})
    const buttonConfig = useGlobalConfig('button')
    const classes = useClasses(props, groupProps, buttonConfig)

    const tag = computed(() => (props.mode === 'link' ? 'a' : 'button'))
    return { classes, tag }
  },
})

const useClasses = (props: ButtonProps, groupProps: ButtonGroupProps, config: ButtonConfig) => {
  return computed(() => {
    const mode = props.mode || groupProps.mode || config.mode
    const size = props.size || groupProps.size || config.size
    const shape = props.shape || groupProps.shape
    return [
      mode !== 'default' ? `ix-button-${mode}` : '',
      size !== 'medium' ? `ix-button-${size}` : '',
      shape ? `ix-button-${shape}` : '',
      {
        'ix-button-danger': props.danger,
        'ix-button-ghost': props.ghost,
        'ix-button-disabled': props.disabled,
        'ix-button-loading': props.loading,
        'ix-button-block': props.block,
      },
    ]
  })
}
</script>
