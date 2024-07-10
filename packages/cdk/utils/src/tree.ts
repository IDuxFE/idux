/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from './props'

import { isArray, isNil } from 'lodash-es'

export type TreeTypeData<V extends object, C extends VKey> = {
  [key in C]?: (TreeTypeData<V, C> & V)[]
}

export function traverseTree<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  childrenKey: C,
  fn: (item: V, parents: V[], index: number) => void,
  traverseStrategy: 'pre' | 'post' = 'pre',
): void {
  const traverse = (_data: V[], parents: V[]) => {
    for (let idx = 0; idx < _data.length; idx++) {
      const item = _data[idx]
      traverseStrategy === 'pre' && fn(item, parents, idx)
      if (item[childrenKey]) {
        traverse(item[childrenKey]!, [item, ...parents])
      }
      traverseStrategy === 'post' && fn(item, parents, idx)
    }
  }

  traverse(data, [])
}

export function mapTree<V extends TreeTypeData<V, C>, R extends object, C extends keyof V>(
  data: V[],
  childrenKey: C,
  mapFn: (item: V, parents: V[], index: number) => R | undefined,
): (R & TreeTypeData<R, C>)[] {
  const map = (_data: V[], parents: V[]) => {
    const res: (TreeTypeData<R, C> & R)[] = []
    for (let idx = 0; idx < _data.length; idx++) {
      const item = _data[idx]
      const mappedItem = mapFn(item, parents, idx) as R & TreeTypeData<R, C>
      if (!mappedItem) {
        continue
      }

      if (item[childrenKey]) {
        const mappedChildren = map(item[childrenKey]!, [item, ...parents])
        ;(mappedItem[childrenKey] as (R & TreeTypeData<R, C>)[]) = mappedChildren
      }

      res.push(mappedItem)
    }

    return res
  }
  return map(data, [])
}

export function filterTree<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  childrenKey: C,
  filterFn: (item: V, parents: V[], filteredChildren: V[] | undefined) => boolean,
  filterStrategy: 'and' | 'or' = 'or',
): V[] {
  const filter = (_data: V[], parents: V[]): V[] => {
    const res: V[] = []
    for (let idx = 0; idx < _data.length; idx++) {
      let children: V[] | undefined
      const item = _data[idx]

      if (item[childrenKey]) {
        children = filter(item[childrenKey]!, [item, ...parents])
      }

      let itemValid = filterFn(item, parents, children)
      const childrenValid = (children && children.length > 0) || (!item[childrenKey]?.length && itemValid)

      itemValid = filterStrategy === 'and' ? childrenValid && itemValid : childrenValid || itemValid

      if (itemValid) {
        res.push({
          ...item,
          [childrenKey]: item[childrenKey] && children,
        })
      }
    }

    return res
  }

  return filter(data, [])
}

export function mergeTree<V extends TreeTypeData<V, C>, R extends V, C extends keyof V | keyof R>(
  originalTree: V[],
  overideTree: R[],
  childrenKey: C,
  getKey: (item: V) => VKey,
): (V & Partial<R>)[] {
  const result = originalTree.map(item => ({ ...item })) as (V & Partial<R>)[]
  for (const overideItem of overideTree) {
    const originalItem = result.find(item => {
      const overideItemKey = getKey(overideItem)
      const originalItemKey = getKey(item)

      return !isNil(overideItemKey) && !isNil(originalItemKey) && overideItemKey === originalItemKey
    })

    if (!originalItem) {
      result.push({ ...overideItem })
      continue
    }

    for (const key of [
      ...Object.getOwnPropertyNames(overideItem),
      ...Object.getOwnPropertySymbols(overideItem),
    ] as (keyof R)[]) {
      if (key === childrenKey) {
        continue
      }

      originalItem[key] = overideItem[key]
    }

    if (isArray(overideItem[childrenKey])) {
      originalItem[childrenKey] = mergeTree(
        originalItem[childrenKey] ?? [],
        overideItem[childrenKey]!,
        childrenKey,
        getKey,
      ) as (V & Partial<R>)[C]
    }
  }

  return result
}

