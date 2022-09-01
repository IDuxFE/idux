/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComputedRef, computed, toRaw } from 'vue'

import { type FormAccessor } from '@idux/cdk/forms'
import { type VKey, callEmit, convertArray } from '@idux/cdk/utils'

import { type SelectProps } from '../types'
import { generateOption } from '../utils/generateOption'
import { type FlattenedOption } from './useOptions'

export interface SelectedStateContext {
  selectedValue: ComputedRef<VKey[]>
  selectedOptions: ComputedRef<FlattenedOption[]>
  changeSelected: (key: VKey) => void
  handleRemove: (key: VKey) => void
  handleClear: (evt: MouseEvent) => void
}

export function useSelectedState(
  props: SelectProps,
  accessor: FormAccessor,
  optionKeyMap: ComputedRef<Map<VKey, FlattenedOption>>,
): SelectedStateContext {
  const selectedValue = computed(() => convertArray(accessor.value))

  const selectedOptions = computed(() =>
    selectedValue.value.map(value => optionKeyMap.value.get(value) ?? generateOption(value)),
  )

  const setSelectedValue = (value: VKey[]) => {
    const currValue = props.multiple ? value : value[0]
    const oldValue = toRaw(accessor.value)
    if (currValue !== oldValue) {
      accessor.setValue(currValue)
      callEmit(props.onChange, currValue, oldValue)
    }
  }

  const changeSelected = (key: VKey) => {
    const multiple = !!props.multiple
    const currValue = selectedValue.value
    const targetIndex = currValue.findIndex(item => item === key)
    const isSelected = targetIndex > -1
    if (!multiple) {
      !isSelected && setSelectedValue([key])
      return
    }

    if (isSelected) {
      setSelectedValue(currValue.filter((_, index) => targetIndex !== index))
      return
    }

    if (selectedValue.value.length < props.multipleLimit) {
      setSelectedValue([...currValue, key])
    }
  }

  const handleRemove = (key: VKey) => {
    setSelectedValue(selectedValue.value.filter(item => key !== item))
  }

  const handleClear = (evt: MouseEvent) => {
    setSelectedValue([])
    callEmit(props.onClear, evt)
  }

  return {
    selectedValue,
    selectedOptions,
    changeSelected,
    handleRemove,
    handleClear,
  }
}
