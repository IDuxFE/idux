/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type ConvertProgressSuccess, type ProgressProps, type ProgressStatus, progressStatus } from '../types'
import { fullPercent } from '../util'

export function useStatus(
  props: ProgressProps,
  percent: ComputedRef<number>,
  success: ComputedRef<ConvertProgressSuccess>,
): ComputedRef<ProgressStatus> {
  return computed(() => {
    if (
      !progressStatus.includes(props.status!) &&
      (percent.value >= fullPercent || success.value.percent >= fullPercent)
    ) {
      return 'success'
    }

    return props.status ?? 'normal'
  })
}
