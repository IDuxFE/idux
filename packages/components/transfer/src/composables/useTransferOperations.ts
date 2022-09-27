/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferData, TransferProps } from '../types'
import type { TransferDataContext } from './useTransferData'
import type { TransferSelectStateContext } from './useTransferSelectState'

import { type ComputedRef, computed } from 'vue'

import { type VKey, callEmit } from '@idux/cdk/utils'

export interface TransferOperationsContext {
  appendDisabled: ComputedRef<boolean>
  removeDisabled: ComputedRef<boolean>
  appendAllDisabled: ComputedRef<boolean>
  clearDisabled: ComputedRef<boolean>
  triggerAppend: (keys?: VKey[]) => void
  triggerRemove: (keys?: VKey[]) => void
  triggerAppendAll: () => void
  triggerClear: () => void
}

export function useTransferOperations<T extends TransferData = TransferData>(
  props: TransferProps,
  transferDataContext: TransferDataContext<T>,
  transferSelectStateContext: TransferSelectStateContext,
): TransferOperationsContext {
  const {
    dataKeyMap,
    sourceData,
    targetData,
    disabledSourceKeys,
    disabledTargetKeys,
    changeTargetKeys,
    clear,
    getKey,
  } = transferDataContext
  const { sourceSelectedKeys, targetSelectedKeys } = transferSelectStateContext

  const appendDisabled = computed(() => props.disabled || sourceSelectedKeys.value.length <= 0)
  const removeDisabled = computed(() => props.disabled || targetSelectedKeys.value.length <= 0)
  const appendAllDisabled = computed(
    () => props.disabled || sourceData.value.every(item => disabledSourceKeys.value.has(getKey.value(item))),
  )
  const clearDisabled = computed(
    () => props.disabled || targetData.value.every(item => disabledTargetKeys.value.has(getKey.value(item))),
  )

  const triggerAppend = (keys?: VKey[]) => {
    if ((!keys && appendDisabled.value) || (keys && props.disabled)) {
      return
    }

    changeTargetKeys(
      [],
      (keys ?? Array.from(sourceSelectedKeys.value)).filter(key => !disabledSourceKeys.value.has(key)),
    )
  }

  const triggerRemove = (keys?: VKey[]) => {
    if ((!keys && removeDisabled.value) || (keys && props.disabled)) {
      return
    }

    changeTargetKeys(
      (keys ?? Array.from(targetSelectedKeys.value)).filter(key => !disabledTargetKeys.value.has(key)),
      [],
    )
  }

  const triggerAppendAll = () => {
    if (appendAllDisabled.value) {
      return
    }

    changeTargetKeys(
      [],
      Array.from(dataKeyMap.value.keys()).filter(key => !disabledSourceKeys.value.has(key)),
    )
  }

  const triggerClear = () => {
    if (clearDisabled.value) {
      return
    }

    clear()
    callEmit(props.onClear)
  }

  return {
    appendDisabled,
    removeDisabled,
    appendAllDisabled,
    clearDisabled,
    triggerAppend,
    triggerRemove,
    triggerAppendAll,
    triggerClear,
  }
}
