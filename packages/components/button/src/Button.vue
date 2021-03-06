<template>
  <component :is="tag" class="ix-button" :class="classes" :disabled="disabled || loading ? true : undefined">
    <ix-icon v-if="loading" name="loading" />
    <ix-icon v-else-if="icon" :name="icon" />
    <span v-if="hasDefaultSlot"><slot></slot></span>
  </component>
</template>

<script lang="ts">
import type { ComputedRef, Ref } from 'vue'
import type { ButtonConfig } from '@idux/components/core/config'
import type { ButtonMode, ButtonGroupProps, ButtonProps } from './types'

import { computed, defineComponent, inject } from 'vue'
import { hasSlot, PropTypes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/core/config'
import { IxIcon } from '@idux/components/icon'
import { buttonToken } from './utils'

export default defineComponent({
  name: 'IxButton',
  components: { IxIcon },
  props: {
    mode: PropTypes.oneOf(['primary', 'default', 'dashed', 'text', 'link'] as const),
    danger: PropTypes.bool,
    ghost: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
    shape: PropTypes.oneOf(['circle', 'round'] as const),
    block: PropTypes.bool,
    icon: PropTypes.string,
  },
  setup(props: ButtonProps, { slots }) {
    const groupProps = inject(buttonToken, {})
    const buttonConfig = useGlobalConfig('button')

    const mode = computed(() => props.mode ?? (groupProps.mode || buttonConfig.mode))
    const hasDefaultSlot = computed(() => hasSlot(slots))

    const classes = useClasses(props, groupProps, buttonConfig, mode, hasDefaultSlot)
    const tag = computed(() => (mode.value === 'link' ? 'a' : 'button'))

    return { classes, tag, hasDefaultSlot }
  },
})

const useClasses = (
  props: ButtonProps,
  groupProps: ButtonGroupProps,
  config: ButtonConfig,
  mode: ComputedRef<ButtonMode>,
  hasDefaultSlot: Ref<boolean>,
) => {
  return computed(() => {
    const size = props.size ?? (groupProps.size || config.size)
    const shape = props.shape ?? groupProps.shape
    return [
      mode.value !== 'default' ? `ix-button-${mode.value}` : '',
      size !== 'medium' ? `ix-button-${size}` : '',
      shape ? `ix-button-${shape}` : '',
      {
        'ix-button-danger': props.danger,
        'ix-button-ghost': props.ghost,
        'ix-button-disabled': props.disabled,
        'ix-button-loading': props.loading,
        'ix-button-block': props.block,
        'ix-button-icon-only': !hasDefaultSlot.value && (!!props.icon || props.loading),
      },
    ]
  })
}
</script>
