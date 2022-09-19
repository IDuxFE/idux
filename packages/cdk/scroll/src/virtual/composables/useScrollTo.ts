/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from '../composables/useGetKey'
import type { SyncScrollTop } from '../composables/useScrollPlacement'
import type { VirtualScrollProps, VirtualScrollToFn, VirtualScrollToOptions } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { isNil } from 'lodash-es'

import { cancelRAF, rAF } from '@idux/cdk/utils'

export function useScrollTo(
  props: VirtualScrollProps,
  holderRef: Ref<HTMLElement | undefined>,
  getKey: ComputedRef<GetKey>,
  heights: Map<VKey, number>,
  collectHeight: () => void,
  syncScrollTop: SyncScrollTop,
): VirtualScrollToFn {
  let refId: number

  return (option?: number | VirtualScrollToOptions) => {
    // When not argument provided, we think dev may want to show the scrollbar
    if (isNil(option)) {
      return
    }

    // Normal scroll logic
    cancelRAF(refId)
    const { dataSource, itemHeight } = props

    if (typeof option === 'number') {
      syncScrollTop(option, true)
    } else if (typeof option === 'object') {
      const { align, offset = 0 } = option
      let index: number
      if ('index' in option) {
        index = option.index
      } else {
        index = dataSource.findIndex(item => getKey.value(item) === option.key)
      }

      // We will retry 3 times in case dynamic height shaking
      const syncScroll = (times: number, targetAlign?: 'top' | 'bottom') => {
        const holderElement = holderRef.value
        if (times < 0 || !holderElement) {
          return
        }

        const height = holderElement.clientHeight
        let needCollectHeight = false
        let newTargetAlign = targetAlign

        // Go to next frame if height not exist
        if (height > 0) {
          const mergedAlign = targetAlign || align

          // Get top & bottom
          let stackTop = 0
          let itemTop = 0
          let itemBottom = 0

          for (let i = 0; i <= index; i++) {
            const itemKey = getKey.value(dataSource[i])
            itemTop = stackTop
            const cacheHeight = heights.get(itemKey)
            itemBottom = itemTop + (isNil(cacheHeight) ? itemHeight! : cacheHeight)

            stackTop = itemBottom

            if (i === index && isNil(cacheHeight)) {
              needCollectHeight = true
            }
          }

          // Scroll to
          let targetTop: number | null = null

          switch (mergedAlign) {
            case 'top':
              targetTop = itemTop - offset
              break
            case 'bottom':
              targetTop = itemBottom - height + offset
              break

            default: {
              const { scrollTop } = holderElement
              const scrollBottom = scrollTop + height
              if (itemTop < scrollTop) {
                newTargetAlign = 'top'
              } else if (itemBottom > scrollBottom) {
                newTargetAlign = 'bottom'
              }
            }
          }

          if (targetTop !== null && targetTop !== holderElement.scrollTop) {
            syncScrollTop(targetTop, true)
          }
        }

        // We will retry since element may not sync height as it described
        refId = rAF(() => {
          if (needCollectHeight) {
            collectHeight()
          }
          syncScroll(times - 1, newTargetAlign)
        })
      }

      syncScroll(3)
    }
  }
}
