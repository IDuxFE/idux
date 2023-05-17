/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchContext } from '../token'

import { type ComputedRef, type Ref, nextTick, onUnmounted, ref, watch } from 'vue'

import { isNil, isNumber } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

import { type SegmentValue } from '../composables/useSearchStates'
import { type ProSearchProps, type SearchItemProps, Segment, searchDataTypes } from '../types'

interface SegmentState {
  input: string
  value: unknown
  index: number
  selectionStart: number
}
type SegmentStates = Record<string, SegmentState>
export interface SegmentStatesContext {
  segmentStates: Ref<SegmentStates>
  initSegmentStates: (force?: boolean) => void
  changeActiveAndSelect: (index: number, selectionStart: number | 'start' | 'end') => void
  handleSegmentInput: (name: string, input: string) => void
  handleSegmentChange: (name: string, value: unknown) => void
  handleSegmentConfirm: (name: string, confirmItem?: boolean) => void
  handleSegmentCancel: (name: string) => void
  handleSegmentSelect: (name: string, selectionStart: number | undefined | null) => void
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
    activeSegment,
    changeActive,
    setInactive,
    setTempActive,
    setOverlayOpened,
    onSearchTrigger,
    watchSearchState,
  } = proSearchContext
  const segmentStates = ref<SegmentStates>({})

  const _genInitSegmentState = (
    segment: Segment,
    segmentValue: SegmentValue | undefined,
    index: number,
  ): SegmentState => {
    return {
      input: segment.format(segmentValue?.value) ?? '',
      value: segmentValue?.value,
      index: index,
      selectionStart: 0,
    }
  }

  // reset temp segment states
  const initSegmentStates = () => {
    const searchState = getSearchStateByKey(props.searchItem!.key)!

    segmentStates.value = props.searchItem!.resolvedSearchField.segments.reduce((states, segment, index) => {
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
    const segment = props.searchItem!.resolvedSearchField.segments[segmentState.index]
    const segmentValue = searchState?.segmentValues.find(value => value.name === segment.name)
    segmentStates.value[name] = _genInitSegmentState(segment, segmentValue, segmentState.index)
  }

  const changeActiveAndSelect = (offset: number, selectionStart: number | 'start' | 'end') => {
    const currentIndex = activeSegment.value?.name ? segmentStates.value[activeSegment.value.name].index : -1
    if (currentIndex < 0) {
      return
    }

    const length = props.searchItem!.resolvedSearchField.segments.length

    const _offset =
      offset > 0 ? Math.min(offset, length - 1 - currentIndex) : Math.min(offset, -length + 1 + currentIndex)
    if (_offset === 0) {
      return
    }

    changeActive(_offset, false)

    if (isNil(selectionStart)) {
      return
    }

    const targetSegmentName = props.searchItem!.resolvedSearchField.segments[currentIndex + _offset]?.name
    const targetSegmentState = segmentStates.value[targetSegmentName]
    if (!targetSegmentState) {
      return
    }

    /* eslint-disable indent */
    const _selectionStart = isNumber(selectionStart)
      ? selectionStart
      : selectionStart === 'start'
      ? 0
      : targetSegmentState.input.length
    /* eslint-enable indent */

    targetSegmentState.selectionStart = _selectionStart
  }

  let searchStateWatchStop: () => void
  watch(
    () => props.searchItem,
    (searchItem, oldSearchItem) => {
      if (searchItem?.key === oldSearchItem?.key) {
        return
      }

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
  watch([isActive, () => props.searchItem?.resolvedSearchField], ([active, searchField]) => {
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

    const segment = props.searchItem!.resolvedSearchField.segments.find(seg => seg.name === name)!
    segmentStates.value[name].value = value
    segmentStates.value[name].input = segment.format(value)
  }
  const setSegmentInput = (name: string, input: string) => {
    if (!segmentStates.value[name]) {
      return
    }

    const segment = props.searchItem!.resolvedSearchField.segments.find(seg => seg.name === name)!

    segmentStates.value[name].input = input
    segmentStates.value[name].value = segment.parse(input)
  }
  const setSegmentSelectionStart = (name: string, selectionStart: number | undefined | null) => {
    if (!segmentStates.value[name]) {
      return
    }

    segmentStates.value[name].selectionStart = selectionStart ?? 0
  }
  const confirmSearchItem = () => {
    const key = props.searchItem!.key
    const validateRes = validateSearchState(key)
    const searchValue = convertStateToValue(key)

    Object.entries(segmentStates.value).forEach(([name, state]) => {
      updateSegmentValue(state.value, name, key)
    })

    if (!validateRes) {
      removeSearchState(key)
    } else {
      updateSearchState(key)
    }

    const valueName = searchDataTypes.find(name => !!segmentStates.value[name])

    callEmit(proSearchProps.onItemConfirm, {
      ...(searchValue ?? {}),
      nameInput: searchValue?.name ?? '',
      operatorInput: segmentStates.value.operator?.input,
      valueInput: valueName && segmentStates.value[valueName]?.input,
      removed: !validateRes,
    })

    setTempActive()
    setOverlayOpened(false)
  }

  const handleSegmentConfirm = (name: string, confirmItem?: boolean) => {
    const segmentState = segmentStates.value[name]
    if (!segmentState) {
      return
    }
    const { index } = segmentState

    // only confirm searchItem when the last segment is confirmed
    // if the last segment is searchItem name, confirm the searchItem only when no searchField is selected
    if (index === props.searchItem!.resolvedSearchField.segments.length - 1 && confirmItem) {
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
    } else {
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
    changeActiveAndSelect,
    handleSegmentInput: setSegmentInput,
    handleSegmentChange: setSegmentValue,
    handleSegmentSelect: setSegmentSelectionStart,
    handleSegmentConfirm,
    handleSegmentCancel,
  }
}
