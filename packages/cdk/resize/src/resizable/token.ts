/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResizableHandlerPlacement } from './types'
import type { InjectionKey } from 'vue'

export interface ResizableContext {
  handleResizeStart: (placement: ResizableHandlerPlacement, evt: PointerEvent) => void
  handleResizing: (placement: ResizableHandlerPlacement, evt: PointerEvent) => void
  handleResizeEnd: (placement: ResizableHandlerPlacement, evt: PointerEvent) => void
}

export const resizableToken: InjectionKey<ResizableContext> = Symbol('resizable')
