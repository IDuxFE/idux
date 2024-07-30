/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerContext, DateRangePickerContext } from '../token'
import type { ControlTriggerProps } from '@idux/components/control-trigger'

import { type ComputedRef, computed } from 'vue'

export function useTriggerProps(context: DatePickerContext | DateRangePickerContext): ComputedRef<ControlTriggerProps> {
  const {
    props,
    config,
    accessor,
    mergedSize,
    mergedStatus,
    mergedPrefixCls,
    overlayOpened,
    onAfterLeave,
    setOverlayOpened,
    handleFocus,
    handleBlur,
    handleClear,
    handleKeyDown,
  } = context

  return computed(() => {
    return {
      autofocus: props.autofocus,
      borderless: props.borderless,
      value: accessor.value,
      clearable: props.clearable ?? config.clearable,
      clearIcon: props.clearIcon ?? config.clearIcon,
      disabled: accessor.disabled,
      open: overlayOpened.value,
      overlayContainer: props.overlayContainer ?? config.overlayContainer,
      overlayContainerFallback: `.${mergedPrefixCls.value}-overlay-container`,
      overlayTabindex: props.overlayTabindex ?? config.overlayTabindex,
      readonly: props.readonly,
      size: mergedSize.value,
      status: mergedStatus.value,
      suffix: props.suffix ?? config.suffix,
      suffixRotate: false,
      'onUpdate:open': setOverlayOpened,
      onClear: handleClear,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeydown: handleKeyDown,
      onOverlayAfterLeave: onAfterLeave,
    }
  })
}
