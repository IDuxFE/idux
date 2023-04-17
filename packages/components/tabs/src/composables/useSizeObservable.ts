/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type ShallowRef, computed, nextTick, onMounted, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { useState } from '@idux/cdk/utils'

export interface SizeObservableContext {
  wrapperSize: ComputedRef<number>
  prevNextSize: ComputedRef<number>
  navSize: ComputedRef<number>
  selectedNavSize: ComputedRef<number>
  navOffset: ComputedRef<number>
  selectedNavOffset: ComputedRef<number>
  hasScroll: ComputedRef<boolean>
  calcPrevOffset: () => void
  calcNextOffset: () => void
  calcNavSize: () => void
}

export function useSizeObservable(
  wrapperRef: ShallowRef<HTMLElement | undefined>,
  prevNextRef: ShallowRef<HTMLElement | undefined>,
  navRef: ShallowRef<HTMLElement | undefined>,
  selectedNavRef: ShallowRef<HTMLElement | undefined>,
  isHorizontal: ComputedRef<boolean>,
): SizeObservableContext {
  const [wrapperSize, setWrapperSize] = useState(0)
  const [prevNextSize, setPreNextSize] = useState(0)
  const [navSize, setNavSize] = useState(0)
  const [selectedNavSize, setSelectedNavSize] = useState(0)

  const [navOffset, setNavOffset] = useState(0)
  const [selectedNavOffset, setSelectedNavOffset] = useState(0)

  const sizeProp = computed(() => (isHorizontal.value ? 'offsetWidth' : 'offsetHeight'))

  useResizeObserver(wrapperRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setWrapperSize(target[sizeProp.value])
    })
  })

  useResizeObserver(prevNextRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setPreNextSize(target[sizeProp.value])
    })
  })

  useResizeObserver(navRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setNavSize(target[sizeProp.value])
    })
  })

  useResizeObserver(selectedNavRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setSelectedNavSize(target[sizeProp.value])
      setSelectedNavOffset((target as HTMLElement)[isHorizontal.value ? 'offsetLeft' : 'offsetTop'])
      updateNavOffset()
    })
  })

  const hasScroll = computed(() => navSize.value > wrapperSize.value)
  const selectedNavVisibleSize = computed(
    () => wrapperSize.value + navOffset.value - prevNextSize.value - selectedNavOffset.value,
  )

  const updateNavOffset = () => {
    if (hasScroll.value) {
      const _selectedNavVisibleSize = selectedNavVisibleSize.value
      const _wrapperSize = wrapperSize.value
      const _prevNextSize = prevNextSize.value
      const _selectedNavSize = selectedNavSize.value
      const _navOffset = navOffset.value

      // 判断是否在可视范围内
      const inVisibleRange = _selectedNavVisibleSize / _wrapperSize < 2
      if (inVisibleRange) {
        // 可视范围内需要处理展示不全的问题，需要修正
        if (_selectedNavVisibleSize < _selectedNavSize) {
          // 即可视范围内最后一个tab没有展示完全
          setNavOffset(_navOffset + _selectedNavSize - _selectedNavVisibleSize + _prevNextSize)
        } else if (_selectedNavVisibleSize / _wrapperSize > 1) {
          // 即可视范围内第一个tab没有展示完全
          setNavOffset(_navOffset - ((_selectedNavVisibleSize % _wrapperSize) + _prevNextSize))
        }
      } else {
        setNavOffset(prevNextSize.value + selectedNavOffset.value - _prevNextSize)
      }
    } else {
      setNavOffset(0)
    }
  }

  watch(hasScroll, updateNavOffset, { flush: 'post' })

  onMounted(() => {
    // 需要等 DOM 渲染完成后，重新计算一次，才是最准确的
    setTimeout(() => updateNavOffset())
  })

  const calcPrevOffset = () => {
    const mergedOffset = navOffset.value + prevNextSize.value
    const offset = mergedOffset < wrapperSize.value ? 0 : mergedOffset - wrapperSize.value
    setNavOffset(offset)
  }

  const calcNextOffset = () => {
    const mergedNavSize = navSize.value + prevNextSize.value * 2
    const mergedOffset = navOffset.value + wrapperSize.value
    let offset
    if (mergedNavSize - mergedOffset < wrapperSize.value) {
      offset = mergedNavSize - wrapperSize.value
    } else {
      offset = mergedOffset
    }
    setNavOffset(offset)
  }

  const calcNavSize = () => {
    const element = navRef.value
    if (!element) {
      return
    }
    setPreNextSize(element[sizeProp.value])
  }

  return {
    wrapperSize,
    prevNextSize,
    navSize,
    selectedNavSize,
    navOffset,
    selectedNavOffset,
    hasScroll,
    calcPrevOffset,
    calcNextOffset,
    calcNavSize,
  }
}
