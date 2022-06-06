/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export * from './src/draggable/useDraggable'

import type { DraggableComponent } from './src/draggable/types'

import Draggable from './src/draggable/Draggable'

const CdkDraggable = Draggable as unknown as DraggableComponent

export { CdkDraggable }

export type {
  DraggableInstance,
  DraggableComponent,
  DraggablePublicProps as DraggableProps,
} from './src/draggable/types'
