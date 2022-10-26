/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, defineComponent, inject, normalizeClass } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { IxIcon } from '@idux/components/icon'

import { buttonToken } from './token'
import { buttonProps } from './types'

export default defineComponent({
  name: 'IxButton',
  props: buttonProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-button`)
    const config = useGlobalConfig('button')
    const groupProps = inject(buttonToken, {})
    const formContext = inject(FORM_TOKEN, null)

    const mode = computed(() => props.mode ?? groupProps.mode ?? 'default')
    const size = computed(() => props.size ?? groupProps.size ?? formContext?.size.value ?? config.size)

    const classes = computed(() => {
      const { block, danger, disabled, ghost, loading, icon, shape = groupProps.shape } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-danger`]: danger,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-ghost`]: ghost,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-icon-only`]: !slots.default && (icon || loading),
        [`${prefixCls}-${mode.value}`]: mode.value,
        [`${prefixCls}-${shape}`]: !!shape,
        [`${prefixCls}-${size.value}`]: true,
      })
    })

    const handleClick = (evt: MouseEvent) => {
      if (props.disabled || props.loading) {
        evt.preventDefault()
        evt.stopImmediatePropagation()
        return
      }
      callEmit(props.onClick, evt)
    }

    return () => {
      const { disabled, loading, icon, type } = props

      const children: VNodeChild[] = []
      if (loading) {
        children.push(<IxIcon name="loading"></IxIcon>)
      } else if (slots.icon) {
        children.push(slots.icon())
      } else if (icon) {
        children.push(<IxIcon name={icon}></IxIcon>)
      }
      if (slots.default) {
        children.push(<span>{slots.default()}</span>)
      }

      if (mode.value === 'link') {
        return (
          <a class={classes.value} onClick={handleClick}>
            {children}
          </a>
        )
      }
      return (
        <button class={classes.value} disabled={disabled || loading} type={type} onClick={handleClick}>
          {children}
        </button>
      )
    }
  },
})
