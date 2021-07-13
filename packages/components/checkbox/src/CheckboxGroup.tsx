import { defineComponent, provide } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import Checkbox from './Checkbox'
import { checkboxGroupProps } from './types'
import { checkboxGroupToken } from './token'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: checkboxGroupProps,
  setup(props) {
    const valueAccessor = useValueAccessor()
    provide(checkboxGroupToken, { props, valueAccessor })
  },
  render() {
    const child = this.options ? this.options.map(option => <Checkbox {...option} />) : this.$slots.default?.()
    return <div class="ix-checkbox-group">{child}</div>
  },
})
