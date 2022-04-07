/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { AvatarProps } from '@idux/components/avatar'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type CommentAvatar = AvatarProps

export const commentProps = {
  author: {
    type: String,
    default: undefined,
  },
  avatar: {
    type: [String, Object] as PropType<string | CommentAvatar>,
    default: undefined,
  },
  content: {
    type: String,
    default: undefined,
  },
  datetime: {
    type: String,
    default: undefined,
  },
}

export type CommentProps = ExtractInnerPropTypes<typeof commentProps>
export type CommentPublicProps = ExtractPublicPropTypes<typeof commentProps>
export type CommentComponent = DefineComponent<Omit<HTMLAttributes, keyof CommentPublicProps> & CommentPublicProps>
export type CommentInstance = InstanceType<DefineComponent<CommentProps>>
