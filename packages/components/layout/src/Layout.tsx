import { computed, defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { layoutProps } from './types'

export default defineComponent({
  name: 'IxLayout',
  props: layoutProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const classes = computed(() => {
      return {
        [`${prefixCls}-layout`]: true,
        [`${prefixCls}-layout-out-sider`]: props.outSider,
      }
    })
    return () => {
      return <section class={classes.value}>{slots.default?.()}</section>
    }
  },
})
