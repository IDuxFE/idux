<template>
  <label
    class="ix-radio-button"
    :class="{
      'ix-radio-button-checked': isChecked,
      'ix-radio-button-disabled': isDisabled,
      [`ix-radio-button-${size}`]: true,
      [`ix-radio-button-${mode}`]: true,
    }"
    role="radio"
    :ariaChecked="isChecked"
    :ariaDisabled="isDisabled"
  >
    <span class="ix-radio-button-body">
      <input
        ref="radioRef"
        type="radio"
        :name="name"
        :disabled="isDisabled"
        ariaHidden="true"
        class="ix-radio-button-body-input"
        :value="value"
        :checked="isChecked"
        @change="onChange"
      />
      <span class="ix-radio-button-inner"></span>
    </span>
    <span class="ix-radio-button-label"><slot></slot></span>
  </label>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { RadioButtonProps, modelValueType } from './types'
import { getRadioAttrs, radioMode } from './radio'
import { PropTypes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  name: 'IxRadioButton',
  props: {
    value: PropTypes.oneOfType([String, Number, Boolean]),
    disabled: PropTypes.bool.def(false),
    name: PropTypes.string.def(''),
    checked: PropTypes.bool.def(false),
  },
  emits: ['change', 'update:checked'],
  setup(props: RadioButtonProps, { emit }) {
    const { isGroup, radioGroup } = radioMode()
    const { isDisabled } = getRadioAttrs(props, isGroup, radioGroup)
    const isChecked = computed<boolean>(() => {
      return (isGroup.value ? radioGroup.value === props.value : props.checked) as boolean
    })
    const onChange = (e: { target: { checked: boolean } }) => {
      const isChecked = e.target.checked
      emit('change', isChecked)
      emit('update:checked', isChecked)

      isGroup.value && radioGroup.change(props.value as modelValueType)
    }
    const radioGroupConfig = useGlobalConfig('radioGroup')
    const size = computed(() => {
      return isGroup.value ? radioGroup.size : radioGroupConfig.size
    })
    const mode = computed(() => {
      return isGroup.value ? radioGroup.mode : radioGroupConfig.mode
    })

    return {
      isDisabled,
      isChecked,
      onChange,
      size,
      mode,
    }
  },
})
</script>
