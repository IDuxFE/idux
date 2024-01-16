/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SearchState } from './useSearchStates'

import { onUnmounted } from 'vue'

export interface CacheDataContext {
  setCacheData: (itemKey: string, segmentName: string, dataKey: string, data: any) => void
  getCacheData: (itemKey: string, segmentName: string, dataKey: string) => void
  clearCacheData: (searchStates?: SearchState[]) => void
}

export function useCacheData(): CacheDataContext {
  const cacheDataMap = new Map<string, Map<string, Record<string, any>>>()

  const setCacheData = (itemKey: string, segmentName: string, dataKey: string, data: any) => {
    let dataMap = cacheDataMap.get(itemKey)

    if (!dataMap) {
      dataMap = new Map<string, Record<string, any>>()
      cacheDataMap.set(itemKey, dataMap)
    }

    let segmentData = dataMap.get(segmentName)

    if (!segmentData) {
      segmentData = {
        [dataKey]: data,
      }

      dataMap.set(segmentName, segmentData)
    } else {
      segmentData[dataKey] = data
    }
  }

  const getCacheData = (itemKey: string, segmentName: string, dataKey: string) => {
    return cacheDataMap.get(itemKey)?.get(segmentName)?.[dataKey]
  }

  const clearCacheData = (searchStates?: SearchState[]) => {
    if (!searchStates) {
      cacheDataMap.clear()
      return
    }

    const stateKeys = new Set(searchStates.map(state => state.key))

    for (const key of cacheDataMap.keys()) {
      if (!stateKeys.has(key)) {
        cacheDataMap.delete(key)
      }
    }
  }

  onUnmounted(clearCacheData)

  return {
    setCacheData,
    getCacheData,
    clearCacheData,
  }
}
