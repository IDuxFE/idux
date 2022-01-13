/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ImageProps, ImageStatus } from './types'
import type { ImageConfig } from '@idux/components/config'
import type { CSSProperties, ComputedRef, Ref, Slots } from 'vue'

import { computed, defineComponent, normalizeClass, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import ImageViewer from './ImageViewer'
import { imageProps } from './types'

export default defineComponent({
  name: 'IxImage',
  inheritAttrs: false,
  props: imageProps,
  setup(props, { attrs, slots }) {
    const { class: className, style, ...rest } = attrs
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-image`)
    const config = useGlobalConfig('image')
    const preview = usePreview(props, config)
    const { status, setFailed, setLoaded } = useStatus(props)
    const [viewerVisible, setVisible] = useViewerVisible()
    const { outerClasses, overLayerClasses, imageClasses } = useClasses(
      mergedPrefixCls,
      className as string,
      status,
      preview,
    )

    return () => {
      const imageViewerProps = {
        visible: viewerVisible.value,
        'onUpdate:visible': setVisible,
        images: [props.src],
        ...(props.imageViewer ?? {}),
      }

      return (
        <div class={outerClasses.value} style={style as CSSProperties}>
          <div class={overLayerClasses.value}>
            {renderPreviewIcon(props, slots, mergedPrefixCls, status, preview, setVisible)}
            {renderPlaceholder(slots, mergedPrefixCls, status)}
            {renderFallback(slots, mergedPrefixCls, status)}
            <ImageViewer {...imageViewerProps}></ImageViewer>
          </div>
          <img {...rest} src={props.src} class={imageClasses.value} onLoad={setLoaded} onError={setFailed} />
        </div>
      )
    }
  },
})

function renderPreviewIcon(
  props: ImageProps,
  slots: Slots,
  mergedPrefixCls: ComputedRef<string>,
  status: Ref<ImageStatus>,
  preview: ComputedRef<boolean>,
  setVisible: (visible: boolean) => void,
) {
  return (
    status.value === 'loaded' &&
    preview.value && (
      <span class={`${mergedPrefixCls.value}-preview-wrapper`} onClick={() => setVisible(true)}>
        {slots.previewIcon?.() ?? <IxIcon class={`${mergedPrefixCls.value}-preview-icon`} name="zoom-in" />}
      </span>
    )
  )
}

function renderPlaceholder(slots: Slots, mergedPrefixCls: ComputedRef<string>, status: Ref<ImageStatus>) {
  return (
    status.value === 'loading' &&
    (slots.placeholder?.() ?? <IxIcon class={`${mergedPrefixCls.value}-placeholder`} name="loading" />)
  )
}

function renderFallback(slots: Slots, mergedPrefixCls: ComputedRef<string>, status: Ref<ImageStatus>) {
  return (
    status.value === 'failed' &&
    (slots.fallback?.() ?? <IxIcon class={`${mergedPrefixCls.value}-fallback`} name="file-image" />)
  )
}

function useViewerVisible(): [Ref<boolean>, (visible: boolean) => void] {
  const viewerVisible = ref(false)
  const setVisible = (visible: boolean) => {
    viewerVisible.value = visible
  }
  return [viewerVisible, setVisible]
}

function useClasses(
  mergedPrefixCls: ComputedRef<string>,
  className: string,
  status: Ref<ImageStatus>,
  preview: ComputedRef<boolean>,
) {
  const outerClasses = computed(() =>
    normalizeClass([
      mergedPrefixCls.value,
      className,
      `${mergedPrefixCls.value}-${status.value}`,
      { [`${mergedPrefixCls.value}-preview`]: preview.value },
    ]),
  )
  const overLayerClasses = computed(() => normalizeClass(`${mergedPrefixCls.value}-layer`))
  const imageClasses = computed(() =>
    normalizeClass([
      `${mergedPrefixCls.value}-inner`,
      { [`${mergedPrefixCls.value}-inner-hidden`]: status.value !== 'loaded' },
    ]),
  )

  return {
    outerClasses,
    overLayerClasses,
    imageClasses,
  }
}

function usePreview(props: ImageProps, config: ImageConfig) {
  return computed(() => props.preview ?? config.preview)
}

function useStatus(props: ImageProps) {
  const status: Ref<ImageStatus> = ref('loading')
  const setLoaded = (e: Event) => {
    status.value = 'loaded'
    callEmit(props.onLoad, e)
  }
  const setFailed = (e: Event) => {
    status.value = 'failed'
    callEmit(props.onError, e)
  }

  watch(
    () => props.src,
    () => {
      status.value = 'loading'
    },
    { immediate: true },
  )

  return {
    status,
    setLoaded,
    setFailed,
  }
}
