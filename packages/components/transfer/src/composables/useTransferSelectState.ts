/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferProps } from '../types'
import type { TransferDataContext } from './useTransferData'

import { type ComputedRef, computed, watch } from 'vue'

import { isArray } from 'lodash-es'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'

export interface TransferSelectStateContext {
  sourceSelectedKeys: ComputedRef<VKey[]>
  targetSelectedKeys: ComputedRef<VKey[]>
  sourceSelectedKeySet: ComputedRef<Set<VKey>>
  targetSelectedKeySet: ComputedRef<Set<VKey>>
  handleSourceSelectChange: (keys: VKey[] | Set<VKey>) => void
  handleTargetSelectChange: (keys: VKey[] | Set<VKey>) => void

  sourceSelectAllStatus: ComputedRef<{ checked: boolean; indeterminate: boolean }>
  targetSelectAllStatus: ComputedRef<{ checked: boolean; indeterminate: boolean }>
  handleSourceSelectAll: (selected?: boolean) => void
  handleTargetSelectAll: (selected?: boolean) => void

  sourceSelectAllDisabled: ComputedRef<boolean>
  targetSelectAllDisabled: ComputedRef<boolean>

  setSourceSelectedKeys: (keys: VKey[]) => void
  setTargetSelectedKeys: (keys: VKey[]) => void
}

