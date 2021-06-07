<template>
  <label
    :class="{
      'ix-radio': true,
      'ix-radio-disabled': isDisabled,
      'ix-radio-checked': isChecked,
    }"
    role="radio"
    :ariaChecked="isChecked"
    :ariaDisabled="isDisabled"
    @change="isChecked = true"
  >
    <span
      class="ix-radio-body"
      :class="{
        'ix-radio-body-disabled': isDisabled,
        'ix-radio-body-checked': isChecked,
      }"
    >
      <span class="ix-radio-body-inner">
        <input
          ref="radioRef"
          type="radio"
          :name="name"
          :checked="isChecked"
          ariaHidden="true"
          :disabled="isDisabled"
          class="ix-radio-body-input"
          :value="value"
          @change="onChange"
        />
      </span>
    </span>
    <span class="ix-radio-label">
      <slot></slot>
    </span>
  </label>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { radioProps } from './types'

import { getRadioAttrs, radioMode } from './radio'

export default defineComponent({
  name: 'IxRadio',
  props: radioProps,
  emits: ['change', 'update:checked'],
  setup(props, { emit }) {
    const { isGroup, radioGroup } = radioMode()
    const { isDisabled } = getRadioAttrs(props, isGroup, radioGroup)
    const radioRef = ref<HTMLInputElement>()
    const isChecked = computed<boolean>({
      get() {
        return (isGroup.value ? radioGroup.value === props.value : props.checked) as boolean
      },
      set(value) {
        if (isGroup.value) {
          radioGroup.change(props.value!)
        } else {
          emit('update:checked', value)
        }
        radioRef.value!.checked = value
      },
    })

    const onChange = function () {
      emit('change', isChecked)
    }

    return {
      isDisabled,
      isChecked,
      onChange,
      radioRef,
    }
  },
})
</script>
