import { defineComponent, watchEffect } from 'vue'
import { provideControl, useValueControl } from '@idux/cdk/forms'
import { formWrapperProps } from './types'

export default defineComponent({
  name: 'IxFormWrapper',
  props: formWrapperProps,
  setup(_, { slots }) {
    const control = useValueControl()
    watchEffect(() => {
      provideControl(control.value!)
    })

    return () => slots.default?.()
  },
})
