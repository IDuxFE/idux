import { defineComponent, provide } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import Radio from './Radio'
import { radioGroupProps } from './types'
import { radioGroupToken } from './token'

export default defineComponent({
  name: 'IxRadioGroup',
  props: radioGroupProps,
  setup(props) {
    const valueAccessor = useValueAccessor()
    provide(radioGroupToken, { props, valueAccessor })
  },
  render() {
    const child = this.options ? this.options.map(option => <Radio {...option}></Radio>) : this.$slots.default?.()
    return <div class="ix-radio-group">{child}</div>
  },
})
