/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferDataContext } from './useTransferData'
import type { TransferDataStrategy, TransferProps } from '../types'

import { type ComputedRef, computed, nextTick, watch } from 'vue'

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
  transferDataStrategy: ComputedRef<TransferDataStrategy>,
): TransferSelectStateContext {
  const [sourceSelectedKeys, setSourceSelectedKeys] = useControlledProp(props, 'sourceSelectedKeys', () => [])
  const [targetSelectedKeys, setTargetSelectedKeys] = useControlledProp(props, 'targetSelectedKeys', () => [])

  const sourceSelectedKeySet = computed(() => new Set(sourceSelectedKeys.value))
  const targetSelectedKeySet = computed(() => new Set(targetSelectedKeys.value))

  const {
    dataKeyMap,
    dataSource,
    sourceData,
    targetData,
    sourceDataKeys,
    targetDataKeys,
    targetKeySet,
    disabledKeys,
    disabledSourceKeys,
    disabledTargetKeys,
    getKey,
  } = transferDataContext

  const sourceCheckableDataCount = computed(() => {
    const sourceDataCount = props.mode === 'immediate' ? dataKeyMap.value.size : sourceDataKeys.value.size
    const disabledCount = props.mode === 'immediate' ? disabledKeys.value.size : disabledSourceKeys.value.size

    return sourceDataCount - disabledCount
  })
  const targetCheckableDataCount = computed(() => targetDataKeys.value.size - disabledTargetKeys.value.size)

  const getAllSelectedStatus = (isSource: boolean) => {
    const allSelectedKeys = transferDataStrategy.value.getAllSelectedKeys(
      true,
      isSource ? (props.mode === 'immediate' ? dataSource.value : sourceData.value) : targetData.value,
      new Set(),
      new Set(),
      getKey.value,
    )
    const selectedkeyCount = (isSource ? sourceSelectedKeys : targetSelectedKeys).value.length
    const selectedKeySet = isSource ? sourceSelectedKeySet.value : targetSelectedKeySet.value

    return {
      checked: selectedkeyCount > 0,
      indeterminate:
        (allSelectedKeys.length !== selectedkeyCount || allSelectedKeys.some(key => !selectedKeySet.has(key))) &&
        selectedkeyCount > 0,
    }
  }

  const sourceSelectAllStatus = computed(() => getAllSelectedStatus(true))
  const targetSelectAllStatus = computed(() => getAllSelectedStatus(false))

  let transferBySelectionChangeLocked = false
  watch(sourceSelectedKeySet, (currentCheckedKeys, originalCheckedKeys) => {
    if (props.mode === 'immediate') {
      if (transferBySelectionChangeLocked) {
        return
      }

      transferBySelectionChange(originalCheckedKeys, currentCheckedKeys, transferDataContext)
    }
  })
  watch(
    [sourceCheckableDataCount, dataKeyMap, disabledKeys, targetKeySet],
    (_, [, , , prevSelectedKeys]) => {
      const tempKeys = new Set(sourceSelectedKeys.value)
      const deletedKeys = new Set<VKey>()
      const addedKeys = new Set<VKey>()

      const addKey = (key: VKey) => {
        if (!tempKeys.has(key)) {
          tempKeys.add(key)
          addedKeys.add(key)
          deletedKeys.delete(key)
        }
      }
      const deleteKey = (key: VKey) => {
        if (tempKeys.has(key)) {
          tempKeys.delete(key)
          deletedKeys.add(key)
          addedKeys.delete(key)
        }
      }

      sourceSelectedKeys.value.forEach(key => {
        if (!dataKeyMap.value.has(key) || disabledKeys.value.has(key)) {
          deleteKey(key)
          return
        }

        if (props.mode === 'default' && targetKeySet.value.has(key)) {
          deleteKey(key)
        }
      })

      if (props.mode === 'immediate') {
        targetKeySet.value.forEach(key => {
          if (dataKeyMap.value.has(key)) {
            addKey(key)
          }
        })
        prevSelectedKeys?.forEach(key => {
          if (!targetKeySet.value.has(key)) {
            deleteKey(key)
          }
        })
      }

      if (addedKeys.size > 0 || deletedKeys.size > 0) {
        setSourceSelectedKeys(Array.from(tempKeys))

        // this operation simply syncs selected state by targetKeys
        // so it shouldn't trigger transfer
        // lock it for the current tick
        transferBySelectionChangeLocked = true
        nextTick(() => {
          transferBySelectionChangeLocked = false
        })
      }
    },
    { immediate: true, flush: 'post' },
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
    { immediate: true, flush: 'post' },
  )

  const handleSourceSelectChange = (keys: VKey[] | Set<VKey>) => {
    if (props.disabled) {
      return
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

    const data = isSource ? (props.mode === 'default' ? sourceData.value : dataSource.value) : targetData.value
    const _disabledKeys = isSource ? (props.mode === 'default' ? disabledSourceKeys : disabledKeys) : disabledTargetKeys
    const selectedKeySet = isSource ? sourceSelectedKeySet : targetSelectedKeySet
    const setSelectedKeys = isSource ? setSourceSelectedKeys : setTargetSelectedKeys

    setSelectedKeys(
      transferDataStrategy.value.getAllSelectedKeys(
        selected,
        data,
        selectedKeySet.value,
        _disabledKeys.value,
        getKey.value,
      ),
    )
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
  const { changeTargetKeys } = transferDataContext
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

  changeTargetKeys(removedKeys, appendedKeys)
}
