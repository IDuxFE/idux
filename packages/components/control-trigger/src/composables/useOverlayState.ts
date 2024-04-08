/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ControlTriggerOverlayInstance } from '../types'

import { type CSSProperties, type ComputedRef, type Ref, computed, onMounted, ref, watch, watchEffect } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { convertCssPixel, convertElement, useControlledProp, useState } from '@idux/cdk/utils'
import { type ɵTriggerInstance } from '@idux/components/_private/trigger'

export interface OverlayStateContext {
  overlayRef: Ref<ControlTriggerOverlayInstance | undefined>
  overlayStyle: ComputedRef<CSSProperties | undefined>
  overlayMatchWidth: ComputedRef<boolean | 'minWidth'>
  updateOverlay: (rect?: DOMRect) => void
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
}

export function useOverlayState(
  props: {
    open?: boolean
    autofocus?: boolean
    overlayMatchWidth?: boolean | 'minWidth'
    disabled?: boolean
  },
  config: { overlayMatchWidth: boolean },
  triggerRef: Ref<ɵTriggerInstance | undefined>,
  focused: ComputedRef<boolean>,
  triggerFocused: ComputedRef<boolean>,
): OverlayStateContext {
  const overlayRef = ref<ControlTriggerOverlayInstance>()
  const [overlayWidth, setOverlayWidth] = useState('')

  const overlayMatchWidth = computed(() => props.overlayMatchWidth ?? config.overlayMatchWidth)
  const overlayStyle = computed(() => {
    if (!overlayMatchWidth.value) {
      return
    }

    return { [overlayMatchWidth.value === true ? 'width' : 'minWidth']: overlayWidth.value }
  })
  const [_overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)
  const overlayOpened = computed(() => !props.disabled && _overlayOpened.value)

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
      triggerRef.value?.focus()
      setOverlayOpened(true)
    }

    // see https://github.com/IDuxFE/idux/issues/488
    watchEffect(() => {
      const overlayInstance = overlayRef.value
      if (overlayInstance && overlayOpened.value) {
        const triggerEl = convertElement(triggerRef.value)
        updateOverlay(triggerEl!.getBoundingClientRect()!)
      }
    })

    watch(overlayOpened, () => {
      if (focused.value && !triggerFocused.value) {
        triggerRef.value?.focus()
      }
    })

    useResizeObserver(triggerRef, ({ contentRect }) => updateOverlay(contentRect))
  })

  return { overlayRef, overlayStyle, overlayMatchWidth, updateOverlay, overlayOpened, setOverlayOpened }
}
