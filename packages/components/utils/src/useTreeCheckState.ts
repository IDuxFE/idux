/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CascaderStrategy } from '@idux/components/cascader'

import { type ComputedRef, type Ref, computed } from 'vue'

import { isNil } from 'lodash-es'

import { type TreeTypeData, type VKey } from '@idux/cdk/utils'
import {
  GetKeyFn,
  type TreeCheckStateResolver,
  type TreeCheckStateResolverContext,
  useTreeCheckStateResolver,
} from '@idux/components/utils'

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
}

export function useTreeCheckState<V extends TreeTypeData<V, C>, C extends keyof V>(
  checkedKeys: Ref<VKey[]>,
  resolverContext: Ref<TreeCheckStateResolverContext<V, C>>,
  childrenKey: Ref<C>,
  getKey: Ref<GetKeyFn>,
  cascaderStrategy: Ref<CascaderStrategy>,
  isDisabled: Ref<((data: V) => boolean) | undefined>,
): TreeCheckStateContext<V, C> {
  const checkStateResolver = useTreeCheckStateResolver(resolverContext, childrenKey, getKey, cascaderStrategy)
  const allCheckStateResolver = useTreeCheckStateResolver(
    resolverContext,
    childrenKey,
    getKey,
    computed(() => 'all'),
  )

  const checkDisabledKeySet = computed(() => {
    const { dataMap } = resolverContext.value
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

  const indeterminateKeySet = computed(() => {
    const { parentKeyMap } = resolverContext.value
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

  const isCheckDisabled = (key: VKey) => {
    return checkDisabledKeySet.value.has(key)
  }

  const isChecked = (key: VKey) => {
    return allCheckedKeySet.value.has(key)
  }

  const isIndeterminate = (key: VKey) => {
    return indeterminateKeySet.value.has(key)
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

    const resolvedCheckedKeys = checkStateResolver[checked ? 'appendKeys' : 'removeKeys'](newCheckedKeys, disabledKeys)

    return {
      checked: !checked,
      checkedKeys: resolvedCheckedKeys,
    }
  }

  return {
    allCheckedKeySet,
    checkDisabledKeySet,
    checkStateResolver,
    isChecked,
    isCheckDisabled,
    isIndeterminate,
    toggle,
  }
}
