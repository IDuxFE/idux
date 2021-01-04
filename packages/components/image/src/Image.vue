<template>
  <div class="ix-image">
    <img
      v-if="imageStatus !== 'failed'"
      :class="['ix-image-img', preview ? 'ix-image-preview-is' : '']"
      :src="src"
      :style="{ width: imageWidth, height: imageHeight, objectFit: objectFit }"
      :alt="alt"
      @error="onError"
      @load="onLoaded"
      @click="onClick"
    />
    <div
      v-else-if="imageStatus === 'failed'"
      class="ix-image-error"
      :style="{
        width: imageWidth,
        height: imageHeight,
        objectFit: objectFit,
        background: `url(${fallback || imageConfig.fallback})`,
      }"
    ></div>
    <template v-if="imageStatus !== 'failed' && preview">
      <img-preview v-if="isShowPreview" :previewSrc="src" @close="onClose"></img-preview>
    </template>
  </div>
</template>
<script lang="ts">
import type { ImageProps, ImageStatus } from './types'

import { defineComponent, computed, ref, watchEffect, watch } from 'vue'
import { PropTypes, toCssPixel, withUndefined } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/core/config'
import ImgPreview from './ImgPreview.vue'

export default defineComponent({
  name: 'IxImage',
  components: { ImgPreview },
  props: {
    src: PropTypes.string.def(''),
    width: withUndefined(PropTypes.oneOfType([String, Number])),
    height: withUndefined(PropTypes.oneOfType([String, Number])),
    preview: PropTypes.bool.def(false),
    fallback: PropTypes.string,
    alt: PropTypes.string.def(''),
    objectFit: PropTypes.string.def('fill'),
  },
  emits: {
    statusChange: (status: string) => {
      return !!status
    },
  },
  setup(props: ImageProps, { emit }) {
    const isShowPreview = ref(false)
    const imageConfig = useGlobalConfig('image')
    const imageWidth = computedSize(props, imageConfig, 'width')
    const imageHeight = computedSize(props, imageConfig, 'height')
    const imageStatus = ref<ImageStatus>('loading')
    const onError = () => {
      imageStatus.value = 'failed'
    }
    const onLoaded = () => {
      imageStatus.value = 'loaded'
    }
    const onClick = () => {
      isShowPreview.value = true
    }
    const onClose = () => {
      isShowPreview.value = false
    }
    watchEffect(() => {
      const status = imageStatus.value
      emit('statusChange', status)
    })
    watch(
      () => props.src,
      () => {
        imageStatus.value = 'loading'
      },
    )
    return {
      imageWidth,
      imageHeight,
      onLoaded,
      onError,
      onClick,
      isShowPreview,
      onClose,
      imageStatus,
      imageConfig,
    }
  },
})
const computedSize = (props: ImageProps, imageConfig: ImageProps, type: 'width' | 'height') => {
  return computed(() => {
    const size = props[type] ?? imageConfig[type]
    return toCssPixel(size)
  })
}
</script>
