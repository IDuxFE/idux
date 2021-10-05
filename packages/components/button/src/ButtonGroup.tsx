import { defineComponent, provide } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { buttonGroupProps } from './types'
import { buttonToken } from './token'

export default defineComponent({
  name: 'IxButtonGroup',
  props: buttonGroupProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    provide(buttonToken, props)

    return () => <div class={`${prefixCls}-button-group`}>{slots.default?.()}</div>
  },
})
