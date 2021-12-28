/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, toRef } from 'vue'

import { FORMS_CONTROL_TOKEN, useValueControl } from '@idux/cdk/forms'
import { useGlobalConfig } from '@idux/components/config'

import { FORM_TOKEN, formToken } from './token'
import { formProps } from './types'

export default defineComponent({
  name: 'IxForm',
  props: formProps,
  setup(props, { slots }) {
    const control = useValueControl()
    provide(FORMS_CONTROL_TOKEN, control)

    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-form`)
    const config = useGlobalConfig('form')
    const colonless = computed(() => props.colonless ?? config.colonless)
    const labelAlign = computed(() => props.labelAlign ?? config.labelAlign)
    const layout = computed(() => props.layout ?? config.layout)
    const size = computed(() => props.size ?? config.size)

    provide(formToken, {
      colonless,
      controlCol: toRef(props, 'controlCol'),
      hasFeedback: toRef(props, 'hasFeedback'),
      labelAlign,
      labelCol: toRef(props, 'labelCol'),
    })

    provide(FORM_TOKEN, { size })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-${layout.value}`]: true,
        [`${prefixCls}-${size.value}`]: true,
      }
    })

    return () => <form class={classes.value}>{slots.default?.()}</form>
  },
})
