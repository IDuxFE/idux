/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, provide } from 'vue'

import { FORMS_CONTROL_TOKEN, useControl } from '@idux/cdk/forms'

import { formWrapperProps } from './types'

export default defineComponent({
  name: 'IxFormWrapper',
  props: formWrapperProps,
  setup(_, { slots }) {
    const control = useControl()
    provide(FORMS_CONTROL_TOKEN, control)

    return () => slots.default?.()
  },
})
