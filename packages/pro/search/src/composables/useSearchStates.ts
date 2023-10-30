/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SearchValueContext } from './useSearchValues'
import type { ProSearchProps, ResolvedSearchField, SearchValue, Segment, SegmentState } from '../types'

import { type ComputedRef, type Ref, computed, ref, toRaw } from 'vue'

import { isEqual, isNil } from 'lodash-es'

import { type VKey, callEmit } from '@idux/cdk/utils'

import { generateSegmentStates } from '../utils'

export interface SearchState {
  key: VKey
  name: string
  index: number
  fieldKey: VKey
  searchValue?: SearchValue
  segmentStates: SegmentState[]
}

export interface SearchStateContext {
  searchStates: Ref<SearchState[]>
  initSearchStates: () => void
  initSearchState: (key: VKey, segmentName?: string) => void
  createSearchState: (fieldKey: VKey, searchValue?: Omit<SearchValue, 'key'>) => SearchState | undefined
  getSearchStateByKey: (key: VKey) => SearchState | undefined
  getSearchStatesByFieldKey: (fieldKey: VKey) => SearchState[]
  validateSearchState: (key: VKey) => boolean | undefined
  convertStateToValue: (key: VKey) => SearchValue | undefined
  updateSegmentInput: (key: VKey, name: string, input: string) => void
  updateSegmentValue: (key: VKey, name: string, value: unknown) => void
  updateSearchValues: () => void
  isSegmentVisible: (key: VKey, name: string) => boolean
  getVisibleSegmentStates: (key: VKey) => SegmentState[]
  removeSearchState: (key: VKey) => void
  clearSearchState: () => void
}

