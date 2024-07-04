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

import { isNil } from 'lodash-es'

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
  getPoolItemByItemKey: (itemKey: VKey) => PoolItem | undefined
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
): { renderedItems: Ref<RowPoolItem[]>; prependedRowKeys: Ref<VKey[]>; prependedColKeys: Ref<Map<VKey, VKey[]>> } {
  const renderedItems = ref<RowPoolItem[]>([])
  const prependedRowKeys = ref<VKey[]>([])
  const prependedColKeys = ref<Map<VKey, VKey[]>>(new Map())

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
        pool.recyclePoolItem(item)
      }
    }

    updated = !!inactiveKeys.size

    const poolMap = new Map(items.map(item => [item.itemKey, item]))
    const poolKeySet = new Set(items.map(item => item.key))
    const newlyAppendedItems: { item: unknown; index: number; itemKey: VKey }[] = []

    const updatePoolItem = (poolItem: PoolItem, item: unknown, index: number, itemKey: VKey) => {
      poolItem.item = item
      poolItem.index = index
      poolItem.itemKey = itemKey

      inactiveKeys.delete(poolItem.key)
      updated = true

      // if an inactive item is resued, remove it from deleted item list
      if (!poolKeySet.has(poolItem.key)) {
        items.push(poolItem)
      }
    }

    for (let index = start; index <= end; index++) {
      const item = data[index]
      if (!item) {
        continue
      }

      const itemKey = getKey.value(item)
      const existedPoolItem = poolMap.get(itemKey)

      // item still active, continue
      if (!isNil(existedPoolItem) && !inactiveKeys.has(existedPoolItem.key)) {
        updatePoolItem(existedPoolItem, item, index, itemKey)
        continue
      }

      newlyAppendedItems.push({ item, index, itemKey })
    }

    let i = 0
    let currentItem = newlyAppendedItems[i]
    while (currentItem) {
      const { item, index, itemKey } = currentItem
      const poolItem = pool.getPoolItemByItemKey(itemKey)

      if (poolItem) {
        updatePoolItem(poolItem, item, index, itemKey)
        newlyAppendedItems.splice(i, 1)
        currentItem = newlyAppendedItems[i]
      } else {
        currentItem = newlyAppendedItems[++i]
      }
    }

    newlyAppendedItems.forEach(({ item, index, itemKey }) => {
      const poolItem = pool.getPoolItem()
      updatePoolItem(poolItem, item, index, itemKey)
    })

    const recycledItems: PoolItem[] = []

    // remove deleted items
    for (const inactiveKey of inactiveKeys) {
      const index = items.findIndex(item => item.key === inactiveKey)

      if (index > -1) {
        recycledItems.push(items[index])
        items.splice(index, 1)
      }
    }

    // only resort the items when pool updated
    if (updated) {
      items.sort((item1, item2) => item1.index - item2.index)
    }

    return {
      items,
      recycledItems,
    }
  }

  const updateColPool = (rowPoolItem: RowPoolItem, left: number, right: number, recycleAll: boolean) => {
    if (!isRowData(rowPoolItem.item) || !rowPoolItem.item.data) {
      return []
    }

    if (!rowPoolItem.cols) {
      rowPoolItem.cols = []
    }

    let pool = colPools[rowPoolItem.key]
    if (!pool) {
      pool = createPool()
      colPools[rowPoolItem.key] = pool
    }

    updatePool(rowPoolItem.cols!, pool, rowPoolItem.item.data, left, right, recycleAll)

    if (!props.colModifier) {
      return []
    }

    const renderedCols = rowPoolItem.cols!.map(poolItem => poolItem.item)
    const { start: prependedCols, end: appendedCols } = props.colModifier(rowPoolItem.item, renderedCols) ?? {}

    const currentPrepenedColKeys: VKey[] = []

    // append modified data to pool
    ;[...(prependedCols ?? [])].reverse().forEach(({ data, index, poolKey }) => {
      const poolItem = pool.getPoolItem(poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      currentPrepenedColKeys.push(poolItem.itemKey)
      rowPoolItem.cols!.unshift(poolItem)
    })
    appendedCols?.forEach(({ data, index, poolKey }) => {
      const poolItem = pool.getPoolItem(poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      rowPoolItem.cols!.push(poolItem)
    })

    return currentPrepenedColKeys
  }

  const updateRowPool = (top: number, bottom: number, recycleAll: boolean) => {
    const { recycledItems } = updatePool(renderedItems.value, rowPool, props.dataSource, top, bottom, recycleAll)

    ;(recycledItems as RowPoolItem[]).forEach(item => {
      const pool = colPools[item.key]

      if (pool) {
        item.cols?.forEach(col => pool.recyclePoolItem(col))
      }

      item.cols = []
    })

    if (!props.rowModifier) {
      return []
    }

    const renderedRows = renderedItems.value.map(item => item.item)
    const { start: prependedRows, end: appendedRows } = props.rowModifier(renderedRows) ?? {}

    const currentPrepenedRowKeys: VKey[] = []

    ;[...(prependedRows ?? [])].reverse().forEach(({ data, index, poolKey }) => {
      const poolItem = rowPool.getPoolItem(poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      currentPrepenedRowKeys.push(poolItem.itemKey)
      renderedItems.value.unshift(poolItem)
    })
    appendedRows?.forEach(({ data, index, poolKey }) => {
      const poolItem = rowPool.getPoolItem(poolKey) as RowPoolItem
      poolItem.item = data
      poolItem.index = index
      poolItem.itemKey = getKey.value(data)
      renderedItems.value.push(poolItem)
    })

    return currentPrepenedRowKeys
  }

  const dataSourceChangedTrigger = ref(false)
  let dataSourceChanged = false
  const triggerByDataSourceChange = () => {
    dataSourceChangedTrigger.value = !dataSourceChangedTrigger.value
  }

  let isUpdating = false
  const update = (recycleAll = false) => {
    if (isUpdating || (!props.dataSource.length && !recycleAll)) {
      return
    }
    isUpdating = true

    const currentPrependedRowKeys = updateRowPool(topIndex.value, bottomIndex.value, recycleAll)
    const currentPrependedColKeys = new Map<VKey, VKey[]>()

    renderedItems.value.forEach((poolItem, index) => {
      const colPrependedKeys = updateColPool(poolItem, leftIndex.value[index], rightIndex.value[index], recycleAll)
      currentPrependedColKeys.set(poolItem.itemKey, colPrependedKeys)
    })

    prependedRowKeys.value = currentPrependedRowKeys
    prependedColKeys.value = currentPrependedColKeys

    isUpdating = false
  }

  // update all pool items insteadof patch it
  // this will always trigger rerender, so only do it when dataSource is updated
  watch(
    () => props.dataSource,
    () => {
      dataSourceChanged = true
      triggerByDataSourceChange()
    },
    {
      deep: true,
      flush: 'pre',
    },
  )
  watch(
    [topIndex, bottomIndex, leftIndex, rightIndex, dataSourceChangedTrigger],
    () => {
      update(dataSourceChanged)

      if (dataSourceChanged) {
        dataSourceChanged = false
      }
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

  return {
    renderedItems,
    prependedRowKeys,
    prependedColKeys,
  }
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

      return poolItem!
    }

    return {
      key: createPoolKey(),
    } as PoolItem
  }

  const getPoolItemByItemKey = (itemKey: VKey) => {
    const poolItem = pooledItemMap.get(itemKey)

    if (poolItem) {
      pooledItemMap.delete(itemKey)
    }

    return poolItem
  }

  const recyclePoolItem = (poolItem: PoolItem) => {
    // pool items with custom key shouldn't be resused
    if (!poolItem.isCustomKey) {
      pooledItemMap.set(poolItem.itemKey, poolItem)
    }
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
