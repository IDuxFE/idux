<template>
  <div class="ix-image">
    <img
      v-if="imageStatus !== 'failed'"
      :class="['ix-image-img', preview ? 'ix-image-preview-is' : '']"
      :src="src"
      :style="{ width: imageWidth, height: imageHeight, objectFit: objectFit }"
      :alt="alt"
      @color-error="onError"
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
import type { ImageConfig } from '@idux/components/config'
import type { ImageProps, ImageStatus } from './types'

import { defineComponent, computed, ref, watchEffect, watch } from 'vue'
import { convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import ImgPreview from './ImgPreview.vue'
import { imageProps } from './types'

export default defineComponent({
  name: 'IxImage',
  components: { ImgPreview },
  props: imageProps,
  emits: ['statusChange'],
  setup(props, { emit }) {
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

const computedSize = (props: ImageProps, imageConfig: ImageConfig, type: 'width' | 'height') => {
  return computed(() => {
    const size = props[type] ?? imageConfig[type]
    return convertCssPixel(size)
  })
}
</script>
