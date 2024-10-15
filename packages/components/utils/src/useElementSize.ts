/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef, Ref } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { useState } from '@idux/cdk/utils'

export function useElementSize(
  measureSpanRef: Ref<HTMLElement | undefined>,
): ComputedRef<{ width: number; height: number }> {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useResizeObserver(measureSpanRef, ({ contentRect }) => {
    setSize({ width: contentRect.width, height: contentRect.height })
  })

  return size
}
