/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type ɵOverlayProps } from '@idux/components/_private/overlay'
import { type ProSearchConfig } from '@idux/pro/config'

import { type ProSearchProps } from '../types'

export function useCommonOverlayProps(
  props: ProSearchProps,
  config: ProSearchConfig,
  mergedPrefixCls: ComputedRef<string>,
): ComputedRef<ɵOverlayProps> {
  return computed(() => ({
    container: props.overlayContainer ?? config.overlayContainer,
    containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
    placement: 'bottomStart',
    offset: [0, 8],
  }))
}
