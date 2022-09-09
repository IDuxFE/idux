/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { MaybeElementRef } from '@idux/cdk/utils'

export interface DnDPosition {
  x: number
  y: number
}

export type DnDEvent = (evt: DnDEventType, position?: DnDPosition) => void
export type DnDElement = HTMLElement | Window | EventTarget
export type DnDBackendType = 'native' | 'pointer'
export type DnDEventType = DragEvent | TouchEvent | MouseEvent
export type DnDEventName =
  | 'drag'
  | 'dragstart'
  | 'dragend'
  | 'dragenter'
  | 'dragover'
  | 'dragleave'
  | 'drop'
  | 'mousedown'
  | 'mousemove'
  | 'mouseup'
  | 'touchstart'
  | 'touchmove'
  | 'touchend'
  | 'pointerdown'
  | 'pointerup'

export type BoundaryType = 'parent' | Window | MaybeElementRef | null

export interface DraggableOptions {
  /**
   * 作为限制拖拽范围的元素，需自定义droppable时需指定为空
   */
  boundary?: BoundaryType
  /**
   * 指定是否可以拖拽
   */
  free?: boolean
  /**
   * 拖拽把手
   */
  handle?: MaybeElementRef

  /**
   * 拖拽底层实现
   * * `native`: using html5 drag-drop api
   * * `pointer`: using mouse/touch position to simulate
   */
  backend?: DnDBackendType

  onDragStart?: DnDEvent
  onDrag?: DnDEvent
  onDragEnd?: DnDEvent
}

export interface DroppableOptions {
  onDragEnter?: DnDEvent
  onDragOver?: DnDEvent
  onDragLeave?: DnDEvent
  onDrop?: DnDEvent
}
