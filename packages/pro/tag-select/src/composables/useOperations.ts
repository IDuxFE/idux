/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RemoveConfirmContext } from './useRemoveConfirm'
import type { SelectConfirmContext } from './useSelectConfirm'
import type { SelectedStateContext } from './useSelectedState'
import type { MergedTagData, TagDataContext } from './useTagData'
import type { TagSelectData } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

export interface OperationsContext {
  dataToSelect: ComputedRef<MergedTagData | undefined>
  dataToRemove: ComputedRef<MergedTagData | undefined>
  modalVisible: ComputedRef<boolean>
  handleTagSelect: (data: MergedTagData) => void
  handleTagSelectOk: () => void
  handleTagSelectCancel: () => void
  handleTagCreate: () => Promise<void>
  handleTagRemove: (key: VKey) => void
  handleTagClear: (evt: MouseEvent) => void
  handleTagDataLabelInput: (label: string, data: TagSelectData) => void
  handleTagDataColorChange: (color: VKey, data: TagSelectData) => void
  handleTagDataRemove: (data: MergedTagData) => void
  handleTagDataRemoveOk: () => void
  handleTagDataRemoveCancel: () => void
  handleTagDataRemoveModalAfterClose: () => void
}

export function useOperations(
  tagDataContext: TagDataContext,
  selectConfirmContext: SelectConfirmContext,
  removeConfirmContext: RemoveConfirmContext,
  selectedStateContext: SelectedStateContext,
): OperationsContext {
  const { inputValue, createData, addData, modifyData } = tagDataContext
  const {
    dataToSelect,
    handleTagSelect: _handleTagSelect,
    handleTagSelectCancel,
    handleTagSelectOk,
  } = selectConfirmContext
  const { modalVisible, dataToRemove, handleTagDataRemove, handleModalOk, handleModalCancel, handleModalAfterClose } =
    removeConfirmContext
  const { handleRemove, handleClear } = selectedStateContext

  const handleTagSelect = (data: MergedTagData) => {
    _handleTagSelect(data)
  }

  const handleTagCreate = async () => {
    if (!inputValue.value) {
      return
    }

    const data = createData(inputValue.value)

    const success = await _handleTagSelect(data)

    if (success) {
      addData(data)
    }
  }

  const handleTagDataLabelInput = (label: string, data: TagSelectData) => {
    modifyData({ ...data, label })
  }

  const handleTagDataColorChange = (color: VKey, data: TagSelectData) => {
    modifyData({ ...data, color })
  }

  return {
    dataToSelect,
    dataToRemove,
    modalVisible,
    handleTagSelect,
    handleTagSelectOk,
    handleTagSelectCancel,
    handleTagCreate,
    handleTagRemove: handleRemove,
    handleTagClear: handleClear,
    handleTagDataLabelInput,
    handleTagDataColorChange,
    handleTagDataRemove,
    handleTagDataRemoveOk: handleModalOk,
    handleTagDataRemoveCancel: handleModalCancel,
    handleTagDataRemoveModalAfterClose: handleModalAfterClose,
  }
}
