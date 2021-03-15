<template>
  <label
    class="ix-checkbox"
    role="checkbox"
    :ariaChecked="isChecked"
    :ariaDisabled="isDisabled"
    :ariaReadOnly="isReadonly"
    :class="[classes, $attrs.class]"
    :style="$attrs.style"
  >
    <span class="ix-checkbox-input-wrapper">
      <input
        ref="inputRef"
        type="checkbox"
        class="ix-checkbox-input"
        :name="inputName"
        :checked="isChecked"
        :disabled="isDisabled"
        :trueValue="trueValue"
        :falseValue="falseValue"
        :value="value"
        v-bind="attrs"
        @change="handleChange"
        @click="handleClick"
      />
      <span class="ix-checkbox-inner" :tabindex="$attrs.tabindex"></span>
    </span>
    <span v-if="hasDefaultSlot" class="ix-checkbox-label"><slot></slot></span>
  </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { PropTypes, withUndefined } from '@idux/cdk/utils'
import { setup } from './checkboxSetup'
export default defineComponent({
  name: 'IxCheckbox',
  inheritAttrs: false,
  props: {
    checked: withUndefined(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
    disabled: PropTypes.bool.def(false),
    indeterminate: PropTypes.bool.def(false),
    readonly: PropTypes.bool.def(false),
    trueValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).def(true),
    falseValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).def(false),
    value: PropTypes.string,
  },
  emits: ['update:checked', 'change'],
  setup,
})
</script>
