import type { VirtualListProps } from '../types'

import { isFunction } from '@idux/cdk/utils'
import { reactive } from '@vue/reactivity'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useItemKey = (props: VirtualListProps, item: Record<string, any>): string | number => {
  const itemKey = props.itemKey
  if (isFunction(itemKey)) {
    return itemKey(item)
  }
  return item[itemKey]
}

export type SetItemInstanceFn = (item: Record<string, unknown>, instance: HTMLElement) => void

export interface UseItems {
  heights: Record<string, number>
  collectHeight: () => void
  setItemInstance: SetItemInstanceFn
}

export const useItems = (props: VirtualListProps): UseItems => {
  const instanceMap = new Map<string | number, HTMLElement>()
  const heights = reactive<Record<string, number>>({})

  let heightUpdateId = 0

  const collectHeight = () => {
    heightUpdateId += 1
    const currentId = heightUpdateId
    Promise.resolve().then(() => {
      // Only collect when it's latest call
      if (currentId !== heightUpdateId) {
        return
      }

      instanceMap.forEach((element, key) => {
        if (element && element.offsetParent) {
          const { offsetHeight } = element
          if (heights[key] !== offsetHeight) {
            heights[key] = offsetHeight
          }
        }
      })
    })
  }

  const setItemInstance = (item: Record<string, unknown>, instance: HTMLElement) => {
    const key = useItemKey(props, item)

    if (instance) {
      instanceMap.set(key, instance)
      collectHeight()
    } else {
      instanceMap.delete(key)
    }
  }

  return { heights, collectHeight, setItemInstance }
}
