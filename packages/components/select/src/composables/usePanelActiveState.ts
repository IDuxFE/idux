/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FlattenedOption } from '../composables/useOptions'
import type { SelectPanelProps } from '../types'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'

import { type ComputedRef, type Ref, computed, onMounted, ref, watch } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'

export interface PanelActiveStateContext {
  activeValue: ComputedRef<VKey | undefined>
  activeIndex: Ref<number>
  setActiveIndex: (index: number) => void
  changeActiveIndex: (offset: 0 | 1 | -1) => void
  scrollToActivated: () => void
}

export function usePanelActiveState(
  props: SelectPanelProps,
  flattenedOptions: ComputedRef<FlattenedOption[]>,
  selectedKeys: ComputedRef<VKey[]>,
  scrollTo: VirtualScrollToFn,
): PanelActiveStateContext {
  const [activeValue, setActiveValue] = useControlledProp(props, 'activeValue')

  // cache a map from key to its index to avoid repeated traversal
  const keyIndexMap = computed(() => {
    const map = new Map<VKey, number>()
    flattenedOptions.value.forEach((option, index) => {
      map.set(option.key, index)
    })
    return map
  })
  const activeIndex = ref(0)
  const setActiveIndex = (index: number) => {
    activeIndex.value = index
    const key = flattenedOptions.value[index]?.key
    key !== activeValue.value && setActiveValue(flattenedOptions.value[index]?.key)
  }

  watch([() => props.activeValue, flattenedOptions], ([value, options]) => {
    const targetIndex = value ? keyIndexMap.value.get(value) ?? -1 : -1
    setActiveIndex(getEnabledActiveIndex(options, targetIndex === -1 ? 0 : targetIndex, 1))
  })

  const scrollToActivated = () => {
    scrollTo({ index: activeIndex.value })
  }

  onMounted(() => {
    const options = flattenedOptions.value
    const currValue = selectedKeys.value
    const currIndex = options.findIndex(option => currValue.some(value => option.key === value))
    setActiveIndex(getEnabledActiveIndex(options, currIndex === -1 ? 0 : currIndex, 1))

    scrollToActivated()
  })

  const changeActiveIndex = (offset: number) => {
    const enabledIndex = getEnabledActiveIndex(
      flattenedOptions.value,
      activeIndex.value + offset,
      (offset % 2) as 0 | 1 | -1,
    )

    if (enabledIndex !== activeIndex.value) {
      setActiveIndex(enabledIndex)
      if (offset !== 0) {
        scrollToActivated()
      }
    }
  }

  return {
    activeValue,
    activeIndex,
    setActiveIndex,
    changeActiveIndex,
    scrollToActivated,
  }
}

function getEnabledActiveIndex(options: FlattenedOption[], currIndex: number, offset: 0 | 1 | -1) {
  const length = options.length

  for (let index = 0; index < length; index++) {
    const current = (currIndex + index * offset + length) % length

    const { type, disabled } = options[current]
    if (type !== 'group' && !disabled) {
      return current
    }
  }

  return -1
}
