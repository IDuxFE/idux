/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MergedOption } from '../composables/useOptions'
import type { FunctionalComponent } from 'vue'

import { type Slots, inject } from 'vue'

import { selectToken } from '../token'
import { renderOptionLabel } from '../utils/renderOptionLabel'

const defaultStyle = { height: 0, width: 0, overflow: 'hidden' }

const ListBox: FunctionalComponent = () => {
  const { props, slots, selectedValue, mergedOptions, activeIndex, activeOption } = inject(selectToken)!
  const currSelectedValue = selectedValue.value
  const { compareWith } = props
  return (
    <div role="listbox" style={defaultStyle}>
      {renderOption(slots, mergedOptions.value[activeIndex.value - 1], currSelectedValue, compareWith)}
      {renderOption(slots, activeOption.value, currSelectedValue, compareWith)}
      {renderOption(slots, mergedOptions.value[activeIndex.value + 1], currSelectedValue, compareWith)}
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
  const { key, label, rawOption, value } = option
  const selected = compareWith(selectedValue, value)
  return (
    <div key={key} role="option" aria-label={label} aria-selected={selected}>
      {renderOptionLabel(slots, rawOption, label)}
    </div>
  )
}

export default ListBox
