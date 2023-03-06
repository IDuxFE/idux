/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SearchValueContext } from './useSearchValues'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, computed, reactive, ref, toRaw } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, callEmit } from '@idux/cdk/utils'

import { SEARCH_STATE_ACTION, type SearchStateWatcherContext } from './useSearchStateWatcher'
import {
  type ProSearchProps,
  type SearchDataTypes,
  type SearchField,
  type SearchValue,
  searchDataTypes,
} from '../types'

export interface SegmentValue {
  name: string
  value: unknown
}
export interface SearchState {
  key: VKey
  index?: number
  fieldKey?: VKey
  segmentValues: SegmentValue[]
}

export interface SearchStateContext {
  searchStates: ComputedRef<SearchState[]>
  tempSearchState: SearchState
  tempSearchStateAvailable: ComputedRef<boolean>
  initSearchStates: () => void
  initTempSearchState: () => void
  getSearchStateByKey: (key: VKey) => SearchState | undefined
  validateSearchState: (key: VKey) => boolean | undefined
  convertStateToValue: (key: VKey) => SearchValue | undefined
  updateSegmentValue: (value: unknown, name: string, key: VKey) => void
  updateSearchState: (key: VKey) => void
  removeSearchState: (key: VKey) => void
  clearSearchState: () => void
}

export const tempSearchStateKey = Symbol('temp')

