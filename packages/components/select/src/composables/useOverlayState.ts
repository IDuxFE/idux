/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, type ComputedRef, type Ref, computed, onMounted, ref, watchEffect } from 'vue'

import { convertCssPixel, useControlledProp, useState } from '@idux/cdk/utils'
import { type ɵOverlayInstance } from '@idux/components/_private/overlay'
import { type SelectorInstance } from '@idux/components/selector'

export interface OverlayStateContext {
  overlayRef: Ref<ɵOverlayInstance | undefined>
  overlayStyle: ComputedRef<CSSProperties>
  updateOverlay: (rect?: DOMRect) => void
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
}

export function useOverlayState(
  props: {
    open?: boolean
    autofocus?: boolean
    overlayMatchWidth?: boolean
  },
  config: { overlayMatchWidth: boolean },
  triggerRef: Ref<SelectorInstance | undefined>,
): OverlayStateContext {
  const overlayRef = ref<ɵOverlayInstance>()
  const [overlayWidth, setOverlayWidth] = useState('')
  const overlayStyle = computed(() => {
    const { overlayMatchWidth = config.overlayMatchWidth } = props
    return { [overlayMatchWidth ? 'width' : 'minWidth']: overlayWidth.value }
  })
  const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)

  const updateOverlay = (rect?: DOMRect) => {
    if (rect) {
      const { width } = rect
      if (width > 0) {
        setOverlayWidth(convertCssPixel(width))
        overlayOpened.value && overlayRef.value?.updatePopper()
      }
    } else {
      overlayOpened.value && overlayRef.value?.updatePopper()
    }
  }

  onMounted(() => {
    if (props.autofocus) {
      setOverlayOpened(true)
    }

    // see https://github.com/IDuxFE/idux/issues/488
    watchEffect(() => {
      const overlayInstance = overlayRef.value
      if (overlayInstance && overlayOpened.value) {
        updateOverlay(triggerRef.value!.getBoundingClientRect()!)
      }
    })
  })

  return { overlayRef, overlayStyle, updateOverlay, overlayOpened, setOverlayOpened }
}
