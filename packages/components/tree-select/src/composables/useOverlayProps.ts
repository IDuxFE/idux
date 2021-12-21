/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeSelectProps } from '../types'
import type { ɵOverlayInstance } from '@idux/components/_private/overlay'
import type { CSSProperties, ComputedRef, Ref } from 'vue'

import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'

import { convertCssPixel, offResize, onResize, useControlledProp } from '@idux/cdk/utils'

export interface OverlayPropsContext {
  overlayRef: Ref<ɵOverlayInstance | undefined>
  overlayStyle: ComputedRef<CSSProperties>
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
}

export function useOverlayProps(
  props: TreeSelectProps,
  triggerRef: Ref<HTMLDivElement | undefined>,
): OverlayPropsContext {
  const overlayRef = ref<ɵOverlayInstance>()
  const overlayWidth = ref<string>()
  const overlayStyle = computed(() => ({ width: overlayWidth.value }))
  const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)

  const updatePopper = () => {
    overlayWidth.value = convertCssPixel(triggerRef.value?.getBoundingClientRect().width)

    overlayRef.value?.updatePopper()
  }

  onMounted(() => {
    if (props.autofocus) {
      setOverlayOpened(true)
    }

    watchEffect(() => {
      if (overlayOpened.value) {
        updatePopper()
      }
    })

    onResize(triggerRef.value!, updatePopper)
  })

  onBeforeUnmount(() => {
    offResize(triggerRef.value!, updatePopper)
  })

  return { overlayRef, overlayStyle, overlayOpened, setOverlayOpened }
}
