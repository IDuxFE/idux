/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ClickOutsideComponent, ClickOutsideDirective } from '@idux/cdk/click-outside'
import type {
  DndBoxIndicatorComponent,
  DndMovableComponent,
  DndSortableComponent,
  DndSortableItemComponent,
  DndTreeIndicatorComponent,
} from '@idux/cdk/dnd'
import type { DraggableComponent } from '@idux/cdk/drag-drop'
import type { PortalComponent } from '@idux/cdk/portal'
import type { ResizableComponent, ResizableHandleComponent, ResizeObserverComponent } from '@idux/cdk/resize'
import type { VirtualScrollComponent } from '@idux/cdk/scroll'

declare module 'vue' {
  export interface GlobalComponents {
    CdkClickOutside: ClickOutsideComponent
    /**
     * @deprecated please use `CdkDndMovable` instead'
     */
    CdkDraggable: DraggableComponent
    CdkDndSortable: DndSortableComponent
    CdkDndSortableItem: DndSortableItemComponent
    CdkDndMovable: DndMovableComponent
    CdkDndBoxIndicator: DndBoxIndicatorComponent
    CdkDndTreeIndicator: DndTreeIndicatorComponent
    CdkPortal: PortalComponent
    CdkResizable: ResizableComponent
    CdkResizableHandle: ResizableHandleComponent
    CdkResizeObserver: ResizeObserverComponent
    CdkVirtualScroll: VirtualScrollComponent
  }

  export interface GlobalDirectives {
    vClickOutside: ClickOutsideDirective
  }
}

export {}
