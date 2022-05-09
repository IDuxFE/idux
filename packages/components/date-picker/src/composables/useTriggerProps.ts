/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerContext, DateRangePickerContext } from '../token'
import type { ɵTriggerProps } from '@idux/components/_private/trigger'
import type { FormContext } from '@idux/components/form'

import { type ComputedRef, computed } from 'vue'

export function useTriggerProps(
  context: DatePickerContext | DateRangePickerContext,
  formContext: FormContext | null,
): ComputedRef<ɵTriggerProps> {
  const {
    props,
    config,
    accessor,
    isFocused,
    handleFocus,
    handleBlur,
    handleClear,
    handleKeyDown,
    overlayOpened,
    setOverlayOpened,
    inputEnableStatus,
  } = context

  const handleClick = () => {
    const currOpened = overlayOpened.value
    if (currOpened || accessor.disabled.value) {
      return
    }

    setOverlayOpened(!currOpened)
  }

  return computed(() => {
    return {
      borderless: props.borderless,
      clearable:
        !props.readonly &&
        !accessor.disabled.value &&
        (props.clearable ?? config.clearable) &&
        !!accessor.valueRef.value,
      clearIcon: props.clearIcon ?? config.clearIcon,
      disabled: accessor.disabled.value,
      focused: isFocused.value,
      readonly: props.readonly || inputEnableStatus.value.enableInput === false,
      size: props.size ?? formContext?.size.value ?? config.size,
      suffix: props.suffix ?? config.suffix,
      onClick: handleClick,
      onClear: handleClear,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    }
  })
}
