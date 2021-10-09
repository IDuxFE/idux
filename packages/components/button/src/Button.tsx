import type { ComputedRef, Ref, Slots, VNodeTypes } from 'vue'
import type { ButtonConfig } from '@idux/components/config'
import type { ButtonGroupProps, ButtonMode, ButtonProps } from './types'

import { computed, defineComponent, inject } from 'vue'
import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { buttonProps } from './types'
import { buttonToken } from './token'

export default defineComponent({
  name: 'IxButton',
  props: buttonProps,
  setup(props, { slots }) {
    const groupProps = inject(buttonToken, {})
    const buttonConfig = useGlobalConfig('button')

    const mode = computed(() => props.mode ?? groupProps.mode ?? 'default')
    const hasDefaultSlot = computed(() => hasSlot(slots))

    const classes = useClasses(props, groupProps, buttonConfig, mode, hasDefaultSlot)

    return () => {
      const children = renderChildren(props, slots)
      if (mode.value === 'link') {
        return <a class={classes.value}>{children}</a>
      }
      return (
        <button class={classes.value} disabled={props.disabled || props.loading} type={props.type}>
          {children}
        </button>
      )
    }
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
      'ix-button-disabled': props.disabled || props.loading,
      'ix-button-loading': props.loading,
      'ix-button-block': props.block,
      'ix-button-icon-only': !hasDefaultSlot.value && (!!props.icon || props.loading),
      [`ix-button-${mode.value}`]: mode.value !== 'default',
      [`ix-button-${size}`]: true,
      [`ix-button-${shape}`]: !!shape,
    }
  })
}

function renderChildren(props: ButtonProps, slots: Slots) {
  const children: VNodeTypes[] = []
  if (props.loading) {
    children.push(<IxIcon name="loading"></IxIcon>)
  } else if (slots.icon) {
    children.push(slots.icon())
  } else if (props.icon) {
    children.push(<IxIcon name={props.icon}></IxIcon>)
  }
  if (slots.default) {
    children.push(<span>{slots.default()}</span>)
  }
  return children
}
