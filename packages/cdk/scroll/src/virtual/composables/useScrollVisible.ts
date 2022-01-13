/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed } from 'vue'

import { useState } from '@idux/cdk/utils'

import { type VirtualScrollProps } from '../types'

export interface ScrollVisibleContext {
  scrollVisible: ComputedRef<boolean>
  setScrollVisible: (visible: boolean) => void
}

export function useScrollVisible(props: VirtualScrollProps, scrollHeight: Ref<number>): ScrollVisibleContext {
  const [visible, setScrollVisible] = useState(false)

  const scrollVisible = computed(() => {
    if (props.height >= scrollHeight.value) {
      return false
    }
    return visible.value
  })

  return { scrollVisible, setScrollVisible }
}
