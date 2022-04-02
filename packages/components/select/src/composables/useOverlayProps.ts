/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, type ComputedRef, type Ref, computed, onMounted, ref, watchEffect } from 'vue'

import { useControlledProp, useState } from '@idux/cdk/utils'
import { type ɵOverlayInstance } from '@idux/components/_private/overlay'

import { type SelectProps } from '../types'

export interface OverlayPropsContext {
  overlayRef: Ref<ɵOverlayInstance | undefined>
  overlayStyle: ComputedRef<CSSProperties>
  setOverlayWidth: (width: string) => void
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
}

export function useOverlayProps(props: SelectProps): OverlayPropsContext {
  const overlayRef = ref<ɵOverlayInstance>()
  const [overlayWidth, setOverlayWidth] = useState('')
  const overlayStyle = computed(() => ({ width: overlayWidth.value }))
  const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)

  onMounted(() => {
    if (props.autofocus) {
      setOverlayOpened(true)
    }

    watchEffect(() => {
      const overlayInstance = overlayRef.value
      if (overlayInstance && overlayWidth.value && overlayOpened.value) {
        overlayInstance.updatePopper()
      }
    })
  })

  return { overlayRef, overlayStyle, setOverlayWidth, overlayOpened, setOverlayOpened }
}
