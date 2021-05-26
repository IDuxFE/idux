<template>
  <form :class="classes">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import type { FormLayout, FormSize } from '@idux/components/config'
import type { FormProps } from './types'

import { computed, ComputedRef, defineComponent, provide, toRef, watchEffect } from 'vue'
import { provideControl, useValueControl } from '@idux/cdk/forms'
import { useGlobalConfig } from '@idux/components/config'
import { formToken } from './token'
import { formPropsDef } from './types'

export default defineComponent({
  name: 'IxForm',
  props: formPropsDef,

  setup(props: FormProps) {
    const control = useValueControl()
    watchEffect(() => provideControl(control.value!))

    const { colonless, labelAlign, layout, size } = useConfig(props)
    provide(formToken, {
      colonless,
      labelAlign,
      controlCol: toRef(props, 'controlCol'),
      hasFeedback: toRef(props, 'hasFeedback'),
      labelCol: toRef(props, 'labelCol'),
    })

    const classes = useClasses(layout, size)

    return { classes }
  },
})

const useConfig = (props: FormProps) => {
  const config = useGlobalConfig('form')
  return {
    colonless: computed(() => props.colonless ?? config.colonless),
    labelAlign: computed(() => props.labelAlign ?? config.labelAlign),
    layout: computed(() => props.layout ?? config.layout),
    size: computed(() => props.size ?? config.size),
  }
}

const useClasses = (layout: ComputedRef<FormLayout>, size: ComputedRef<FormSize>) => {
  return computed(() => {
    return {
      'ix-form': true,
      [`ix-form-${layout.value}`]: true,
      [`ix-form-${size.value}`]: true,
    }
  })
}
</script>
