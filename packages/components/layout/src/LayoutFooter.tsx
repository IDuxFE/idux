import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { layoutFooterProps } from './types'

export default defineComponent({
  name: 'IxLayoutFooter',
  props: layoutFooterProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    return () => {
      return <footer class={`${prefixCls}-layout-footer`}>{slots.default?.()}</footer>
    }
  },
})
