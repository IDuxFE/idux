/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTagSelectProps } from '../types'

import { type ComputedRef, watch } from 'vue'

import { useControlledProp, useState } from '@idux/cdk/utils'

export interface OverlayStateContext {
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (opened: boolean) => void
  editPanelOpened: ComputedRef<boolean>
  setEditPanelOpened: (opened: boolean) => void
  selectConfirmPanelOpened: ComputedRef<boolean>
  setSelectConfirmPanelOpened: (opened: boolean) => void
  locked: ComputedRef<boolean>
  setLocked: (locked: boolean) => void
}

export function useOverlayState(props: ProTagSelectProps): OverlayStateContext {
  const [overlayOpened, _setOverlayOpened] = useControlledProp(props, 'open', false)
  const [editPanelOpened, _setEditPanelOpened] = useState(false)
  const [selectConfirmPanelOpened, _setSelectConfirmPanelOpened] = useState(false)

  const [locked, setLocked] = useState(false)

  const setOverlayOpened = (opened: boolean) => {
    if (locked.value) {
      return
    }

    _setOverlayOpened(opened)
  }
  const setEditPanelOpened = (opened: boolean) => {
    if (locked.value) {
      return
    }

    _setEditPanelOpened(opened)
  }
  const setSelectConfirmPanelOpened = (opened: boolean) => {
    if (locked.value) {
      return
    }

    _setSelectConfirmPanelOpened(opened)
  }

  watch(overlayOpened, (opened, oldOpened) => {
    if (!opened && oldOpened) {
      setEditPanelOpened(false)
    } else if (opened && !oldOpened) {
      setEditPanelOpened(false)
      setSelectConfirmPanelOpened(false)
    }
  })

  return {
    overlayOpened,
    setOverlayOpened,
    editPanelOpened,
    setEditPanelOpened,
    selectConfirmPanelOpened,
    setSelectConfirmPanelOpened,
    locked,
    setLocked,
  }
}
