/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TreeTransferData } from '../types'
import type { GetKeyFn } from '@idux/components/utils'

import { type ComputedRef, computed, watch } from 'vue'

import { type VKey, traverseTree, useControlledProp } from '@idux/cdk/utils'

export interface TreeExpandedKeysContext {
  sourceExpandedKeys: ComputedRef<VKey[]>
  targetExpandedKeys: ComputedRef<VKey[]>
  handleSourceExpandedChange: (keys: VKey[]) => void
  handleTargetExpandedChange: (keys: VKey[]) => void
}

export function useTreeExpandedKeys<V extends TreeTransferData<V, C>, C extends string>(
  props: ProTransferProps,
  childrenKey: ComputedRef<C>,
  getKey: ComputedRef<GetKeyFn>,
  targetKeySet: ComputedRef<Set<VKey>>,
  parentKeyMap: Map<VKey, VKey | undefined>,
  dataKeyMap: Map<VKey, TreeTransferData<V, C>>,
): TreeExpandedKeysContext {
  const [sourceExpandedKeys, setSourceExpandedKeys] = useControlledProp(props, 'sourceExpandedKeys', () => [])
  const [targetExpandedKeys, setTargetExpandedKeys] = useControlledProp(props, 'targetExpandedKeys', () => [])

  const sourceExpandedKeySet = computed(() => new Set(sourceExpandedKeys.value))
  const targetExpandedKeySet = computed(() => new Set(targetExpandedKeys.value))

  const syncSelectedExpandedState = (
    key: VKey,
    expandedKeysSource: Set<VKey>,
    expandedKeysTarget: Set<VKey>,
    remove = false,
  ) => {
    const processExpandedKey = (key: VKey) => {
      if (expandedKeysSource.has(key)) {
        !expandedKeysTarget.has(key) && expandedKeysTarget.add(key)
      }
    }

    let currentKey: VKey | undefined = key
    while (currentKey) {
      processExpandedKey(currentKey)
      currentKey = parentKeyMap.get(currentKey)
    }

    const children = dataKeyMap.get(key)?.[childrenKey.value]
    if (children) {
      traverseTree(children, childrenKey.value, item => {
        processExpandedKey(getKey.value(item))
      })
    }

    remove && expandedKeysSource.delete(key)
  }

  watch(targetKeySet, (keys, oldKeys) => {
    const newKeySet = new Set<VKey>()
    keys.forEach(key => {
      if (!oldKeys.has(key)) {
        newKeySet.add(key)
      }

      oldKeys.delete(key)
    })

    const deletedKeySet = oldKeys

    const newTargetExpandedKeySet = new Set<VKey>(targetExpandedKeySet.value)
    const newSourceExpandedKeySet = new Set<VKey>(sourceExpandedKeySet.value)

    deletedKeySet?.forEach(key => {
      syncSelectedExpandedState(key, newTargetExpandedKeySet, newSourceExpandedKeySet, true)
    })
    newKeySet?.forEach(key => {
      syncSelectedExpandedState(key, newSourceExpandedKeySet, newTargetExpandedKeySet, props.mode !== 'immediate')
    })

    setTargetExpandedKeys(Array.from(newTargetExpandedKeySet))
    setSourceExpandedKeys(Array.from(newSourceExpandedKeySet))
  })

  return {
    sourceExpandedKeys,
    targetExpandedKeys,
    handleSourceExpandedChange: setSourceExpandedKeys,
    handleTargetExpandedChange: setTargetExpandedKeys,
  }
}
