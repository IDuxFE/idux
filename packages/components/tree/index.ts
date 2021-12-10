/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeComponent } from './src/types'

import Tree from './src/Tree'

const IxTree = Tree as unknown as TreeComponent

export { IxTree }

export type {
  TreeInstance,
  TreeComponent,
  TreePublicProps as TreeProps,
  TreeNode,
  TreeDroppable,
  TreeDroppableOptions,
  TreeDragDropOptions,
  TreeDropType,
  CheckStrategy as TreeCheckStrategy,
} from './src/types'