export function flattenTree<V extends TreeTypeData<V, C>, C extends keyof V>(data: V[], childrenKey: C): V[]
export function flattenTree<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  childrenKey: C,
  mapFn: undefined,
  leafOnly?: boolean,
): V[]
export function flattenTree<V extends TreeTypeData<V, C>, R extends object, C extends keyof V>(
  data: V[],
  childrenKey: C,
  mapFn: (item: V, parents: V[]) => R,
  leafOnly?: boolean,
): (R & TreeTypeData<R, C>)[]
export function flattenTree<V extends TreeTypeData<V, C>, R extends object, C extends keyof V>(
  data: V[],
  childrenKey: C,
  mapFn?: (item: V, parents: V[]) => R,
  leafOnly = false,
): V[] | (R & TreeTypeData<R, C>)[] {
  const res: V[] | (R & TreeTypeData<R, C>)[] = []

  traverseTree(data, childrenKey, (item, parents) => {
    if (!leafOnly || !item[childrenKey] || item[childrenKey]!.length <= 0) {
      const mappedItem = mapFn ? mapFn(item, parents) : item
      mappedItem && res.push(mappedItem as V & (R & TreeTypeData<R, C>))
    }
  })

  return res
}

export function getTreeKeys<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  childrenKey: C,
  getKey: (item: V) => VKey,
  leafOnly = false,
): VKey[] {
  const keys: VKey[] = []

  traverseTree(data, childrenKey, item => {
    if (!leafOnly || !item[childrenKey]?.length) {
      keys.push(getKey(item))
    }
  })

  return keys
}

function _insertTreeItem<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  targetKey: VKey,
  newItem: V,
  childrenKey: C,
  getKey: (item: V) => VKey,
  isAfter = true,
): V[] {
  return data.flatMap(item => {
    if (getKey(item) === targetKey) {
      return isAfter ? [item, newItem] : [newItem, item]
    }

    const chlidren = item[childrenKey]
    if (chlidren?.length) {
      return {
        ...item,
        children: _insertTreeItem(chlidren, targetKey, newItem, childrenKey, getKey, isAfter),
      }
    }

    return item
  })
}

export function insertTreeItemBefore<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  targetKey: VKey,
  newItem: V,
  childrenKey: C,
  getKey: (item: V) => VKey,
): V[] {
  return _insertTreeItem(data, targetKey, newItem, childrenKey, getKey, false)
}

export function insertTreeItemAfter<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  targetKey: VKey,
  newItem: V,
  childrenKey: C,
  getKey: (item: V) => VKey,
): V[] {
  return _insertTreeItem(data, targetKey, newItem, childrenKey, getKey, true)
}

export function insertChildTreeItem<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  targetKey: VKey,
  newItem: V,
  childrenKey: C,
  getKey: (item: V) => VKey,
): V[] {
  return data.flatMap(item => {
    const children = item[childrenKey] ?? []
    if (getKey(item) === targetKey) {
      // already a parent: add as first child
      return {
        ...item,
        // opening item so you can see where item landed
        isOpen: true,
        children: [newItem, ...children],
      }
    }

    if (!children.length) {
      return item
    }

    return {
      ...item,
      children: insertChildTreeItem(children, targetKey, newItem, childrenKey, getKey),
    }
  })
}

export function removeTreeItem<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  targetKey: VKey,
  childrenKey: C,
  getKey: (item: V) => VKey,
): V[] {
  let removed = false

  const filterFn = (_data: V[]) => {
    if (removed) {
      return [..._data]
    }

    const filterRes: V[] = []

    _data.forEach(item => {
      if (getKey(item) !== targetKey) {
        const children = item[childrenKey]
        filterRes.push(
          children?.length
            ? {
                ...item,
                [childrenKey]: filterFn(children),
              }
            : item,
        )
      } else {
        removed = true
      }
    })

    return filterRes
  }

  return filterFn(data)
}
