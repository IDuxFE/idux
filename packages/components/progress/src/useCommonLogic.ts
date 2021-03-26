import { ConvertProgressProps, ProgressStatus, progressStatus } from './types'
import { computed, ComputedRef } from 'vue'
import { convertPercent, fullPercent } from './util'
import { isFunction } from '@idux/cdk/utils'
import { ProgressConfig } from '@idux/components/config'

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
    return size === 'small'
  })
}
