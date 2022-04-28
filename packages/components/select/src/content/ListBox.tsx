/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FunctionalComponent, type Slots, inject } from 'vue'

import { Logger } from '@idux/cdk/utils'

import { type MergedOption } from '../composables/useOptions'
import { selectToken } from '../token'
import { renderOptionLabel } from '../utils/renderOptionLabel'

const defaultStyle = { height: 0, width: 0, overflow: 'hidden' }

const ListBox: FunctionalComponent = () => {
  const { props, slots, selectedValue, mergedOptions, activeIndex, activeOption } = inject(selectToken)!
  const currSelectedValue = selectedValue.value
  const compareFn = props.compareWith ?? props.compareFn
  if (__DEV__ && props.compareWith) {
    Logger.warn('components/select', '`compareWith` was deprecated, please use `compareFn` instead')
  }
  return (
    <div role="listbox" style={defaultStyle}>
      {renderOption(slots, mergedOptions.value[activeIndex.value - 1], currSelectedValue, compareFn)}
      {renderOption(slots, activeOption.value, currSelectedValue, compareFn)}
      {renderOption(slots, mergedOptions.value[activeIndex.value + 1], currSelectedValue, compareFn)}
    </div>
  )
}

const renderOption = (
  slots: Slots,
  option: MergedOption | undefined,
  selectedValue: any,
  compareWith: (o1: any, o2: any) => boolean,
) => {
  if (!option) {
    return undefined
  }
  const { key, label, rawData } = option
  const selected = compareWith(selectedValue, key)
  return (
    <div key={key} role="option" aria-label={label} aria-selected={selected}>
      {renderOptionLabel(slots, rawData, label)}
    </div>
  )
}

export default ListBox