export function useTransferSelectState(
  props: TransferProps,
  transferDataContext: TransferDataContext,
): TransferSelectStateContext {
  const [sourceSelectedKeys, setSourceSelectedKeys] = useControlledProp(props, 'sourceSelectedKeys', () => [])
  const [targetSelectedKeys, setTargetSelectedKeys] = useControlledProp(props, 'targetSelectedKeys', () => [])

  const sourceSelectedKeySet = computed(() => new Set(sourceSelectedKeys.value))
  const targetSelectedKeySet = computed(() => new Set(targetSelectedKeys.value))

  const { dataKeyMap, sourceDataKeys, targetDataKeys, disabledKeys, disabledSourceKeys, disabledTargetKeys } =
    transferDataContext

  const sourceDataCount = computed(() =>
    props.mode === 'immediate' ? dataKeyMap.value.size : sourceDataKeys.value.size,
  )
  const targetDataCount = computed(() => targetDataKeys.value.size)
  const sourceCheckableDataCount = computed(() => {
    const disabledCount = props.mode === 'immediate' ? disabledKeys.value.size : disabledSourceKeys.value.size

    return sourceDataCount.value - disabledCount
  })
  const targetCheckableDataCount = computed(() => targetDataKeys.value.size - disabledTargetKeys.value.size)

  const sourceSelectAllStatus = computed(() => {
    return {
      checked: sourceDataCount.value >= sourceSelectedKeys.value.length && sourceSelectedKeys.value.length > 0,
      indeterminate: sourceDataCount.value > sourceSelectedKeys.value.length && sourceSelectedKeys.value.length > 0,
    }
  })
  const targetSelectAllStatus = computed(() => {
    return {
      checked: targetDataCount.value >= targetSelectedKeys.value.length && targetSelectedKeys.value.length > 0,
      indeterminate: targetDataCount.value > targetSelectedKeys.value.length && targetSelectedKeys.value.length > 0,
    }
  })

  watch(
    [sourceCheckableDataCount, dataKeyMap, disabledKeys, targetDataKeys],
    (_, [, , , prevSelectedKeys]) => {
      const tempKeys = new Set(sourceSelectedKeys.value)

      sourceSelectedKeys.value.forEach(key => {
        if (!dataKeyMap.value.has(key) || disabledKeys.value.has(key)) {
          tempKeys.delete(key)
          return
        }

        if (props.mode === 'default' && targetDataKeys.value.has(key)) {
          tempKeys.delete(key)
        }
      })

      if (props.mode === 'immediate') {
        targetDataKeys.value.forEach(key => {
          if (dataKeyMap.value.has(key)) {
            tempKeys.add(key)
          }
        })
        prevSelectedKeys?.forEach(key => {
          if (!targetDataKeys.value.has(key)) {
            tempKeys.delete(key)
          }
        })
      }

      setSourceSelectedKeys(Array.from(tempKeys))
    },
    { immediate: true },
  )
  watch(
    [targetCheckableDataCount, targetDataKeys, disabledTargetKeys],
    () => {
      const tempKeys = new Set(targetSelectedKeys.value)

      targetSelectedKeys.value.forEach(key => {
        if (!targetDataKeys.value.has(key) || disabledTargetKeys.value.has(key)) {
          tempKeys.delete(key)
        }
      })

      setTargetSelectedKeys(Array.from(tempKeys))
    },
    { immediate: true },
  )

  const handleSourceSelectChange = (keys: VKey[] | Set<VKey>) => {
    if (props.disabled) {
      return
    }

    const currentSelectedKeys = new Set<VKey>(keys)

    if (props.mode === 'immediate') {
      transferBySelectionChange(sourceSelectedKeySet.value, currentSelectedKeys, transferDataContext)
    }

    setSourceSelectedKeys(isArray(keys) ? keys : Array.from(keys))
  }
  const handleTargetSelectChange = (keys: VKey[] | Set<VKey>) => {
    if (props.disabled) {
      return
    }

    setTargetSelectedKeys(isArray(keys) ? keys : Array.from(keys))
  }
  const handleSelectAll = (selected = true, isSource = true) => {
    if (props.disabled) {
      return
    }

    const dataKeys = isSource
      ? props.mode === 'default'
        ? sourceDataKeys.value
        : new Set(dataKeyMap.value.keys())
      : targetDataKeys.value
    const _disabledKeys = isSource
      ? props.mode === 'default'
        ? disabledSourceKeys.value
        : disabledKeys.value
      : disabledTargetKeys.value
    const selectedKeySet = isSource ? sourceSelectedKeySet : targetSelectedKeySet
    const setSelectedKeys = isSource ? setSourceSelectedKeys : setTargetSelectedKeys

    let tempKeys: Set<VKey>
    if (!selected) {
      tempKeys = new Set()
      _disabledKeys.forEach(key => {
        selectedKeySet.value.has(key) && tempKeys.add(key)
      })
    } else {
      tempKeys = new Set(dataKeys)
      _disabledKeys.forEach(key => {
        !selectedKeySet.value.has(key) && tempKeys.delete(key)
      })
    }

    if (props.mode === 'immediate' && isSource) {
      transferBySelectionChange(sourceSelectedKeySet.value, tempKeys, transferDataContext)
    }

    setSelectedKeys(Array.from(tempKeys))
    callEmit(props.onSelectAll, isSource, selected)
  }

  const sourceSelectAllDisabled = computed(() => props.disabled || sourceCheckableDataCount.value <= 0)
  const targetSelectAllDisabled = computed(() => props.disabled || targetCheckableDataCount.value <= 0)

  return {
    sourceSelectedKeys,
    targetSelectedKeys,
    sourceSelectedKeySet,
    targetSelectedKeySet,
    handleSourceSelectChange,
    handleTargetSelectChange,

    sourceSelectAllStatus,
    targetSelectAllStatus,
    handleSourceSelectAll: (selected?: boolean) => handleSelectAll(selected, true),
    handleTargetSelectAll: (selected?: boolean) => handleSelectAll(selected, false),

    sourceSelectAllDisabled,
    targetSelectAllDisabled,

    setSourceSelectedKeys,
    setTargetSelectedKeys,
  }
}

function transferBySelectionChange(
  originalCheckedKeys: Set<VKey>,
  currentCheckedKeys: Set<VKey>,
  transferDataContext: TransferDataContext,
) {
  const { append, remove } = transferDataContext
  const appendedKeys: VKey[] = []
  const removedKeys: VKey[] = []

  for (const key of originalCheckedKeys.values()) {
    if (!currentCheckedKeys.has(key)) {
      removedKeys.push(key)
    }
  }

  for (const key of currentCheckedKeys.values()) {
    if (!originalCheckedKeys.has(key)) {
      appendedKeys.push(key)
    }
  }

  if (appendedKeys.length > 0) {
    append(appendedKeys)
  }

  if (removedKeys.length > 0) {
    remove(removedKeys)
  }
}
