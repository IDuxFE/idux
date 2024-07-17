/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectedStateContext } from './useSelectedState'
import type { TagDataContext } from './useTagData'

import { type ComputedRef, type Ref, computed, onMounted, ref, watch } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, useState } from '@idux/cdk/utils'

export interface PanelActiveStateContext {
  activeValue: ComputedRef<VKey | undefined>
  activeIndex: Ref<number>
  changeActiveValue: (key: VKey) => void
  changeActiveIndex: (offset: 0 | 1 | -1) => void
}

export const creationDataKey = '__TAG_SELECT_CREATION_DATA__'

interface PanelOption {
  key: VKey
  disabled?: boolean
}

export function usePanelActiveState(
  tagDataContext: TagDataContext,
  selectedStateContext: SelectedStateContext,
): PanelActiveStateContext {
  const [activeValue, setActiveValue] = useState<VKey | undefined>(undefined)

  const { tagCreateEnabled, filteredData } = tagDataContext
  const { selectedValue } = selectedStateContext

  const mergedOptions = computed<PanelOption[]>(() => {
    const options: PanelOption[] = [...filteredData.value]

    if (tagCreateEnabled.value) {
      options.push({ key: creationDataKey })
    }

    return options
  })

  // cache a map from key to its index to avoid repeated traversal
  const keyIndexMap = computed(() => {
    const map = new Map<VKey, number>()
    mergedOptions.value.forEach((data, index) => {
      map.set(data.key, index)
    })
    return map
  })
  const activeIndex = ref(0)
  const setActiveIndex = (index: number) => {
    activeIndex.value = index
    const key = mergedOptions.value[index]?.key

    key !== activeValue.value && setActiveValue(mergedOptions.value[index]?.key)
  }

  onMounted(() => {
    const options = mergedOptions.value
    const currValue = selectedValue.value?.length ? selectedValue.value : [activeValue.value]
    const currIndex = options.findIndex(option => currValue.some(value => option.key === value))
    setActiveIndex(currIndex !== -1 ? getEnabledActiveIndex(options, currIndex, 1) : -1)

    watch(
      mergedOptions,
      options => {
        const targetIndex = isNil(activeValue.value) ? -1 : (keyIndexMap.value.get(activeValue.value) ?? -1)
        setActiveIndex(targetIndex !== -1 ? getEnabledActiveIndex(options, targetIndex, 1) : 0)
      },
      {
        flush: 'post',
      },
    )
  })

  const changeActiveIndex = (offset: number) => {
    const enabledIndex = getEnabledActiveIndex(
      mergedOptions.value,
      activeIndex.value + offset,
      (offset % 2) as 0 | 1 | -1,
    )

    if (enabledIndex !== activeIndex.value) {
      setActiveIndex(enabledIndex)
    }
  }

  const changeActiveValue = (key: VKey) => {
    const index = mergedOptions.value.findIndex(option => option.key === key)

    if (index > -1) {
      setActiveValue(key)
      activeIndex.value = index
    }
  }

  return {
    activeValue,
    activeIndex,
    changeActiveValue,
    changeActiveIndex,
  }
}

function getEnabledActiveIndex(options: PanelOption[], currIndex: number, offset: 0 | 1 | -1) {
  const length = options.length

  for (let index = 0; index < length; index++) {
    const current = (currIndex + index * offset + length) % length

    const { disabled } = options[current]
    if (!disabled) {
      return current
    }
  }

  return -1
}
