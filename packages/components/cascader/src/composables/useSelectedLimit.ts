/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'

import { type ComputedRef, type Ref, computed } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

export interface SelectedLimitContext {
  selectedLimit: ComputedRef<boolean>
  selectedLimitTitle: ComputedRef<string>
}

export function useSelectedLimit(selectedKeys: ComputedRef<VKey[]>, multipleLimit: Ref<number>): SelectedLimitContext {
  const locale = useGlobalConfig('locale')

  const selectedLimit = computed(() => selectedKeys.value.length >= multipleLimit.value)
  const selectedLimitTitle = computed(() => {
    if (!selectedLimit.value) {
      return ''
    }
    return locale.select.limitMessage.replace('${0}', `${multipleLimit.value}`)
  })

  return {
    selectedLimit,
    selectedLimitTitle,
  }
}
