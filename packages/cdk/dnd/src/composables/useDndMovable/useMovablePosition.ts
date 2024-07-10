/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Axis, DndMovableStrategy, Position, ResolvedBoundary } from '../../types'

import { type ComputedRef, watch } from 'vue'

import { useState } from '@idux/cdk/utils'

import { getPositionFromMatrix, keepInAxis, keepInBoundary } from '../../utils'

export function useMovablePosition(
  elementRef: ComputedRef<HTMLElement | null | undefined>,
  strategy: ComputedRef<DndMovableStrategy>,
  boundary: ComputedRef<ResolvedBoundary | undefined>,
  allowedAxis: ComputedRef<Axis>,
): {
  position: ComputedRef<Position>
  offset: ComputedRef<Position>
  init: (reset?: boolean) => void
  start: (initial: Position) => void
  end: () => void
  update: (current: Position) => void
} {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 })

  const initPosition = (element: HTMLElement) => {
    const _strategy = strategy.value
    if (_strategy === 'absolute' || _strategy === 'transform') {
      const { offsetTop, offsetLeft } = element
      setPosition({ x: offsetLeft, y: offsetTop })
    } else {
      const { x, y } = element.getBoundingClientRect()
      setPosition({ x, y })
    }
  }

  const initOffset = (element: HTMLElement, reset = false) => {
    if (strategy.value !== 'transform') {
      return
    }

    if (reset) {
      setOffset({ x: 0, y: 0 })
    }

    const { transform } = getComputedStyle(element)

    const offset = getPositionFromMatrix(transform)

    if (offset) {
      setOffset(offset)
    }
  }

  let isDragging = false
  let lastDragPosition: Position | undefined

  const start = (initial: Position) => {
    lastDragPosition = initial
    isDragging = true
  }
  const end = () => {
    isDragging = false
  }

  const update = (current: Position) => {
    if (!isDragging || !lastDragPosition) {
      return
    }

    const element = elementRef.value
    if (!element) {
      return
    }

    const { x: offsetXOfTick, y: offsetYOfTick } = keepInAxis(
      allowedAxis.value,
      keepInBoundary(elementRef.value.getBoundingClientRect(), boundary.value, {
        x: current.x - lastDragPosition.x,
        y: current.y - lastDragPosition.y,
      }),
    )

    if (offsetXOfTick === 0 && offsetYOfTick === 0) {
      return
    }

    const _offset = offset.value
    const _position = position.value

    setOffset({
      x: _offset.x + offsetXOfTick,
      y: _offset.y + offsetYOfTick,
    })
    setPosition({
      x: _position.x + offsetXOfTick,
      y: _position.y + offsetYOfTick,
    })

    lastDragPosition = current
  }

  const init = (reset?: boolean) => {
    const element = elementRef.value

    if (element) {
      initPosition(element)
      initOffset(element, reset)
    }
  }

  watch([elementRef, strategy], () => init())

  return {
    position,
    offset,
    init,
    start,
    end,
    update,
  }
}
