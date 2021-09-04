import { defineComponent, provide } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import Radio from './Radio'
import { radioGroupProps } from './types'
import { radioGroupToken } from './token'

export default defineComponent({
  name: 'IxRadioGroup',
  props: radioGroupProps,
  setup(props, { slots }) {
    const { accessor } = useValueAccessor()

    provide(radioGroupToken, { props, accessor })

    return () => {
      const { options } = props
      const children = options ? options.map(option => <Radio {...option}></Radio>) : slots.default?.()
      return <div class="ix-radio-group">{children}</div>
    }
  },
})
