/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResizableHandlerPlacement } from './types'
import type { DragPosition } from '@idux/cdk/drag-drop'
import type { InjectionKey } from 'vue'

export interface ResizableContext {
  handleStart: (placement: ResizableHandlerPlacement, position: DragPosition, evt: PointerEvent) => void
  handleMove: (placement: ResizableHandlerPlacement, position: DragPosition, evt: PointerEvent) => void
  handleEnd: (placement: ResizableHandlerPlacement, position: DragPosition, evt: PointerEvent) => void
}

export const resizableToken: InjectionKey<ResizableContext> = Symbol('resizable')
