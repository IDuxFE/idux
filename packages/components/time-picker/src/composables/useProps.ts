/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  BaseTriggerProps,
  TimePickerProps,
  TimePickerTriggerProps,
  TimeRangePickerProps,
  TimeRangePickerTriggerProps,
} from '../types'
import type { PopperPlacement, PopperTrigger } from '@idux/cdk/popper'
import type { PortalTargetType } from '@idux/cdk/portal'
import type { ɵBaseTimePanelProps } from '@idux/components/_private/time-panel'
import type { TimePickerConfig, TimeRangePickerConfig } from '@idux/components/config'
import type { FormContext, FormSize } from '@idux/components/form'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isArray } from 'lodash-es'

import { TimePickerContext, TimeRangePickerContext } from '../tokens'

export interface CommonInputProps {
  borderless: boolean
  clearable: boolean
  clearIcon: string
  size: FormSize
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
    }
  })
}

export function useCommonTriggerProps<
  T extends TimePickerTriggerProps | TimeRangePickerTriggerProps,
  U extends T extends TimePickerTriggerProps ? TimePickerContext : TimeRangePickerContext,
>(props: T, timePickerContext: U): ComputedRef<BaseTriggerProps> {
  const {
    props: pickerProps,
    config,
    overlayOpened,
    formContext,
    commonBindings: { isDisabled, isFocused, handleBlur, handleFocus },
  } = timePickerContext
  return computed(() => {
    const pickerClearable = pickerProps.clearable ?? config.clearable
    const enableExternalInput = (pickerProps.allowInput ?? config.allowInput) === true
    const valueNotEmpty = isArray(props.value) ? props.value.some(v => !!v) : !!props.value

    return {
      disabled: isDisabled?.value ?? pickerProps.disabled,
      focused: isFocused?.value || overlayOpened.value,
      readonly: pickerProps.readonly,
      borderless: pickerProps.borderless ?? config.borderless,
      clearable:
        (enableExternalInput || !overlayOpened?.value) && !pickerProps.readonly && pickerClearable && valueNotEmpty,
      clearIcon: pickerProps.clearIcon ?? config.clearIcon,
      size: pickerProps.size ?? formContext?.size.value ?? config.size,
      suffix: pickerProps.suffix ?? config.suffix,

      onFocus: handleFocus,
      onBlur: handleBlur,
    }
  })
}

export interface CommonPanelProps extends ɵBaseTimePanelProps {
  hourEnabled: boolean
  minuteEnabled: boolean
  secondEnabled: boolean
  use12Hours: boolean
  amPmCapital: boolean
}

export function useCommonPanelProps(
  props: TimePickerProps | TimeRangePickerProps,
  config: TimePickerConfig | TimeRangePickerConfig,
): ComputedRef<CommonPanelProps> {
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

    const _format = format ?? config.format

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
