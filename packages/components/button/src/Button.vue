<template>
  <component :is="tag" class="ix-button" :class="classes" :disabled="disabled || loading ? true : undefined">
    <ix-icon v-if="loading" name="loading" />
    <ix-icon v-else-if="icon" :name="icon" />
    <span v-if="hasDefaultSlot"><slot></slot></span>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onUpdated, ref } from 'vue'
import { useGlobalConfig } from '@idux/components/core/config'
import { IxIcon } from '@idux/components/icon'
import { buttonGroupInjectionKey } from './button'

import type { ComputedRef, PropType, Ref } from 'vue'
import type { ButtonConfig } from '@idux/components/core/config'
import type { ButtonMode, ComponentSize } from '@idux/components/core/types'
import type { ButtonGroupProps, ButtonProps, ButtonShape } from './types'

export default defineComponent({
  name: 'IxButton',
  components: { IxIcon },
  props: {
    mode: { type: String as PropType<ButtonMode>, default: undefined },
    danger: Boolean,
    ghost: Boolean,
    disabled: Boolean,
    loading: Boolean,
    size: { type: String as PropType<ComponentSize>, default: undefined },
    shape: { type: String as PropType<ButtonShape>, default: undefined },
    block: Boolean,
    icon: { type: String, default: undefined },
  },
  setup(props: ButtonProps, { slots }) {
    const groupProps = inject(buttonGroupInjectionKey, {})
    const buttonConfig = useGlobalConfig('button')

    const mode = computed(() => props.mode ?? (groupProps.mode || buttonConfig.mode))

    const hasDefaultSlot = ref(!!slots.default)
    onUpdated(() => {
      hasDefaultSlot.value = !!slots.default
    })
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
