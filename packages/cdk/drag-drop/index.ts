/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export * from './src/composables/useDraggable'
export * from './src/composables/useDroppable'

import type { DraggableComponent } from './src/draggable/types'

import Draggable from './src/draggable/Draggable'

/**
 * @deprecated please use `CdkDndMovable` instead'
 */
const CdkDraggable = Draggable as unknown as DraggableComponent

/**
 * @deprecated please use `CdkDndMovable` instead'
 */
export { CdkDraggable }

export type {
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DnDElement,
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DnDEvent,
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DnDPosition,
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  BoundaryType,
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DnDBackendType,
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DraggableOptions,
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DroppableOptions,
} from './src/types'
/**
 * @deprecated please use `@idux/cdk/dnd` instead'
 */
export type { DnDState } from './src/state'

export type {
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DraggableInstance,
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DraggableComponent,
  /**
   * @deprecated please use `@idux/cdk/dnd` instead'
   */
  DraggablePublicProps as DraggableProps,
} from './src/draggable/types'
