/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, watch } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { type PaginationConfig } from '@idux/components/config'

import { type PaginationProps } from '../types'

export interface PagesContext {
  activeIndex: ComputedRef<number>
  activeSize: ComputedRef<number>
  lastIndex: ComputedRef<number>
  changePageIndex: (index: number) => void
  changePageSize: (size: number) => void
}

export function usePages(props: PaginationProps, config: PaginationConfig): PagesContext {
  const [activeIndex, setActiveIndex] = useControlledProp(props, 'pageIndex', 1)
  const [activeSize, setActiveSize] = useControlledProp(props, 'pageSize', props.pageSize ?? config.pageSize)
  const lastIndex = computed(() => Math.max(Math.ceil(props.total / activeSize.value), 1))

  const changePageIndex = (index: number) => {
    const validIndex = validatePageIndex(index, lastIndex.value)
    if (validIndex !== activeIndex.value) {
      setActiveIndex(validIndex)
      callEmit(props.onChange, validIndex, activeSize.value)
    }
  }

  const changePageSize = (size: number) => {
    setActiveSize(size)
    callEmit(props.onChange, activeIndex.value, size)
  }

  watch(
    [activeIndex, lastIndex],
    ([currPageIndex, currLastIndex]) => {
      if (currPageIndex > currLastIndex) {
        changePageIndex(currLastIndex)
      }
    },
    { immediate: true },
  )

  return { activeIndex, activeSize, lastIndex, changePageIndex, changePageSize }
}

const validatePageIndex = (index: number, lastIndex: number) => {
  if (index > lastIndex) {
    return lastIndex
  } else if (index < 1) {
    return 1
  } else {
    return index
  }
}
