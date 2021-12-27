/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadListProps } from './types'
import type { UploadListConfig } from '@idux/components/config'

import { computed, defineComponent, h, inject, watchEffect } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import IxUploadImageCardList from './component/ImageCardList'
import IxUploadImageList from './component/ImageList'
import IxUploadTextList from './component/TextList'
import { useSelectorVisible } from './composables/useDisplay'
import { UploadToken, uploadToken } from './token'
import { uploadListProps } from './types'

const cpmMap = {
  text: IxUploadTextList,
  image: IxUploadImageList,
  imageCard: IxUploadImageCardList,
} as const

export default defineComponent({
  name: 'IxUploadList',
  props: uploadListProps,
  setup(props) {
    const config = useGlobalConfig('uploadList')
    const listType = useListType(props, config)
    const { props: uploadProps, setSelectorVisible } = inject(uploadToken, {
      props: {},
      setSelectorVisible: () => {},
    } as unknown as UploadToken)
    const [outerSelector] = useSelectorVisible(uploadProps, listType)

    watchEffect(() => setSelectorVisible(outerSelector.value))

    return () => h(cpmMap[listType.value], { ...props })
  },
})

function useListType(props: UploadListProps, config: UploadListConfig) {
  return computed(() => props.type ?? config.listType)
}