export function useSearchStates(
  props: ProSearchProps,
  dateConfig: DateConfig,
  searchValueContext: SearchValueContext,
  searchStateWatcherContext: SearchStateWatcherContext,
): SearchStateContext {
  const { searchValues, setSearchValues } = searchValueContext
  const { compareSearchStates, compareSegmentValues, notifySearchStateChange } = searchStateWatcherContext
  const getKey = createStateKeyGetter()

  const searchStates = ref<SearchState[]>([])
  const fieldKeyCountMap = computed(() => {
    const countMap = new Map<VKey, number>()

    searchStates.value.forEach(state => {
      state.fieldKey && countMap.set(state.fieldKey, (countMap.get(state.fieldKey) ?? 0) + 1)
    })

    return countMap
  })

  const tempSearchState: SearchState = reactive({
    key: tempSearchStateKey,
    segmentValues: generateSegmentValues(),
  })
  const tempSearchStateAvailable = computed(() => {
    const searchFields = props.searchFields ?? []
    if (searchFields.findIndex(field => field.multiple) > -1) {
      return true
    }

    const selectedKeys = new Set(fieldKeyCountMap.value.keys())

    return searchFields.some(field => !selectedKeys.has(field.key))
  })

  const mergedSearchStates = computed(() => {
    const states = [...searchStates.value]
    if (tempSearchStateAvailable.value) {
      states.push(tempSearchState)
    }

    return states
  })

  function getSearchStateByKey(key: VKey) {
    if (key === tempSearchStateKey) {
      return tempSearchState
    }

    return searchStates.value.find(value => value.key === key)
  }

  function _convertStateToValue<V>(state: SearchState) {
    const operatorSegment = state.segmentValues.find(value => value.name === 'operator')
    const contentSegment = state.segmentValues.find(value => searchDataTypes.includes(value.name as SearchDataTypes))

    return {
      key: state.fieldKey,
      name: props.searchFields?.find(field => field.key === state.fieldKey)?.label,
      operator: operatorSegment?.value as string,
      value: toRaw(contentSegment?.value),
    } as SearchValue<V>
  }

  function setSegmentValue(searchState: SearchState, name: string, value: unknown) {
    let segmentValue = searchState.segmentValues.find(state => state.name === name)

    if (segmentValue?.name === 'name') {
      searchState.fieldKey = value as VKey
      const searchValue = searchValues.value?.find(value => value.key === searchState.key)
      const searchFields = props.searchFields?.find(field => field.key === searchState.fieldKey)
      const newSegmentsValues = generateSegmentValues(searchFields, searchValue, dateConfig)

      const updatedSegments = compareSegmentValues(searchState.segmentValues, newSegmentsValues)
      searchState.segmentValues = newSegmentsValues
      return updatedSegments
    }

    let oldValue: unknown
    if (segmentValue) {
      oldValue = segmentValue.value
      segmentValue.value = value
    } else {
      segmentValue = { name, value }
      searchState.segmentValues.push(segmentValue)
      oldValue = undefined
    }

    return [
      {
        name,
        value,
        oldValue,
      },
    ]
  }

  function checkSearchStateValid(searchState: SearchState, dataKeyCountMap: Map<VKey, number>, existed?: boolean) {
    if (!searchState.fieldKey) {
      return false
    }

    // all valid segmentValue are not allowd to be undefined or null
    // when current value isn't valid, return immediatly
    if (!searchState.segmentValues.every(segmentValue => !isNil(segmentValue.value))) {
      return false
    }

    const count = dataKeyCountMap.get(searchState.fieldKey)

    // if there are more than one searchState of the same field key
    // check whether mutiple searchState is allowed from the field config
    if (count && count > (existed ? 1 : 0)) {
      return !!props.searchFields?.find(field => field.key === searchState.fieldKey)?.multiple
    }

    // all validations are passed
    return true
  }

  const validateSearchState = (key: VKey) => {
    const searchState = getSearchStateByKey(key)
    return searchState && checkSearchStateValid(searchState, fieldKeyCountMap.value, key !== tempSearchStateKey)
  }

  const convertStateToValue = (key: VKey) => {
    const searchState = getSearchStateByKey(key)
    return searchState ? _convertStateToValue(searchState) : undefined
  }

  const initTempSearchState = () => {
    tempSearchState.fieldKey = undefined
    const newSegmentValues = generateSegmentValues()
    const updatedSegments = compareSegmentValues(tempSearchState.segmentValues, newSegmentValues)
    tempSearchState.segmentValues = newSegmentValues

    // notify temp searchState change
    notifySearchStateChange(tempSearchStateKey, SEARCH_STATE_ACTION.UPDATED, {
      searchState: tempSearchState,
      updatedSegments,
    })
  }

  const initSearchStates = () => {
    const dataKeyCountMap = new Map<VKey, number>()

    const oldSearchStates = searchStates.value
    searchStates.value = (
      searchValues.value?.map((searchValue, index) => {
        const fieldKey = searchValue.key
        const searchField = props.searchFields?.find(field => field.key === fieldKey)
        if (!searchField) {
          return
        }

        const segmentValues = generateSegmentValues(searchField, searchValue, dateConfig)
        const count = dataKeyCountMap.has(fieldKey) ? dataKeyCountMap.get(fieldKey)! : 0
        const key = getKey(fieldKey, count)

        const searchState = { key, index, fieldKey, segmentValues } as SearchState
        if (!checkSearchStateValid(searchState, dataKeyCountMap)) {
          return
        }

        dataKeyCountMap.set(fieldKey, count + 1)
        return searchState
      }) ?? []
    ).filter(Boolean) as SearchState[]

    compareSearchStates(searchStates.value, oldSearchStates)
  }

  function updateSearchValue() {
    const newSearchValues = searchStates.value
      .map(state => {
        // filters invalid searchValues
        if (!state.key) {
          return
        }

        return _convertStateToValue(state)
      })
      .filter(Boolean) as SearchValue[]

    const oldeSearchValue = toRaw(searchValues.value)
    setSearchValues(newSearchValues)
    callEmit(props.onChange, newSearchValues, oldeSearchValue)
  }

  const updateSegmentValue = (value: unknown, name: string, key: VKey) => {
    if (props.disabled) {
      return
    }

    const searchState = getSearchStateByKey(key)
    if (!searchState) {
      return
    }

    const updatedSegments = setSegmentValue(searchState, name, value)
    notifySearchStateChange(key, SEARCH_STATE_ACTION.UPDATED, { searchState, updatedSegments })
  }
  const updateSearchState = (key: VKey) => {
    if (props.disabled) {
      return
    }

    const searchState = getSearchStateByKey(key)

    if (!searchState) {
      return
    }

    if (searchState.key === tempSearchStateKey) {
      // create new search value
      const newKey = getKey(searchState.fieldKey!, fieldKeyCountMap.value.get(searchState.fieldKey!) ?? 0)
      const newSearchState = {
        ...searchState,
        key: newKey,
      }
      searchStates.value.push(newSearchState)

      notifySearchStateChange(newKey, SEARCH_STATE_ACTION.CREATED, { searchState: newSearchState })

      initTempSearchState()
    }

    updateSearchValue()
  }
  const removeSearchState = (key: VKey) => {
    if (props.disabled) {
      return
    }

    const stateIndex = searchStates.value.findIndex(state => state.key === key)

    if (stateIndex < 0) {
      return
    }

    const searchValue = _convertStateToValue(searchStates.value[stateIndex])
    const removedSearchState = searchStates.value[stateIndex]
    searchStates.value.splice(stateIndex, 1)
    notifySearchStateChange(removedSearchState.key, SEARCH_STATE_ACTION.REMOVED, { searchState: removedSearchState })
    callEmit(props.onItemRemove, searchValue!)

    updateSearchValue()
  }
  const clearSearchState = () => {
    if (props.disabled) {
      return
    }

    compareSearchStates([], searchStates.value)
    searchStates.value = []
    updateSearchValue()

    callEmit(props.onClear)
  }

  return {
    searchStates: mergedSearchStates,
    tempSearchState,
    tempSearchStateAvailable,
    initSearchStates,
    initTempSearchState,
    getSearchStateByKey,
    validateSearchState,
    convertStateToValue,
    updateSegmentValue,
    updateSearchState,
    removeSearchState,
    clearSearchState,
  }
}

function createStateKeyGetter() {
  let seed = 0
  const keyMap = new Map<VKey, number>()

  return (key: VKey, index: number) => {
    if (!keyMap.has(key)) {
      const newKey = seed++
      keyMap.set(key, newKey)
      return `${newKey}-${index}`
    }

    return `${keyMap.get(key)}-${index}`
  }
}

function generateSegmentValues(
  searchField?: SearchField,
  searchValue?: SearchValue,
  dateConfig?: DateConfig,
): SegmentValue[] {
  const nameKey = searchField?.key
  const hasOperators = searchField?.operators && searchField.operators.length > 0

  /* eslint-disable indent */
  return [
    {
      name: 'name',
      value: nameKey,
    },
    searchField &&
      hasOperators && {
        name: 'operator',
        value: searchValue?.operator,
      },
    searchField &&
      dateConfig && {
        name: searchField.type,
        value: searchValue?.value,
      },
  ].filter(Boolean) as SegmentValue[]
  /* eslint-enable indent */
}
