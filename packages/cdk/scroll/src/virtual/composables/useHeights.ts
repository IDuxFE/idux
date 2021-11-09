/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'
import type { ComponentPublicInstance, Ref } from 'vue'

import { ref } from 'vue'

import { convertElement } from '@idux/cdk/utils'

export interface HeightsContext {
  heights: Map<VKey, number>
  collectHeights: () => void
  heightsUpdateMark: Ref<number>
  setItem: (key: VKey, item: ComponentPublicInstance | null) => void
}

export function useHeights(): HeightsContext {
  const itemMap = new Map<VKey, HTMLElement>()
  const heights = new Map<VKey, number>()

  const heightsUpdateMark = ref(0)

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
          if (heights.get(key) !== offsetHeight) {
            heights.set(key, offsetHeight)
          }
        }
      })

      heightsUpdateMark.value++
    })
  }

  const setItem = (key: VKey, item: ComponentPublicInstance | null) => {
    const element = convertElement(item)
    if (element) {
      itemMap.set(key, element)
      collectHeights()
    } else {
      itemMap.delete(key)
    }
  }

  return { heights, collectHeights, heightsUpdateMark, setItem }
}
