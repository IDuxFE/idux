/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollProps } from '../types'

import { type ComputedRef, type Ref, computed } from 'vue'

import { isNumber } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { useState } from '@idux/cdk/utils'

export function useContainerHeight(
  props: VirtualScrollProps,
  containerRef: Ref<HTMLElement | undefined>,
): ComputedRef<number> {
  const [height, setHeight] = useState(0)
  useResizeObserver(containerRef, entry => {
    const { contentRect } = entry
    setHeight(contentRect.height)
  })

  return computed(() => (isNumber(props.height) ? props.height : height.value))
}
