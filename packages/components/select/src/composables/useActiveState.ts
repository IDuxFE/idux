/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectProps } from '../types'
import type { MergedOption } from './useOptions'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ComputedRef, Ref } from 'vue'

import { computed, onMounted, ref, watchEffect } from 'vue'

export interface ActiveStateContext {
  activeIndex: Ref<number>
  activeOption: Ref<MergedOption | undefined>
  changeActive: (index: number, offset: 0 | 1 | -1) => void
  scrollToActivated: () => void
}

export function useActiveState(
  props: SelectProps,
  flattedOptions: ComputedRef<MergedOption[]>,
  selectedValue: Ref<any[]>,
  inputValue: Ref<string>,
  scrollTo: VirtualScrollToFn,
): ActiveStateContext {
  const activeIndex = ref(0)

  onMounted(() => {
    const compareFn = props.compareWith ?? props.compareFn
    const options = flattedOptions.value
    const currValue = selectedValue.value
    const currIndex = options.findIndex(option => currValue.some(value => compareFn(option.value, value)))
    activeIndex.value = getEnabledActiveIndex(options, currIndex === -1 ? 0 : currIndex, 1)

    watchEffect(() => {
      if (!props.allowInput || !inputValue.value) {
        return
      }
      const options = flattedOptions.value
      const searchValue = inputValue.value
      const currIndex = options.findIndex(option => option.value === searchValue)
      activeIndex.value = getEnabledActiveIndex(options, currIndex === -1 ? 0 : currIndex, 1)
    })
  })

  const activeOption = computed(() => flattedOptions.value[activeIndex.value])

  const changeActive = (currIndex: number, offset: 0 | 1 | -1) => {
    const enabledIndex = getEnabledActiveIndex(flattedOptions.value, currIndex, offset)

    if (enabledIndex !== activeIndex.value) {
      activeIndex.value = enabledIndex
      if (offset !== 0) {
        scrollToActivated()
      }
    }
  }

  const scrollToActivated = () => {
    scrollTo({ index: activeIndex.value })
  }

  return {
    activeIndex,
    activeOption,
    changeActive,
    scrollToActivated,
  }
}

function getEnabledActiveIndex(options: MergedOption[], currIndex: number, offset: 0 | 1 | -1) {
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
