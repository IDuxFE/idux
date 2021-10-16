/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, provide } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'

import Radio from './Radio'
import { radioGroupToken } from './token'
import { radioGroupProps } from './types'

export default defineComponent({
  name: 'IxRadioGroup',
  props: radioGroupProps,
  setup(props, { slots }) {
    const { accessor, control } = useValueAccessor()
    useFormItemRegister(control)
    provide(radioGroupToken, { props, accessor })

    return () => {
      const { options } = props
      const children = options ? options.map(option => <Radio {...option}></Radio>) : slots.default?.()
      return <div class="ix-radio-group">{children}</div>
    }
  },
})
