/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndOptions, DraggableOptions, DropTargetOptions } from './dnd'
import type {
  ElementDropTargetGetFeedbackArgs,
  ElementGetFeedbackArgs,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import type { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/types'
import type { Instruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item'
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import type { VKey } from '@idux/cdk/utils'
import type { Ref } from 'vue'

export interface CanDragOptions {
  sourceKey: VKey
  sourceIndex: number | undefined
  sourceData: DndSortableData | undefined
}
export interface CanDropOptions extends Omit<CanDragOptions, 'sourceKey'> {
  sourceKey: VKey | undefined
  targetKey: VKey
  targetIndex: number | undefined
  targetData: DndSortableData | undefined
}

export type GetKey = (item: unknown) => VKey
export type DndSortableDirection = 'vertical' | 'horizontal'
export type DndSortableStrategy = 'list' | 'tree'
export type DndSortablePreviewOptions =
  | boolean
  | {
      offset?: { x: number; y: number }
      mount?: (state: DndSortablePreviewState) => void
      unmount?: (state: DndSortablePreviewState) => void
    }

export type DndSortableDraggableOptions = Omit<DraggableOptions, 'canDrag'> & {
  key: VKey
  preview?: DndSortablePreviewOptions
  canDrag?: (args: ElementGetFeedbackArgs & CanDragOptions) => boolean | undefined
}
export type DndSortableDropTargetOptions = Omit<DropTargetOptions, 'canDrop'> & {
  key: VKey
  direction?: DndSortableDirection
  canDrop?: (args: ElementDropTargetGetFeedbackArgs & CanDropOptions) => boolean | undefined
  isSticky?: (options: DndSortableIsStickyOptions) => boolean | undefined
}

export type DndSortableData<C extends keyof V = never, V extends object = Record<string, unknown>> = {
  [c in C]?: DndSortableData[]
} & V

export type DndSortableInnerData<
  C extends keyof V = never,
  V extends object = Record<string, unknown>,
> = DndSortableData<C, V> & {
  _data_index: number
}

export interface DndSortableTransferData {
  key: VKey
  listData: DndSortableInnerData
  listDataIndex: number
  direction?: DndSortableDirection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | symbol]: any
}

export interface BaseDndSortableEventArgs {
  location: DragLocationHistory
  key: VKey
  data: DndSortableData
}
export interface DndSortableEvetWithSourceArgs extends BaseDndSortableEventArgs {
  sourceKey: VKey
  sourceData: DndSortableData
}
export interface DndSortableOnDragArgs extends BaseDndSortableEventArgs {}
export interface DndSortableOnDragStartArgs extends BaseDndSortableEventArgs {}
export interface DndSortableOnDragEnterArgs extends DndSortableEvetWithSourceArgs {}
export interface DndSortableOnDragLeaveArgs extends DndSortableEvetWithSourceArgs {}
export interface DndSortableOnDropArgs
  extends Omit<DndSortableEvetWithSourceArgs, 'key' | 'data'>,
    Partial<Pick<DndSortableEvetWithSourceArgs, 'key' | 'data'>> {}

export interface DndSortableDraggingState {
  key: VKey
  data: DndSortableData | undefined
  index: number | undefined
}
export interface DndSortableDraggingOverState<Instructions extends object = Record<string, unknown>> {
  key: VKey
  data: DndSortableData | undefined
  index: number | undefined
  instruction: Instructions | null
}
export interface DndSortablePreviewState {
  key: VKey
  data: DndSortableData | undefined
  index: number | undefined
  container: HTMLElement
}

export type ListInstruction = { edge: Edge }
export type TreeInstruction = Instruction & { parent?: { key: VKey; level: number } }
export type ListDraggingOverState = DndSortableDraggingOverState<ListInstruction>
export type TreeDraggingOverState = DndSortableDraggingOverState<TreeInstruction>

export interface DndSortableIsStickyOptions {
  key: VKey
  data: DndSortableData | undefined
  index: number | undefined
}

export interface DndSortableReorderInfo {
  sourceIndex: number
  targetIndex: number
  sourceKey: VKey
  targetKey: VKey
  sourceData: DndSortableData
  targetData: DndSortableData
  operation: 'insertBefore' | 'insertAfter' | 'insertChild'
}

export interface DndSortableOptions<C extends keyof V = never, V extends object = Record<string, unknown>> {
  dataSource: Ref<DndSortableData<C, V>[]>
  direction?: Ref<DndSortableDirection>
  childrenKey?: string | Ref<string | undefined>
  treeIndent?: number | Ref<number | undefined>
  getKey?: Ref<GetKey | string | undefined>
  preview?: Ref<DndSortablePreviewOptions | undefined>
  strategy?: DndSortableStrategy | Ref<DndSortableStrategy | undefined>
  canDrag?: (options: CanDragOptions) => boolean | undefined
  canDrop?: (options: CanDropOptions) => boolean | undefined
  isSticky?: (options: DndSortableIsStickyOptions) => boolean | undefined
  isTreeItemExpanded?: (key: VKey, data: DndSortableData<C, V>) => void

  onDragStart?: (args: DndSortableOnDragStartArgs) => void
  onDrag?: (args: DndSortableOnDragArgs) => void
  onDragEnter?: (args: DndSortableOnDragEnterArgs) => void
  onDragLeave?: (args: DndSortableOnDragLeaveArgs) => void
  onDrop?: (args: DndSortableOnDropArgs) => void
  onSortReorder?: (info: DndSortableReorderInfo) => void
  onSortChange?: (newDataSource: DndSortableData[], oldDataSource: DndSortableData[]) => void
}

export interface DndSortableStrategyContext {
  getData: (key: VKey) => DndSortableInnerData | undefined
  getDataIndex: (key: VKey) => number | undefined
  getDropTargetData?: (
    args: ElementDropTargetGetFeedbackArgs,
    data: DndSortableTransferData,
  ) => Record<string | symbol, unknown>
  dataExists: (key: VKey) => boolean
  reorder: (args: { sourceData: DndSortableTransferData; targetData: DndSortableTransferData }) => {
    reorderInfo: DndSortableReorderInfo
    newData: DndSortableData[]
    oldData: DndSortableData[]
  } | null
  eventHandlers: Partial<
    Pick<DndOptions, 'onDrag' | 'onDragStart' | 'onDragEnter' | 'onDragLeave' | 'onDragOfTarget' | 'onDrop'>
  >
}
