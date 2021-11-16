/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { HeaderProps } from './types'
import type { AvatarProps } from '@idux/components/avatar'
import type { ComputedRef, Slot, VNode } from 'vue'

import { computed, defineComponent, isVNode } from 'vue'

import { isString } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'
import { IxAvatar } from '@idux/components/avatar'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { headerProps } from './types'

const avatarSizeTransformMap = {
  xl: 'md',
  lg: 'md',
  md: 'sm',
  sm: 'sm',
} as const

export default defineComponent({
  name: 'IxHeader',
  props: headerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-header`)

    const classes = useClasses(props, mergedPrefixCls)

    const avatarSize = computed(() => avatarSizeTransformMap[props.size])

    const onPrefixClick = (evt: MouseEvent) => !props.disabled && callEmit(props.onPrefixClick, evt)
    const onSuffixClick = (evt: MouseEvent) => !props.disabled && callEmit(props.onSuffixClick, evt)

    return () => {
      const { prefix, suffix, avatar, title, subTitle } = props
      const prefixCls = mergedPrefixCls.value
      return (
        <div class={classes.value}>
          <div class={`${prefixCls}-content`}>
            {renderIcon(slots.prefix, prefix, onPrefixClick, `${prefixCls}-prefix`)}
            {renderAvatar(slots.avatar, avatar, avatarSize)}
            {renderTitle(slots.default, title, `${prefixCls}-title`)}
            {renderTitle(slots.subTitle, subTitle, `${prefixCls}-sub-title`)}
            {renderIcon(slots.suffix, suffix, onSuffixClick, `${prefixCls}-suffix`)}
          </div>
          {slots.description ? <div class={`${prefixCls}-description`}>{slots.description()}</div> : null}
        </div>
      )
    }
  },
})

const useClasses = (props: HeaderProps, mergedPrefixCls: ComputedRef<string>) => {
  return computed(() => {
    const prefixCls = mergedPrefixCls.value
    return {
      [prefixCls]: true,
      [`${prefixCls}-bar`]: props.showBar,
      [`${prefixCls}-disabled`]: props.disabled,
      [`${prefixCls}-${props.size}`]: true,
    }
  })
}

const renderIcon = (
  slot: Slot | undefined,
  icon: string | VNode | undefined,
  onClick: (evt: MouseEvent) => void,
  wrapperClassName: string,
) => {
  if (!slot && !icon) {
    return null
  }
  const iconNode = slot ? slot() : isVNode(icon) ? icon : <IxIcon name={icon} />
  return (
    <div class={wrapperClassName} onClick={onClick}>
      {iconNode}
    </div>
  )
}

const renderTitle = (slot: Slot | undefined, title: string | undefined, wrapperClassName: string) => {
  if (!slot && !title) {
    return null
  }
  return <span class={wrapperClassName}>{slot?.() ?? title}</span>
}

const renderAvatar = (
  slot: Slot | undefined,
  avatar: string | AvatarProps | undefined,
  size: ComputedRef<'md' | 'sm'>,
) => {
  if (slot) {
    return slot()
  }

  if (!avatar) {
    return null
  }

  const avatarProps = isString(avatar) ? { icon: avatar } : avatar
  return <IxAvatar size={size.value} {...avatarProps}></IxAvatar>
}
