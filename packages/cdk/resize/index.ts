/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResizableComponent, ResizableHandlerComponent } from './src/resizable/types'
import type { ResizeObserverComponent } from './src/resize-observer/types'

import Resizable from './src/resizable/Resizable'
import ResizableHandler from './src/resizable/ResizableHandler'
import ResizeObserver from './src/resize-observer/ResizeObserver'

const CdkResizable = Resizable as unknown as ResizableComponent
const CdkResizableHandler = ResizableHandler as unknown as ResizableHandlerComponent
const CdkResizeObserver = ResizeObserver as unknown as ResizeObserverComponent

export { CdkResizable, CdkResizableHandler, CdkResizeObserver }

export * from './src/resizable/useResizable'
export * from './src/resize-observer/useResizeObserver'
export * from './src/resize-observer/utils'

export type {
  ResizableInstance,
  ResizableComponent,
  ResizablePublicProps as ResizableProps,
  ResizableHandlerInstance,
  ResizableHandlerComponent,
  ResizableHandlerPublicProps as ResizableHandlerProps,
  ResizableOptions,
  ResizableHandlerPlacement,
  ResizePosition,
  ResizableEvent,
} from './src/resizable/types'

export type {
  ResizeObserverInstance,
  ResizeObserverComponent,
  ResizeObserverPublicProps as ResizeObserverProps,
} from './src/resize-observer/types'
