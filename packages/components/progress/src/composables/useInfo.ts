/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ConvertProgressSuccess, ProgressProps, ProgressStatus } from '../types'
import type { ProgressConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

import { isFunction } from 'lodash-es'

import { fullPercent } from '../util'

export const useInfo = (
  props: ProgressProps,
  config: ProgressConfig,
  progressStatus: ComputedRef<ProgressStatus>,
  percent: ComputedRef<number>,
  success: ComputedRef<ConvertProgressSuccess>,
): {
  formattedText: ComputedRef<string>
  showFormat: ComputedRef<boolean>
  showSuccessIcon: ComputedRef<boolean>
  showExceptionIcon: ComputedRef<boolean>
} => {
  const formatFn = props.format ?? config.format
  const formattedText = computed(() => formatFn(percent.value, success.value.percent))

  const showSuccessIcon = computed(
    () => progressStatus.value === 'success' || (progressStatus.value === 'normal' && percent.value === fullPercent),
  )
  const showExceptionIcon = computed(() => progressStatus.value === 'exception')
  const showFormat = computed(() => isFunction(props.format) || !(showSuccessIcon.value || showExceptionIcon.value))

  return {
    formattedText,
    showFormat,
    showSuccessIcon,
    showExceptionIcon,
  }
}
