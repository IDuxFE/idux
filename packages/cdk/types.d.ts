/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DraggableComponent } from '@idux/cdk/drag-drop'
import type { PortalComponent } from '@idux/cdk/portal'
import type { ResizableComponent, ResizableHandleComponent, ResizeObserverComponent } from '@idux/cdk/resize'
import type { VirtualScrollComponent } from '@idux/cdk/scroll'

declare module 'vue' {
  export interface GlobalComponents {
    CdkDraggable: DraggableComponent
    CdkPortal: PortalComponent
    CdkResizable: ResizableComponent
    CdkResizableHandle: ResizableHandleComponent
    CdkResizeObserver: ResizeObserverComponent
    CdkVirtualScroll: VirtualScrollComponent
  }
}

export {}
