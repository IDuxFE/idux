/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Axis, DndMovableStrategy, Position, ResolvedBoundary } from '../../types'

import { type ComputedRef, computed, toRaw, watch } from 'vue'

import { useState } from '@idux/cdk/utils'

import { getPositionFromMatrix, keepInAxis, keepInBoundary } from '../../utils'

export function useMovablePosition(
  elementRef: ComputedRef<HTMLElement | null | undefined>,
  strategy: ComputedRef<DndMovableStrategy>,
  boundary: ComputedRef<ResolvedBoundary | undefined>,
  allowedAxis: ComputedRef<Axis>,
  optionOffset: ComputedRef<Position | undefined>,
  onOffsetChange?: (newOffset: Position, oldOffset: Position) => void,
): {
  position: ComputedRef<Position | undefined>
  offset: ComputedRef<Position | undefined>
  init: (reset?: boolean) => void
  start: (initial: Position) => void
  end: () => void
  update: (current: Position) => void
} {
  const [initalPosition, setInitialPosition] = useState<Position | undefined>(undefined)
  const [initialOffset, setInitialOffset] = useState<Position | undefined>(undefined)

  const [moveOffset, setMoveOffset] = useState<Position>({ x: 0, y: 0 })

  watch(optionOffset, offset => {
    if (offset) {
      setMoveOffset(offset)
    }
  })

  const updateMoveOffset = (newOffset: Position) => {
    const oldOffset = toRaw(moveOffset.value)

    onOffsetChange?.(newOffset, oldOffset)
    setMoveOffset(newOffset)
  }

  const getMoveOffset = () => {
    return optionOffset.value ?? moveOffset.value
  }

  const position = computed<Position | undefined>(() => {
    const _initialPosition = initalPosition.value
    if (!_initialPosition) {
      return
    }

    const _moveOffset = getMoveOffset()

    return {
      x: _initialPosition.x + _moveOffset.x,
      y: _initialPosition.y + _moveOffset.y,
    }
  })
  const offset = computed<Position | undefined>(() => {
    const _initialOffset = initialOffset.value

    if (!_initialOffset) {
      return
    }

    const _moveOffset = getMoveOffset()

    return {
      x: _initialOffset.x + _moveOffset.x,
      y: _initialOffset.y + _moveOffset.y,
    }
  })

  const initPosition = (element: HTMLElement) => {
    const _strategy = strategy.value
    if (_strategy === 'absolute' || _strategy === 'transform') {
      const { offsetTop, offsetLeft } = element
      setInitialPosition({ x: offsetLeft, y: offsetTop })
    } else {
      const { x, y } = element.getBoundingClientRect()
      setInitialPosition({ x, y })
    }
  }

  const initOffset = (element: HTMLElement, reset = false) => {
    if (strategy.value !== 'transform') {
      return
    }

    if (reset) {
      setInitialOffset({ x: 0, y: 0 })
    }

    const { transform } = getComputedStyle(element)

    const offset = getPositionFromMatrix(transform)

    setInitialOffset(offset ?? { x: 0, y: 0 })
  }

  let isDragging = false
  let lastDragPosition: Position | undefined

  const start = (initial: Position) => {
    if (optionOffset.value) {
      setMoveOffset({ ...optionOffset.value })
    }

    lastDragPosition = initial
    isDragging = true
  }
  const end = () => {
    if (optionOffset.value) {
      setMoveOffset({ ...optionOffset.value })
    }

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

    const _offset = moveOffset.value

    updateMoveOffset({
      x: _offset.x + offsetXOfTick,
      y: _offset.y + offsetYOfTick,
    })

    lastDragPosition = current
  }

  const init = (reset?: boolean) => {
    const element = elementRef.value

    if (element) {
      initPosition(element)
      initOffset(element, reset)
    }

    updateMoveOffset({ x: 0, y: 0 })
  }

  watch([elementRef, strategy], () => init(), { immediate: true })

  return {
    position,
    offset,
    init,
    start,
    end,
    update,
  }
}
