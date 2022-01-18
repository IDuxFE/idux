/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFilesProps } from './types'
import type { UploadFilesConfig } from '@idux/components/config'

import { computed, defineComponent, h, inject, watchEffect } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import IxUploadImageCardList from './component/ImageCardList'
import IxUploadImageList from './component/ImageList'
import IxUploadTextList from './component/TextList'
import { useSelectorVisible } from './composables/useDisplay'
import { uploadToken } from './token'
import { uploadFilesProps } from './types'

const cpmMap = {
  text: IxUploadTextList,
  image: IxUploadImageList,
  imageCard: IxUploadImageCardList,
} as const

export default defineComponent({
  name: 'IxUploadFiles',
  props: uploadFilesProps,
  setup(props) {
    const config = useGlobalConfig('uploadFiles')
    const listType = useListType(props, config)
    const { props: uploadProps, setSelectorVisible } = inject(uploadToken)!
    const [outerSelector] = useSelectorVisible(uploadProps, listType)

    watchEffect(() => setSelectorVisible(outerSelector.value))

    return () => h(cpmMap[listType.value], { ...props })
  },
})

function useListType(props: UploadFilesProps, config: UploadFilesConfig) {
  return computed(() => props.type ?? config.type)
}
