/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndOptions, DraggableOptions, DropTargetOptions } from '../../types'

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

import { tryOnScopeDispose } from '@idux/cdk/utils'

import { useContextRegistry } from './useContextRegistry'

export interface DndContext {
  registerDraggable: (options: DraggableOptions) => () => void
  registerDropTarget: (options: DropTargetOptions) => () => void
}

let contextKeySeed = 0

function genContextKey() {
  return contextKeySeed++
}

export function useDndContext(options?: DndOptions): DndContext {
  const {
    monitor = true,
    onDrag,
    onDragOfTarget,
    onDragEnter,
    onDragStart,
    onDragLeave,
    onDrop,
    onDropOfTarget,
  } = options ?? {}

  const {
    registerDraggable: _registerDraggable,
    registerDropTarget: _registerDropTarget,
    isRegiseredInContext,
  } = useContextRegistry()

  const draggableCleanups: Set<() => void> = new Set()
  const dropTargetCleanups: Set<() => void> = new Set()

  const key = genContextKey()

  let monitorCleanup: (() => void) | undefined

  if (monitor) {
    const resolvedMonitor = monitor === true ? {} : monitor
    const {
      canMonitor,
      onDrag: monitorOnDrag,
      onDragStart: monitorOnDragStart,
      onDrop: monitorOnDrop,
      ...rest
    } = resolvedMonitor
    monitorCleanup = monitorForElements({
      ...rest,
      canMonitor(args) {
        const { source } = args
        const isRegistered = isRegiseredInContext(key, source.data)

        return canMonitor ? canMonitor(args) && isRegistered : isRegistered
      },
      onDrag(args) {
        monitorOnDrag?.(args)
        onDrag?.(args)
      },
      onDragStart(args) {
        monitorOnDragStart?.(args)
        onDragStart?.(args)
      },
      onDrop(args) {
        monitorOnDrop?.(args)
        onDrop?.(args)
      },
    })
  }

  const registerDraggable = (options: DraggableOptions) => {
    const { onDrag: itemOnDrag, onDragStart: itemOnDragStart, onDrop: itemOnDrop, ...rest } = options
    const cleanup = _registerDraggable(key, {
      ...rest,
      onDrag(args) {
        itemOnDrag?.(args)
        if (!monitor) {
          onDrag?.(args)
        }
      },
      onDrop(args) {
        if (!monitor) {
          onDrop?.(args)
        }

        itemOnDrop?.(args)
      },
      onDragStart(args) {
        itemOnDragStart?.(args)
        if (!monitor) {
          onDragStart?.(args)
        }
      },
    })

    draggableCleanups.add(cleanup)

    return () => {
      cleanup()
      draggableCleanups.delete(cleanup)
    }
  }

  const registerDropTarget = (options: DropTargetOptions) => {
    const {
      onDrop: itemOnDrop,
      onDrag: itemOnDrag,
      onDragEnter: itemOnDragEneter,
      onDragLeave: itemOnDragLeave,
      ...rest
    } = options
    const cleanup = _registerDropTarget(key, {
      ...rest,
      onDrop(args) {
        itemOnDrop?.(args)
        onDropOfTarget?.(args)
      },
      onDrag(args) {
        itemOnDrag?.(args)
        onDragOfTarget?.(args)
      },
      onDragEnter(args) {
        const { source } = args

        if (!isRegiseredInContext(key, source.data)) {
          return
        }

        itemOnDragEneter?.(args)
        onDragEnter?.(args)
      },
      onDragLeave(args) {
        itemOnDragLeave?.(args)
        onDragLeave?.(args)
      },
    })

    dropTargetCleanups.add(cleanup)

    return () => {
      cleanup()
      dropTargetCleanups.delete(cleanup)
    }
  }

  const destroy = () => {
    draggableCleanups.forEach(cleanup => cleanup())
    dropTargetCleanups.forEach(cleanup => cleanup())

    draggableCleanups.clear()
    dropTargetCleanups.clear()
    monitorCleanup?.()
  }

  tryOnScopeDispose(() => {
    destroy()
  })

  return {
    registerDraggable,
    registerDropTarget,
  }
}
