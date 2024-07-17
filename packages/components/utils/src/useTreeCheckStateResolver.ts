/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Ref, computed } from 'vue'

import { isArray, isObject } from 'lodash-es'

import { type TreeTypeData, type VKey, getTreeKeys, traverseTree } from '@idux/cdk/utils'

interface GetAllCheckedKeys<V extends TreeTypeData<V, C>, C extends keyof V> {
  (data: V[]): VKey[]
  (defaultUnCheckedKeys: VKey[]): VKey[]
  (data: V[], defaultUnCheckedKeys: VKey[]): VKey[]
}
interface GetAllUncheckedKeys<V extends TreeTypeData<V, C>, C extends keyof V> {
  (data: V[]): VKey[]
  (defaultCheckedKeys: VKey[]): VKey[]
  (data: V[], defaultCheckedKeys: VKey[]): VKey[]
}

export interface TreeCheckStateResolverContext<V extends TreeTypeData<V, C>, C extends keyof V> {
  data: V[] | undefined
  dataMap: Map<VKey, V>
  parentKeyMap: Map<VKey, VKey | undefined>
  depthMap: Map<VKey, number>
}
export interface TreeCheckStateResolver<V extends TreeTypeData<V, C>, C extends keyof V> {
  appendKeys: (checkedKeys: VKey[] | Set<VKey>, appendedKeys: VKey[]) => VKey[]
  removeKeys: (checkedKeys: VKey[] | Set<VKey>, removedKeys: VKey[]) => VKey[]

  getAllCheckedKeys: GetAllCheckedKeys<V, C>
  getAllUncheckedKeys: GetAllUncheckedKeys<V, C>
}
export type TreeCascadeStrategy = 'all' | 'child' | 'parent' | 'off'

