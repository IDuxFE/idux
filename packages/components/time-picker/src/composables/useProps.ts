/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  TimePickerProps,
  TimePickerTriggerProps,
  TimeRangePickerProps,
  TimeRangePickerTriggerProps,
} from '../types'
import type { PopperPlacement, PopperTrigger } from '@idux/cdk/popper'
import type { PortalTargetType } from '@idux/cdk/portal'
import type { ɵBaseTimeSelectorProps } from '@idux/components/_private'
import type { TimePickerConfig, TimeRangePickerConfig } from '@idux/components/config'
import type { FormContext, FormSize } from '@idux/components/form'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { normalizeFormat } from '@idux/components/_private/time-selector/src/utils'

export interface CommonInputProps {
  borderless: boolean
  clearable: boolean
  clearIcon: string
  size: FormSize
  suffix: string
}
export interface CommonTriggerProps {
  disabled: boolean
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

export function useCommonTriggerProps(
  pickerProps: TimePickerProps | TimeRangePickerProps,
  props: TimePickerTriggerProps | TimeRangePickerTriggerProps,
  config: TimePickerConfig | TimeRangePickerConfig,
  formContext?: FormContext | null,
  isDisabled?: ComputedRef<boolean>,
  overlayOpened?: ComputedRef<boolean>,
): ComputedRef<CommonTriggerProps> {
  return computed(() => {
    const pickerClearable = pickerProps.clearable ?? config.clearable
    const enableInternalInput = (pickerProps.allowInput ?? config.allowInput) === true
    const valueNotEmpty = Array.isArray(props.value) ? props.value.some(v => !!v) : !!props.value

    return {
      disabled: isDisabled?.value ?? pickerProps.disabled,
      borderless: pickerProps.borderless ?? config.borderless,
      clearable: (enableInternalInput || !overlayOpened?.value) && pickerClearable && valueNotEmpty,
      clearIcon: pickerProps.clearIcon ?? config.clearIcon,
      size: pickerProps.size ?? formContext?.size.value ?? config.size,
      suffix: pickerProps.suffix ?? config.suffix,
    }
  })
}

export interface CommonSelectorProps extends ɵBaseTimeSelectorProps {
  hourEnabled: boolean
  minuteEnabled: boolean
  secondEnabled: boolean
  use12Hours: boolean
  amPmCapital: boolean
}

export function useCommonSelectorProps(
  props: TimePickerProps | TimeRangePickerProps,
): ComputedRef<CommonSelectorProps> {
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
  target: PortalTargetType
}

const defaultOffset: [number, number] = [0, 8]
export function useCommonOverlayProps(
  props: TimePickerProps | TimeRangePickerProps,
  config: TimePickerConfig | TimeRangePickerConfig,
  mergedPrefixCls: ComputedRef<string>,
  setVisibility: (value: boolean) => void,
): ComputedRef<CommonOverlayProps> {
  return computed(() => ({
    class: props.overlayClassName,
    clickOutside: true,
    offset: defaultOffset,
    placement: 'bottomStart',
    transitionName: 'ix-fade',
    target: props.target ?? config.target ?? `${mergedPrefixCls.value}-overlay-container`,
    trigger: 'manual',
    ['onUpdate:visible']: setVisibility,
  }))
}
