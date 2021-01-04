<template>
  <div class="ix-image-preview">
    <div class="ix-image-preview-mask"></div>
    <div class="ix-image-preview-tools">
      <ul class="ix-preview-tools">
        <li class="ix-tools-item ix-rotate-left" @click="rotateEvent(-1)">
          <ix-icon name="rotate-left" />
        </li>
        <li class="ix-tools-item ix-rotate-right" @click="rotateEvent(1)">
          <ix-icon name="rotate-right" />
        </li>
        <li class="ix-tools-item ix-zoom-in" @click="zoomEvent(1)">
          <ix-icon name="zoom-in" />
        </li>
        <li
          class="ix-tools-item ix-zoom-out"
          :class="isZoomOutDisabled ? 'ix-tools-item-disabled' : ''"
          @click="zoomEvent(-1)"
        >
          <ix-icon name="zoom-out" />
        </li>
        <li class="ix-tools-item ix-close" @click="close">
          <ix-icon name="close" />
        </li>
      </ul>
    </div>
    <div class="ix-image-preview-img">
      <img :src="previewSrc" alt="" :style="{ transform: transform }" />
    </div>
  </div>
</template>

<script lang="ts">
import type { ImagePreviewProps } from './types'

import { defineComponent, ref, computed } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

const minScale = 0.2
const initScale = 1.0
const scaleStep = 0.1
const initRotate = 0
const rotateStep = 90

export default defineComponent({
  name: 'IxImgPreview',
  components: { IxIcon },
  props: {
    previewSrc: PropTypes.string.def(''),
  },
  emits: {
    close: () => {
      return true
    },
  },
  setup(props: ImagePreviewProps, { emit }) {
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
