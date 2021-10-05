import { defineComponent, computed, provide } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import Checkbox from './Checkbox'
import { checkboxGroupProps } from './types'
import { checkboxGroupToken } from './token'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: checkboxGroupProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const { accessor } = useValueAccessor()
    useFormItemRegister()
    provide(checkboxGroupToken, { props, accessor })
    const classes = computed(() => {
      return {
        [`${prefixCls}-checkbox-group`]: true,
        [`${prefixCls}-checkbox-group-no-gap`]: props.gap === 0,
      }
    })
    return () => {
      const child = props.options ? props.options.map(option => <Checkbox {...option} />) : slots.default?.()
      return <div class={classes.value}>{child}</div>
    }
  },
})
