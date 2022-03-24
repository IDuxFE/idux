/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Slots, VNodeTypes, computed, defineComponent } from 'vue'

import { isString } from 'lodash-es'

import { IxAvatar } from '@idux/components/avatar'
import { useGlobalConfig } from '@idux/components/config'

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

const renderAvatar = (props: CommentProps, slots: Slots, prefixCls: string) => {
  let avatarNode: VNodeTypes | undefined
  if (slots.avatar) {
    avatarNode = slots.avatar()
  } else if (props.avatar) {
    const { avatar } = props
    const avatarProps = isString(avatar) ? { src: avatar } : avatar
    avatarNode = <IxAvatar {...avatarProps}></IxAvatar>
  }
  return avatarNode ? <div class={`${prefixCls}-avatar`}>{avatarNode}</div> : undefined
}

const renderAuthor = (props: CommentProps, slots: Slots, prefixCls: string) => {
  const author = (slots.author && slots.author()) || props.author
  const datetime = (slots.datetime && slots.datetime()) || props.datetime

  return (
    <div class={`${prefixCls}-content-author`}>
      {author && <span class={`${prefixCls}-content-author-name`}>{author}</span>}
      {datetime && <span class={`${prefixCls}-content-author-time`}>{datetime}</span>}
    </div>
  )
}

const renderAction = (props: CommentProps, slots: Slots, prefixCls: string) => {
  if (!slots.actions) {
    return undefined
  }

  const actionNodes = slots.actions().map((action, index) => {
    return <li key={`action-${index}`}>{action}</li>
  })

  return <ul class={`${prefixCls}-actions`}>{actionNodes}</ul>
}

const renderContent = (props: CommentProps, slots: Slots, prefixCls: string) => {
  let contentNode: VNodeTypes | string | undefined

  if (slots.content) {
    contentNode = slots.content()
  } else if (props.content) {
    contentNode = props.content
  }

  return (
    <div class={`${prefixCls}-content`}>
      {renderAuthor(props, slots, prefixCls)}
      {contentNode && <div class={`${prefixCls}-content-detail`}>{contentNode}</div>}
      {renderAction(props, slots, prefixCls)}
    </div>
  )
}
