/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchContext } from '../token'

import { type Ref, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { tempSearchStateKey } from '../composables/useSearchStates'
import { type ProSearchProps, type SearchItemProps, searchDataTypes } from '../types'

type SegmentStates = Record<string, { input: string; value: unknown; index: number }>
export interface SegmentStatesContext {
  segmentStates: Ref<SegmentStates>
  handleSegmentInput: (name: string, input: string) => void
  handleSegmentChange: (name: string, value: unknown) => void
  handleSegmentConfirm: (name: string, confirmItem?: boolean) => void
  handleSegmentCancel: (name: string) => void
}

export function useSegmentStates(
  props: SearchItemProps,
  proSearchProps: ProSearchProps,
  proSearchContext: ProSearchContext,
): SegmentStatesContext {
  const {
    getSearchStateByKey,
    validateSearchState,
    updateSearchState,
    updateSegmentValue,
    removeSearchState,
    convertStateToValue,
    initTempSearchState,
    changeActive,
    setFakeActive,
    setTempActive,
  } = proSearchContext
  const segmentStates = ref<SegmentStates>({})

  const initSegmentStates = () => {
    const states = {} as SegmentStates
    props.searchItem!.segments.forEach((segment, index) => {
      const { searchState } = getSearchStateByKey(props.searchItem!.key)
      const segmentValue = searchState.segmentValues.find(value => value.name === segment.name)

      states[segment.name] = {
        input: segment.format(segmentValue?.value) ?? '',
        value: segmentValue?.value,
        index,
      }
    })

    segmentStates.value = states
  }
  watch(() => props.searchItem?.segments, initSegmentStates, { immediate: true })

  const setSegmentValue = (name: string, value: unknown) => {
    if (!segmentStates.value[name]) {
      return
    }

    const segment = props.searchItem!.segments.find(seg => seg.name === name)!
    segmentStates.value[name].value = value
    segmentStates.value[name].input = segment.format(value)
  }
  const setSegmentInput = (name: string, input: string) => {
    if (!segmentStates.value[name]) {
      return
    }

    const segment = props.searchItem!.segments.find(seg => seg.name === name)!

    segmentStates.value[name].input = input
    segmentStates.value[name].value = segment.parse(input)
  }
  const confirmSearchItem = () => {
    const key = props.searchItem!.key
    const validateRes = validateSearchState(key)

    if (!validateRes) {
      removeSearchState(key)
      initTempSearchState()
    } else {
      updateSearchState(key)
    }

    const valueName = searchDataTypes.find(name => !!segmentStates.value[name])

    callEmit(proSearchProps.onItemConfirm, {
      ...convertStateToValue(key),
      nameInput: segmentStates.value.name?.input,
      operatorInput: segmentStates.value.operator?.input,
      valueInput: valueName && segmentStates.value[valueName]?.input,
      removed: !validateRes,
    })

    if (key !== tempSearchStateKey) {
      setFakeActive()
    } else {
      setTempActive()
    }
  }

  const handleSegmentConfirm = (name: string, confirmItem?: boolean) => {
    const segmentState = segmentStates.value[name]
    if (!segmentState) {
      return
    }
    const { value, index } = segmentState
    updateSegmentValue(value, name, props.searchItem!.key)

    if (
      index === props.searchItem!.segments.length - 1 &&
      confirmItem &&
      (name !== 'name' || !segmentStates.value[name].value)
    ) {
      confirmSearchItem()
    } else {
      changeActive(1)
    }
  }
  const handleSegmentCancel = (name: string) => {
    if (!segmentStates.value[name].value) {
      changeActive(-1, true)
    } else if (props.searchItem?.key !== tempSearchStateKey) {
      setFakeActive()
    }
  }

  return {
    segmentStates,
    handleSegmentInput: setSegmentInput,
    handleSegmentChange: setSegmentValue,
    handleSegmentConfirm,
    handleSegmentCancel,
  }
}
