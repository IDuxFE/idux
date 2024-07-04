/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CascaderStrategy } from '@idux/components/cascader'

import { type ComputedRef, type Ref, computed, ref, watch } from 'vue'

import { isArray, isBoolean, isNil, isObject } from 'lodash-es'

import { type TreeTypeData, type VKey, filterTree, mergeTree } from '@idux/cdk/utils'
import {
  GetKeyFn,
  type TreeCheckStateResolver,
  type TreeCheckStateResolverContext,
  getTreeCheckStateResolverContext,
  useTreeCheckStateResolver,
} from '@idux/components/utils'

interface GetAllCheckedKeys<V extends TreeTypeData<V, C>, C extends keyof V> {
  (data: V[], cached?: boolean): VKey[]
  (defaultUnCheckedKeys: VKey[]): VKey[]
  (data: V[], defaultUnCheckedKeys: VKey[], cached?: boolean): VKey[]
}
interface GetAllUncheckedKeys<V extends TreeTypeData<V, C>, C extends keyof V> {
  (data: V[], cached?: boolean): VKey[]
  (defaultCheckedKeys: VKey[]): VKey[]
  (data: V[], defaultCheckedKeys: VKey[], cached?: boolean): VKey[]
}

export interface TreeCheckStateContext<V extends TreeTypeData<V, C>, C extends keyof V> {
  allCheckedKeySet: ComputedRef<Set<VKey>>
  checkDisabledKeySet: ComputedRef<Set<VKey>>
  checkStateResolver: TreeCheckStateResolver<V, C>
  isChecked: (key: VKey) => boolean
  isCheckDisabled: (key: VKey) => boolean
  isIndeterminate: (key: VKey) => boolean
  toggle: (data: V) => {
    checked: boolean
    checkedKeys: VKey[]
  }
  getAllCheckedKeys: GetAllCheckedKeys<V, C>
  getAllUncheckedKeys: GetAllUncheckedKeys<V, C>
}

