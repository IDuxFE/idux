/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef } from 'vue'

import { MaybeElementRef } from '@idux/cdk/utils'

export interface DragPosition {
  left?: number
  top?: number
  offsetX?: number
  offsetY?: number
}

export type DnDEvent = (evt: DragEvent, position?: DragPosition) => void
export type DnDElement = HTMLElement | Window | EventTarget
export type DnDElementType = 'source' | 'target'
export type DnDEventName =
  | 'drag'
  | 'dragstart'
  | 'dragend'
  | 'dragenter'
  | 'dragover'
  | 'dragleave'
  | 'drop'
  | 'pointerdown'
  | 'pointerup'
export type BoundaryType = 'parent' | Window | MaybeElementRef | null

export interface DnDState {
  canDrop: ComputedRef<boolean>
  currPosition: ComputedRef<DragPosition>
  isDragging: ComputedRef<boolean>
  draggingElement: ComputedRef<HTMLElement | Window | EventTarget>
  updatePosition: (evt: DragEvent, position: DragPosition) => void
}
