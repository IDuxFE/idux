<template>
  <component
    :is="tag"
    :class="classes"
    :disabled="disabled || loading ? true : undefined"
    :type="tag === 'button' ? type : undefined"
  >
    <ix-icon v-if="loading" name="loading" />
    <ix-icon v-else-if="icon" :name="icon" />
    <span v-if="hasDefaultSlot"><slot></slot></span>
  </component>
</template>

<script lang="ts">
import type { ComputedRef, Ref } from 'vue'
import type { ButtonConfig } from '@idux/components/config'
import { ButtonGroupProps, ButtonProps, ButtonMode } from './types'

import { computed, defineComponent, inject } from 'vue'
import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { buttonPropsDef } from './types'
import { buttonToken } from './utils'

export default defineComponent({
  name: 'IxButton',
  components: { IxIcon },
  props: buttonPropsDef,
  setup(props: ButtonProps, { slots }) {
    const groupProps = inject(buttonToken, {})
    const buttonConfig = useGlobalConfig('button')

    const mode = computed(() => props.mode ?? groupProps.mode ?? 'default')
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
    return {
      'ix-button': true,
      'ix-button-danger': props.danger,
      'ix-button-ghost': props.ghost,
      'ix-button-disabled': props.disabled,
      'ix-button-loading': props.loading,
      'ix-button-block': props.block,
      'ix-button-icon-only': !hasDefaultSlot.value && (!!props.icon || props.loading),
      [`ix-button-${mode.value}`]: mode.value !== 'default',
      [`ix-button-${size}`]: size !== 'medium',
      [`ix-button-${shape}`]: !!shape,
    }
  })
}
</script>
