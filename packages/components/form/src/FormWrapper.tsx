/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

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
