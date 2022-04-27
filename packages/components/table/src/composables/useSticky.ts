/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isPlainObject } from 'lodash-es'

import { useState } from '@idux/cdk/utils'

import { type TableProps, type TableSticky } from '../types'

export function useSticky(props: TableProps): StickyContext {
  const isSticky = computed(() => !!props.sticky)

  const mergedSticky = computed(() => {
    const { sticky } = props
    const {
      offsetTop = 0,
      offsetBottom = 0,
      offsetScroll = 0,
      container = window,
    } = isPlainObject(sticky) ? (sticky as TableSticky) : {}

    return {
      offsetTop,
      offsetBottom,
      offsetScroll,
      container,
    }
  })

  const [stickyScrollLeft, setStickyScrollLeft] = useState(0)

  return { isSticky, mergedSticky, stickyScrollLeft, setStickyScrollLeft }
}

export interface StickyContext {
  isSticky: ComputedRef<boolean>
  mergedSticky: ComputedRef<Required<TableSticky>>
  stickyScrollLeft: ComputedRef<number>
  setStickyScrollLeft: (value: number) => void
}
