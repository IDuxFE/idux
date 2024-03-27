/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayStateContext } from './useOverlayState'
import type { SelectedStateContext } from './useSelectedState'
import type { MergedTagData, TagDataContext } from './useTagData'
import type { ComputedRef } from 'vue'

import { useState } from '@idux/cdk/utils'

import { type Deferred, createDeferred } from '../utils'

export interface RemoveConfirmContext {
  dataToRemove: ComputedRef<MergedTagData | undefined>
  modalVisible: ComputedRef<boolean>
  handleTagDataRemove: (data: MergedTagData) => Promise<boolean>
  handleModalOk: () => void
  handleModalCancel: () => void
  handleModalAfterClose: () => void
}

export function useRemoveConfirm(
  tagDataContext: TagDataContext,
  selectedStateContext: SelectedStateContext,
  overlayStateContext: OverlayStateContext,
): RemoveConfirmContext {
  const [dataToRemove, setDataToRemove] = useState<MergedTagData | undefined>(undefined)
  const [modalVisible, setModalVisible] = useState(false)

  const { removeData } = tagDataContext
  const { handleRemove } = selectedStateContext
  const { setLocked } = overlayStateContext

  let removeConfirmDeferred: Deferred<boolean>

  const handleTagDataRemove = (data: MergedTagData) => {
    if (dataToRemove.value) {
      return Promise.resolve(false)
    }

    setLocked(true)
    setDataToRemove(data)
    setModalVisible(true)

    removeConfirmDeferred = createDeferred<boolean>()

    return removeConfirmDeferred.wait()
  }

  const handleModalOk = () => {
    setModalVisible(false)

    if (dataToRemove.value) {
      removeData(dataToRemove.value)
      handleRemove(dataToRemove.value.key)
    }
    setDataToRemove(undefined)

    removeConfirmDeferred.resolve(true)
  }

  const handleModalCancel = () => {
    setModalVisible(false)
    setDataToRemove(undefined)

    removeConfirmDeferred.resolve(false)
  }

  const handleModalAfterClose = () => {
    setLocked(false)
  }

  return {
    dataToRemove,
    modalVisible,
    handleTagDataRemove,
    handleModalOk,
    handleModalCancel,
    handleModalAfterClose,
  }
}
