/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SearchState } from './useSearchStates'
import type { ProSearchContext } from '../token'

import { type ComputedRef, computed, ref, watch } from 'vue'

import { isNil, isNumber } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

import { type ProSearchProps, type SearchItemProps, searchDataTypes } from '../types'

interface SegmentState {
  name: string
  input: string
  index: number
  value: unknown
  selectionStart: number
}
type SegmentStates = Record<string, SegmentState>
export interface SegmentStatesContext {
  searchState: ComputedRef<SearchState | undefined>
  segmentStates: ComputedRef<SegmentStates>
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
): SegmentStatesContext {
  const {
    initSearchState,
    getSearchStateByKey,
    validateSearchState,
    updateSearchValues,
    updateSegmentValue,
    updateSegmentInput,
    removeSearchState,
    convertStateToValue,
    activeSegment,
    changeActive,
    setInactive,
    setTempActive,
    setOverlayOpened,
  } = proSearchContext
  const segmentSelectionStarts = ref<Record<string, number>>({})
  const searchState = computed(() => getSearchStateByKey(props.searchItem!.key))
  const segmentStates = computed<SegmentStates>(
    () =>
      searchState.value?.segmentStates.reduce((res, state, index) => {
        res[state.name] = {
          ...state,
          index,
          selectionStart: segmentSelectionStarts.value[state.name] ?? 0,
        }

        return res
      }, {} as SegmentStates) ?? {},
  )

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

    const targetSegmentStateName = searchState.value?.segmentStates[currentIndex + _offset].name
    const targetSegmentState = targetSegmentStateName && segmentStates.value[targetSegmentStateName]
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

    handleSegmentSelect(targetSegmentStateName, _selectionStart)
  }

  const handleSegmentInput = (name: string, input: string) => {
    updateSegmentInput(props.searchItem!.key, name, input)
  }
  const handleSegmentChange = (name: string, value: unknown) => {
    updateSegmentValue(props.searchItem!.key, name, value)
  }
  const handleSegmentSelect = (name: string, selectionStart: number | undefined | null) => {
    segmentSelectionStarts.value[name] = selectionStart ?? 0
  }
  const confirmSearchItem = () => {
    const key = props.searchItem!.key
    const validateRes = validateSearchState(key)

    if (!validateRes) {
      removeSearchState(key)
    } else {
      updateSearchValues()
    }

    const valueName = searchDataTypes.find(name => !!segmentStates.value[name])
    const searchValue = convertStateToValue(key)

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
    const idx = segmentStates.value[name].index ?? -1
    if (idx < 0) {
      return
    }

    const visibleSegments = props.searchItem!.resolvedSearchField.segments.filter(seg =>
      seg.visible ? seg.visible(searchState.value?.segmentStates ?? []) : true,
    )

    // only confirm searchItem when the last segment is confirmed
    // if the last segment is searchItem name, confirm the searchItem only when no searchField is selected
    if (confirmItem && (idx === visibleSegments.length - 1 || validateSearchState(props.searchItem!.key))) {
      confirmSearchItem()
    } else {
      changeActive(1)
    }
  }
  const handleSegmentCancel = (name: string) => {
    // init the canceled segment state
    initSearchState(props.searchItem!.key, name)

    const segmentState = segmentStates.value[name]

    if (!segmentState?.value) {
      changeActive(-1, true)
    } else {
      setInactive()
    }
  }

  watch(
    [activeSegment, () => props.searchItem?.resolvedSearchField],
    ([activeSegment, searchField], [preActiveSegment]) => {
      if (activeSegment?.itemKey === props.searchItem?.key) {
        return
      }

      if (!searchField) {
        initSearchState(props.searchItem!.key)
        return
      }

      const preSegment = props.searchItem?.resolvedSearchField.segments.find(seg => seg.name === preActiveSegment?.name)

      // if current segment has no panel and the whole search item is valid after input
      // then update search values
      //
      // we do this to improve user experience
      // because always pressing `Enter` after input to trigger update could be annoying
      if (preSegment && !preSegment.panelRenderer && validateSearchState(props.searchItem!.key)) {
        updateSearchValues()
      } else {
        initSearchState(props.searchItem!.key)
      }
    },
    {
      flush: 'post',
    },
  )

  return {
    searchState,
    segmentStates,
    changeActiveAndSelect,
    handleSegmentInput,
    handleSegmentChange,
    handleSegmentSelect,
    handleSegmentConfirm,
    handleSegmentCancel,
  }
}
