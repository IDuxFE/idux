/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeTransferData } from './types'
import type { VKey } from '@idux/cdk/utils'

import { isArray, isNil } from 'lodash-es'

export function traverseTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  fn: (item: TreeTransferData<C>, parents: TreeTransferData<C>[]) => void,
): void {
  const traverse = (_data: TreeTransferData<C>[], parents: TreeTransferData<C>[]) => {
    _data.forEach(item => {
      fn(item, parents)
      if (item[childrenKey]) {
        traverse(item[childrenKey]!, [item, ...parents])
      }
    })
  }

  traverse(data, [])
}

export function mapTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  fn: (item: TreeTransferData<C>, parents: TreeTransferData<C>[]) => TreeTransferData<C>,
): TreeTransferData<C>[] {
  const map = (_data: TreeTransferData<C>[], parents: TreeTransferData<C>[]) => {
    return _data.map(item => {
      const mappedItem = fn(item, parents)
      if (item[childrenKey]) {
        const mappedChildren = map(item[childrenKey]!, [item, ...parents])
        mappedItem[childrenKey] = mappedChildren as TreeTransferData<C>[C]
      }

      return mappedItem
    })
  }
  return map(data, [])
}

export function filterTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  fn: (item: TreeTransferData<C>, parents: TreeTransferData<C>[]) => boolean,
  filterStrategy: 'and' | 'or' = 'or',
): TreeTransferData<C>[] {
  const _filter = (_data: TreeTransferData<C>[], parents: TreeTransferData<C>[]): TreeTransferData<C>[] => {
    return _data
      .map(item => {
        let children: TreeTransferData<C>[] | undefined

        if (isArray(item[childrenKey])) {
          children = _filter(item[childrenKey]!, [item, ...parents])
        }

        let itemValid = fn(item, parents)
        itemValid =
          filterStrategy === 'and'
            ? !!(children && children.length > 0) && itemValid
            : !!(children && children.length > 0) || itemValid

        return (
          itemValid && {
            ...item,
            [childrenKey]: item[childrenKey] && children,
          }
        )
      })
      .filter(Boolean) as TreeTransferData<C>[]
  }

  return _filter(data, [])
}

export function combineTrees<C extends VKey>(
  sourceTree: TreeTransferData<C>[],
  targetTree: TreeTransferData<C>[],
  childrenKey: C,
  getRowKey: (item: TreeTransferData<C>) => VKey,
): TreeTransferData<C>[] {
  sourceTree.forEach(item => {
    const targetItem = targetTree.find(_item => {
      const sourceKey = getRowKey(item)
      const targetKey = getRowKey(_item)

      return !isNil(sourceKey) && !isNil(targetKey) && sourceKey === targetKey
    })

    if (!targetItem) {
      targetTree.push(item)
      return
    }

    if (!isArray(item[childrenKey])) {
      return
    }

    if (!isArray(targetItem[childrenKey])) {
      ;(targetItem[childrenKey] as TreeTransferData<C>[]) = []
    }

    combineTrees(item[childrenKey]!, targetItem[childrenKey]!, childrenKey, getRowKey)
  })

  return targetTree
}

export function flattenTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  leafOnly = false,
): TreeTransferData<C>[] {
  const res: TreeTransferData<C>[] = []

  traverseTree(data, childrenKey, item => {
    ;(!leafOnly || !item[childrenKey] || item[childrenKey]!.length <= 0) && res.push(item)
  })

  return res
}

export function genFlattenedTreeKeys<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  getRowKey: (item: TreeTransferData<C>) => VKey,
): VKey[] {
  const keys: VKey[] = []

  traverseTree(data, childrenKey, item => {
    keys.push(getRowKey(item))
  })

  return keys
}
