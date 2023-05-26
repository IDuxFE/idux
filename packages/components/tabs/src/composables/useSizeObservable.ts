/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type ShallowRef, computed, nextTick, onMounted, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { VKey, useState } from '@idux/cdk/utils'

import { TabsProps } from '../types'
import { getMarginSize } from '../utils'

export interface SizeObservableContext {
  wrapperSize: ComputedRef<number>
  navSize: ComputedRef<number>
  selectedNavSize: ComputedRef<number>
  operationsSize: ComputedRef<number>
  navOffset: ComputedRef<number>
  selectedNavOffset: ComputedRef<number>
  hasScroll: ComputedRef<boolean>
  firstShow: ComputedRef<boolean>
  lastShow: ComputedRef<boolean>
  updateNavOffset: () => void
}

export function useSizeObservable(
  props: TabsProps,
  wrapperRef: ShallowRef<HTMLElement | undefined>,
  navRef: ShallowRef<HTMLElement | undefined>,
  selectedNavRef: ShallowRef<HTMLElement | undefined>,
  addBtnRef: ShallowRef<HTMLElement | undefined>,
  operationsRef: ShallowRef<HTMLElement | undefined>,
  isHorizontal: ComputedRef<boolean>,
  navAttrMap: Map<VKey, { offset: number; size: number }>,
  closedKeys: ComputedRef<VKey[]>,
): SizeObservableContext {
  const [wrapperSize, setWrapperSize] = useState(0)
  const [navSize, setNavSize] = useState(0)
  const [selectedNavSize, setSelectedNavSize] = useState(0)
  const [addBtnSize, setAddBtnSize] = useState(0)
  const [operationsSize, setOperationsSize] = useState(0)

  const [navOffset, setNavOffset] = useState(0)
  const [selectedNavOffset, setSelectedNavOffset] = useState(0)

  const sizeProp = computed(() => (isHorizontal.value ? 'offsetWidth' : 'offsetHeight'))
  const offsetProp = computed(() => (isHorizontal.value ? 'offsetLeft' : 'offsetTop'))

  const hasScroll = computed(() => {
    return navSize.value > wrapperSize.value
  })

  // 第一个nav显示完全
  const firstShow = computed(() => hasScroll.value && navOffset.value === 0)
  // 最后一个nav显示完全
  const lastShow = computed(() => {
    return (
      hasScroll.value && navSize.value - addBtnSize.value - navOffset.value <= wrapperSize.value - operationsSize.value
    )
  })

  useResizeObserver(wrapperRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setWrapperSize(target[sizeProp.value])
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
      setSelectedNavOffset(target[offsetProp.value])
      updateNavOffset()
    })
  })

  useResizeObserver(addBtnRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setAddBtnSize(target[sizeProp.value] + getMarginSize(target, isHorizontal.value))
    })
  })

  useResizeObserver(operationsRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setOperationsSize(target[sizeProp.value] + getMarginSize(target, isHorizontal.value))
    })
  })

  const updateSelectedNavOffset = () => {
    nextTick(() => {
      if (props.type !== 'line') {
        return
      }
      const target = selectedNavRef.value
      if (target) {
        setSelectedNavOffset(target[offsetProp.value])
      }
    })
  }

  const updateNavOffset = () => {
    if (hasScroll.value) {
      const _wrapperSize = wrapperSize.value - operationsSize.value
      const _selectedNavSize = selectedNavSize.value
      const _navOffset = navOffset.value
      //const _navSize = navSize.value - addBtnSize.value
      const _selectedNavOffset = selectedNavOffset.value
      const _selectedNavVisibleSize = _wrapperSize + _navOffset - _selectedNavOffset

      // 判断是否在可视范围内
      const inVisibleRange = _selectedNavVisibleSize / _wrapperSize < 2

      if (inVisibleRange) {
        // 可视范围内需要处理展示不全的问题，需要修正
        if (_selectedNavVisibleSize < _selectedNavSize) {
          // 即可视范围内最后一个tab没有展示完全
          setNavOffset(_navOffset + _selectedNavSize - _selectedNavVisibleSize)
        } else if (_selectedNavVisibleSize / _wrapperSize > 1) {
          // 即可视范围内第一个tab没有展示完全
          setNavOffset(_navOffset - (_selectedNavVisibleSize % _wrapperSize))
        }
        // else if (_navSize - _navOffset < _wrapperSize) {
        //   setNavOffset(_wrapperSize - (_navSize - _navOffset))
        // }
      } else {
        setNavOffset(_selectedNavOffset)
      }
    } else {
      setNavOffset(0)
    }
  }

  watch(hasScroll, updateNavOffset, { flush: 'post' })

  watch(closedKeys, (cur, old) => {
    const curSet = new Set(cur)
    const oldSet = new Set(old)
    const closeTabKey = [...curSet].find(item => !oldSet.has(item))
    if (closeTabKey !== undefined) {
      const closeTabAttr = navAttrMap.get(closeTabKey) || { size: 0, offset: 0 }
      const { size: closeTabSize, offset: closeTabOffset } = closeTabAttr
      let nextTabOffset = 0
      for (const { offset } of navAttrMap.values()) {
        if (offset > closeTabOffset) {
          nextTabOffset = offset
          break
        }
      }
      const diffOffset = navOffset.value - (nextTabOffset ? nextTabOffset - closeTabOffset : closeTabSize)
      setNavOffset(diffOffset > 0 ? diffOffset : 0)
    }

    updateSelectedNavOffset()
  })

  watch(
    () => props.dataSource,
    () => updateSelectedNavOffset(),
  )

  onMounted(() => {
    // 需要等 DOM 渲染完成后，重新计算一次，才是最准确的
    setTimeout(() => updateNavOffset())
  })

  return {
    wrapperSize,
    navSize,
    selectedNavSize,
    navOffset,
    selectedNavOffset,
    hasScroll,
    operationsSize,
    firstShow,
    lastShow,
    updateNavOffset,
  }
}
