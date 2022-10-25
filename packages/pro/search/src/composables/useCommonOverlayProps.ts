/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps } from '../types'
import type { ɵOverlayProps } from '@idux/components/_private/overlay'
import type { ProSearchConfig } from '@idux/pro/config'

import { type ComputedRef, computed } from 'vue'

export function useCommonOverlayProps(
  mergedPrefixCls: ComputedRef<string>,
  props: ProSearchProps,
  config: ProSearchConfig,
): ComputedRef<ɵOverlayProps> {
  return computed(() => ({
    container: props.overlayContainer || config.overlayContainer || `.${mergedPrefixCls.value}-overlay-container`,
    placement: 'bottomStart',
    offset: [0, 4],
  }))
}
