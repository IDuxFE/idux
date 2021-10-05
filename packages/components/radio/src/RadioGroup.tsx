import { defineComponent, provide } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import Radio from './Radio'
import { radioGroupProps } from './types'
import { radioGroupToken } from './token'

export default defineComponent({
  name: 'IxRadioGroup',
  props: radioGroupProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const { accessor } = useValueAccessor()
    useFormItemRegister()
    provide(radioGroupToken, { props, accessor })

    return () => {
      const { options } = props
      const children = options ? options.map(option => <Radio {...option}></Radio>) : slots.default?.()
      return <div class={`${prefixCls}-radio-group`}>{children}</div>
    }
  },
})
