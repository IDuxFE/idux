/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableProps, TableSticky } from '../types'
import type { ComputedRef, Ref } from 'vue'

import { computed, ref } from 'vue'

import { isPlainObject } from 'lodash-es'

export function useSticky(props: TableProps): StickyContext {
  const isSticky = computed(() => !!props.sticky)

  const mergedSticky = computed(() => {
    const { sticky } = props
    const {
      offsetHead = 0,
      offsetFoot = 0,
      offsetScroll = 0,
      container = window,
    } = isPlainObject(sticky) ? (sticky as TableSticky) : {}

    return {
      offsetHead,
      offsetFoot,
      offsetScroll,
      container,
    }
  })

  const stickyScrollLeft = ref(0)

  return { isSticky, mergedSticky, stickyScrollLeft }
}

export interface StickyContext {
  isSticky: ComputedRef<boolean>
  mergedSticky: ComputedRef<Required<TableSticky>>
  stickyScrollLeft: Ref<number>
}
