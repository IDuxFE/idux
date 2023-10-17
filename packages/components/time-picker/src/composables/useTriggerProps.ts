/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵTriggerProps } from '@idux/components/_private/trigger'

import { type ComputedRef, computed } from 'vue'

import { isArray } from 'lodash-es'

import { TimePickerContext, TimeRangePickerContext } from '../tokens'

export function useTriggerProps(context: TimePickerContext | TimeRangePickerContext): ComputedRef<ɵTriggerProps> {
  const {
    props,
    config,
    accessor,
    mergedSize,
    mergedStatus,
    focused,
    handleBlur,
    handleFocus,
    handleClear,
    handleKeyDown,
    overlayOpened,
    setOverlayOpened,
  } = context

  const handleClick = () => {
    if (accessor.disabled) {
      return
    }

    setOverlayOpened(!overlayOpened.value)
  }

  return computed(() => ({
    borderless: props.borderless,
    clearable:
      !props.readonly &&
      !accessor.disabled &&
      (props.clearable ?? config.clearable) &&
      (isArray(accessor.value) ? !!accessor.value.length : !!accessor.value),
    clearIcon: props.clearIcon ?? config.clearIcon,
    disabled: accessor.disabled,
    focused: focused.value,
    readonly: props.readonly,
    size: mergedSize.value,
    status: mergedStatus.value,
    suffix: props.suffix ?? config.suffix,
    onClick: handleClick,
    onClear: handleClear,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  }))
}
