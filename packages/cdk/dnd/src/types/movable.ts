/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Axis, DndOptions } from './dnd'
import type { MaybeElement, MaybeElementRef, MaybeRef } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

export type DndMovableBoundaryType =
  | 'parent'
  | 'viewport'
  | MaybeElement
  | ((el: HTMLElement | undefined) => ResolvedBoundary | undefined)
  | null
export type DndMovableStrategy = 'fixed' | 'absolute' | 'transform'
export type DndMovableMode = 'immediate' | 'afterDrop'

export interface Position {
  x: number
  y: number
}

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface ResolvedBoundary {
  left: number
  right: number
  top: number
  bottom: number
}

export type DndMovablePreviewOptions =
  | boolean
  | {
      offset?: { x: number; y: number }
      mount?: (args: { container: HTMLElement }) => void
      unmount?: (args: { container: HTMLElement }) => void
    }

export interface DndMovableOptions extends Omit<DndOptions, 'monitor'> {
  offset?: Ref<Position | undefined>
  mode?: MaybeRef<DndMovableMode | undefined>
  strategy?: MaybeRef<DndMovableStrategy | undefined>
  canDrag?: MaybeRef<boolean | undefined>
  draggableElement: MaybeElementRef
  dropTargets?: MaybeRef<MaybeElement[] | undefined>
  boundary?: MaybeRef<DndMovableBoundaryType | undefined>
  dragHandle?: MaybeElementRef
  allowedAxis?: MaybeRef<Axis>
  preview?: MaybeRef<DndMovablePreviewOptions>
  onOffsetChange?: (newOffset: Position, oldOffset: Position) => void
}

export interface ResolvedMovableOptions extends Omit<DndOptions, 'monitor'> {
  offset: ComputedRef<Position | undefined>
  mode: ComputedRef<DndMovableMode>
  strategy: ComputedRef<DndMovableStrategy>
  canDrag: ComputedRef<boolean>
  draggableElement: ComputedRef<HTMLElement | undefined>
  dropTargets: ComputedRef<Element[] | undefined>
  boundary: ComputedRef<ResolvedBoundary | undefined>
  dragHandle: ComputedRef<HTMLElement | undefined>
  allowedAxis: ComputedRef<Axis>
  preview: ComputedRef<DndMovablePreviewOptions | undefined>
  onOffsetChange?: (newOffset: Position, oldOffset: Position) => void
}
