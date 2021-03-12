<template>
  <component :is="tag" v-bind="$props" :percent="percent" :success="formattedSuccess" class="ix-progress">
    <slot name="format" :percent="percent" :successPercent="successPercent"></slot>
  </component>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ProgressProps, ProgressPropTypes } from './types'
import Line from './Line.vue'
import Circle from './Circle.vue'
import { convertPercent } from './util'

export default defineComponent({
  name: 'IxProgress',
  props: ProgressPropTypes,
  setup(props: ProgressProps) {
    const percent = computed(() => convertPercent(props.percent))
    const successPercent = computed(() => convertPercent(props.success?.percent))
    const tag = computed(() => (props.type === 'line' ? Line : Circle))
    const formattedSuccess = computed(() => ({ ...props.success, percent: successPercent.value }))

    return {
      tag,
      percent,
      formattedSuccess,
      successPercent,
    }
  },
})
</script>
