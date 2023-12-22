/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from './useGetKey'
import type { SyncScroll } from './useScrollPlacement'
import type { VirtualScrollProps, VirtualScrollToFn, VirtualScrollToOptions } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { isNil } from 'lodash-es'

import { cancelRAF, rAF } from '@idux/cdk/utils'

export function useScrollTo(
  props: VirtualScrollProps,
  holderRef: Ref<HTMLElement | undefined>,
  getKey: ComputedRef<GetKey>,
  getRowHeight: (rowKey: VKey) => number,
  collectSize: () => void,
  syncScroll: SyncScroll,
): VirtualScrollToFn {
  let refId: number

  return (option?: number | VirtualScrollToOptions) => {
    // When not argument provided, we think dev may want to show the scrollbar
    if (isNil(option)) {
      return
    }

    // Normal scroll logic
    cancelRAF(refId)
    const { dataSource, rowHeight, itemHeight } = props

    if (typeof option === 'number') {
      syncScroll({ top: option }, true)
    } else if (typeof option === 'object') {
      const { align, offset = 0 } = option
      let index: number
      if ('index' in option) {
        index = option.index
      } else {
        index = dataSource.findIndex(item => getKey.value(item) === option.key)
      }

      // We will retry 3 times in case dynamic height shaking
      const _syncScroll = (times: number, targetAlign?: 'top' | 'bottom') => {
        const holderElement = holderRef.value
        if (times < 0 || !holderElement) {
          return
        }

        const height = holderElement.clientHeight
        let needCollectSize = false
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
            const cacheHeight = getRowHeight(itemKey)
            itemBottom = itemTop + (isNil(cacheHeight) ? rowHeight ?? itemHeight! : cacheHeight)

            stackTop = itemBottom

            if (i === index && isNil(cacheHeight)) {
              needCollectSize = true
            }
          }

          // Scroll to
          let targetTop: number | null = null

          switch (mergedAlign) {
            case 'top':
              targetTop = Math.max(itemTop - offset, 0)
              break
            case 'bottom':
              targetTop = Math.max(itemBottom - height + offset, 0)
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
            syncScroll({ top: targetTop }, true)
          }
        }

        // We will retry since element may not sync height as it described
        refId = rAF(() => {
          if (needCollectSize) {
            collectSize()
          }
          _syncScroll(times - 1, newTargetAlign)
        })
      }

      _syncScroll(3)
    }
  }
}
