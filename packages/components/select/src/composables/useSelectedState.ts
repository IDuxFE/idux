/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComputedRef, computed, toRaw } from 'vue'

import { type ValueAccessor } from '@idux/cdk/forms'
import { type VKey, callEmit, convertArray } from '@idux/cdk/utils'
import { type Locale } from '@idux/components/locales'

import { type SelectProps } from '../types'
import { generateOption } from '../utils/generateOption'
import { type MergedOption } from './useOptions'

export interface SelectedStateContext {
  selectedValue: ComputedRef<VKey[]>
  selectedOptions: ComputedRef<MergedOption[]>
  selectedLimit: ComputedRef<boolean>
  selectedLimitTitle: ComputedRef<string>
  changeSelected: (key: VKey) => void
  handleRemove: (key: VKey) => void
  handleClear: (evt: MouseEvent) => void
}

export function useSelectedState(
  props: SelectProps,
  accessor: ValueAccessor,
  mergedOptions: ComputedRef<MergedOption[]>,
  locale: Locale,
): SelectedStateContext {
  const selectedValue = computed(() => convertArray(accessor.valueRef.value))
  const selectedOptions = computed(() => {
    const compareFn = props.compareWith ?? props.compareFn
    const options = mergedOptions.value
    return selectedValue.value.map(
      value => options.find(option => compareFn(option.key, value)) ?? generateOption(value),
    )
  })
  const selectedLimit = computed(() => selectedValue.value.length >= props.multipleLimit)
  const selectedLimitTitle = computed(() => {
    if (!selectedLimit.value) {
      return ''
    }
    return locale.select.limitMessage.replace('${0}', `${props.multipleLimit}`)
  })

  const setValue = (value: VKey[]) => {
    const currValue = props.multiple ? value : value[0]
    const oldValue = toRaw(accessor.valueRef.value)
    if (currValue !== oldValue) {
      accessor.setValue(currValue)
      callEmit(props.onChange, currValue, oldValue)
    }
  }

  const changeSelected = (key: VKey) => {
    const compareFn = props.compareWith ?? props.compareFn
    const { multiple } = props
    const currValue = selectedValue.value
    const targetIndex = currValue.findIndex(item => compareFn(item, key))
    const isSelected = targetIndex > -1
    if (!multiple) {
      !isSelected && setValue([key])
      return
    }
    if (isSelected) {
      setValue(currValue.filter((_, index) => targetIndex !== index))
      return
    }
    if (!selectedLimit.value) {
      setValue([...currValue, key])
    }
  }

  const handleRemove = (key: VKey) => {
    const compareFn = props.compareWith ?? props.compareFn
    setValue(selectedValue.value.filter(item => !compareFn(key, item)))
  }

  const handleClear = (evt: MouseEvent) => {
    setValue([])
    callEmit(props.onClear, evt)
  }

  return {
    selectedValue,
    selectedOptions,
    selectedLimit,
    selectedLimitTitle,
    changeSelected,
    handleRemove,
    handleClear,
  }
}
