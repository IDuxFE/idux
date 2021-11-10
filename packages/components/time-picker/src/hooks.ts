/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasePanelProps, TimePickerProps, TimeRangePickerProps } from './types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { PopperPlacement, PopperTrigger } from '@idux/cdk/popper'
import type { TimePickerConfig, TimeRangePickerConfig } from '@idux/components/config'
import type { FormContext, FormSize } from '@idux/components/form'
import type { InputInstance } from '@idux/components/input'
import type { ComputedRef, Ref } from 'vue'

import { computed, ref } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useFormItemRegister } from '@idux/components/form'

import { normalizeFormat } from './utils'

export interface CommonBindings<T> {
  inputRef: Ref<InputInstance | undefined>
  accessor: FormAccessor<T>
  isDisabled: ComputedRef<boolean>
  handleChange: (value: T) => void
  handleClear: (evt: Event) => void
  handleBlur: (evt: FocusEvent) => void
  handleFocus: (evt: FocusEvent) => void
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export function useCommonBindings<T extends TimePickerProps | TimeRangePickerProps>(
  props: T,
): CommonBindings<T extends TimeRangePickerProps ? [Date, Date] : Date> {
  const inputRef = ref<InputInstance>()
  const { accessor, control } = useValueAccessor()
  useFormItemRegister(control)
  const isDisabled = computed(() => accessor.disabled.value)

  const focus = (options?: FocusOptions) => inputRef.value?.focus(options)
  const blur = () => inputRef.value?.blur()

  function handleChange(value: Date | [Date, Date]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callEmit(props.onChange, value as any)
    accessor.setValue(value)
    inputRef.value?.focus()
  }

  function handleClear(evt: Event) {
    callEmit(props.onClear, evt as MouseEvent)
    accessor.setValue(undefined)
  }

  function handleBlur(evt: FocusEvent) {
    callEmit(props.onBlur, evt)
    accessor.markAsBlurred()
  }

  function handleFocus(evt: FocusEvent) {
    callEmit(props.onFocus, evt)
  }

  return {
    inputRef,
    accessor,
    isDisabled,
    handleChange,
    handleClear,
    handleBlur,
    handleFocus,
    focus,
    blur,
  }
}

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
export function useCommonOverlayProps(props: TimePickerProps | TimeRangePickerProps): ComputedRef<CommonOverlayProps> {
  return computed(() => ({
    class: props.overlayClassName,
    clickOutside: true,
    offset: defaultOffset,
    placement: 'bottom',
    transitionName: 'ix-fade',
    target: 'ix-time-picker-panel-container',
    trigger: 'click',
  }))
}
