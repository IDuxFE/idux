<template>
  <div :class="`${prefixCls}-image-preview`">
    <div :class="`${prefixCls}-image-preview-mask`"></div>
    <div :class="`${prefixCls}-image-preview-tools`">
      <ul :class="`${prefixCls}-preview-tools`">
        <li :class="`${prefixCls}-tools-item ${prefixCls}-rotate-left`" @click="rotateEvent(-1)">
          <IxIcon name="rotate-left" />
        </li>
        <li :class="`${prefixCls}-tools-item ${prefixCls}-rotate-right`" @click="rotateEvent(1)">
          <IxIcon name="rotate-right" />
        </li>
        <li :class="`${prefixCls}-tools-item ${prefixCls}-zoom-in`" @click="zoomEvent(1)">
          <IxIcon name="zoom-in" />
        </li>
        <li
          :class="[
            `${prefixCls}-tools-item`,
            `${prefixCls}-zoom-out`,
            isZoomOutDisabled ? `${prefixCls}-tools-item-disabled` : '',
          ]"
          @click="zoomEvent(-1)"
        >
          <IxIcon name="zoom-out" />
        </li>
        <li :class="`${prefixCls}-tools-item ${prefixCls}-close`" @click="close">
          <IxIcon name="close" />
        </li>
      </ul>
    </div>
    <div :class="`${prefixCls}-image-preview-img`">
      <img :src="previewSrc" alt="" :style="{ transform: transform }" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
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
    const { prefixCls } = useGlobalConfig('common')
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
      prefixCls,
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
