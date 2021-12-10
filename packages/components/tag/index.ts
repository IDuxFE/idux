/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TagComponent } from './src/types'

import Tag from './src/Tag'

const IxTag = Tag as unknown as TagComponent

export { IxTag }

export type { TagInstance, TagComponent, TagPublicProps as TagProps, TagShape } from './src/types'
