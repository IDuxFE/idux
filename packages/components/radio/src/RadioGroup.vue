<template>
  <div ref="radioGroupRef" class="ix-radio-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from 'vue'
import { radioGroupProps } from './types'
import { radioGroupKey } from './radio'

export default defineComponent({
  name: 'IxRadioGroup',
  props: radioGroupProps,
  emits: ['change', 'update:value'],
  setup(props, { emit }) {
    const change = (radioValue: string | number | boolean) => {
      emit('update:value', radioValue)
      emit('change', radioValue)
    }

    provide(radioGroupKey, reactive({ ...toRefs(props), change }))
  },
})
</script>
