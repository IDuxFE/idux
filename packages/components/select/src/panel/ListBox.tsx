/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FunctionalComponent, type Slots, inject } from 'vue'

import { type FlattenedOption } from '../composables/useOptions'
import { selectPanelContext } from '../token'
import { renderOptionLabel } from '../utils/renderOptionLabel'

const defaultStyle = { height: 0, width: 0, overflow: 'hidden' }

const ListBox: FunctionalComponent = (_, { slots }) => {
  const { selectedKeys, activeIndex, flattenedOptions } = inject(selectPanelContext)!
  const currSelectedKeys = selectedKeys.value

  return (
    <div role="listbox" style={defaultStyle}>
      {renderOption(slots, flattenedOptions.value[activeIndex.value - 1], currSelectedKeys)}
      {renderOption(slots, flattenedOptions.value[activeIndex.value], currSelectedKeys)}
      {renderOption(slots, flattenedOptions.value[activeIndex.value + 1], currSelectedKeys)}
    </div>
  )
}

const renderOption = (slots: Slots, option: FlattenedOption | undefined, selectedValue: any) => {
  if (!option) {
    return undefined
  }
  const { key, label, rawData } = option
  const selected = selectedValue === key
  return (
    <div key={key} role="option" aria-label={label} aria-selected={selected}>
      {renderOptionLabel(slots, rawData, label)}
    </div>
  )
}

export default ListBox
