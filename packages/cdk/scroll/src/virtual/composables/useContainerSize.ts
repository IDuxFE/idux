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

export function useContainerSize(
  props: VirtualScrollProps,
  holderRef: Ref<HTMLElement | undefined>,
): ComputedRef<{ width: number; height: number }> {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  useResizeObserver(holderRef, entry => {
    const {
      contentRect: { height, width },
    } = entry

    if (height !== size.value.height || width !== size.value.width) {
      setSize({ height, width })
    }
  })

  return computed(() => ({
    height: isNumber(props.height) ? props.height : size.value.height,
    width: isNumber(props.width) ? props.width : size.value.width,
  }))
}
