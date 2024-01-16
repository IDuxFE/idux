/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CacheDataContext } from '../composables/useCacheData'
import type { ResolvedSearchField, SearchValue, SegmentState } from '../types'

import { convertArray } from '@idux/cdk/utils'

export function generateSegmentStates(
  searchField: ResolvedSearchField,
  searchValue: Omit<SearchValue, 'key'> | undefined,
): SegmentState[]
export function generateSegmentStates(
  searchField: ResolvedSearchField,
  searchValue: Omit<SearchValue, 'key'> | undefined,
  itemKey: string,
  getCacheData: CacheDataContext['getCacheData'],
  setCacheData: CacheDataContext['setCacheData'],
): SegmentState[]
export function generateSegmentStates(
  searchField: ResolvedSearchField,
  searchValue: Omit<SearchValue, 'key'> | undefined,
  itemKey?: string,
  getCacheData?: CacheDataContext['getCacheData'],
  setCacheData?: CacheDataContext['setCacheData'],
): SegmentState[] {
  const segments = searchField.segments
  const hasOperators = searchField.operators && searchField.operators.length > 0
  const operator = searchValue?.operator ?? searchField.operators?.find(op => op === searchField.defaultOperator)
  const value = searchValue?.value ?? searchField.defaultValue
  const valueArr = segments.length > (hasOperators ? 2 : 1) ? convertArray(value) : [value]
  const segmentValues = hasOperators ? [operator, ...valueArr] : valueArr

  const _getCacheData = (name: string, dataKey: string) =>
    itemKey ? getCacheData?.(itemKey, name, dataKey) : undefined
  const _setCacheData = (name: string, dataKey: string, data: any) =>
    itemKey ? setCacheData?.(itemKey, name, dataKey, data) : undefined

  return segments.map((segment, idx) => ({
    name: segment.name,
    value: segmentValues[idx],
    input: segment.format(
      segmentValues[idx],
      [],
      dataKey => _getCacheData(segment.name, dataKey),
      (dataKey, data) => _setCacheData(segment.name, dataKey, data),
    ),
  }))
}
