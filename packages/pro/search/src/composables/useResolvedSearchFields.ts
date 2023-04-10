/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps, ResolvedSearchField, SearchField, Segment } from '../types'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, type Slots, computed } from 'vue'

import { createCascaderSegment } from '../segments/CreateCascaderSegment'
import { createDatePickerSegment } from '../segments/CreateDatePickerSegment'
import { createDateRangePickerSegment } from '../segments/CreateDateRangePickerSegment'
import { createOperatorSegment } from '../segments/CreateOperatorSegment'
import { createSelectSegment } from '../segments/CreateSelectSegment'
import { createTreeSelectSegment } from '../segments/CreateTreeSelectSegment'
import { createCustomSegment } from '../segments/createCustomSegment'
import { createInputSegment } from '../segments/createInputSegment'

export function useResolvedSearchFields(
  props: ProSearchProps,
  slots: Slots,
  mergedPrefixCls: ComputedRef<string>,
  dateConfig: DateConfig,
): ComputedRef<ResolvedSearchField[]> {
  return computed(
    () =>
      props.searchFields?.map(searchField => {
        return {
          ...searchField,
          segments: [
            createOperatorSegment(mergedPrefixCls.value, searchField),
            createSearchItemContentSegment(mergedPrefixCls.value, searchField, slots, dateConfig),
          ].filter(Boolean) as Segment[],
        }
      }) ?? [],
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
    case 'treeSelect':
      return createTreeSelectSegment(prefixCls, searchField)
    case 'cascader':
      return createCascaderSegment(prefixCls, searchField)
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
