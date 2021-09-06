import { defineComponent, provide } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'
import Checkbox from './Checkbox'
import { checkboxGroupProps } from './types'
import { checkboxGroupToken } from './token'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: checkboxGroupProps,
  setup(props, { slots }) {
    const { accessor } = useValueAccessor()
    useFormItemRegister()
    provide(checkboxGroupToken, { props, accessor })

    return () => {
      const child = props.options ? props.options.map(option => <Checkbox {...option} />) : slots.default?.()
      return <div class="ix-checkbox-group">{child}</div>
    }
  },
})
