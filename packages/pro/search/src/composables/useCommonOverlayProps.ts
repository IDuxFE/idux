/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type ɵOverlayProps } from '@idux/components/_private/overlay'
import { type CommonConfig } from '@idux/components/config'
import { useOverlayContainer } from '@idux/components/utils'
import { type ProSearchConfig } from '@idux/pro/config'

import { type ProSearchProps } from '../types'

export function useCommonOverlayProps(
  props: ProSearchProps,
  config: ProSearchConfig,
  common: CommonConfig,
  mergedPrefixCls: ComputedRef<string>,
): ComputedRef<ɵOverlayProps> {
  const mergedContainer = useOverlayContainer(props, config, common, mergedPrefixCls)
  return computed(() => ({
    container: mergedContainer.value,
    placement: 'bottomStart',
    offset: [0, 4],
  }))
}
