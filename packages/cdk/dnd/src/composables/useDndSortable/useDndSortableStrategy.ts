/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  DndSortableDirection,
  DndSortableDraggingOverState,
  DndSortableOptions,
  DndSortableStrategyContext,
  GetKey,
} from '../../types'

import { type ComputedRef, type EffectScope, type Ref, computed, effectScope, isRef, watch } from 'vue'

import { tryOnScopeDispose, useState } from '@idux/cdk/utils'

import { createListStrategyContext } from './createListStrategyContext'
import { createTreeStrategyContext } from './createTreeStrategyContext'
import { defaultChildrenKey, defaultSortableStrategy, defaultTreeIndent } from '../../consts'

export function useDndSortableStrategy<C extends keyof V = never, V extends object = Record<string, unknown>>(
  options: DndSortableOptions<C, V>,
  mergedDirection: Ref<DndSortableDirection>,
  mergedGetKey: Ref<GetKey>,
): DndSortableStrategyContext & { draggingOverState: ComputedRef<DndSortableDraggingOverState> } {
  const { dataSource, childrenKey, treeIndent, strategy, isTreeItemExpanded } = options
  const [draggingOverState, setDraggingOverState] = useState<DndSortableDraggingOverState | null>(null)

  let contextScope: { dispose: () => void } | undefined
  const context: DndSortableStrategyContext & { draggingOverState: ComputedRef<DndSortableDraggingOverState> } = {
    draggingOverState,
  } as unknown as DndSortableStrategyContext & { draggingOverState: ComputedRef<DndSortableDraggingOverState> }

  const resolvedStrategy = computed(() => {
    const _strategy = isRef(strategy) ? strategy.value : strategy

    return _strategy ?? defaultSortableStrategy
  })
  const mergedChildrenKey = computed(() => {
    const _childrenKey = isRef(childrenKey) ? childrenKey.value : childrenKey

    return (_childrenKey ?? defaultChildrenKey) as C
  })
  const mergedTreeIndent = computed(() => {
    const _treeIndent = isRef(treeIndent) ? treeIndent.value : treeIndent

    return _treeIndent ?? defaultTreeIndent
  })

  watch(
    resolvedStrategy,
    strategy => {
      contextScope?.dispose()

      if (strategy === 'tree') {
        const scope = createContextScope(createTreeStrategyContext)
        contextScope = scope
        Object.assign(
          context,
          scope.run({
            dataSource,
            getKey: mergedGetKey,
            childrenKey: mergedChildrenKey as unknown as Ref<never>,
            treeIndent: mergedTreeIndent,
            setDraggingOverState,
            isTreeItemExpanded: isTreeItemExpanded as any,
          })!,
        )
      } else {
        const scope = createContextScope(createListStrategyContext)
        contextScope = scope
        Object.assign(
          context,
          scope.run({
            dataSource,
            direction: mergedDirection,
            getKey: mergedGetKey,
            setDraggingOverState,
          })!,
        )
      }
    },
    {
      immediate: true,
    },
  )

  return context
}

function createContextScope<T extends (...args: any[]) => ReturnType<T>>(
  fn: T,
): {
  run: (...args: Parameters<T>) => ReturnType<T> | undefined
  dispose: () => void
} {
  let scope: EffectScope | undefined = effectScope()
  let state: ReturnType<T> | undefined

  const run = (...args: Parameters<T>) => {
    if (!scope) {
      return
    }

    if (state) {
      return state
    }

    state = scope.run(() => fn(...args))

    return state
  }

  const dispose = () => {
    scope?.stop()
    state = undefined
    scope = undefined
  }

  tryOnScopeDispose(() => {
    dispose()
  })

  return {
    run,
    dispose,
  }
}
