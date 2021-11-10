/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MergedOption } from '../composables/useOptions'
import type { FunctionalComponent } from 'vue'

import { inject } from 'vue'

import { selectToken } from '../token'

const defaultStyle = { height: 0, width: 0, overflow: 'hidden' }

const ListBox: FunctionalComponent = () => {
  const { props, selectedValue, mergedOptions, activeIndex, activeOption } = inject(selectToken)!
  const currSelectedValue = selectedValue.value
  const { compareWith } = props
  return (
    <div role="listbox" style={defaultStyle}>
      {renderOption(mergedOptions.value[activeIndex.value - 1], currSelectedValue, compareWith)}
      {renderOption(activeOption.value, currSelectedValue, compareWith)}
      {renderOption(mergedOptions.value[activeIndex.value + 1], currSelectedValue, compareWith)}
    </div>
  )
}

const renderOption = (
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
      {rawOption.slots?.default?.(rawOption) ?? label}
    </div>
  )
}

export default ListBox
