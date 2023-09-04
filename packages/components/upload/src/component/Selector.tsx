/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadProps } from '../types'
import type { UploadConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { computed, defineComponent, inject, normalizeClass, ref } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { useCmpClasses } from '../composables/useDisplay'
import { uploadToken } from '../token'

export default defineComponent({
  name: 'IxUploadSelector',
  setup(_, { slots }) {
    const { props: uploadProps, selectFiles, onDrop, onDragOver, onDragLeave, isDraggingOver } = inject(uploadToken)!
    const cpmClasses = useCmpClasses()
    const config = useGlobalConfig('upload')
    const dir = useDir(uploadProps, config)
    const multiple = useMultiple(uploadProps, config)
    const dragable = useDragable(uploadProps, config)

    const fileInputRef: Ref<HTMLInputElement | null> = ref(null)
    const inputClasses = computed(() => `${cpmClasses.value}-input`)
    const selectorClasses = useSelectorClasses(uploadProps, cpmClasses, dragable, isDraggingOver)

    const onClick = () => {
      if (uploadProps.disabled || !fileInputRef.value) {
        return
      }
      fileInputRef.value.value = ''
      fileInputRef.value.click()
    }
    const onFileChange = () => {
      const files = Array.prototype.slice.call(fileInputRef.value?.files ?? []) as File[]
      selectFiles(files)
    }

    return () => {
      return (
        <div
          class={selectorClasses.value}
          onClick={onClick}
          onDragover={onDragOver}
          onDrop={onDrop}
          onDragleave={onDragLeave}
        >
          <input
            {...dir.value}
            class={inputClasses.value}
            type="file"
            ref={fileInputRef}
            accept={uploadProps.accept}
            multiple={multiple.value}
            onClick={e => e.stopPropagation()}
            onChange={onFileChange}
          />
          {slots.default?.()}
        </div>
      )
    }
  },
})

function useSelectorClasses(
  props: UploadProps,
  cpmClasses: ComputedRef<string>,
  dragable: ComputedRef<boolean>,
  dragOver: Ref<boolean>,
) {
  return computed(() =>
    normalizeClass({
      [`${cpmClasses.value}-selector`]: true,
      [`${cpmClasses.value}-selector-drag`]: dragable.value,
      [`${cpmClasses.value}-selector-disabled`]: props.disabled,
      [`${cpmClasses.value}-selector-dragover`]: dragOver.value,
    }),
  )
}

function useDir(props: UploadProps, config: UploadConfig) {
  const directoryCfg = { directory: 'directory', webkitdirectory: 'webkitdirectory' }
  return computed(() => (props.directory ?? config.directory ? directoryCfg : {}))
}

function useMultiple(props: UploadProps, config: UploadConfig) {
  return computed(() => props.multiple ?? config.multiple)
}

function useDragable(props: UploadProps, config: UploadConfig) {
  return computed(() => props.dragable ?? config.dragable)
}
