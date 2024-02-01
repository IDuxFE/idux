/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Ref, defineComponent, provide, ref, shallowRef } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { IxImageViewer } from '@idux/components/image'
import { useThemeToken } from '@idux/components/theme'

import FileSelector from './component/Selector'
import { useCmpClasses } from './composables/useDisplay'
import { useDrag } from './composables/useDrag'
import { useFileSelect } from './composables/useFileSelect'
import { useFilesData } from './composables/useFilesData'
import { useRequest } from './composables/useRequest'
import { useUploadControl } from './composables/useUploadControl'
import { uploadToken } from './token'
import { uploadProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxUpload',
  props: uploadProps,
  setup(props, { slots }) {
    const { globalHashId, hashId, registerToken } = useThemeToken('upload')
    registerToken(getThemeTokens)

    const locale = useGlobalConfig('locale')
    const cpmClasses = useCmpClasses()
    const [showSelector, setSelectorVisible] = useShowSelector()
    const filesDataContext = useFilesData(props)
    const selectFiles = useFileSelect(props, filesDataContext)
    const dragContext = useDrag(props, selectFiles)

    const uploadRequest = useRequest(props, filesDataContext)
    const { abort, upload } = uploadRequest
    const { viewerVisible, images, setViewerVisible } = useImageViewer()

    useUploadControl(filesDataContext.fileList, uploadRequest)

    provide(uploadToken, {
      props,
      locale,
      selectFiles,
      setViewerVisible,
      setSelectorVisible,
      ...uploadRequest,
      ...filesDataContext,
      ...dragContext,
    })

    return () => (
      <div class={[cpmClasses.value, globalHashId.value, hashId.value]}>
        {showSelector.value && <FileSelector>{slots.default?.()}</FileSelector>}
        {slots.list?.({ abort, upload })}
        <IxImageViewer v-model:visible={viewerVisible.value} images={images.value}></IxImageViewer>
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

function useImageViewer() {
  const viewerVisible = ref(false)
  const images = shallowRef<string[]>([])

  function setViewerVisible(visible: boolean, imageSrc?: string): void {
    images.value = visible && imageSrc ? [imageSrc] : []
    viewerVisible.value = visible
  }

  return {
    viewerVisible,
    images,
    setViewerVisible,
  }
}
