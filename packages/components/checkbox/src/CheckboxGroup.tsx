import { defineComponent, computed, provide } from 'vue'
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
