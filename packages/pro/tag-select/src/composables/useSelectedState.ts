/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTagData, TagDataContext } from './useTagData'
import type { ProTagSelectProps } from '../types'
import type { FormAccessor } from '@idux/cdk/forms'

import { type ComputedRef, computed, toRaw } from 'vue'

import { type VKey, callEmit } from '@idux/cdk/utils'

export interface SelectedStateContext {
  selectedValue: ComputedRef<VKey[] | undefined>
  selectedData: ComputedRef<MergedTagData[]>
  maxExceeded: ComputedRef<boolean>
  isSelected: (key: VKey) => boolean
  changeSelected: (key: VKey) => void
  handleRemove: (key: VKey) => void
  handleClear: (evt: MouseEvent) => void
}

export function useSelectedState(
  props: ProTagSelectProps,
  accessor: FormAccessor<VKey[] | undefined>,
  tagDataContext: TagDataContext,
): SelectedStateContext {
  const { getTagDataByKey } = tagDataContext

  const selectedValue = computed(() => accessor.value)
  const maxExceeded = computed(() => (selectedValue.value?.length ?? 0) >= props.tagsLimit)

  const setSelectedValue = (value: VKey[] | undefined) => {
    const oldValue = toRaw(accessor.value)

    if (value !== oldValue) {
      accessor.setValue(value)
      callEmit(props.onChange, value, oldValue)
    }
  }

  const selectedData = computed(
    () => (selectedValue.value?.map(key => getTagDataByKey(key)).filter(Boolean) as MergedTagData[]) ?? [],
  )

  const changeSelected = (key: VKey) => {
    const currValue = selectedValue.value ?? []
    const targetIndex = currValue?.findIndex(v => v === key) ?? -1
    const isSelected = targetIndex > -1

    if (isSelected) {
      return
    }

    if (currValue.length < props.tagsLimit) {
      setSelectedValue([...currValue, key])
    }
  }

  const isSelected = (key: VKey) => {
    return (selectedValue.value?.findIndex(v => v === key) ?? -1) > -1
  }

  const handleRemove = (key: VKey) => {
    const data = getTagDataByKey(key)

    if (!data) {
      return
    }

    setSelectedValue(selectedValue.value?.filter(item => key !== item))
    callEmit(props.onTagRemove, data)
  }

  const handleClear = (evt: MouseEvent) => {
    setSelectedValue(undefined)
    callEmit(props.onClear, evt)
  }

  return {
    selectedValue,
    selectedData,
    maxExceeded,
    isSelected,
    changeSelected,
    handleRemove,
    handleClear,
  }
}
