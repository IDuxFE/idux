/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

// export { useDragDropContext, type DragDropContext } from './src/composables/useDragDropContext' // exclude inner map
export * from './src/composables/useDraggable'
export * from './src/composables/useDroppable'

import type { DraggableComponent } from './src/draggable/types'

import Draggable from './src/draggable/Draggable'

const CdkDraggable = Draggable as unknown as DraggableComponent

export { CdkDraggable }

export type { DnDElement, DnDEvent, DragPosition, BoundaryType, DnDState } from './src/types'

export type {
  DraggableInstance,
  DraggableComponent,
  DraggablePublicProps as DraggableProps,
} from './src/draggable/types'
