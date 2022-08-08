/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps, SearchField, SearchItemError, SearchValue } from '../types'

import { type ComputedRef, watch } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export function useSearchItemErrors(
  props: ProSearchProps,
  searchValues: ComputedRef<SearchValue[] | undefined>,
): ComputedRef<SearchItemError[] | undefined> {
  const [errors, setErrors] = useControlledProp(props, 'errors')

  watch(
    searchValues,
    () => {
      setErrors(getErrors(props.searchFields, searchValues.value))
    },
    { immediate: true },
  )

  return errors
}

function getErrors(
  searchFields: SearchField[] | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchValues: SearchValue<any>[] | undefined,
): SearchItemError[] | undefined {
  return searchValues?.reduce((errors, searchValue, index) => {
    const error = searchFields?.find(field => field.key === searchValue.key)?.validator?.(searchValue)

    if (error) {
      errors.push({ index, ...error })
    }

    return errors
  }, [] as SearchItemError[])
}
