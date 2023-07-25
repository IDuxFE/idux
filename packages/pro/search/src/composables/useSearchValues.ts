/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps, SearchValue } from '../types'
import type { ComputedRef } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export interface SearchValueContext {
  searchValues: ComputedRef<SearchValue[] | undefined>
  setSearchValues: (values: SearchValue[]) => void
}

export const tempSearchStateKey = 'temp'

export function useSearchValues(props: ProSearchProps): SearchValueContext {
  const [searchValues, setSearchValues] = useControlledProp(props, 'value')

  return {
    searchValues,
    setSearchValues,
  }
}