export function useSearchStates(
  props: ProSearchProps,
  fieldKeyMap: ComputedRef<Map<VKey, ResolvedSearchField>>,
  searchValueContext: SearchValueContext,
): SearchStateContext {
  const { searchValues, setSearchValues } = searchValueContext
  const getKey = createStateKeyGetter()
  const { isMarked, getMarks, mark, unmark, clearMarks } = useSearchStateMarks()
  let queuedUpdateCnt = 0

  const searchStates = ref<SearchState[]>([])
  const searchStateKeyMap = computed(() => {
    const map = new Map<VKey, SearchState>()

    searchStates.value.forEach(state => {
      map.set(state.key, state)
    })

    return map
  })
  const fieldKeyCountMap = computed(() => {
    const countMap = new Map<VKey, number>()

    searchStates.value.forEach(state => {
      countMap.set(state.fieldKey, (countMap.get(state.fieldKey) ?? 0) + 1)
    })

    return countMap
  })

  const findSearchField = (fieldKey?: VKey) => {
    if (isNil(fieldKey)) {
      return
    }

    return fieldKeyMap.value.get(fieldKey)
  }

  function getSearchStateByKey(key: VKey) {
    return searchStateKeyMap.value.get(key)
  }
  function getSearchStatesByFieldKey(fieldKey: VKey) {
    return searchStates.value.filter(value => value.fieldKey === fieldKey)
  }

  function _convertStateToValue<V>(state: SearchState) {
    let operator
    const valueArr: unknown[] = []
    state.segmentStates.forEach((segmentState, idx) => {
      if (idx === 0 && segmentState.name === 'operator') {
        operator = toRaw(segmentState.value)
        return
      }

      valueArr.push(isSegmentVisible(state.key, segmentState.name) ? toRaw(segmentState.value) : undefined)
    })

    return {
      key: state.fieldKey,
      name: findSearchField(state.fieldKey)?.label,
      operator,
      value: valueArr.length === 1 ? valueArr[0] : valueArr,
    } as SearchValue<V>
  }

  function setSegmentValue(searchState: SearchState, name: string, value: unknown) {
    const searchField = findSearchField(searchState.fieldKey)
    const segment = searchField?.segments.find(seg => seg.name === name)

    if (!segment) {
      return
    }

    const segmentState = searchState.segmentStates.find(state => state.name === name)
    const input = segment.format(value, searchState.segmentStates)

    if (!segmentState) {
      searchState.segmentStates.push({ name, input, value })
    } else if (segmentState.value !== value) {
      segmentState.value = value
      segmentState.input = input
    }
  }
  function setSegmentInput(searchState: SearchState, name: string, input: string) {
    const searchField = findSearchField(searchState.fieldKey)
    const segment = searchField?.segments.find(seg => seg.name === name)

    if (!segment) {
      return
    }

    const segmentState = searchState.segmentStates.find(state => state.name === name)
    const value = segment.parse(input, searchState.segmentStates)

    if (segmentState) {
      segmentState.value = value
      segmentState.input = input
    } else {
      searchState.segmentStates.push({ name, input, value })
    }
  }
  function _checkSegmentVisible(segment: Segment, searchState: SearchState) {
    return segment.visible ? segment.visible(searchState.segmentStates) : true
  }
  function isSegmentVisible(key: VKey, name: string) {
    const searchState = getSearchStateByKey(key)

    if (!searchState) {
      return false
    }

    const searchField = findSearchField(searchState.fieldKey)!
    const segment = searchField.segments.find(seg => seg.name === name)

    if (!segment) {
      return false
    }

    return _checkSegmentVisible(segment, searchState)
  }
  function _getVisibleSegmentStates(searchState: SearchState) {
    const searchField = findSearchField(searchState?.fieldKey)

    if (!searchField) {
      return []
    }

    return searchState.segmentStates.filter(segmentState => {
      const segment = searchField.segments.find(seg => seg.name === segmentState.name)

      return segment && _checkSegmentVisible(segment, searchState)
    })
  }
  function getVisibleSegmentStates(key: VKey) {
    const searchState = getSearchStateByKey(key)
    return searchState ? _getVisibleSegmentStates(searchState) : []
  }

  function checkSearchStateValid(searchState: SearchState, dataKeyCountMap: Map<VKey, number>) {
    if (!searchState.fieldKey) {
      return false
    }

    const visibleSegments = _getVisibleSegmentStates(searchState)

    // all valid segmentValue are not allowd to be undefined or null
    // when current value isn't valid, return immediatly
    if (visibleSegments.some(state => isNil(state.value))) {
      return false
    }

    const count = dataKeyCountMap.get(searchState.fieldKey)

    // if there are more than one searchState of the same field key
    // check whether mutiple searchState is allowed from the field config
    if (count && count > 1) {
      return !!props.searchFields?.find(field => field.key === searchState.fieldKey)?.multiple
    }

    // all validations are passed
    return true
  }

  const validateSearchState = (key: VKey) => {
    const searchState = getSearchStateByKey(key)
    return searchState && checkSearchStateValid(searchState, fieldKeyCountMap.value)
  }

  const convertStateToValue = (key: VKey) => {
    const searchState = getSearchStateByKey(key)
    return searchState ? _convertStateToValue(searchState) : undefined
  }

  const initSearchStates = () => {
    const dataKeyCountMap = new Map<VKey, number>()
    const newStates: SearchState[] = []

    const _getKey = (fieldKey: VKey) => {
      const count = dataKeyCountMap.has(fieldKey) ? dataKeyCountMap.get(fieldKey)! : 0
      return getKey(fieldKey, count)
    }
    const _incrementCount = (fieldKey: VKey) => {
      const count = dataKeyCountMap.get(fieldKey)
      dataKeyCountMap.set(fieldKey, (count ?? 0) + 1)
    }

    const createdStates = getMarks()
      .map(({ key, mark }) => mark === 'created' && getSearchStateByKey(key))
      .filter(Boolean) as SearchState[]

    let newStateIndex = 0
    let createStateIndex = 0

    const addCreatedState = (state: SearchState) => {
      const fieldKey = state.fieldKey
      const key = _getKey(fieldKey)

      newStates.push({
        ...state,
        key,
      })

      _incrementCount(fieldKey)
    }
    const addNewState = (searchValue: SearchValue | undefined) => {
      if (!searchValue) {
        return
      }

      const fieldKey = searchValue.key
      const searchField = findSearchField(fieldKey)
      if (!searchField) {
        return
      }

      const key = _getKey(fieldKey)
      const segmentStates = generateSegmentStates(searchField, searchValue)
      const searchState = { key, index: newStates.length, fieldKey, searchValue, segmentStates } as SearchState
      if (!checkSearchStateValid(searchState, dataKeyCountMap)) {
        return
      }

      newStates.push(searchState)
      _incrementCount(fieldKey)
    }

    while (newStateIndex < (searchValues.value?.length ?? -1) || createStateIndex < createdStates.length) {
      let createdState = createdStates[createStateIndex]
      const value = searchValues.value?.[newStateIndex]

      if (value && createdState?.index !== newStateIndex) {
        addNewState(value)
        newStateIndex++
      } else if (createdState) {
        let lastIndex: number

        do {
          addCreatedState(createdState)
          lastIndex = createdStates[createStateIndex].index
          createStateIndex++
          createdState = createdStates[createStateIndex]
        } while (createdState && createdStates[createStateIndex].index === lastIndex + 1)
      }
    }

    searchStates.value = newStates
  }

  const initSearchState = (key: VKey, segmentName?: string) => {
    const searchState = getSearchStateByKey(key)
    const searchField = findSearchField(searchState?.fieldKey)
    if (!searchState || !searchField) {
      return
    }

    const searchValue = searchState.searchValue
    const segmentStates = generateSegmentStates(searchField, searchValue)

    if (!segmentName) {
      searchState.segmentStates = segmentStates
    } else {
      const idx = searchState.segmentStates.findIndex(state => state.name === segmentName)
      searchState.segmentStates[idx] = segmentStates[idx]
    }
  }

  const createSearchState = (fieldKey: VKey, searchValue?: Omit<SearchValue, 'key'>) => {
    const searchField = findSearchField(fieldKey)
    if (!searchField) {
      return
    }

    if (!searchField.multiple && (fieldKeyCountMap.value.get(searchField.key) ?? 0) > 1) {
      return
    }

    const newKey = getKey(fieldKey, fieldKeyCountMap.value.get(fieldKey) ?? 0)

    const newSearchState: SearchState = {
      key: newKey,
      name: searchField.label,
      index: searchStates.value.length,
      fieldKey: fieldKey,
      segmentStates: generateSegmentStates(searchField, searchValue),
    }
    searchStates.value.push(newSearchState)
    mark(newKey, 'created')

    return newSearchState
  }

  function _updateSearchValues() {
    const newSearchValues = searchStates.value
      .map(state => {
        // filters invalid searchValues
        if (!state.key) {
          return
        }

        if (!isMarked(state.key) || !validateSearchState(state.key)) {
          return state.searchValue
        }

        unmark(state.key)
        return _convertStateToValue(state)
      })
      .filter(Boolean) as SearchValue[]

    const oldeSearchValue = searchValues.value

    if (!compareSearchValues(newSearchValues, oldeSearchValue)) {
      setSearchValues(newSearchValues)
      callEmit(props.onChange, toRaw(newSearchValues), toRaw(oldeSearchValue))
    }
  }
  function updateSearchValues() {
    queuedUpdateCnt++

    if (queuedUpdateCnt > 1) {
      return
    }

    const exec = () => {
      _updateSearchValues()

      // queue update operation until next macro task loop
      // to prevent repeated updates
      setTimeout(() => {
        queuedUpdateCnt--

        if (queuedUpdateCnt > 0) {
          exec()
        }
      })
    }

    exec()
  }

  const updateSegmentValue = (key: VKey, name: string, value: unknown) => {
    if (props.disabled) {
      return
    }

    const searchState = getSearchStateByKey(key)
    if (!searchState) {
      return
    }

    setSegmentValue(searchState, name, value)
    mark(key, 'updated')
  }
  const updateSegmentInput = (key: VKey, name: string, input: string) => {
    if (props.disabled) {
      return
    }

    const searchState = getSearchStateByKey(key)
    if (!searchState) {
      return
    }

    setSegmentInput(searchState, name, input)
    mark(key, 'updated')
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
    unmark(key)

    updateSearchValues()

    callEmit(props.onItemRemove, searchValue!)
  }
  const clearSearchState = () => {
    if (props.disabled) {
      return
    }

    searchStates.value = []
    clearMarks()

    updateSearchValues()

    callEmit(props.onClear)
  }

  return {
    searchStates: searchStates,
    initSearchStates,
    initSearchState,
    createSearchState,
    getSearchStateByKey,
    getSearchStatesByFieldKey,
    validateSearchState,
    convertStateToValue,
    updateSegmentInput,
    updateSegmentValue,
    isSegmentVisible,
    getVisibleSegmentStates,
    updateSearchValues,
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

function compareSearchValues(newSearchValues: SearchValue[] | undefined, oldSearchValues: SearchValue[] | undefined) {
  if (!newSearchValues && !oldSearchValues) {
    return true
  }

  return (
    newSearchValues?.length === oldSearchValues?.length &&
    newSearchValues?.every((value, idx) => {
      const oldValue = oldSearchValues?.[idx]

      return (
        oldValue &&
        value.key === oldValue.key &&
        value.operator === oldValue.operator &&
        isEqual(value.value, oldValue.value)
      )
    })
  )
}

type StateMark = 'created' | 'updated'

function useSearchStateMarks(): {
  getMarks: () => { key: VKey; mark: StateMark }[]
  getMark: (key: VKey) => StateMark | undefined
  isMarked: (key: VKey) => boolean
  mark: (key: VKey, stateMark: StateMark) => void
  unmark: (key: VKey) => void
  clearMarks: () => void
  /* eslint-disable-next-line indent */
} {
  const searchStateMarks = new Map<VKey, StateMark>()

  const isMarked = (key: VKey) => searchStateMarks.has(key)
  const getMarks = () => Array.from(searchStateMarks.entries()).map(([key, mark]) => ({ key, mark }))
  const getMark = (key: VKey) => searchStateMarks.get(key)
  const mark = (key: VKey, stateMark: StateMark) => {
    searchStateMarks.set(key, stateMark)
  }
  const unmark = (key: VKey) => {
    searchStateMarks.delete(key)
  }
  const clearMarks = () => {
    searchStateMarks.clear()
  }

  return {
    isMarked,
    getMarks,
    getMark,
    mark,
    unmark,
    clearMarks,
  }
}
