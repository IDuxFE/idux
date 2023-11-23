/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CommentComponent } from './src/types'

import Comment from './src/Comment'

const IxComment = Comment as unknown as CommentComponent

export { IxComment }

export type { CommentInstance, CommentComponent, CommentPublicProps as CommentProps, CommentAvatar } from './src/types'

export { getThemeTokens as getCommentThemeTokens } from './theme'
export type { CommentThemeTokens } from './theme'
