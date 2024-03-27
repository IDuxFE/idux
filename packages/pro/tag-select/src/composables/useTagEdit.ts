/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayStateContext } from './useOverlayState'
import type { MergedTagData } from './useTagData'

import { type ComputedRef, watch } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface TagEditContext {
  dataToEdit: ComputedRef<MergedTagData | undefined>
  setDataToEdit: (data: MergedTagData | undefined) => void
}

export function useTagEdit(overlayStateContext: OverlayStateContext): TagEditContext {
  const { editPanelOpened } = overlayStateContext
  const [dataToEdit, setDataToEdit] = useState<MergedTagData | undefined>(undefined)

  watch(editPanelOpened, opened => {
    if (!opened) {
      setDataToEdit(undefined)
    }
  })

  return {
    dataToEdit,
    setDataToEdit,
  }
}
