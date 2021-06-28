<template>
  <div :class="ixMaskClass" @click="onMaskClick">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { maskProps, MaskProps } from './types'

export default defineComponent({
  name: 'IxMask',
  props: maskProps,
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
