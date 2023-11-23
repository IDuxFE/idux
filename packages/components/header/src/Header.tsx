/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Slot, computed, defineComponent, normalizeClass } from 'vue'

import { isString } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'
import { type AvatarProps, IxAvatar } from '@idux/components/avatar'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { convertIconVNode, convertStringVNode } from '@idux/components/utils'

import { type HeaderSize, headerProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxHeader',
  props: headerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('header')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-header`)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-${props.size}`]: true,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-with-bar`]: props.showBar,
        [`${prefixCls}-with-description`]: props.description || slots.description,
      })
    })

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
          {prefixIconNode && (
            <span class={`${prefixCls}-prefix`} onClick={onPrefixClick}>
              {prefixIconNode}
            </span>
          )}
          {renderAvatar(slots.avatar, props.avatar, props.size)}
          <div class={`${prefixCls}-content`}>
            <div class={`${prefixCls}-title-wrapper`}>
              {titleNode && <span class={`${prefixCls}-title`}>{titleNode}</span>}
              {subTitleNode && <span class={`${prefixCls}-sub-title`}>{subTitleNode}</span>}
            </div>
            {descriptionNode && <div class={`${prefixCls}-description`}>{descriptionNode}</div>}
          </div>
          {suffixIconNode && (
            <span class={`${prefixCls}-suffix`} onClick={onSuffixClick}>
              {suffixIconNode}
            </span>
          )}
        </div>
      )
    }
  },
})

const renderAvatar = (slot: Slot | undefined, avatar: string | AvatarProps | undefined, size: HeaderSize) => {
  if (slot) {
    return slot()
  }

  if (!avatar) {
    return null
  }

  const avatarProps = isString(avatar) ? { icon: avatar } : avatar
  return <IxAvatar size={size} {...avatarProps}></IxAvatar>
}