export function useTreeCheckState<V extends TreeTypeData<V, C>, C extends keyof V>(
  checkedKeys: Ref<VKey[]>,
  resolverContext: Ref<TreeCheckStateResolverContext<V, C>>,
  childrenKey: Ref<C>,
  getKey: Ref<GetKeyFn>,
  cascaderStrategy: Ref<CascaderStrategy>,
  isDisabled: Ref<((data: V) => boolean) | undefined>,
): TreeCheckStateContext<V, C> {
  const cachedSelectedData = ref([]) as Ref<V[]>
  const cachedSelectedDataReolverContext = computed(() =>
    getTreeCheckStateResolverContext(cachedSelectedData.value, childrenKey.value, getKey.value),
  )

  const mergedResolverContext = computed(() => {
    const { data, dataMap, parentKeyMap, depthMap } = resolverContext.value
    const {
      data: cachedData,
      dataMap: cachedDataMap,
      parentKeyMap: cachedParentMap,
      depthMap: cachedDepthMap,
    } = cachedSelectedDataReolverContext.value

    const mergedData = mergeTree(data ?? [], cachedData ?? [], childrenKey.value, getKey.value)
    const mergedDataMap = new Map(dataMap)
    const _cachedDataMap = new Map(cachedDataMap)

    mergedDataMap.forEach((item, key) => {
      if (_cachedDataMap.has(key)) {
        const cachedItem = _cachedDataMap.get(key)!
        mergedDataMap.set(key, mergeTree([item], [cachedItem], childrenKey.value, getKey.value)[0])
        _cachedDataMap.delete(key)
      }
    })
    _cachedDataMap.forEach((item, key) => {
      mergedDataMap.set(key, item)
    })

    const mergedParentKeyMap = new Map([...cachedParentMap, ...parentKeyMap])
    const mergedDepthMap = new Map([...cachedDepthMap, ...depthMap])

    return {
      data: mergedData,
      dataMap: mergedDataMap,
      parentKeyMap: mergedParentKeyMap,
      depthMap: mergedDepthMap,
    }
  })

  const checkStateResolver = useTreeCheckStateResolver(mergedResolverContext, childrenKey, getKey, cascaderStrategy)
  const allCheckStateResolver = useTreeCheckStateResolver(
    mergedResolverContext,
    childrenKey,
    getKey,
    computed(() => 'all'),
  )

  const checkDisabledKeySet = computed(() => {
    const { dataMap } = mergedResolverContext.value
    const disabledKeys = new Set<VKey>()
    dataMap.forEach((data, key) => {
      if (isDisabled.value?.(data)) {
        disabledKeys.add(key)
      }
    })

    return disabledKeys
  })

  const allCheckedKeySet = computed(() => {
    const keys =
      cascaderStrategy.value === 'off' ? checkedKeys.value : allCheckStateResolver.appendKeys([], checkedKeys.value)

    return new Set(keys)
  })

  const unexistedKeys = computed(() => checkedKeys.value.filter(key => !allCheckedKeySet.value.has(key)))

  const indeterminateKeySet = computed(() => {
    const { parentKeyMap } = mergedResolverContext.value
    const _checkedKeySet = allCheckedKeySet.value
    if (_checkedKeySet.size === 0 || cascaderStrategy.value === 'off') {
      return new Set<VKey>()
    }

    const keySet = new Set<VKey>()
    _checkedKeySet.forEach(key => {
      let parentKey = parentKeyMap.get(key)
      if (!isNil(parentKey) && !_checkedKeySet.has(parentKey)) {
        while (!isNil(parentKey)) {
          keySet.add(parentKey)
          parentKey = parentKeyMap.get(parentKey)
        }
      }
    })
    return keySet
  })

  const updateCachedSelectedData = () => {
    const { data } = mergedResolverContext.value
    const keySet = allCheckedKeySet.value
    cachedSelectedData.value = filterTree(data, childrenKey.value, item => keySet.has(getKey.value(item)), 'or')
  }
  watch([checkedKeys, cascaderStrategy], updateCachedSelectedData)
  watch(unexistedKeys, (keys, oldKeys) => {
    if (keys.length !== oldKeys.length) {
      updateCachedSelectedData()
    }
  })

  const isCheckDisabled = (key: VKey) => {
    return checkDisabledKeySet.value.has(key)
  }

  const isChecked = (key: VKey) => {
    return allCheckedKeySet.value.has(key)
  }

  const isIndeterminate = (key: VKey) => {
    return indeterminateKeySet.value.has(key)
  }

  const appendUnexistedDataKeys = (newCheckedKeys: VKey[]) => {
    return unexistedKeys.value ? [...newCheckedKeys, ...unexistedKeys.value] : newCheckedKeys
  }

  const toggle = (data: V) => {
    const currKey = getKey.value(data)
    if (isCheckDisabled(currKey)) {
      return {
        checked: isChecked(currKey),
        checkedKeys: checkedKeys.value,
      }
    }

    const children = cascaderStrategy.value !== 'off' ? data[childrenKey.value] ?? [] : []
    const checked =
      isChecked(currKey) ||
      (!!children.length &&
        children.every(child => {
          const childKey = getKey.value(child)

          return isChecked(childKey) || isIndeterminate(childKey) || isCheckDisabled(childKey)
        }))

    const _checkedKeys = checkStateResolver.appendKeys([], checkedKeys.value)
    const newCheckedKeys = checkStateResolver[checked ? 'removeKeys' : 'appendKeys'](_checkedKeys, [currKey])

    const disabledKeys = checked
      ? [...allCheckedKeySet.value].filter(key => isCheckDisabled(key))
      : (cascaderStrategy.value === 'parent'
          ? allCheckStateResolver.appendKeys([], newCheckedKeys)
          : newCheckedKeys
        ).filter(key => isCheckDisabled(key) && !allCheckedKeySet.value.has(key))

    const resolvedCheckedKeys = appendUnexistedDataKeys(
      checkStateResolver[checked ? 'appendKeys' : 'removeKeys'](newCheckedKeys, disabledKeys),
    )

    return {
      checked: !checked,
      checkedKeys: resolvedCheckedKeys,
    }
  }

  const resolveAllCheckedFnParams = (data?: V[] | VKey[], defaultKeysOrCached?: VKey[] | boolean, cached?: boolean) => {
    const dataProvided = ((data?: V[] | VKey[]): data is V[] => isArray(data) && isObject(data?.[0]))(data)
    const _defaultKeys = (dataProvided ? (isBoolean(defaultKeysOrCached) ? [] : defaultKeysOrCached) : data) ?? []
    const _cached = dataProvided ? (isBoolean(defaultKeysOrCached) ? defaultKeysOrCached : cached) : undefined
    const _data = dataProvided
      ? _cached
        ? mergeTree(data, cachedSelectedData.value, childrenKey.value, getKey.value)
        : data
      : []

    return {
      dataProvided,
      data: _data,
      defaultKeys: _defaultKeys,
      cached: _cached,
    }
  }

  const getAllCheckedKeys = (
    data?: V[] | VKey[],
    defaultUnCheckedKeysOrCached?: VKey[] | boolean,
    cached?: boolean,
  ) => {
    const params = resolveAllCheckedFnParams(data, defaultUnCheckedKeysOrCached, cached)

    const allCheckedKeys = params.dataProvided
      ? checkStateResolver.getAllCheckedKeys(params.data, params.defaultKeys)
      : checkStateResolver.getAllCheckedKeys(params.defaultKeys)

    return appendUnexistedDataKeys(allCheckedKeys)
  }

  const getAllUncheckedKeys = (
    data?: V[] | VKey[],
    defaultCheckedKeysOrCached?: VKey[] | boolean,
    cached?: boolean,
  ) => {
    const params = resolveAllCheckedFnParams(data, defaultCheckedKeysOrCached, cached)

    return params.dataProvided
      ? checkStateResolver.getAllUncheckedKeys(params.data, params.defaultKeys)
      : checkStateResolver.getAllCheckedKeys(params.defaultKeys)
  }

  return {
    allCheckedKeySet,
    checkDisabledKeySet,
    checkStateResolver,
    isChecked,
    isCheckDisabled,
    isIndeterminate,
    toggle,
    getAllCheckedKeys,
    getAllUncheckedKeys,
  }
}
