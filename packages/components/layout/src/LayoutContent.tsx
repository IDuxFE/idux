import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { layoutContentProps } from './types'

export default defineComponent({
  name: 'IxLayoutContent',
  props: layoutContentProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    return () => {
      return <main class={`${prefixCls}-layout-content`}>{slots.default?.()}</main>
    }
  },
})
