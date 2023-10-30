/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResolvedSearchField, SearchField, Segment } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

import { createCascaderSegment } from '../segments/CreateCascaderSegment'
import { createDatePickerSegment } from '../segments/CreateDatePickerSegment'
import { createDateRangePickerSegment } from '../segments/CreateDateRangePickerSegment'
import { createOperatorSegment } from '../segments/CreateOperatorSegment'
import { createSelectSegment } from '../segments/CreateSelectSegment'
import { createTreeSelectSegment } from '../segments/CreateTreeSelectSegment'
import { createCustomSegment } from '../segments/createCustomSegment'
import { createInputSegment } from '../segments/createInputSegment'

export interface ResolvedSearchFieldsContext {
  resolvedSearchFields: ComputedRef<ResolvedSearchField[]>
  fieldKeyMap: ComputedRef<Map<VKey, ResolvedSearchField>>
}

export function useResolvedSearchFields(
  searchFields: ComputedRef<SearchField[]>,
  mergedPrefixCls: ComputedRef<string>,
  dateConfig: DateConfig,
): ResolvedSearchFieldsContext {
  const resolvedSearchFields = computed(
    () =>
      searchFields.value.map(searchField => {
        return {
          ...searchField,
          segments: [
            createOperatorSegment(mergedPrefixCls.value, searchField),
            ...createSearchItemContentSegments(mergedPrefixCls.value, searchField, dateConfig),
          ].filter(Boolean) as Segment[],
        }
      }) ?? [],
  )
  const fieldKeyMap = computed(() => {
    const map = new Map<VKey, ResolvedSearchField>()

    resolvedSearchFields.value.forEach(field => {
      map.set(field.key, field)
    })

    return map
  })

  return {
    resolvedSearchFields,
    fieldKeyMap,
  }
}

function createSearchItemContentSegments(prefixCls: string, searchField: SearchField, dateConfig: DateConfig) {
  if (searchField.type === 'multiSegment') {
    return searchField.fieldConfig.segments.map(segmentConfig =>
      createCustomSegment(prefixCls, dateConfig, segmentConfig),
    )
  }

  const segment = (() => {
    switch (searchField.type) {
      case 'select':
        return createSelectSegment(prefixCls, searchField.fieldConfig)
      case 'treeSelect':
        return createTreeSelectSegment(prefixCls, searchField.fieldConfig)
      case 'cascader':
        return createCascaderSegment(prefixCls, searchField.fieldConfig)
      case 'input':
        return createInputSegment(prefixCls, searchField.fieldConfig)
      case 'datePicker':
        return createDatePickerSegment(prefixCls, searchField.fieldConfig, dateConfig)
      case 'dateRangePicker':
        return createDateRangePickerSegment(prefixCls, searchField.fieldConfig, dateConfig)
      case 'custom':
        return createCustomSegment(prefixCls, dateConfig, searchField.fieldConfig)
      default:
        return
    }
  })()

  /* eslint-disable indent */
  return segment
    ? ([
        {
          ...segment,
          inputClassName: [...(segment.inputClassName ?? []), searchField.inputClassName],
          containerClassName: [...(segment.containerClassName ?? []), searchField.containerClassName],
          onVisibleChange: searchField.onPanelVisibleChange,
        },
      ] as Segment[])
    : []
  /* eslint-enable indent */
}
