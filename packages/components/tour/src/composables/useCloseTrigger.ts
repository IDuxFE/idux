/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTourProps } from './useMergedProps'
import type { TargetPositionInfo } from '../types'

import { type ComputedRef, watch } from 'vue'

import { callEmit, useEventListener } from '@idux/cdk/utils'

import { isInBox } from '../utils'

export function useCloseTrigger(
  mergedProps: ComputedRef<MergedTourProps>,
  positionInfo: ComputedRef<TargetPositionInfo | null>,
  visible: ComputedRef<boolean>,
  setVisible: (visible: boolean) => void,
): void {
  let delayedVisible = visible.value
  let delayTmr: number
  watch(visible, v => {
    delayTmr && clearTimeout(delayTmr)
    delayTmr = setTimeout(() => {
      delayedVisible = v
    }, 100)
  })

  useEventListener(window, 'keydown', evt => {
    if (mergedProps.value.closeOnEsc && evt.code === 'Escape') {
      setVisible(false)
      callEmit(mergedProps.value.onClose)
    }
  })

  useEventListener(window, 'click', evt => {
    if (!positionInfo.value || !delayedVisible) {
      return
    }

    if (mergedProps.value.closeOnClick && !isInBox(evt.clientX, evt.clientY, positionInfo.value)) {
      setVisible(false)
      callEmit(mergedProps.value.onClose)
    }
  })
}
