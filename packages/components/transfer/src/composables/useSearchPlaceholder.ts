/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferProps } from '../types'
import type { TransferLocale } from '@idux/components/locales'

import { type ComputedRef, computed } from 'vue'

import { isString } from 'lodash-es'

export function useSearchPlaceholder(
  props: TransferProps,
  locales: TransferLocale,
): { source: ComputedRef<string>; target: ComputedRef<string> } {
  return {
    source: computed(() => getPlaceholder(props, locales, true)),
    target: computed(() => getPlaceholder(props, locales, false)),
  }
}

function getPlaceholder(props: TransferProps, locales: TransferLocale, isSource: boolean) {
  const defaultPlaceholder = locales.searchPlaceholder[isSource ? 0 : 1]
  const searchPlaceholder = isString(props.searchPlaceholder)
    ? props.searchPlaceholder
    : props.searchPlaceholder?.[isSource ? 0 : 1]

  return searchPlaceholder ?? defaultPlaceholder
}
