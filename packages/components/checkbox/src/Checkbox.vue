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
import type { CheckboxProps, CheckValue } from './types'

import { defineComponent, computed, ComputedRef, inject, Ref, ref, watch, getCurrentInstance } from 'vue'
import { PropTypes, withUndefined, isArray, hasSlot } from '@idux/cdk/utils'
import { useAttrs } from '@idux/components/utils/'
import { checkboxGroupInjectionKey, subjectInjectKey } from './checkbox'

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
  setup(props: CheckboxProps, { slots, emit }) {
    const groupSubject = inject(subjectInjectKey, null)
    const checkeValue = ref(props.checked ?? props.falseValue)

    watch(
      () => props.checked,
      v => {
        checkeValue.value = v ?? props.falseValue
      },
    )

    const handleChange = (e: Event) => {
      const targetChecked = (e.target as HTMLInputElement).checked
      const targetCheckValue = targetChecked ? props.trueValue : props.falseValue
      // no value props passed
      if (props.checked === void 0) {
        checkeValue.value = targetCheckValue
      }

      emit('update:checked', targetCheckValue)
      emit('change', targetCheckValue)
      groupSubject?.dispatch((props.value ?? targetCheckValue) as string)
    }

    const hasDefaultSlot = computed(() => hasSlot(slots))

    const isDisabled = useDisabled(props)

    const isReadonly = useReadonly(props)

    const isChecked = useChecked(checkeValue)

    const classes = useClasses(isDisabled, isChecked, isReadonly)

    const inputName = useName()

    const attrs = useAttrs({ keys: ['type', 'tabindex'] })

    const inputRef = ref(null as unknown as HTMLInputElement)

    const handleClick = (e: Event) => {
      if (isReadonly.value) {
        e.preventDefault()
      }
    }

    const focus = () => {
      if (!isReadonly.value) {
        inputRef.value.focus()
      }
    }

    const blur = () => {
      inputRef.value.blur()
    }

    return {
      isChecked,
      isDisabled,
      isReadonly,
      hasDefaultSlot,
      handleChange,
      classes,
      inputName,
      attrs,
      inputRef,
      focus,
      blur,
      handleClick,
    }
  },
})

const useChecked = (checkValue: Ref<CheckValue>) => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  const { props } = getCurrentInstance()!

  return computed(() => {
    const groupValue = groupProps.value
    if (groupValue && isArray(groupValue)) {
      return groupValue.includes((props.value ?? checkValue.value) as string)
    }

    return checkValue.value === props.trueValue
  })
}

const useDisabled = (props: CheckboxProps) => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  return computed(() => {
    return !!(groupProps.disabled || props.disabled)
  })
}

const useReadonly = (props: CheckboxProps) => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  return computed(() => {
    return !!(groupProps.readonly || props.readonly)
  })
}

const useClasses = (
  isDisabled: ComputedRef<boolean>,
  isChecked: ComputedRef<boolean>,
  isReadonly: ComputedRef<boolean>,
) => {
  const { props } = getCurrentInstance()!

  return computed(() => {
    const disabled = isDisabled.value
    const checked = isChecked.value
    const readonly = isReadonly.value
    const indeterminate = props.indeterminate

    return {
      'ix-checkbox-disabled': !!disabled,
      'ix-checkbox-readonly': !!readonly,
      'ix-checkbox-indeterminate': !!indeterminate,
      'ix-checkbox-checked': !indeterminate && checked,
    }
  })
}

const useName = () => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  return computed(() => groupProps.name as string)
}
</script>
