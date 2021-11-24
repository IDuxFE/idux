/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasePanelProps, TimePickerProps, TimeRangePickerProps } from '../types'
import type { PopperPlacement, PopperTrigger } from '@idux/cdk/popper'
import type { TimePickerConfig, TimeRangePickerConfig } from '@idux/components/config'
import type { FormContext, FormSize } from '@idux/components/form'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'
import { normalizeFormat } from '../utils'

export interface CommonInputProps {
  borderless: boolean
  clearable: boolean
  clearIcon: string
  size: FormSize
  suffix: string
}

export function useCommonInputProps(
  props: TimePickerProps | TimeRangePickerProps,
  config: TimePickerConfig | TimeRangePickerConfig,
  formContext?: FormContext | null,
): ComputedRef<CommonInputProps> {
  return computed(() => {
    return {
      borderless: props.borderless ?? config.borderless,
      clearable: props.clearable ?? config.clearable,
      clearIcon: props.clearIcon ?? config.clearIcon,
      size: props.size ?? formContext?.size.value ?? config.size,
      suffix: props.suffix ?? config.suffix,
    }
  })
}

export interface CommonPanelProps extends BasePanelProps {
  hourEnabled: boolean
  minuteEnabled: boolean
  secondEnabled: boolean
  use12Hours: boolean
  amPmCapital: boolean
}

export function useCommonPanelProps(props: TimePickerProps | TimeRangePickerProps): ComputedRef<CommonPanelProps> {
  return computed(() => {
    const {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      format,
      hideDisabledOptions,
      hourStep,
      minuteStep,
      secondStep,
    } = props

    const _format = normalizeFormat(format)

    return {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      hourStep,
      minuteStep,
      secondStep,
      hourEnabled: /[hH]/.test(_format),
      minuteEnabled: /m/.test(_format),
      secondEnabled: /s/.test(_format),
      use12Hours: /[aA]/.test(_format),
      amPmCapital: /A/.test(_format),
    }
  })
}

export interface CommonOverlayProps {
  class?: string
  clickOutside: boolean
  offset: [number, number]
  placement: PopperPlacement
  transitionName: string
  trigger: PopperTrigger
}

const defaultOffset: [number, number] = [0, 8]
export function useCommonOverlayProps(
  props: TimePickerProps | TimeRangePickerProps,
  setVisibility: (value: boolean) => void,
): ComputedRef<CommonOverlayProps> {
  return computed(() => ({
    class: props.overlayClassName,
    clickOutside: true,
    offset: defaultOffset,
    placement: 'bottom',
    transitionName: 'ix-fade',
    target: 'ix-time-picker-panel-container',
    trigger: 'manual',
    ['onUpdate:visible']: setVisibility,
  }))
}
