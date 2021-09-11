import type { ComputedRef } from 'vue'
import type { GetKey } from './useGetKey'

import { reactive } from 'vue'

export interface ItemHeightsContext {
  heights: Record<string, number>
  collectHeights: () => void
  setItemElement: (item: unknown, el: HTMLElement) => void
}

export function useItemHeights(getKey: ComputedRef<GetKey>): ItemHeightsContext {
  const itemMap = new Map<string | number, HTMLElement>()
  const heights = reactive<Record<string, number>>({})

  let heightUpdateId = 0

  const collectHeights = () => {
    heightUpdateId += 1
    const currentId = heightUpdateId
    Promise.resolve().then(() => {
      // Only collect when it's latest call
      if (currentId !== heightUpdateId) {
        return
      }

      itemMap.forEach((element, key) => {
        if (element && element.offsetParent) {
          const { offsetHeight } = element
          if (heights[key] !== offsetHeight) {
            heights[key] = offsetHeight
          }
        }
      })
    })
  }

  const setItemElement = (item: unknown, el: HTMLElement) => {
    const key = getKey.value(item)

    if (el) {
      itemMap.set(key, el)
      collectHeights()
    } else {
      itemMap.delete(key)
    }
  }

  return { heights, collectHeights, setItemElement }
}
