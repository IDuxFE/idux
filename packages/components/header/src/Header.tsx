/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AvatarProps } from '@idux/components/avatar'

import { type ComputedRef, type Slot, computed, defineComponent, normalizeClass } from 'vue'

import { isString } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'
import { IxAvatar } from '@idux/components/avatar'
import { useGlobalConfig } from '@idux/components/config'
import { convertIconVNode, convertStringVNode } from '@idux/components/utils'

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

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-with-bar`]: props.showBar,
        [`${prefixCls}-${props.size}`]: true,
      })
    })

    const avatarSize = computed(() => avatarSizeTransformMap[props.size])

    const onPrefixClick = (evt: MouseEvent) => !props.disabled && callEmit(props.onPrefixClick, evt)
    const onSuffixClick = (evt: MouseEvent) => !props.disabled && callEmit(props.onSuffixClick, evt)

    return () => {
      const prefixCls = mergedPrefixCls.value

      const prefixIconNode = convertIconVNode(slots, props, 'prefix')
      const suffixIconNode = convertIconVNode(slots, props, 'suffix')
      const titleNode = convertStringVNode(slots.default, props.title)
      const subTitleNode = convertStringVNode(slots, props, 'subTitle')
      const descriptionNode = convertStringVNode(slots, props, 'description')

      return (
        <div class={classes.value}>
          <div class={`${prefixCls}-content`}>
            {prefixIconNode && (
              <span class={`${prefixCls}-prefix`} onClick={onPrefixClick}>
                {prefixIconNode}
              </span>
            )}
            {renderAvatar(slots.avatar, props.avatar, avatarSize)}
            {titleNode && <span class={`${prefixCls}-title`}>{titleNode}</span>}
            {subTitleNode && <span class={`${prefixCls}-sub-title`}>{subTitleNode}</span>}
            {suffixIconNode && (
              <span class={`${prefixCls}-suffix`} onClick={onSuffixClick}>
                {suffixIconNode}
              </span>
            )}
          </div>
          {descriptionNode && <div class={`${prefixCls}-description`}>{descriptionNode}</div>}
        </div>
      )
    }
  },
})

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
