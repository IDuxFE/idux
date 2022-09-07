/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵOverlayProps } from '@idux/components/_private/overlay'

import { type ComputedRef, computed } from 'vue'

import { useOverlayContainer } from '@idux/components/utils'

import { TimePickerContext, TimeRangePickerContext } from '../tokens'

const defaultOffset: [number, number] = [0, 8]
export function useOverlayProps(context: TimePickerContext | TimeRangePickerContext): ComputedRef<ɵOverlayProps> {
  const { props, common, config, accessor, mergedPrefixCls, overlayOpened, setOverlayOpened } = context
  const mergedOverlayContainer = useOverlayContainer(props, config, common, mergedPrefixCls)
  return computed(() => {
    return {
      clickOutside: true,
      container: mergedOverlayContainer.value,
      disabled: accessor.disabled || props.readonly,
      offset: defaultOffset,
      placement: 'bottomStart',
      transitionName: `${common.prefixCls}-fade`,
      trigger: 'manual',
      visible: overlayOpened.value,
      'onUpdate:visible': setOverlayOpened,
    }
  })
}
