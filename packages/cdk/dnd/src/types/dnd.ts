/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

import { dndContextPropertyKey } from '../consts'

export type DraggableOptions = Parameters<typeof draggable>[0]
export type DropTargetOptions = Parameters<typeof dropTargetForElements>[0]
export type MonitorOptions = Parameters<typeof monitorForElements>[0]

export type ContextData = {
  [key in typeof dndContextPropertyKey]: number[]
}

export type Axis = 'vertical' | 'horizontal' | 'all'

export interface DndOptions {
  monitor?: MonitorOptions | boolean
  onDrag?: MonitorOptions['onDrag']
  onDragOfTarget?: DropTargetOptions['onDrag']
  onDragStart?: MonitorOptions['onDragStart']
  onDragEnter?: DropTargetOptions['onDragEnter']
  onDragLeave?: DropTargetOptions['onDragLeave']
  onDrop?: MonitorOptions['onDrop']
  onDropOfTarget?: DropTargetOptions['onDrop']
}
