/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, toRef, watchEffect } from 'vue'

import { provideControl, useValueControl } from '@idux/cdk/forms'
import { useGlobalConfig } from '@idux/components/config'

import { formToken } from './token'
import { formProps } from './types'

export default defineComponent({
  name: 'IxForm',
  props: formProps,
  setup(props, { slots }) {
    const control = useValueControl()
    watchEffect(() => provideControl(control.value!))

    const config = useGlobalConfig('form')
    const colonless = computed(() => props.colonless ?? config.colonless)
    const labelAlign = computed(() => props.labelAlign ?? config.labelAlign)
    const layout = computed(() => props.layout ?? config.layout)
    const size = computed(() => props.size ?? config.size)

    provide(formToken, {
      colonless,
      labelAlign,
      controlCol: toRef(props, 'controlCol'),
      hasFeedback: toRef(props, 'hasFeedback'),
      labelCol: toRef(props, 'labelCol'),
    })

    const classes = computed(() => {
      return {
        'ix-form': true,
        [`ix-form-${layout.value}`]: true,
        [`ix-form-${size.value}`]: true,
      }
    })

    return () => <form class={classes.value}>{slots.default?.()}</form>
  },
})
