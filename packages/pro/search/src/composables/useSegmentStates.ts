/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchContext } from '../token'

import { type ComputedRef, type Ref, nextTick, onUnmounted, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { type SegmentValue, tempSearchStateKey } from '../composables/useSearchStates'
import { type ProSearchProps, type SearchItemProps, Segment, searchDataTypes } from '../types'

type SegmentStates = Record<string, { input: string; value: unknown; index: number }>
export interface SegmentStatesContext {
  segmentStates: Ref<SegmentStates>
  initSegmentStates: (force?: boolean) => void
  handleSegmentInput: (name: string, input: string) => void
  handleSegmentChange: (name: string, value: unknown) => void
  handleSegmentConfirm: (name: string, confirmItem?: boolean) => void
  handleSegmentCancel: (name: string) => void
}

export function useSegmentStates(
  props: SearchItemProps,
  proSearchProps: ProSearchProps,
  proSearchContext: ProSearchContext,
  isActive: ComputedRef<boolean>,
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
    setTempActive,
    onSearchTrigger,
    watchSearchState,
  } = proSearchContext
  const segmentStates = ref<SegmentStates>({})

  const _genInitSegmentState = (segment: Segment, segmentValue: SegmentValue | undefined, index: number) => {
    return {
      input: segment.format(segmentValue?.value) ?? '',
      value: segmentValue?.value,
      index: index,
    }
  }

  // reset temp segment states
  const initSegmentStates = () => {
    const searchState = getSearchStateByKey(props.searchItem!.key)!

    segmentStates.value = props.searchItem!.segments.reduce((states, segment, index) => {
      const segmentValue = searchState?.segmentValues.find(value => value.name === segment.name)
      states[segment.name] = _genInitSegmentState(segment, segmentValue, index)

      return states
    }, {} as SegmentStates)
  }

  // reset certain segment state indentified by name
  const initSegmentState = (name: string) => {
    const segmentState = segmentStates.value[name]
    if (!segmentState) {
      return
    }

    const searchState = getSearchStateByKey(props.searchItem!.key)!
    const segment = props.searchItem!.segments[segmentState.index]
    const segmentValue = searchState?.segmentValues.find(value => value.name === segment.name)
    segmentStates.value[name] = _genInitSegmentState(segment, segmentValue, segmentState.index)
  }

  let searchStateWatchStop: () => void
  watch(
    () => props.searchItem,
    searchItem => {
      searchStateWatchStop?.()
      initSegmentStates()
      if (searchItem?.key) {
        searchStateWatchStop = watchSearchState(searchItem?.key, () => nextTick(initSegmentStates))
      }
    },
    {
      immediate: true,
    },
  )
  watch([isActive, () => props.searchItem?.searchField], ([active, searchField]) => {
    if (!active || !searchField) {
      initSegmentStates()
    }
  })

  onUnmounted(() => {
    searchStateWatchStop?.()
  })

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
      initTempSearchState()
      removeSearchState(key)
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
      setInactive()
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
