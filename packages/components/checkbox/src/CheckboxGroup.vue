<template>
  <div class="ix-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, watch } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { checkboxGroupInjectionKey, subjectInjectKey, SubjectType } from './checkbox'
import type { CheckboxGroupProps } from './types'
import { Subject } from '@idux/cdk/subject'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: {
    value: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool.def(false),
    name: PropTypes.string,
  },
  emits: ['update:value', 'change'],
  setup(props: CheckboxGroupProps, { emit }) {
    provide(checkboxGroupInjectionKey, props)

    const subject = new Subject<SubjectType>()
    provide(subjectInjectKey, subject)

    let groupCheckValue = props.value ?? []

    watch(
      () => props.value,
      value => {
        groupCheckValue = value as string[]
      },
    )

    const handleChange = (checkValue: SubjectType) => {
      const checkValueIndex = groupCheckValue.indexOf(checkValue)
      const value = [...groupCheckValue]
      if (checkValueIndex === -1) {
        value.push(checkValue)
      } else {
        value.splice(checkValueIndex, 1)
      }
      // no value props passed
      if (props.value === void 0) {
        groupCheckValue = value
      }
      emit('update:value', value)
      emit('change', value)
    }

    subject.subscribe(handleChange)

    return {}
  },
})
</script>
