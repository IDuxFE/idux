/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, computed } from 'vue'

import { isFunction } from 'lodash-es'

import { ProgressConfig } from '@idux/components/config'

import { ConvertProgressProps, ProgressStatus, progressStatus } from './types'
import { convertPercent, fullPercent } from './util'

export function useStatusClasses(status: ComputedRef<ProgressStatus>): ComputedRef<string> {
  const prefix = 'ix-progress'
  const statusClassMap: Record<ProgressStatus, string> = {
    normal: `${prefix}-status-normal`,
    exception: `${prefix}-status-exception`,
    success: `${prefix}-status-success`,
    active: `${prefix}-status-active`,
  }

  return computed(() => statusClassMap[status.value])
}

export function useStatus(props: ConvertProgressProps): ComputedRef<ProgressStatus> {
  return computed(() => {
    if (
      !progressStatus.includes(props.status!) &&
      (props.percent >= fullPercent || props.success.percent >= fullPercent)
    ) {
      return 'success'
    } else {
      return props.status ?? 'normal'
    }
  })
}

export const useInfo = (
  props: ConvertProgressProps,
  config: ProgressConfig,
  progressStatus: ComputedRef<ProgressStatus>,
): {
  formattedText: ComputedRef<string>
  showFormat: ComputedRef<boolean>
  showSuccessIcon: ComputedRef<boolean>
  showExceptionIcon: ComputedRef<boolean>
} => {
  const formatFn = props.format ?? config.format
  const formattedText = computed(() => formatFn(props.percent, props.success.percent))

  const showSuccessIcon = computed(
    () =>
      progressStatus.value === 'success' ||
      (progressStatus.value === 'normal' && convertPercent(props.percent) === fullPercent),
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

export function useSmallSize(props: ConvertProgressProps, config: ProgressConfig): ComputedRef<boolean> {
  return computed(() => {
    const size = props.size ?? config.size
    return size === 'sm'
  })
}
