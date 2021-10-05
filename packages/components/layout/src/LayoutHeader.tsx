import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { layoutHeaderProps } from './types'

export default defineComponent({
  name: 'IxLayoutHeader',
  props: layoutHeaderProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    return () => {
      return <header class={`${prefixCls}-layout-header`}>{slots.default?.()}</header>
    }
  },
})
