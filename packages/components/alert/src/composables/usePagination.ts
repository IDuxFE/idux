/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AlertProps } from '../types'
import type { ComputedRef, VNode } from 'vue'

import { computed, ref, watchEffect } from 'vue'

import { isNil, isObject } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

export interface PaginationContext {
  pageIndex: ComputedRef<number>
  pageText: ComputedRef<string>
  isPagination: ComputedRef<boolean>
  leftDisabled: ComputedRef<boolean>
  rightDisabled: ComputedRef<boolean>
  offsetPageIndex: (offset: -1 | 1) => void
}

export function usePagination(props: AlertProps, titleChildren: ComputedRef<(VNode | string)[]>): PaginationContext {
  const [pageIndex, setPageIndex] = useControlledPageIndex(props)
  const pageTotal = computed(() => titleChildren.value.length)
  const pageText = computed(() => `${pageIndex.value}/${pageTotal.value}`)
  const isPagination = computed(() => props.pagination && pageTotal.value > 1)
  const leftDisabled = computed(() => pageIndex.value <= 1)
  const rightDisabled = computed(() => pageIndex.value >= pageTotal.value)

  const offsetPageIndex = (offset: -1 | 1) => {
    if (offset === -1 && leftDisabled.value) {
      return
    }
    if (offset === 1 && rightDisabled.value) {
      return
    }
    setPageIndex(pageIndex.value + offset)
  }

  return {
    pageIndex,
    pageText,
    isPagination,
    leftDisabled,
    rightDisabled,
    offsetPageIndex,
  }
}

function useControlledPageIndex(props: AlertProps): [ComputedRef<number>, (value: number) => void] {
  const tempProp = ref(1)

  watchEffect(() => {
    const { pagination } = props
    if (isObject(pagination) && !isNil(pagination.pageIndex)) {
      tempProp.value = pagination.pageIndex
    }
  })

  const state = computed(() => {
    const { pagination } = props
    if (isObject(pagination) && !isNil(pagination.pageIndex)) {
      return pagination.pageIndex
    }
    return tempProp.value
  })

  const setState = (value: number) => {
    if (value !== state.value) {
      tempProp.value = value
      const { pagination } = props
      if (isObject(pagination)) {
        callEmit(pagination.onChange, value)
      }
    }
  }

  return [state, setState]
}
