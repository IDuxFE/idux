<template>
  <div ref="radioGroupRef" class="ix-radio-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { PropTypes } from '@idux/cdk/utils'
import { defineComponent, provide, reactive, toRefs } from 'vue'
import { RadioGroupProps, modelValueType } from './types'
import { radioGroupKey } from './radio'

export default defineComponent({
  name: 'IxRadioGroup',
  props: {
    value: PropTypes.oneOfType([String, Number, Boolean]),
    size: PropTypes.oneOf(['large', 'medium', 'small']).def('medium'),
    mode: PropTypes.oneOf(['fill', 'border']).def('border'),
    disabled: PropTypes.bool.def(false),
    color: PropTypes.string.def('#00b27a'),
  },
  emits: ['change', 'update:value'],
  setup(props: RadioGroupProps, { emit }) {
    const change = (radioValue: modelValueType) => {
      emit('update:value', radioValue)
      emit('change', radioValue)
    }
    provide(radioGroupKey, reactive({ ...toRefs(props), change }))
  },
})
</script>