export function useTreeCheckStateResolver<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: Ref<V[]>,
  childrenKey: Ref<C>,
  getKey: Ref<(item: V) => VKey>,
  cascadeStrategy?: Ref<TreeCascadeStrategy>,
): TreeCheckStateResolver<V, C>
export function useTreeCheckStateResolver<V extends TreeTypeData<V, C>, C extends keyof V>(
  context: Ref<TreeCheckStateResolverContext<V, C>>,
  childrenKey: Ref<C>,
  getKey: Ref<(item: V) => VKey>,
  cascadeStrategy?: Ref<TreeCascadeStrategy>,
): TreeCheckStateResolver<V, C>
export function useTreeCheckStateResolver<V extends TreeTypeData<V, C>, C extends keyof V>(
  dataOrContext: Ref<V[] | TreeCheckStateResolverContext<V, C>>,
  childrenKey: Ref<C>,
  getKey: Ref<(item: V) => VKey>,
  cascadeStrategy?: Ref<TreeCascadeStrategy>,
): TreeCheckStateResolver<V, C> {
  const _getContext = (
    dataOrContext: V[] | TreeCheckStateResolverContext<V, C>,
  ): TreeCheckStateResolverContext<V, C> => {
    if (!isArray(dataOrContext)) {
      return dataOrContext
    }

    return getTreeCheckStateResolverContext(dataOrContext, childrenKey.value, getKey.value)
  }

  const mergedCascadeStrategy = computed(() => cascadeStrategy?.value ?? 'all')
  const _context = computed(() => _getContext(dataOrContext.value))

  const _getParents = (key: VKey, resolverContext: TreeCheckStateResolverContext<V, C>) => {
    const { parentKeyMap, dataMap } = resolverContext
    const parents: V[] = []

    let currentKey = key
    while (parentKeyMap.has(currentKey)) {
      const parentKey = parentKeyMap.get(currentKey)!
      const parent = dataMap.get(parentKey)
      parent && parents.push(parent)
      currentKey = parentKey
    }
    return parents
  }
  const _getAllData = () => {
    const { data, parentKeyMap, dataMap } = _context.value
    if (data) {
      return data
    }

    const _data: V[] = []
    for (const key of parentKeyMap.keys()) {
      if (!parentKeyMap.has(key) && dataMap.has(key)) {
        _data.push(dataMap.get(key)!)
      }
    }

    return _data
  }

  const _append = (
    checkedKeys: VKey[] | Set<VKey>,
    appendedKeys: VKey[],
    resolverContext: TreeCheckStateResolverContext<V, C>,
  ) => {
    if (!appendedKeys.length) {
      return Array.from(checkedKeys)
    }

    if (mergedCascadeStrategy.value === 'off') {
      return Array.from(new Set([...checkedKeys, ...appendedKeys]))
    }

    const { dataMap } = resolverContext

    const newKeySet = new Set(checkedKeys)
    const topMostCheckedKeys = new Set<VKey>()
    appendedKeys.forEach(key => {
      if (!dataMap.has(key) || newKeySet.has(key)) {
        return
      }

      const treeData = dataMap.get(key)!
      const children = treeData[childrenKey.value]
      newKeySet.add(key)
      topMostCheckedKeys.add(key)

      if (children?.length) {
        getTreeKeys(children, childrenKey.value, getKey.value, mergedCascadeStrategy.value === 'child').forEach(key => {
          newKeySet.add(key)
          topMostCheckedKeys.delete(key)
        })
      }
    })

    if (mergedCascadeStrategy.value === 'child') {
      return Array.from(newKeySet).filter(key => !dataMap.get(key)?.[childrenKey.value]?.length)
    }

    topMostCheckedKeys.forEach(key => {
      _getParents(key, resolverContext).forEach(parent => {
        if (parent[childrenKey.value]?.every(child => newKeySet.has(getKey.value(child)))) {
          newKeySet.add(getKey.value(parent))
        }
      })
    })

    if (mergedCascadeStrategy.value === 'all') {
      return Array.from(newKeySet)
    }

    newKeySet.forEach(key => {
      if (!newKeySet.has(key)) {
        return
      }

      const children = dataMap.get(key)?.[childrenKey.value]
      if (children) {
        traverseTree(children, childrenKey.value, item => {
          newKeySet.delete(getKey.value(item))
        })
      }
    })

    return Array.from(newKeySet)
  }
  const _remove = (
    checkedKeys: VKey[] | Set<VKey>,
    removedKeys: VKey[],
    resolverContext: TreeCheckStateResolverContext<V, C>,
  ) => {
    if (!removedKeys.length) {
      return Array.from(checkedKeys)
    }

    const newKeySet = new Set(checkedKeys)
    if (mergedCascadeStrategy.value === 'off') {
      removedKeys.forEach(key => {
        newKeySet.delete(key)
      })
      return Array.from(newKeySet)
    }

    const { dataMap } = resolverContext

    const deletedKeys = new Set()
    // store already deleted keys
    const deleteKey = (key: VKey) => {
      deletedKeys.add(key)
      newKeySet.delete(key)
    }

    removedKeys.forEach(key => {
      if (!dataMap.has(key)) {
        return
      }

      getTreeKeys([dataMap.get(key)!], childrenKey.value, getKey.value).forEach(key => {
        deleteKey(key)
      })

      const parents = _getParents(key, resolverContext)

      if (mergedCascadeStrategy.value === 'parent') {
        const keysInChain = [key, ...parents.map(getKey.value)]
        const selectedKeyIdx = keysInChain.findIndex(key => newKeySet.has(key))

        // if one of the ancestors was selected
        // replace parent node with child nodes
        if (selectedKeyIdx > -1) {
          // only travers chain from selected node to the bottom
          parents.slice(0, selectedKeyIdx).forEach(parent => {
            if (!parent[childrenKey.value]) {
              return
            }

            parent[childrenKey.value]!.forEach(child => {
              const childKey = getKey.value(child)
              // add only if the child node hasn't been deleted before
              if (!deletedKeys.has(childKey)) {
                newKeySet.add(childKey)
              }
            })

            deleteKey(getKey.value(parent))
          })
        }
      } else {
        parents.forEach(parent => {
          deleteKey(getKey.value(parent))
        })
      }
    })
    return Array.from(newKeySet)
  }
  const appendKeys = (checkedKeys: VKey[] | Set<VKey>, appendedKeys: VKey[]) =>
    _append(checkedKeys, appendedKeys, _context.value)
  const removeKeys = (checkedKeys: VKey[] | Set<VKey>, removedKeys: VKey[]) =>
    _remove(checkedKeys, removedKeys, _context.value)

  const _getAllCheckedKeys = (data: V[] | undefined, defaultUnCheckedKeys: VKey[]) => {
    const _data = data ?? _getAllData()
    const tempKeys =
      mergedCascadeStrategy.value === 'parent'
        ? _data.map(getKey.value)
        : new Set(getTreeKeys(_data, childrenKey.value, getKey.value, mergedCascadeStrategy.value === 'child'))

    return _remove(tempKeys, defaultUnCheckedKeys, data ? _getContext(data) : _context.value)
  }
  const _getAllUncheckedKeys = (data: V[] | undefined, defaultCheckedKeys: VKey[]) => {
    return _append([], defaultCheckedKeys, data ? _getContext(data) : _context.value)
  }

  const getAllCheckedKeys = (data?: V[] | VKey[], defaultUnCheckedKeys?: VKey[]) => {
    const dataProvided = ((data?: V[] | VKey[]): data is V[] => isObject(data?.[0]))(data)

    return _getAllCheckedKeys(dataProvided ? data : undefined, defaultUnCheckedKeys ?? (dataProvided ? [] : data ?? []))
  }
  const getAllUncheckedKeys = (data?: V[] | VKey[], defaultCheckedKeys?: VKey[]) => {
    const dataProvided = ((data?: V[] | VKey[]): data is V[] => isObject(data?.[0]))(data)

    return _getAllUncheckedKeys(dataProvided ? data : undefined, defaultCheckedKeys ?? (dataProvided ? [] : data ?? []))
  }

  return {
    appendKeys,
    removeKeys,
    getAllCheckedKeys,
    getAllUncheckedKeys,
  }
}

export function getTreeCheckStateResolverContext<V extends TreeTypeData<V, C>, C extends keyof V>(
  data: V[],
  childrenKey: C,
  getKey: (item: V) => VKey,
): TreeCheckStateResolverContext<V, C> {
  const dataMap = new Map<VKey, V>()
  const parentKeyMap = new Map<VKey, VKey>()
  const depthMap = new Map<VKey, number>()

  traverseTree(data, childrenKey, (item, parents) => {
    const key = getKey(item)
    const parent = parents[0]
    dataMap.set(key, item)
    depthMap.set(key, parents.length)

    if (parent) {
      parentKeyMap.set(key, getKey(parent))
    }
  })

  return {
    data,
    dataMap,
    parentKeyMap,
    depthMap,
  }
}
