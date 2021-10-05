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

    const mode$$ = computed(() => props.mode ?? groupProps.mode ?? 'default')
    const hasDefaultSlot = computed(() => hasSlot(slots))

    const classes = useClasses(props, groupProps, buttonConfig, mode$$, hasDefaultSlot)

    return { classes, mode$$ }
  },

  render() {
    const { classes, mode$$ } = this
    const child = renderChild(this.$slots, this.loading, this.icon)
    if (mode$$ === 'link') {
      return <a class={classes}>{child}</a>
    } else {
      return (
        <button class={classes} disabled={this.disabled || this.loading} type={this.type}>
          {child}
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
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const size = props.size ?? (groupProps.size || config.size)
    const shape = props.shape ?? groupProps.shape
    return {
      [`${prefixCls}-button`]: true,
      [`${prefixCls}-button-danger`]: props.danger,
      [`${prefixCls}-button-ghost`]: props.ghost,
      [`${prefixCls}-button-disabled`]: props.disabled || props.loading,
      [`${prefixCls}-button-loading`]: props.loading,
      [`${prefixCls}-button-block`]: props.block,
      [`${prefixCls}-button-icon-only`]: !hasDefaultSlot.value && (!!props.icon || props.loading),
      [`${prefixCls}-button-${mode.value}`]: mode.value !== 'default',
      [`${prefixCls}-button-${size}`]: size !== 'medium',
      [`${prefixCls}-button-${shape}`]: !!shape,
    }
  })
}

const renderChild = (slots: Slots, loading: boolean | undefined, icon: string | undefined) => {
  const child: VNodeTypes[] = []
  if (loading) {
    child.push(<IxIcon name="loading"></IxIcon>)
  } else if (slots.icon) {
    child.push(slots.icon())
  } else if (icon) {
    child.push(<IxIcon name={icon}></IxIcon>)
  }
  if (slots.default) {
    child.push(<span>{slots.default()}</span>)
  }
  return child
}
