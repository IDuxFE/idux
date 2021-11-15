/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasePanelProps, TimePickerProps, TimeRangePickerProps } from './types'
import type { InputPreProcessor, InputValidator } from './usePickerControl'
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

import { usePickerControl } from './usePickerControl'
import { normalizeFormat } from './utils'

export interface CommonBindings {
  inputRef: Ref<InputInstance | undefined>
  accessor: FormAccessor<Date>
  isDisabled: ComputedRef<boolean>
  inputValue: Ref<string>
  pannelValue: Ref<Date | undefined>
  handleInputChange: (value: string) => void
  handlePanelChange: (value: Date) => void
  handleClear: (evt: Event) => void
  handleBlur: (evt: FocusEvent) => void
  handleFocus: (evt: FocusEvent) => void
  handleClose: () => void
  handleInputConfirm: () => void
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export function useCommonBindings(
  props: TimePickerProps,
  inputPreProcessors: InputPreProcessor[],
  inputValidator: InputValidator,
): CommonBindings {
  const inputRef = ref<InputInstance>()
  const { accessor, control } = useValueAccessor()
  useFormItemRegister(control)
  const { inputValue, pannelValue, handleInputChange, handlePanelChange, handleInputConfirm, handleClose } =
    usePickerControl(accessor.valueRef, props.format, inputPreProcessors, inputValidator, value => {
      callEmit(props.onChange, value)
      accessor.setValue(value)
      inputRef.value?.focus()
    })

  const isDisabled = computed(() => accessor.disabled.value)

  const focus = (options?: FocusOptions) => inputRef.value?.focus(options)
  const blur = () => inputRef.value?.blur()

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
    inputValue,
    pannelValue,
    handleInputChange,
    handlePanelChange,
    handleClear,
    handleBlur,
    handleFocus,
    handleInputConfirm,
    handleClose,
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
