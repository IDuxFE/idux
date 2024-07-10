/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ContextData, DraggableOptions, DropTargetOptions } from '../../types'

import { isArray } from 'lodash-es'

import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

import { createSharedComposable, tryOnScopeDispose } from '@idux/cdk/utils'

import { dndContextPropertyKey } from '../../consts'

export interface ContextRegistry {
  registerDraggable: (contextKey: number, options: DraggableOptions) => () => void
  registerDropTarget: (contextKey: number, options: DropTargetOptions) => () => void
  isRegiseredInContext: (contextKey: number, data: Record<string, unknown>) => boolean
}

function isContextData(data: Record<string, unknown>): data is ContextData {
  return dndContextPropertyKey in data && isArray(data[dndContextPropertyKey])
}

export const useContextRegistry = createSharedComposable((): ContextRegistry => {
  const draggableRegistry = new Map<Element, Set<DraggableOptions>>()
  const dropTargetRegistry = new Map<Element, Set<DropTargetOptions>>()

  const draggableContextKeyMap = new Map<Element, Set<number>>()
  const dropTargetContextKeyMap = new Map<Element, Set<number>>()

  const draggableCleanupMap = new Map<Element, () => void>()
  const dropTargetCleanupMap = new Map<Element, () => void>()

  const _registerDraggable = (options: DraggableOptions) => {
    const { element, dragHandle, onGenerateDragPreview } = options

    return draggable({
      element,
      dragHandle,
      getInitialData(args) {
        const data = {
          [dndContextPropertyKey]: [...(draggableContextKeyMap.get(element) ?? [])],
        }

        return getMergedData(data, args, draggableRegistry.get(element))
      },
      canDrag(args) {
        return getMergedBoolean(args, draggableRegistry.get(element), 'canDrag', true)
      },
      onGenerateDragPreview,
      onDrag(args) {
        callEventHandlers(args, draggableRegistry.get(element), 'onDrag')
      },
      onDragStart(args) {
        callEventHandlers(args, draggableRegistry.get(element), 'onDragStart')
      },
      onDropTargetChange(args) {
        callEventHandlers(args, draggableRegistry.get(element), 'onDropTargetChange')
      },
      onDrop(args) {
        callEventHandlers(args, draggableRegistry.get(element), 'onDrop')
      },
    })
  }

  const _registerDropTarget = (options: DropTargetOptions) => {
    const { element, getDropEffect, onGenerateDragPreview } = options

    return dropTargetForElements({
      element,
      getData(args) {
        const data = {
          [dndContextPropertyKey]: [...(dropTargetContextKeyMap.get(element) ?? [])],
        }

        return getMergedData(data, args, dropTargetRegistry.get(element))
      },
      canDrop(args) {
        return getMergedBoolean(args, dropTargetRegistry.get(element), 'canDrop', true)
      },
      getDropEffect,
      getIsSticky(args) {
        return getMergedBoolean(args, dropTargetRegistry.get(element), 'getIsSticky', false)
      },
      onGenerateDragPreview,
      onDrag(args) {
        callEventHandlers(args, dropTargetRegistry.get(element), 'onDrag')
      },
      onDragEnter(args) {
        callEventHandlers(args, dropTargetRegistry.get(element), 'onDragEnter')
      },
      onDragLeave(args) {
        callEventHandlers(args, dropTargetRegistry.get(element), 'onDragLeave')
      },
      onDragStart(args) {
        callEventHandlers(args, dropTargetRegistry.get(element), 'onDragStart')
      },
      onDropTargetChange(args) {
        callEventHandlers(args, dropTargetRegistry.get(element), 'onDropTargetChange')
      },
      onDrop(args) {
        callEventHandlers(args, dropTargetRegistry.get(element), 'onDrop')
      },
    })
  }

  const getRegisterContext = (isDraggable: boolean) => {
    return isDraggable
      ? {
          registry: draggableRegistry,
          contextKeyMap: draggableContextKeyMap,
          cleanupMap: draggableCleanupMap,
        }
      : {
          registry: dropTargetRegistry,
          contextKeyMap: dropTargetContextKeyMap,
          cleanupMap: dropTargetCleanupMap,
        }
  }

  const register = (contextKey: number, options: DraggableOptions | DropTargetOptions, isDraggable: boolean) => {
    const { element } = options

    const { registry, contextKeyMap, cleanupMap } = getRegisterContext(isDraggable)

    const registrys = registry.get(element) ?? new Set()
    const contextKeys = contextKeyMap.get(element) ?? new Set()

    if (contextKeys.has(contextKey)) {
      return () => {}
    }

    const alreadyRegistered = !!registrys.size
    registrys.add(options)
    contextKeys.add(contextKey)

    if (!registry.has(element)) {
      registry.set(element, registrys as any)
    }
    if (!contextKeyMap.has(element)) {
      contextKeyMap.set(element, contextKeys)
    }

    if (!alreadyRegistered) {
      const cleanup = isDraggable ? _registerDraggable(options as DraggableOptions) : _registerDropTarget(options)
      cleanupMap.set(element, cleanup)
    }

    return () => {
      registrys.delete(options)
      contextKeys.delete(contextKey)

      if (!registrys.size) {
        cleanupMap.get(element)?.()
        cleanupMap.delete(element)
      }
    }
  }

  const registerDraggable = (contextKey: number, options: DraggableOptions) => {
    return register(contextKey, options, true)
  }

  const registerDropTarget = (contextKey: number, options: DropTargetOptions) => {
    return register(contextKey, options, false)
  }

  const isRegiseredInContext = (contextKey: number, data: Record<string, unknown>) => {
    return isContextData(data) && data[dndContextPropertyKey].includes(contextKey)
  }

  tryOnScopeDispose(() => {
    draggableRegistry.clear()
    dropTargetRegistry.clear()
    draggableContextKeyMap.clear()
    dropTargetContextKeyMap.clear()

    draggableCleanupMap.forEach(cleanup => cleanup())
    draggableCleanupMap.clear()

    dropTargetCleanupMap.forEach(cleanup => cleanup())
    dropTargetCleanupMap.clear()
  })

  return {
    registerDraggable,
    registerDropTarget,
    isRegiseredInContext,
  }
})

function getMergedData(
  data: ContextData,
  args: any,
  registrys: Set<DraggableOptions> | Set<DropTargetOptions> | undefined,
) {
  let mergedData = data
  registrys?.forEach(registry => {
    let getData
    if ('getInitialData' in registry) {
      getData = registry.getInitialData
    } else if ('getData' in registry) {
      getData = registry.getData
    }

    if (getData) {
      mergedData = Object.assign(mergedData, getData(args))
    }
  })

  return mergedData
}

function getMergedBoolean(
  args: any,
  registrys: Set<DraggableOptions> | Set<DropTargetOptions> | undefined,
  key: string,
  defaultValue: boolean,
) {
  let can = false
  registrys?.forEach(registry => {
    if ((registry[key as keyof typeof registry] as any)?.(args) ?? defaultValue) {
      can = true
    }
  })

  return can
}

function callEventHandlers(
  args: any,
  registrys: Set<DraggableOptions> | Set<DropTargetOptions> | undefined,
  key: string,
) {
  registrys?.forEach(registry => {
    ;(registry[key as keyof typeof registry] as any)?.(args)
  })
}
