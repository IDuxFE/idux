/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps } from '../types'

import { type ComputedRef, computed, watch } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'

export interface TreeExpandedKeysContext {
  sourceExpandedKeys: ComputedRef<VKey[]>
  targetExpandedKeys: ComputedRef<VKey[]>
  handleSourceExpandedChange: (keys: VKey[]) => void
  handleTargetExpandedChange: (keys: VKey[]) => void
}

export function useTreeExpandedKeys(
  props: ProTransferProps,
  targetKeys: ComputedRef<VKey[] | undefined>,
  parentKeyMap: Map<VKey, VKey | undefined>,
): TreeExpandedKeysContext {
  const [sourceExpandedKeys, setSourceExpandedKeys] = useControlledProp(props, 'sourceExpandedKeys', () => [])
  const [targetExpandedKeys, setTargetExpandedKeys] = useControlledProp(props, 'targetExpandedKeys', () => [])

  const sourceExpandedKeySet = computed(() => new Set(sourceExpandedKeys.value))
  const targetExpandedKeySet = computed(() => new Set(targetExpandedKeys.value))

  const syncSelectedExpandedState = (key: VKey, expandedKeysSource: Set<VKey>, expandedKeysTarget: Set<VKey>) => {
    let currentKey: VKey | undefined = key
    while (currentKey) {
      if (expandedKeysSource.has(currentKey) && !expandedKeysTarget.has(currentKey)) {
        expandedKeysTarget.add(currentKey)
      }
      currentKey = parentKeyMap.get(currentKey)
    }
  }

  watch(targetKeys, (keys, oldKeys) => {
    const newKeys = keys?.filter(key => oldKeys && oldKeys.findIndex(oldKey => oldKey === key) < 0)
    const deletedKeys = oldKeys?.filter(oldkey => keys && keys.findIndex(key => key === oldkey) < 0)

    const newTargetExpandedKeySet = new Set<VKey>(targetExpandedKeySet.value)
    const newSourceExpandedKeySet = new Set<VKey>(sourceExpandedKeySet.value)
    newKeys?.forEach(key => {
      syncSelectedExpandedState(key, sourceExpandedKeySet.value, newTargetExpandedKeySet)
    })
    deletedKeys?.forEach(key => {
      syncSelectedExpandedState(key, targetExpandedKeySet.value, newSourceExpandedKeySet)
    })

    newTargetExpandedKeySet.size !== targetExpandedKeySet.value.size &&
      setTargetExpandedKeys(Array.from(newTargetExpandedKeySet))
    newSourceExpandedKeySet.size !== sourceExpandedKeySet.value.size &&
      setSourceExpandedKeys(Array.from(newSourceExpandedKeySet))
  })

  return {
    sourceExpandedKeys,
    targetExpandedKeys,
    handleSourceExpandedChange: setSourceExpandedKeys,
    handleTargetExpandedChange: setTargetExpandedKeys,
  }
}
