/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ControlTriggerProps } from '@idux/components/control-trigger'

import { type ComputedRef, computed } from 'vue'

import { TimePickerContext, TimeRangePickerContext } from '../tokens'

export function useTriggerProps(context: TimePickerContext | TimeRangePickerContext): ComputedRef<ControlTriggerProps> {
  const {
    props,
    config,
    accessor,
    mergedSize,
    mergedStatus,
    mergedPrefixCls,
    focused,
    handleBlur,
    handleFocus,
    handleClear,
    handleKeyDown,
    overlayOpened,
    setOverlayOpened,
  } = context

  return computed(() => ({
    autofocus: props.autofocus,
    borderless: props.borderless,
    value: accessor.value,
    clearable: props.clearable ?? config.clearable,
    clearIcon: props.clearIcon ?? config.clearIcon,
    disabled: accessor.disabled,
    focused: focused.value,
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
  }))
}
