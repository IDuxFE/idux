/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadProps } from '../types'
import type { ComputedRef, Ref, ShallowRef } from 'vue'

import { computed, ref, shallowRef } from 'vue'

export interface UploadDrag {
  allowDrag: ComputedRef<boolean>
  dragOver: Ref<boolean>
  filesSelected: ShallowRef<File[]>
  onDrop: (e: DragEvent) => void
  onDragOver: (e: DragEvent) => void
  onDragLeave: (e: DragEvent) => void
}

export function useDrag(props: UploadProps): UploadDrag {
  const dragOver = ref(false)
  const filesSelected: ShallowRef<File[]> = shallowRef([])
  const allowDrag = computed(() => !!props.dragable && !props.disabled)

  function onDrop(e: DragEvent) {
    e.preventDefault()
    if (!allowDrag.value) {
      return
    }
    dragOver.value = false
    filesSelected.value = Array.prototype.slice.call(e.dataTransfer?.files ?? []) as File[]
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault()
    if (!allowDrag.value) {
      return
    }
    dragOver.value = true
  }

  function onDragLeave(e: DragEvent) {
    e.preventDefault()
    if (!allowDrag.value) {
      return
    }
    dragOver.value = false
  }

  return {
    allowDrag,
    dragOver,
    filesSelected,
    onDrop,
    onDragOver,
    onDragLeave,
  }
}
