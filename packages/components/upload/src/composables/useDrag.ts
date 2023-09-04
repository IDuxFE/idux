/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadProps } from '../types'
import type { ComputedRef, Ref } from 'vue'

import { computed, ref } from 'vue'

export interface UploadDrag {
  allowDrag: ComputedRef<boolean>
  isDraggingOver: Ref<boolean>
  onDrop: (e: DragEvent) => void
  onDragOver: (e: DragEvent) => void
  onDragLeave: (e: DragEvent) => void
}

export function useDrag(props: UploadProps, selectFiles: (files: File[]) => Promise<void>): UploadDrag {
  const isDraggingOver = ref(false)
  const allowDrag = computed(() => !!props.dragable && !props.disabled)

  function onDrop(e: DragEvent) {
    e.preventDefault()
    if (!allowDrag.value) {
      return
    }
    isDraggingOver.value = false
    selectFiles(Array.prototype.slice.call(e.dataTransfer?.files ?? []) as File[])
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault()
    if (!allowDrag.value) {
      return
    }
    isDraggingOver.value = true
  }

  function onDragLeave(e: DragEvent) {
    e.preventDefault()
    if (!allowDrag.value) {
      return
    }
    isDraggingOver.value = false
  }

  return {
    allowDrag,
    isDraggingOver,
    onDrop,
    onDragOver,
    onDragLeave,
  }
}
