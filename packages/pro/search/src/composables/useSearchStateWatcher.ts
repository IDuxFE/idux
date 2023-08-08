/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SegmentState } from '../types'
import type { SearchState } from './useSearchStates'
import type { VKey } from '@idux/cdk/utils'

export enum SEARCH_STATE_ACTION {
  REMOVED,
  CREATED,
  UPDATED,
}

export type UpdatedSegmentValue = SegmentState & { oldValue: unknown }
export type SearchStateWatcherPayload<Action extends SEARCH_STATE_ACTION> = Action extends SEARCH_STATE_ACTION.REMOVED
  ? { searchState: SearchState }
  : Action extends SEARCH_STATE_ACTION.CREATED
  ? { searchState: SearchState }
  : Action extends SEARCH_STATE_ACTION.UPDATED
  ? { searchState: SearchState; updatedSegments: UpdatedSegmentValue[] }
  : never
export type SearchStateWatchHandler = <Action extends SEARCH_STATE_ACTION>(
  action: Action,
  payload: SearchStateWatcherPayload<Action>,
) => void
export type SearchStateWatcher = (key: VKey, handler: SearchStateWatchHandler) => () => void
export type SearchStateNotifier = <Action extends SEARCH_STATE_ACTION>(
  key: VKey,
  action: Action,
  payload: SearchStateWatcherPayload<Action>,
) => void

export interface SearchStateWatcherContext {
  notifySearchStateChange: SearchStateNotifier
  watchSearchState: SearchStateWatcher
  compareSegmentValues: (
    currentSegmentValues: SegmentState[],
    oldSegmentValues: SegmentState[],
  ) => UpdatedSegmentValue[]
  compareSearchStates: (searchStates: SearchState[], oldSearchStates: SearchState[]) => void
}

export function useSearchStateWatcher(): SearchStateWatcherContext {
  const handlersMap = new Map<VKey, Set<SearchStateWatchHandler>>()

  const watchSearchState: SearchStateWatcher = (key, handler) => {
    const handlers = handlersMap.get(key) ?? new Set<SearchStateWatchHandler>()
    handlers.add(handler)
    handlersMap.set(key, handlers)

    return () => {
      const handlers = handlersMap.get(key)
      handlers?.delete(handler)

      if (!handlers?.size) {
        handlersMap.delete(key)
      }
    }
  }
  const notifySearchStateChange: SearchStateNotifier = (key, action, payload) => {
    const handlers = handlersMap.get(key)

    if (!handlers) {
      return
    }

    handlers.forEach(handler => {
      handler(action, payload)
    })
  }

  const compareSegmentValues = (currentSegmentValues: SegmentState[], oldSegmentValues: SegmentState[]) => {
    const updatedSegments: (SegmentState & { oldValue: unknown })[] = []

    // find updated or removed segments
    oldSegmentValues.forEach(segmentValue => {
      const name = segmentValue.name
      const newSegmentValue = currentSegmentValues.find(sv => sv.name === name)

      if (segmentValue.value !== newSegmentValue?.value) {
        updatedSegments.push({
          name,
          input: newSegmentValue?.input ?? '',
          value: newSegmentValue?.value,
          oldValue: segmentValue.value,
        })
      }
    })
    // find newly created segments
    currentSegmentValues.forEach(currentSegmentValue => {
      const name = currentSegmentValue.name

      if (oldSegmentValues.findIndex(sv => sv.name === name) < 0) {
        updatedSegments.push({
          name,
          input: currentSegmentValue.input,
          value: currentSegmentValue.value,
          oldValue: undefined,
        })
      }
    })

    return updatedSegments
  }

  const compareSearchStates = (currentSearchStates: SearchState[], oldSearchStates: SearchState[]) => {
    oldSearchStates.forEach(searchState => {
      const key = searchState.key
      const newSearchState = currentSearchStates.find(ns => ns.key === key)

      // notify searchState removed
      if (!newSearchState) {
        notifySearchStateChange(key, SEARCH_STATE_ACTION.REMOVED, { searchState })
        return
      }

      const updatedSegments = compareSegmentValues(newSearchState.segmentStates, searchState.segmentStates)

      // notify searchState update
      if (updatedSegments.length > 0) {
        notifySearchStateChange(key, SEARCH_STATE_ACTION.UPDATED, { searchState, updatedSegments })
      }
    })

    // find newly created searchStates
    currentSearchStates.forEach(newSearchState => {
      const key = newSearchState.key
      if (oldSearchStates.findIndex(searchState => searchState.key === newSearchState.key) < 0) {
        notifySearchStateChange(key, SEARCH_STATE_ACTION.CREATED, { searchState: newSearchState })
      }
    })
  }

  return {
    watchSearchState,
    notifySearchStateChange,
    compareSegmentValues,
    compareSearchStates,
  }
}
