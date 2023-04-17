/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef, Ref } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { useState } from '@idux/cdk/utils'

export function useElementWidthMeasure(measureSpanRef: Ref<HTMLElement | undefined>): ComputedRef<number> {
  const [spanWidth, setSpanWidth] = useState(0)

  useResizeObserver(measureSpanRef, ({ contentRect }) => {
    setSpanWidth(contentRect.width)
  })

  return spanWidth
}
