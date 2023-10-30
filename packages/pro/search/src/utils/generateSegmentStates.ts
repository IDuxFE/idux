/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResolvedSearchField, SearchValue, SegmentState } from '../types'

import { convertArray } from '@idux/cdk/utils'

export function generateSegmentStates(
  searchField: ResolvedSearchField,
  searchValue?: Omit<SearchValue, 'key'>,
): SegmentState[] {
  const segments = searchField.segments
  const hasOperators = searchField.operators && searchField.operators.length > 0
  const operator = searchValue?.operator ?? searchField.operators?.find(op => op === searchField.defaultOperator)
  const value = searchValue?.value ?? searchField.defaultValue
  const valueArr = segments.length > (hasOperators ? 2 : 1) ? convertArray(value) : [value]
  const segmentValues = hasOperators ? [operator, ...valueArr] : valueArr

  return segments.map((segment, idx) => ({
    name: segment.name,
    value: segmentValues[idx],
    input: segment.format(segmentValues[idx], []),
  }))
}
