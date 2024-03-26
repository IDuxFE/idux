/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OperationsContext } from './useOperations'
import type { OverlayStateContext } from './useOverlayState'
import type { SelectConfirmContext } from './useSelectConfirm'
import type { SelectedStateContext } from './useSelectedState'
import type { TagDataContext } from './useTagData'
import type { ProTagSelectProps } from '../types'

import { isNil } from 'lodash-es'

import { type PanelActiveStateContext, creationDataKey } from './usePanelActiveState'

export function useKeyboardEvents(
  props: ProTagSelectProps,
  tagDataContext: TagDataContext,
  selectedStateContext: SelectedStateContext,
  selectConfirmContext: SelectConfirmContext,
  overlayStateContext: OverlayStateContext,
  panelActiveStateContext: PanelActiveStateContext,
  operationsContext: OperationsContext,
): (evt: KeyboardEvent) => void {
  const { inputValue, getTagDataByKey } = tagDataContext
  const { selectedValue } = selectedStateContext
  const { overlayOpened, setOverlayOpened } = overlayStateContext
  const { activeValue, changeActiveIndex } = panelActiveStateContext
  const { handleTagSelect, handleTagRemove, handleTagCreate } = operationsContext
  const { dataToSelect, handleTagSelectCancel } = selectConfirmContext

  return (evt: KeyboardEvent) => {
    switch (evt.code) {
      case 'ArrowUp':
        evt.preventDefault()
        changeActiveIndex(-1)
        break
      case 'ArrowDown':
        evt.preventDefault()
        changeActiveIndex(1)
        break
      case 'Enter': {
        evt.preventDefault()
        const key = activeValue.value

        if (inputValue.value || overlayOpened.value) {
          if (key === creationDataKey) {
            handleTagCreate()
          } else if (!isNil(key)) {
            handleTagSelect(getTagDataByKey(key)!)
          }
        }

        break
      }
      case 'Backspace': {
        const selectedLength = selectedValue.value?.length

        if (dataToSelect.value) {
          if (props.confirmBeforeSelect !== 'force') {
            handleTagSelectCancel()
          }

          break
        }

        if (!inputValue.value && selectedLength) {
          handleTagRemove(selectedValue.value[selectedLength - 1])
        }
        break
      }
      case 'Escape': {
        evt.preventDefault()
        setOverlayOpened(false)

        if (dataToSelect.value && props.confirmBeforeSelect !== 'force') {
          handleTagSelectCancel()
        }

        break
      }
    }
  }
}
