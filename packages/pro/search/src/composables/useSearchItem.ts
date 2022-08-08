/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps, SearchField, SearchItem, SearchItemError } from '../types'
import type { SearchState } from './useSearchStates'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, type Slots, computed } from 'vue'

import { createDatePickerSegment } from '../segments/CreateDatePickerSegment'
import { createDateRangePickerSegment } from '../segments/CreateDateRangePickerSegment'
import { createNameSegment } from '../segments/CreateNameSegment'
import { createOperatorSegment } from '../segments/CreateOperatorSegment'
import { createSelectSegment } from '../segments/CreateSelectSegment'
import { createCustomSegment } from '../segments/createCustomSegment'
import { createInputSegment } from '../segments/createInputSegment'

export function useSearchItems(
  props: ProSearchProps,
  slots: Slots,
  mergedPrefixCls: ComputedRef<string>,
  searchStates: ComputedRef<SearchState[]>,
  searchItemErrors: ComputedRef<SearchItemError[] | undefined>,
  dateConfig: DateConfig,
): ComputedRef<SearchItem[]> {
  const searchStatesKeys = computed(() => new Set(searchStates.value?.map(state => state.fieldKey)))

  return computed<SearchItem[]>(() =>
    searchStates.value?.map(searchState => {
      const searchFields = props.searchFields?.filter(
        field => field.key === searchState.fieldKey || field.multiple || !searchStatesKeys.value.has(field.key),
      )
      const searchField = searchFields?.find(field => field.key === searchState.fieldKey)
      const operatorSegment = searchField && createOperatorSegment(mergedPrefixCls.value, searchField)
      const nameSegment = createNameSegment(mergedPrefixCls.value, searchFields, !operatorSegment)

      return {
        key: searchState.key,
        optionKey: searchState.fieldKey,
        error: searchItemErrors.value?.find(error => error.index === searchState.index),
        segments: searchState.segmentValues
          .map(segmentValue => {
            if (segmentValue.name === 'name') {
              return nameSegment
            }

            if (segmentValue.name === 'operator') {
              return operatorSegment
            }

            return searchField && createSearchItemContentSegment(mergedPrefixCls.value, searchField, slots, dateConfig)
          })
          .filter(Boolean),
      } as SearchItem
    }),
  )
}

function createSearchItemContentSegment(
  prefixCls: string,
  searchField: SearchField,
  slots: Slots,
  dateConfig: DateConfig,
) {
  switch (searchField.type) {
    case 'select':
      return createSelectSegment(prefixCls, searchField)
    case 'input':
      return createInputSegment(prefixCls, searchField)
    case 'datePicker':
      return createDatePickerSegment(prefixCls, searchField, dateConfig)
    case 'dateRangePicker':
      return createDateRangePickerSegment(prefixCls, searchField, dateConfig)
    case 'custom':
      return createCustomSegment(prefixCls, searchField, slots)
    default:
      return
  }
}
