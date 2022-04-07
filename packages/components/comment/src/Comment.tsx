/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Slots, computed, defineComponent } from 'vue'

import { isString } from 'lodash-es'

import { IxAvatar } from '@idux/components/avatar'
import { useGlobalConfig } from '@idux/components/config'
import { convertStringVNode } from '@idux/components/utils'

import { CommentProps, commentProps } from './types'

export default defineComponent({
  name: 'IxComment',
  props: commentProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-comment`)

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={prefixCls}>
          <div class={`${prefixCls}-inner`}>
            {renderAvatar(props, slots, prefixCls)}
            {renderContent(props, slots, prefixCls)}
          </div>
          {slots.default && <div class={`${prefixCls}-nested`}>{slots.default()}</div>}
        </div>
      )
    }
  },
})

function renderAvatar(props: CommentProps, slots: Slots, prefixCls: string) {
  let avatarNode
  if (slots.avatar) {
    avatarNode = slots.avatar()
  } else if (props.avatar) {
    const { avatar } = props
    const avatarProps = isString(avatar) ? { src: avatar } : avatar
    avatarNode = <IxAvatar {...avatarProps}></IxAvatar>
  }
  return avatarNode && <div class={`${prefixCls}-avatar`}>{avatarNode}</div>
}

function renderContent(props: CommentProps, slots: Slots, prefixCls: string) {
  const contentPrefixCls = `${prefixCls}-content`

  const contentNode = convertStringVNode(slots, props, 'content')
  const authorNode = convertStringVNode(slots, props, 'author')
  const datetimeNode = convertStringVNode(slots, props, 'datetime')

  return (
    <div class={contentPrefixCls}>
      {(authorNode || datetimeNode) && (
        <div class={`${contentPrefixCls}-author`}>
          {authorNode && <span class={`${contentPrefixCls}-author-name`}>{authorNode}</span>}
          {datetimeNode && <span class={`${contentPrefixCls}-author-time`}>{datetimeNode}</span>}
        </div>
      )}
      {contentNode && <div class={`${contentPrefixCls}-detail`}>{contentNode}</div>}
      {slots.actions && (
        <ul class={`${contentPrefixCls}-actions`}>
          {slots.actions().map((action, index) => {
            return <li key={`action-${index}`}>{action}</li>
          })}
        </ul>
      )}
    </div>
  )
}
