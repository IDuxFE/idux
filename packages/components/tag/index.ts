/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TagComponent, TagGroupComponent } from './src/types'

import Tag from './src/Tag'
import TagGroup from './src/TagGroup'

const IxTag = Tag as unknown as TagComponent
const IxTagGroup = TagGroup as unknown as TagGroupComponent

export { IxTag, IxTagGroup }

export type {
  TagInstance,
  TagComponent,
  TagPublicProps as TagProps,
  TagGroupInstance,
  TagGroupComponent,
  TagGroupPublicProps as TagGroupProps,
  TagData,
  TagShape,
  TagStatus,
} from './src/types'
