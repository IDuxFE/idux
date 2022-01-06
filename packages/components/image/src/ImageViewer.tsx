/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ImageViewerProps } from './types'
import type { ImageViewerConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { Transition, computed, defineComponent } from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import ImageViewerContent from './component/ImageViewerContent'
import { imageViewerProps } from './types'

export default defineComponent({
  name: 'IxImageViewer',
  props: imageViewerProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('imageViewer')
    const [visible] = useControlledProp(props, 'visible', false)
    const mergedPrefixCls = computed(() => `${common.prefixCls}-image-viewer`)
    const target = useTarget(props, config, mergedPrefixCls)

    return () => (
      <CdkPortal target={target.value} load={visible.value}>
        <Transition name={`${common.prefixCls}-zoom-big-fast`} appear>
          {visible.value && <ImageViewerContent mergedPrefixCls={mergedPrefixCls.value} {...props} />}
        </Transition>
      </CdkPortal>
    )
  },
})

function useTarget(props: ImageViewerProps, config: ImageViewerConfig, mergedPrefixCls: ComputedRef<string>) {
  return computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-container`)
}
