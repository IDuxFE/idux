/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndMovableBoundaryType, DndMovableOptions, ResolvedBoundary, ResolvedMovableOptions } from '../../types'

import { computed, unref } from 'vue'

import { isNil } from 'lodash-es'

import { convertElement, useState } from '@idux/cdk/utils'

import { defaultMovableAllowedAxis, defaultMovableMode, defaultMovableStrategy } from '../../consts'

export function useResolvedOptions(options: DndMovableOptions): ResolvedMovableOptions {
  const {
    mode,
    strategy,
    canDrag,
    draggableElement,
    dropTargets,
    boundary,
    dragHandle,
    allowedAxis,
    preview,
    onDragStart: optionOnDragStart,
    ...rest
  } = options

  const resolvedDraggleElement = computed(() => convertElement(unref(draggableElement)) ?? undefined)

  const [resolvedBoundary, setResolvedBoundary] = useState<ResolvedBoundary | undefined>(undefined)

  const onDragStart: ResolvedMovableOptions['onDragStart'] = args => {
    setResolvedBoundary(getBoundary(resolvedDraggleElement.value, unref(boundary)))
    optionOnDragStart?.(args)
  }

  return {
    mode: computed(() => {
      const moveMode = unref(mode)

      return isNil(moveMode) ? defaultMovableMode : moveMode
    }),
    strategy: computed(() => {
      const _strategy = unref(strategy)

      return isNil(_strategy) ? defaultMovableStrategy : _strategy
    }),
    dropTargets: computed(() => {
      const targets = unref(dropTargets)

      return targets?.filter(Boolean).map(convertElement) as Element[] | undefined
    }),
    dragHandle: computed(() => convertElement(unref(dragHandle)) ?? undefined),
    canDrag: computed(() => {
      const _canDrag = unref(canDrag)

      return isNil(_canDrag) ? true : _canDrag
    }),
    draggableElement: resolvedDraggleElement,
    boundary: resolvedBoundary,
    allowedAxis: computed(() => {
      const axis = unref(allowedAxis)

      return axis ?? defaultMovableAllowedAxis
    }),
    preview: computed(() => unref(preview)),
    onDragStart,
    ...rest,
  }
}

function getBoundary(element: HTMLElement | undefined, boundary: DndMovableBoundaryType) {
  const _boundary = unref(boundary)

  if (_boundary === 'viewport') {
    return { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }
  }

  const boundaryElement = _boundary === 'parent' ? element?.parentElement : convertElement(_boundary)

  if (!boundaryElement) {
    return
  }

  const { left, right, top, bottom } = boundaryElement.getBoundingClientRect()
  return { left, right, top, bottom }
}
