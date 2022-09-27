/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TreeTransferData } from '../types'
import type { GetKeyFn } from '@idux/components/utils'

import { type ComputedRef, computed, watch } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'

import { traverseTree } from '../utils'

export interface TreeExpandedKeysContext {
  sourceExpandedKeys: ComputedRef<VKey[]>
  targetExpandedKeys: ComputedRef<VKey[]>
  handleSourceExpandedChange: (keys: VKey[]) => void
  handleTargetExpandedChange: (keys: VKey[]) => void
}

export function useTreeExpandedKeys<C extends VKey>(
  props: ProTransferProps,
  childrenKey: ComputedRef<C>,
  getKey: ComputedRef<GetKeyFn>,
  targetKeys: ComputedRef<VKey[] | undefined>,
  parentKeyMap: Map<VKey, VKey | undefined>,
  dataKeyMap: Map<VKey, TreeTransferData<C>>,
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

  watch(targetKeys, (keys, oldKeys) => {
    const newKeys = keys?.filter(key => oldKeys && oldKeys.findIndex(oldKey => oldKey === key) < 0)
    const deletedKeys = oldKeys?.filter(oldkey => keys && keys.findIndex(key => key === oldkey) < 0)

    const newTargetExpandedKeySet = new Set<VKey>(targetExpandedKeySet.value)
    const newSourceExpandedKeySet = new Set<VKey>(sourceExpandedKeySet.value)

    deletedKeys?.forEach(key => {
      syncSelectedExpandedState(key, newTargetExpandedKeySet, newSourceExpandedKeySet, true)
    })
    newKeys?.forEach(key => {
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
