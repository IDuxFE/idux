/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { AvatarProps } from '@idux/components/avatar'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type CommentAvatar = AvatarProps

export const commentProps = {
  author: IxPropTypes.string,
  avatar: IxPropTypes.oneOfType([String, IxPropTypes.object<CommentAvatar>()]),
  content: IxPropTypes.string,
  datetime: IxPropTypes.string,
}

export type CommentProps = ExtractInnerPropTypes<typeof commentProps>
export type CommentPublicProps = ExtractPublicPropTypes<typeof commentProps>
export type CommentComponent = DefineComponent<Omit<HTMLAttributes, keyof CommentPublicProps> & CommentPublicProps>
export type CommentInstance = InstanceType<DefineComponent<CommentProps>>
