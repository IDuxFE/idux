/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchContext } from '../token'

import { type Ref, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { SearchState, tempSearchStateKey } from '../composables/useSearchStates'
import { type ProSearchProps, type SearchItemProps, Segment, searchDataTypes } from '../types'

type SegmentStates = Record<string, { input: string; value: unknown; index: number }>
export interface SegmentStatesContext {
  segmentStates: Ref<SegmentStates>
  initSegmentStates: () => void
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
    activeSegment,
    changeActive,
    setInactive,
    onSearchTrigger,
  } = proSearchContext
  const segmentStates = ref<SegmentStates>({})

  const _genInitSegmentState = (segment: Segment, searchState: SearchState, index: number) => {
    const name = segment.name
    const segmentValue = searchState?.segmentValues.find(value => value.name === name)
    return {
      input: segment.format(segmentValue?.value) ?? '',
      value: segmentValue?.value,
      index: index,
    }
  }

  // reset temp segment states
  const initSegmentStates = () => {
    segmentStates.value = props.searchItem!.segments.reduce((states, segment, index) => {
      states[segment.name] = _genInitSegmentState(segment, getSearchStateByKey(props.searchItem!.key)!, index)
      return states
    }, {} as SegmentStates)
  }

  // reset certain segment state indentified by name
  const initSegmentState = (name: string) => {
    const segmentState = segmentStates.value[name]
    if (!segmentState) {
      return
    }

    const segment = props.searchItem!.segments[segmentState.index]
    segmentStates.value[name] = _genInitSegmentState(
      segment,
      getSearchStateByKey(props.searchItem!.key)!,
      segmentState.index,
    )
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

    setInactive()
  }

  const handleSegmentConfirm = (name: string, confirmItem?: boolean) => {
    const segmentState = segmentStates.value[name]
    if (!segmentState) {
      return
    }
    const { value, index } = segmentState
    updateSegmentValue(value, name, props.searchItem!.key)

    // only confirm searchItem when the last segment is confirmed
    // if the last segment is searchItem name, confirm the searchItem only when no searchField is selected
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
    // init the canceled segment state
    initSegmentState(name)

    if (!segmentStates.value[name].value) {
      changeActive(-1, true)
    } else if (props.searchItem?.key !== tempSearchStateKey) {
      setInactive()
    }
  }

  onSearchTrigger(() => {
    if (
      !props.searchItem?.key ||
      !activeSegment.value?.itemKey ||
      activeSegment.value.itemKey !== props.searchItem.key
    ) {
      return
    }

    handleSegmentConfirm(activeSegment.value.name, true)
  }, 'pre')

  return {
    segmentStates,
    initSegmentStates,
    handleSegmentInput: setSegmentInput,
    handleSegmentChange: setSegmentValue,
    handleSegmentConfirm,
    handleSegmentCancel,
  }
}
