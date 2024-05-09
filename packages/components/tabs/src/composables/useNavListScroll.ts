/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, type ShallowRef, computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

import { isNil } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { useScroll } from '@idux/cdk/scroll'
import { type VKey, useState } from '@idux/cdk/utils'

interface NavListScrollContext {
  scrollOffset: ComputedRef<number>
  hasScroll: ComputedRef<boolean>
  scrolledStart: ComputedRef<boolean>
  scrolledEnd: ComputedRef<boolean>
  pre: () => void
  next: () => void
}

export function useNavListScroll(
  navListRef: ShallowRef<HTMLElement | undefined>,
  navListInnerRef: ShallowRef<HTMLElement | undefined>,
  isHorizontal: ComputedRef<boolean>,
  selectedNavSize: ComputedRef<number>,
  selectedNavOffset: ComputedRef<number>,
  navAttrs: Ref<Record<VKey, { offset: number; size: number } | undefined>>,
  closedKeys: ComputedRef<VKey[]>,
): NavListScrollContext {
  const [navListSize, setNavListSize] = useState(0)
  const [hasScroll, setHasScroll] = useState(false)

  const calcHasScroll = () => {
    if (!navListRef.value) {
      setHasScroll(false)
      return
    }

    const { scrollWidth, scrollHeight, clientWidth, clientHeight } = navListRef.value

    setHasScroll(isHorizontal.value ? scrollWidth > clientWidth : scrollHeight > clientHeight)
  }

  const {
    init,
    destroy,
    update,
    syncScroll,
    scrollLeft,
    scrollTop,
    scrolledLeft,
    scrolledRight,
    scrolledTop,
    scrolledBottom,
  } = useScroll(navListRef, { updateOnResize: false, simulatedScroll: true })

  useResizeObserver(navListRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setNavListSize(target[isHorizontal.value ? 'offsetWidth' : 'offsetHeight'])
      update()
      calcHasScroll()
    })
  })
  useResizeObserver(navListInnerRef, () => {
    nextTick(() => {
      update()
      calcHasScroll()
    })
  })

  const scrollOffset = computed(() => (isHorizontal.value ? scrollLeft.value : scrollTop.value))
  const scrolledStart = computed(() => (isHorizontal.value ? scrolledLeft.value : scrolledTop.value))
  const scrolledEnd = computed(() => (isHorizontal.value ? scrolledRight.value : scrolledBottom.value))

  const offsetSequence = computed(() =>
    Object.values(navAttrs.value)
      .map(attr => attr?.offset)
      .filter(offset => !isNil(offset))
      .sort((v1, v2) => v1! - v2!),
  )

  const findPageOffset = (offset: number, pre = false) => {
    const offsets = offsetSequence.value
    let index = -1
    for (let i = pre ? offsets.length - 1 : 0; pre ? i >= -1 : i <= offsets.length; pre ? i-- : i++) {
      const currentOffset = offsets[i]
      index = i

      if (!isNil(currentOffset) && (pre ? currentOffset <= offset : currentOffset >= offset)) {
        break
      }
    }

    if (index !== 0 && index !== offsets.length - 1) {
      index = pre ? index + 1 : index - 1
    }

    index = Math.min(Math.max(index, 0), offsets.length - 1)

    return index === 0 ? 0 : index === offsets.length - 1 ? Number.MAX_SAFE_INTEGER : offsets[index]
  }

  const setScrollOffset = (offset: number) => {
    syncScroll(
      {
        [isHorizontal.value ? 'left' : 'top']: offset,
      },
      true,
    )
  }

  const syncNavListScrollBySelectedNav = () => {
    if (!hasScroll.value) {
      return
    }

    const _wrapperSize = navListSize.value
    const _selectedNavSize = selectedNavSize.value
    const _scrollOffset = scrollOffset.value
    const _selectedNavOffset = selectedNavOffset.value

    if (_selectedNavOffset === offsetSequence.value[offsetSequence.value.length - 1]) {
      setScrollOffset(Number.MAX_SAFE_INTEGER)
      return
    }

    const selectedNavOffsetFromList = _selectedNavOffset - (_wrapperSize + _scrollOffset)
    const isAfterView = selectedNavOffsetFromList > -_selectedNavSize
    const isBeforeView = selectedNavOffsetFromList < -_wrapperSize

    if (isAfterView) {
      setScrollOffset(selectedNavOffsetFromList + _scrollOffset + _selectedNavSize)
    } else if (isBeforeView) {
      setScrollOffset(_selectedNavOffset)
    }
  }

  watch([selectedNavSize, selectedNavOffset], syncNavListScrollBySelectedNav, { flush: 'post' })

  watch(closedKeys, (cur, old) => {
    const curSet = new Set(cur)
    const oldSet = new Set(old)
    const closeTabKey = [...curSet].find(item => !oldSet.has(item))
    if (closeTabKey !== undefined) {
      const closeTabAttr = navAttrs.value[closeTabKey] || { size: 0, offset: 0 }
      const { size: closeTabSize, offset: closeTabOffset } = closeTabAttr
      let nextTabOffset = 0
      for (const attr of Object.values(navAttrs)) {
        if (!attr) {
          continue
        }
        const { offset } = attr
        if (offset > closeTabOffset) {
          nextTabOffset = offset
          break
        }
      }
      const diffOffset = scrollOffset.value - (nextTabOffset ? nextTabOffset - closeTabOffset : closeTabSize)
      setScrollOffset(diffOffset > 0 ? diffOffset : 0)
    }
  })

  onMounted(init)
  onBeforeUnmount(destroy)

  const pre = () => {
    const preOffset = Math.max(scrollOffset.value - navListSize.value, 0)
    const _offset = findPageOffset(preOffset, true)

    if (!isNil(_offset)) {
      setScrollOffset(_offset)
    }
  }

  const next = () => {
    const nextOffset = scrollOffset.value + navListSize.value
    const _offset = findPageOffset(nextOffset, false)

    if (!isNil(_offset)) {
      setScrollOffset(_offset)
    }
  }

  return {
    scrollOffset,
    hasScroll,
    scrolledStart,
    scrolledEnd,
    pre,
    next,
  }
}
