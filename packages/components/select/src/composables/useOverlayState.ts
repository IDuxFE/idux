/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, type ComputedRef, type Ref, computed, onMounted, ref } from 'vue'

import { convertCssPixel, useControlledProp, useState } from '@idux/cdk/utils'
import { type ɵOverlayInstance } from '@idux/components/_private/overlay'

export interface OverlayStateContext {
  overlayRef: Ref<ɵOverlayInstance | undefined>
  overlayStyle: ComputedRef<CSSProperties>
  updateOverlay: (rect: DOMRect) => void
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
}

export function useOverlayState(props: { open?: boolean; autofocus?: boolean }): OverlayStateContext {
  const overlayRef = ref<ɵOverlayInstance>()
  const [overlayWidth, setOverlayWidth] = useState('')
  const overlayStyle = computed(() => ({ width: overlayWidth.value }))
  const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)

  const updateOverlay = (rect: DOMRect) => {
    setOverlayWidth(convertCssPixel(rect.width))
    overlayOpened.value && overlayRef.value?.updatePopper()
  }

  onMounted(() => {
    if (props.autofocus) {
      setOverlayOpened(true)
    }
  })

  return { overlayRef, overlayStyle, updateOverlay, overlayOpened, setOverlayOpened }
}
