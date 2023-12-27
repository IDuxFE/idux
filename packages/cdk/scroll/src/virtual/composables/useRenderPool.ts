/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from './useGetKey'
import type { VirtualScrollProps, VirtualScrollRowData } from '../types'
import type { VKey } from '@idux/cdk/utils'

import { type ComputedRef, type Ref, onUnmounted, ref, watch } from 'vue'

import { isRowData } from '../utils'

interface PoolItem {
  key: string
  item: unknown | VirtualScrollRowData
  itemKey: VKey
  index: number
  isCustomKey?: boolean
}

interface RowPoolItem extends PoolItem {
  cols?: PoolItem[]
}

/**
 * we use a render pool to reuse rendered components and dom elements
 *
 * rendered items are pushed to a render pool, whenever it's removed from rendered data, reuse the pooled item if possiable
 *
 * vue diffs list vnodes according to their key and props,
 * so when a pooled item is resused to render new item content,
 * orianginal component is only updated instead of creating a new one
 *
 * if the component's vnode tree is stable, this ensures that dom elements are stable as well,
 * which makes performance as optimal as possiable
 */

export function useRenderPool(
  props: VirtualScrollProps,
  topIndex: Ref<number>,
  bottomIndex: Ref<number>,
  leftIndex: Ref<number[]>,
  rightIndex: Ref<number[]>,
  getKey: ComputedRef<GetKey>,
): Ref<RowPoolItem[]> {
  let poolSeed = 0

  const rowPool = ref<RowPoolItem[]>([])
  let rowInactivePool: RowPoolItem[] = []
  let colInactivePools: Record<string, PoolItem[]> = {}

  const createPoolKey = () => {
    return `pool-${poolSeed++}`
  }

  const getPoolItem = (inactivePool: PoolItem[], key?: string): PoolItem => {
    if (key) {
      return {
        key,
        isCustomKey: true,
      } as PoolItem
    }

    if (inactivePool.length > 0) {
      return inactivePool.pop()!
    }

    return {
      key: createPoolKey(),
    } as PoolItem
  }

  const updatePool = (
    pool: PoolItem[],
    inactivePool: PoolItem[],
    data: unknown[],
    start: number,
    end: number,
    recycleAll: boolean,
  ) => {
    const inactiveKeys = new Set<string>(recycleAll ? pool.map(poolItem => poolItem.key) : [])
    let updated = false

    for (const poolItem of pool) {
      if (poolItem.index < start || poolItem.index > end || poolItem.isCustomKey) {
        inactiveKeys.add(poolItem.key)

        // pool items with custom key shouldn't be resused
        if (!poolItem.isCustomKey) {
          inactivePool.push(poolItem)
        }
      }
    }

    updated = !!inactiveKeys.size

    const poolMap = new Map(pool.map(poolItem => [poolItem.itemKey, poolItem]))
    const poolKeySet = new Set(pool.map(poolItem => poolItem.key))

    for (let index = start; index <= end; index++) {
      const item = data[index]
      if (!item) {
        continue
      }

      const itemKey = getKey.value(item)
      const existedPoolItem = poolMap.get(itemKey)

      // item still active, continue
      if (existedPoolItem && !inactiveKeys.has(existedPoolItem.key)) {
        continue
      }

      // create a new pooled item
      const poolItem = getPoolItem(inactivePool)
      inactiveKeys.delete(poolItem.key)
      poolItem.item = item
      poolItem.index = index
      poolItem.itemKey = itemKey

      // if an inactive item is resued, remove it from deleted item list
      if (!poolKeySet.has(poolItem.key)) {
        pool.push(poolItem)
      }

      updated = true
    }

    // remove deleted items
    for (const inactiveKey of inactiveKeys) {
      const index = pool.findIndex(pi => pi.key === inactiveKey)

      if (index > -1) {
        pool.splice(index, 1)
      }
    }

    // only resort the items when pool updated
    if (updated) {
      pool.sort((item1, item2) => item1.index - item2.index)
    }
  }

  const updateColPool = (rowPoolItem: RowPoolItem, left: number, right: number, recycleAll: boolean) => {
    if (!isRowData(rowPoolItem.item) || !rowPoolItem.item.data) {
      return
    }

    if (!rowPoolItem.cols) {
      rowPoolItem.cols = []
    }

    let inactivePool = colInactivePools[rowPoolItem.key]
    if (!inactivePool) {
      inactivePool = []
      colInactivePools[rowPoolItem.key] = inactivePool
    }

    updatePool(rowPoolItem.cols, inactivePool, rowPoolItem.item.data, left, right, recycleAll)

    if (!props.colModifier) {
      return
    }

    const renderedCols = rowPoolItem.cols.map(poolItem => poolItem.item)
    const { start: prependedCols, end: appendedCols } = props.colModifier(rowPoolItem.item, renderedCols) ?? {}

    // append modified data to pool
    ;[...(prependedCols ?? [])].reverse().forEach(({ data, index, poolKey }) => {
      const poolItem = getPoolItem(rowInactivePool, poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      rowPoolItem.cols!.unshift(poolItem)
    })
    appendedCols?.forEach(({ data, index, poolKey }) => {
      const poolItem = getPoolItem(rowInactivePool, poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      rowPoolItem.cols!.push(poolItem)
    })
  }

  const updateRowPool = (top: number, bottom: number, recycleAll: boolean) => {
    updatePool(rowPool.value, rowInactivePool, props.dataSource, top, bottom, recycleAll)

    if (!props.rowModifier) {
      return
    }

    const renderedRows = rowPool.value.map(poolItem => poolItem.item)
    const { start: prependedRows, end: appendedRows } = props.rowModifier(renderedRows) ?? {}

    ;[...(prependedRows ?? [])].reverse().forEach(({ data, index, poolKey }) => {
      const poolItem = getPoolItem(rowInactivePool, poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      rowPool.value.unshift(poolItem)
    })
    appendedRows?.forEach(({ data, index, poolKey }) => {
      const poolItem = getPoolItem(rowInactivePool, poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      rowPool.value.push(poolItem)
    })
  }

  let isUpdating = false
  const update = (recycleAll = false) => {
    if (isUpdating || (!props.dataSource.length && !recycleAll)) {
      return
    }
    isUpdating = true

    updateRowPool(topIndex.value, bottomIndex.value, recycleAll)

    rowPool.value.forEach((poolItem, index) => {
      updateColPool(poolItem, leftIndex.value[index], rightIndex.value[index], recycleAll)
    })

    isUpdating = false
  }

  // update all pool items insteadof patch it
  // this will always trigger rerender, so only do it when dataSource is updated
  watch(
    () => props.dataSource,
    () => {
      update(true)
    },
    {
      deep: true,
    },
  )
  watch(
    [topIndex, bottomIndex, leftIndex, rightIndex],
    () => {
      update()
    },
    {
      immediate: true,
      flush: 'post',
      deep: true,
    },
  )

  onUnmounted(() => {
    rowPool.value = []
    rowInactivePool = []
    colInactivePools = {}
  })

  return rowPool
}
