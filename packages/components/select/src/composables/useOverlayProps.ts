/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectProps } from '../types'
import type { ɵOverlayInstance } from '@idux/components/_private'
import type { CSSProperties, ComputedRef, Ref, WritableComputedRef } from 'vue'

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { convertCssPixel, offResize, onResize } from '@idux/cdk/utils'
import { useMergedProp } from '@idux/components/utils'

export interface OverlayPropsContext {
  overlayRef: Ref<ɵOverlayInstance | undefined>
  overlayStyle: ComputedRef<CSSProperties>
  overlayOpened: WritableComputedRef<boolean>
  changeOverlayOpened: (open: boolean) => void
}

export function useOverlayProps(props: SelectProps, triggerRef: Ref<HTMLDivElement | undefined>): OverlayPropsContext {
  const overlayRef = ref<ɵOverlayInstance>()
  const overlayWidth = ref<string>()
  const overlayStyle = computed(() => ({ width: overlayWidth.value }))
  const overlayOpened = useMergedProp(props, 'open')
  const changeOverlayOpened = (open: boolean) => {
    if (overlayOpened.value !== open) {
      overlayOpened.value = open
    }
  }

  const syncOverlayWidth = () => {
    overlayWidth.value = convertCssPixel(triggerRef.value?.getBoundingClientRect().width)
  }

  const handleTriggerResize = () => {
    syncOverlayWidth()

    overlayRef.value?.updatePopper()
  }

  onMounted(() => {
    syncOverlayWidth()
    onResize(triggerRef.value!, handleTriggerResize)
  })

  onBeforeUnmount(() => {
    offResize(triggerRef.value!, handleTriggerResize)
  })

  return { overlayRef, overlayStyle, overlayOpened, changeOverlayOpened }
}
