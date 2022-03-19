/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferProps } from '../types'
import type { TransferConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

import { isBoolean } from 'lodash-es'

export function useSearchable(
  props: TransferProps,
  config: TransferConfig,
): { source: ComputedRef<boolean>; target: ComputedRef<boolean> } {
  return {
    source: computed(() => getSearchable(props, config, true)),
    target: computed(() => getSearchable(props, config, false)),
  }
}

function getSearchable(props: TransferProps, config: TransferConfig, isSource: boolean) {
  const searchable = props.searchable ?? config.searchable
  if (!searchable || isBoolean(searchable)) {
    return !!searchable
  }

  return isSource ? searchable.source : searchable.target
}
