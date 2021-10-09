<template>
  <div class="ix-image-preview">
    <div class="ix-image-preview-mask"></div>
    <div class="ix-image-preview-tools">
      <ul class="ix-preview-tools">
        <li class="ix-tools-item ix-rotate-left" @click="rotateEvent(-1)">
          <IxIcon name="rotate-left" />
        </li>
        <li class="ix-tools-item ix-rotate-right" @click="rotateEvent(1)">
          <IxIcon name="rotate-right" />
        </li>
        <li class="ix-tools-item ix-zoom-in" @click="zoomEvent(1)">
          <IxIcon name="zoom-in" />
        </li>
        <li
          class="ix-tools-item ix-zoom-out"
          :class="isZoomOutDisabled ? 'ix-tools-item-disabled' : ''"
          @click="zoomEvent(-1)"
        >
          <IxIcon name="zoom-out" />
        </li>
        <li class="ix-tools-item ix-close" @click="close">
          <IxIcon name="close" />
        </li>
      </ul>
    </div>
    <div class="ix-image-preview-img">
      <img :src="previewSrc" alt="" :style="{ transform: transform }" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { imagePreviewProps } from './types'

const minScale = 0.2
const initScale = 1.0
const scaleStep = 0.1
const initRotate = 0
const rotateStep = 90

export default defineComponent({
  name: 'IxImgPreview',
  components: { IxIcon },
  props: imagePreviewProps,
  emits: {
    close: () => {
      return true
    },
  },
  setup(props, { emit }) {
    const scale = ref(initScale)
    const rotate = ref(initRotate)
    const transform = computed(() => `scale3d(${scale.value}, ${scale.value}, 1) rotate(${rotate.value}deg)`)
    const isZoomOutDisabled = computed(() => scale.value < minScale)
    const close = () => {
      emit('close')
    }
    const rotateEvent = (direction: number) => {
      rotate.value += direction * rotateStep
    }
    const zoomEvent = (direction: number) => {
      if (scale.value > minScale || direction > 0) {
        scale.value += direction * scaleStep
      }
    }

    return {
      close,
      scale,
      rotate,
      rotateEvent,
      zoomEvent,
      transform,
      isZoomOutDisabled,
    }
  },
})
</script>
