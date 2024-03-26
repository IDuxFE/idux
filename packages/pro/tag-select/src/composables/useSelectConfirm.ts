/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayStateContext } from './useOverlayState'
import type { SelectedStateContext } from './useSelectedState'
import type { MergedTagData, TagDataContext } from './useTagData'
import type { ProTagSelectProps } from '../types'

import { type ComputedRef, watch } from 'vue'

import { callEmit, useState } from '@idux/cdk/utils'

import { type Deferred, createDeferred } from '../utils'

export interface SelectConfirmContext {
  dataToSelect: ComputedRef<MergedTagData | undefined>
  handleTagSelect: (data: MergedTagData) => Promise<boolean>
  handleTagSelectOk: () => void
  handleTagSelectCancel: () => void
}

export function useSelectConfirm(
  props: ProTagSelectProps,
  tagDataContext: TagDataContext,
  selectedStateContext: SelectedStateContext,
  overlayStateContext: OverlayStateContext,
): SelectConfirmContext {
  const { setInputValue } = tagDataContext
  const { isSelected, changeSelected } = selectedStateContext
  const { overlayOpened, setOverlayOpened, setSelectConfirmPanelOpened, setLocked } = overlayStateContext

  const [dataToSelect, setDataToSelect] = useState<MergedTagData | undefined>(undefined)
  let tagSelectDeferred: Deferred<boolean>
  let isSettingDataToSelect = false

  const handleTagSelect = (data: MergedTagData) => {
    const key = data.key
    if (isSelected(key) || !data) {
      return Promise.resolve(false)
    }

    callEmit(props.onTagSelect, data)

    if (!props.confirmBeforeSelect) {
      changeSelected(key)
      return Promise.resolve(true)
    }

    setInputValue(undefined)
    isSettingDataToSelect = true
    setTimeout(() => {
      isSettingDataToSelect = false
    })

    setDataToSelect(data)
    setSelectConfirmPanelOpened(true)
    setOverlayOpened(false)

    if (props.confirmBeforeSelect === 'force') {
      setLocked(true)
    }

    tagSelectDeferred = createDeferred<boolean>()

    return tagSelectDeferred.wait()
  }

  const handleTagSelectOk = () => {
    setLocked(false)
    setSelectConfirmPanelOpened(false)

    if (dataToSelect.value) {
      changeSelected(dataToSelect.value.key)
    }

    callEmit(props.onTagSelectConfirm, dataToSelect.value!)
    setDataToSelect(undefined)

    tagSelectDeferred.resolve(true)
  }

  const handleTagSelectCancel = () => {
    setLocked(false)
    setSelectConfirmPanelOpened(false)

    callEmit(props.onTagSelectCancel, dataToSelect.value!)
    setDataToSelect(undefined)

    tagSelectDeferred.resolve(false)
  }

  watch(overlayOpened, (opened, preOpened) => {
    if (!isSettingDataToSelect && opened !== preOpened && props.confirmBeforeSelect !== 'force' && dataToSelect.value) {
      handleTagSelectCancel()
    }
  })

  return {
    dataToSelect,
    handleTagSelect,
    handleTagSelectOk,
    handleTagSelectCancel,
  }
}
