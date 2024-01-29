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

interface Pool {
  getPoolItem: (key?: string) => PoolItem
  getPoolItemByItemKey: (itemKey: VKey) => PoolItem
  recyclePoolItem: (poolItem: PoolItem) => void
  destroy: () => void
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
  const renderedItems = ref<RowPoolItem[]>([])

  const rowPool: Pool = createPool()
  let colPools: Record<string, Pool> = {}

  const updatePool = (
    items: PoolItem[],
    pool: Pool,
    data: unknown[],
    start: number,
    end: number,
    recycleAll: boolean,
  ) => {
    const inactiveKeys = new Set<string>()
    if (recycleAll) {
      items.forEach(item => {
        inactiveKeys.add(item.key)
        pool.recyclePoolItem(item)
      })
    }

    let updated = false

    for (const item of items) {
      if (item.index < start || item.index > end || item.isCustomKey) {
        inactiveKeys.add(item.key)

        // pool items with custom key shouldn't be resused
        if (!item.isCustomKey) {
          pool.recyclePoolItem(item)
        }
      }
    }

    updated = !!inactiveKeys.size

    const poolMap = new Map(items.map(item => [item.itemKey, item]))
    const poolKeySet = new Set(items.map(item => item.key))

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
      const poolItem = pool.getPoolItemByItemKey(itemKey)
      inactiveKeys.delete(poolItem.key)
      poolItem.item = item
      poolItem.index = index
      poolItem.itemKey = itemKey

      // if an inactive item is resued, remove it from deleted item list
      if (!poolKeySet.has(poolItem.key)) {
        items.push(poolItem)
      }

      updated = true
    }

    // remove deleted items
    for (const inactiveKey of inactiveKeys) {
      const index = items.findIndex(item => item.key === inactiveKey)

      if (index > -1) {
        items.splice(index, 1)
      }
    }

    // only resort the items when pool updated
    if (updated) {
      items.sort((item1, item2) => item1.index - item2.index)
    }
  }

  const updateColPool = (rowPoolItem: RowPoolItem, left: number, right: number, recycleAll: boolean) => {
    if (!isRowData(rowPoolItem.item) || !rowPoolItem.item.data) {
      return
    }

    if (!rowPoolItem.cols) {
      rowPoolItem.cols = []
    }

    let pool = colPools[rowPoolItem.key]
    if (!pool) {
      pool = createPool()
      colPools[rowPoolItem.key] = pool
    }

    updatePool(rowPoolItem.cols, pool, rowPoolItem.item.data, left, right, recycleAll)

    if (!props.colModifier) {
      return
    }

    const renderedCols = rowPoolItem.cols.map(poolItem => poolItem.item)
    const { start: prependedCols, end: appendedCols } = props.colModifier(rowPoolItem.item, renderedCols) ?? {}

    // append modified data to pool
    ;[...(prependedCols ?? [])].reverse().forEach(({ data, index, poolKey }) => {
      const poolItem = pool.getPoolItem(poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      rowPoolItem.cols!.unshift(poolItem)
    })
    appendedCols?.forEach(({ data, index, poolKey }) => {
      const poolItem = pool.getPoolItem(poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      rowPoolItem.cols!.push(poolItem)
    })
  }

  const updateRowPool = (top: number, bottom: number, recycleAll: boolean) => {
    updatePool(renderedItems.value, rowPool, props.dataSource, top, bottom, recycleAll)

    if (!props.rowModifier) {
      return
    }

    const renderedRows = renderedItems.value.map(item => item.item)
    const { start: prependedRows, end: appendedRows } = props.rowModifier(renderedRows) ?? {}

    ;[...(prependedRows ?? [])].reverse().forEach(({ data, index, poolKey }) => {
      const poolItem = rowPool.getPoolItem(poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      renderedItems.value.unshift(poolItem)
    })
    appendedRows?.forEach(({ data, index, poolKey }) => {
      const poolItem = rowPool.getPoolItem(poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      renderedItems.value.push(poolItem)
    })
  }

  let isUpdating = false
  const update = (recycleAll = false) => {
    if (isUpdating || (!props.dataSource.length && !recycleAll)) {
      return
    }
    isUpdating = true

    updateRowPool(topIndex.value, bottomIndex.value, recycleAll)

    renderedItems.value.forEach((poolItem, index) => {
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
    renderedItems.value = []
    rowPool.destroy()

    for (const key of Object.keys(colPools)) {
      colPools[key].destroy()
    }

    colPools = {}
  })

  return renderedItems
}

function createPool(): Pool {
  let poolSeed = 0

  const pooledItemMap = new Map<VKey, PoolItem>()

  const createPoolKey = () => {
    return `pool-${poolSeed++}`
  }

  const getPoolItem = (key?: string) => {
    if (key) {
      return {
        key,
        isCustomKey: true,
      } as PoolItem
    }

    if (pooledItemMap.size > 0) {
      let poolItem: PoolItem
      for (const [, item] of pooledItemMap) {
        poolItem = item
        break
      }

      pooledItemMap.delete(poolItem!.itemKey)
    }

    return {
      key: createPoolKey(),
    } as PoolItem
  }

  const getPoolItemByItemKey = (itemKey: VKey) => {
    const poolItem = pooledItemMap.get(itemKey)

    if (poolItem) {
      pooledItemMap.delete(itemKey)
      return poolItem
    }

    return getPoolItem()
  }

  const recyclePoolItem = (poolItem: PoolItem) => {
    pooledItemMap.set(poolItem.itemKey, poolItem)
  }

  const destroy = () => {
    pooledItemMap.clear()
  }

  return {
    getPoolItem,
    getPoolItemByItemKey,
    recyclePoolItem,
    destroy,
  }
}
