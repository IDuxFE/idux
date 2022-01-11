/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Ref } from 'vue'

import { defineComponent, provide, ref } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

import FileSelector from './component/Selector'
import { useCmpClasses } from './composables/useDisplay'
import { useRequest } from './composables/useRequest'
import { uploadToken } from './token'
import { uploadProps } from './types'

export default defineComponent({
  name: 'IxUpload',
  props: uploadProps,
  setup(props, { slots }) {
    const cpmClasses = useCmpClasses()
    const [showSelector, setSelectorVisible] = useShowSelector()
    const [files, onUpdateFiles] = useControlledProp(props, 'files', [])
    const { fileUploading, abort, startUpload, upload } = useRequest(props, files)
    provide(uploadToken, {
      props,
      files,
      fileUploading,
      onUpdateFiles,
      abort,
      startUpload,
      upload,
      setSelectorVisible,
    })

    return () => (
      <div>
        {showSelector.value && <FileSelector>{slots.default?.()}</FileSelector>}
        {slots.list?.({ abort, upload })}
        <div class={`${cpmClasses.value}-tip`}>{slots.tip?.()}</div>
      </div>
    )
  },
})

function useShowSelector(): [Ref<boolean>, (isShow: boolean) => void] {
  const showSelector = ref(true)

  function setSelectorVisible(isShow: boolean) {
    showSelector.value = isShow
  }

  return [showSelector, setSelectorVisible]
}
