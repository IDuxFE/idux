import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  name: 'IxMenuDivider',
  setup() {
    const { prefixCls } = useGlobalConfig('common')
    return () => <li class={`${prefixCls}-menu-divider`}></li>
  },
})
