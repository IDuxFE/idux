import type { ComputedRef, Ref } from 'vue'
import type { ScrollToOptions, ScrollToFn, VirtualListProps, VirtualScrollBarInstance } from '../types'

import { isNil } from 'lodash-es'
import { cancelRAF, rAF } from '@idux/cdk/utils'
import { useItemKey } from './useItem'

export const useScrollTo = (
  props: VirtualListProps,
  scrollBarRef: Ref<VirtualScrollBarInstance | undefined>,
  componentElement: ComputedRef<HTMLElement | undefined>,
  heights: Record<string, number>,
  collectHeight: () => void,
  syncScrollTop: (newTop: number) => void,
): ScrollToFn => {
  let refId: number

  return (option?: number | ScrollToOptions) => {
    // When not argument provided, we think dev may want to show the scrollbar
    if (isNil(option)) {
      scrollBarRef.value?.delayHidden()
      return
    }

    // Normal scroll logic
    cancelRAF(refId)
    const { data, itemHeight } = props

    if (typeof option === 'number') {
      syncScrollTop(option)
    } else if (typeof option === 'object') {
      const { align, offset = 0 } = option
      let index: number
      if ('index' in option) {
        index = option.index
      } else {
        index = data.findIndex(item => useItemKey(props, item) === option.key)
      }

      // We will retry 3 times in case dynamic height shaking
      const syncScroll = (times: number, targetAlign?: 'top' | 'bottom') => {
        if (times < 0 || !componentElement.value) {
          return
        }

        const height = componentElement.value.clientHeight
        let needCollectHeight = false
        let newTargetAlign = targetAlign

        // Go to next frame if height not exist
        if (height > 0) {
          const mergedAlign = targetAlign || align

          // Get top & bottom
          let stackTop = 0
          let itemTop = 0
          let itemBottom = 0

          for (let i = 0; i <= index; i += 1) {
            const itemKey = useItemKey(props, data[i])
            itemTop = stackTop
            const cacheHeight = heights[itemKey]
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
              const { scrollTop } = componentElement.value
              const scrollBottom = scrollTop + height
              if (itemTop < scrollTop) {
                newTargetAlign = 'top'
              } else if (itemBottom > scrollBottom) {
                newTargetAlign = 'bottom'
              }
            }
          }

          if (targetTop !== null && targetTop !== componentElement.value.scrollTop) {
            syncScrollTop(targetTop)
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
