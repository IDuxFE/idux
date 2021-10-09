/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'

import Checkbox from './Checkbox'
import { checkboxGroupToken } from './token'
import { checkboxGroupProps } from './types'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: checkboxGroupProps,
  setup(props, { slots }) {
    const { accessor } = useValueAccessor()
    useFormItemRegister()
    provide(checkboxGroupToken, { props, accessor })
    const classes = computed(() => {
      return {
        'ix-checkbox-group': true,
        'ix-checkbox-group-no-gap': props.gap === 0,
      }
    })
    return () => {
      const child = props.options ? props.options.map(option => <Checkbox {...option} />) : slots.default?.()
      return <div class={classes.value}>{child}</div>
    }
  },
})
