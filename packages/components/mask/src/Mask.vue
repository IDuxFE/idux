<template>
  <div :class="ixMaskClass" @click="onMaskClick">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { MaskProps, MaskPropTypes } from './types'

export default defineComponent({
  name: 'IxMask',
  props: MaskPropTypes,
  emits: ['click'],
  setup(props: MaskProps, { emit }) {
    const ixMaskClass = computed(() => {
      const classArr = ['ix-mask', props.maskClass]
      if (props.mask) {
        classArr.push('has-mask')
      }
      return classArr
    })
    const onMaskClick = () => {
      emit('click')
    }
    return {
      ixMaskClass,
      onMaskClick,
    }
  },
})
</script>
