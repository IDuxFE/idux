/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  DndBoxIndicatorComponent,
  DndMovableComponent,
  DndSortableComponent,
  DndSortableItemComponent,
  DndTreeIndicatorComponent,
} from './src/types'

import DndBoxIndicator from './src/indicator/DndBoxIndicator'
import DndTreeIndicator from './src/indicator/DndTreeIndicator'
import DndMovable from './src/movable/DndMovable'
import DndMovableHandle from './src/movable/DndMovableHandle'
import DndSortable from './src/sortable/DndSortable'
import DndSortableHandle from './src/sortable/DndSortableHandle'
import DndSortableItem from './src/sortable/DndSortableItem'

const CdkDndSortable = DndSortable as DndSortableComponent
const CdkDndSortableItem = DndSortableItem as DndSortableItemComponent
const CdkDndSortableHandle = DndSortableHandle
const CdkDndBoxIndicator = DndBoxIndicator as DndBoxIndicatorComponent
const CdkDndTreeIndicator = DndTreeIndicator as DndTreeIndicatorComponent

const CdkDndMovable = DndMovable as DndMovableComponent
const CdkDndMovableHandle = DndMovableHandle

export * from './src/composables/useDndContext'
export * from './src/composables/useDndSortable'
export * from './src/composables/useDndAutoScroll'
export { reorderList, reorderTree, triggerPostMoveFlash } from './src/utils'

export { CDK_DND_SORTABLE_TOKEN } from './src/tokens'

export {
  CdkDndSortable,
  CdkDndSortableItem,
  CdkDndSortableHandle,
  CdkDndBoxIndicator,
  CdkDndTreeIndicator,
  CdkDndMovable,
  CdkDndMovableHandle,
}

export type {
  Axis,
  CanDragOptions,
  CanDropOptions,
  DndSortableData,
  DndSortableDraggingState,
  DndSortableDraggingOverState,
  DndSortablePreviewState,
  DndSortableDirection,
  DndSortableReorderInfo,
  DndBoxIndicatorProps,
  DndBoxIndicatorComponent,
  DndTreeIndicatorProps,
  DndTreeIndicatorComponent,
  DndSortableProps,
  DndSortableComponent,
  DndSortableInstance,
  DndSortableItemComponent,
  DndSortableItemProps,
  DndSortableItemInstance,
  DndMovableProps,
  DndMovableComponent,
  DndMovableInstance,
  DndMovableMode,
  DndMovableStrategy,
  DndMovableOptions,
  DndMovableBoundaryType,
  DndMovablePreviewOptions,
  DndSortableIsStickyOptions,
  DndSortableOnDragArgs,
  DndSortableOnDragStartArgs,
  DndSortableOnDragEnterArgs,
  DndSortableOnDragLeaveArgs,
  DndSortableOnDropArgs,
  DndSortableOptions,
  DndSortableStrategy,
  ListDraggingOverState,
  TreeDraggingOverState,
  ListInstruction,
  TreeInstruction,
} from './src/types'
