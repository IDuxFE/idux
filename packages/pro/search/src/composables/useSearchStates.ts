/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, computed, reactive, ref, toRaw } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, callEmit } from '@idux/cdk/utils'

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
  getSearchStateByKey: (key: VKey) => { searchState: SearchState; index: number }
  validateSearchState: (key: VKey) => boolean
  convertStateToValue: (key: VKey) => SearchValue
  updateSegmentValue: (value: unknown, name: string, key: VKey) => void
  updateSearchState: (key: VKey) => void
  removeSearchState: (key: VKey) => void
  clearSearchState: () => void
}

export const tempSearchStateKey = Symbol('temp')

export function useSearchStates(
  props: ProSearchProps,
  dateConfig: DateConfig,
  searchValues: ComputedRef<SearchValue[] | undefined>,
  setSearchValues: (value: SearchValue[]) => void,
): SearchStateContext {
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
      return { searchState: tempSearchState, index: -1 }
    }

    const index = searchStates.value.findIndex(value => value.key === key)
    return { searchState: searchStates.value[index], index }
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
    if (segmentValue) {
      segmentValue.value = value
    } else {
      segmentValue = { name, value }
      searchState.segmentValues.push(segmentValue)
    }

    if (segmentValue.name === 'name') {
      searchState.fieldKey = value as VKey
      const searchValue = searchValues.value?.find(value => value.key === searchState.key)
      const searchFields = props.searchFields?.find(field => field.key === searchState.fieldKey)
      const segmentValues = generateSegmentValues(searchFields, searchValue, dateConfig)
      segmentValues.shift()

      searchState.segmentValues = [searchState.segmentValues[0], ...segmentValues]
    }
  }

  function checkSearchStateValid(searchState: SearchState, dataKeyCountMap: Map<VKey, number>, existed?: boolean) {
    if (!searchState.fieldKey) {
      return false
    }

    const searchField = props.searchFields?.find(field => field.key === searchState.fieldKey)

    const count = dataKeyCountMap.get(searchState.fieldKey)
    if (count && count > (existed ? 1 : 0)) {
      return !!searchField?.multiple
    }

    return searchState.segmentValues.every(segmentValue => !isNil(segmentValue.value))
  }

  const validateSearchState = (key: VKey) => {
    const { searchState } = getSearchStateByKey(key)
    return checkSearchStateValid(searchState, fieldKeyCountMap.value, key !== tempSearchStateKey)
  }

  const convertStateToValue = (key: VKey) => {
    const { searchState } = getSearchStateByKey(key)
    return _convertStateToValue(searchState)
  }

  const initTempSearchState = () => {
    tempSearchState.fieldKey = undefined
    tempSearchState.segmentValues = generateSegmentValues()
  }

  const initSearchStates = () => {
    const dataKeyCountMap = new Map<VKey, number>()

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

    const { searchState } = getSearchStateByKey(key)
    if (!searchState) {
      return
    }

    setSegmentValue(searchState, name, value)
  }
  const updateSearchState = (key: VKey) => {
    if (props.disabled) {
      return
    }

    const { searchState } = getSearchStateByKey(key)

    if (!searchState) {
      return
    }

    if (searchState.key === tempSearchStateKey) {
      // create new search value
      searchStates.value.push({
        ...searchState,
        key: getKey(searchState.fieldKey!, fieldKeyCountMap.value.get(searchState.fieldKey!) ?? 0),
      })

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
    searchStates.value.splice(stateIndex, 1)
    callEmit(props.onItemRemove, searchValue!)
    updateSearchValue()
  }
  const clearSearchState = () => {
    if (props.disabled) {
      return
    }

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
