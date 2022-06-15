/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectPanelProps } from '../types'

import { type ComputedRef, computed } from 'vue'

import { type VKey, convertArray } from '@idux/cdk/utils'
import { type Locale } from '@idux/components/locales'

export interface SelectedStateContext {
  selectedKeys: ComputedRef<VKey[]>
  selectedLimit: ComputedRef<boolean>
  selectedLimitTitle: ComputedRef<string>
}

export function useSelectedState(props: SelectPanelProps, locale: Locale): SelectedStateContext {
  const selectedKeys = computed(() => convertArray(props.selectedKeys))

  const selectedLimit = computed(() => selectedKeys.value.length >= props.multipleLimit)
  const selectedLimitTitle = computed(() => {
    if (!selectedLimit.value) {
      return ''
    }
    return locale.select.limitMessage.replace('${0}', `${props.multipleLimit}`)
  })

  return {
    selectedKeys,
    selectedLimit,
    selectedLimitTitle,
  }
}
