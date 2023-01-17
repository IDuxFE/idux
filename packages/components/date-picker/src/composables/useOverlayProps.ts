/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type ɵOverlayProps } from '@idux/components/_private/overlay'

import { type DatePickerContext, type DateRangePickerContext } from '../token'

const defaultOffset: [number, number] = [0, 4]
export function useOverlayProps(context: DatePickerContext | DateRangePickerContext): ComputedRef<ɵOverlayProps> {
  const { props, common, config, accessor, mergedPrefixCls, overlayOpened, setOverlayOpened, onAfterLeave } = context
  return computed(() => {
    return {
      clickOutside: true,
      container: props.overlayContainer ?? config.overlayContainer,
      containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
      disabled: accessor.disabled || props.readonly,
      offset: defaultOffset,
      placement: 'bottomStart',
      transitionName: `${common.prefixCls}-slide-auto`,
      trigger: 'manual',
      visible: overlayOpened.value,
      'onUpdate:visible': setOverlayOpened,
      onAfterLeave,
    }
  })
}
