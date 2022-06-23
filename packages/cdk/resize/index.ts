/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResizableComponent, ResizableHandleComponent } from './src/resizable/types'
import type { ResizeObserverComponent } from './src/resize-observer/types'

import Resizable from './src/resizable/Resizable'
import ResizableHandle from './src/resizable/ResizableHandle'
import ResizeObserver from './src/resize-observer/ResizeObserver'

const CdkResizable = Resizable as unknown as ResizableComponent
const CdkResizableHandle = ResizableHandle as unknown as ResizableHandleComponent
const CdkResizeObserver = ResizeObserver as unknown as ResizeObserverComponent

export { CdkResizable, CdkResizableHandle, CdkResizeObserver }

export * from './src/resizable/useResizable'
export * from './src/resize-observer/useResizeObserver'
export * from './src/resize-observer/utils'

export type {
  ResizableInstance,
  ResizableComponent,
  ResizablePublicProps as ResizableProps,
  ResizableHandleInstance,
  ResizableHandleComponent,
  ResizableHandlePublicProps as ResizableHandleProps,
  ResizableOptions,
  ResizableHandlePlacement,
  ResizePosition,
  ResizableEvent,
} from './src/resizable/types'

export type {
  ResizeObserverInstance,
  ResizeObserverComponent,
  ResizeObserverPublicProps as ResizeObserverProps,
} from './src/resize-observer/types'
