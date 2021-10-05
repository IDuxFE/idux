import { computed, defineComponent } from 'vue'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { triggerProps } from './types'

export default defineComponent({
  name: 'IxLayoutSiderTrigger',
  props: triggerProps,
  setup(props) {
    const { prefixCls } = useGlobalConfig('common')
    const classes = computed(() => {
      return {
        [`${prefixCls}-layout-sider-trigger`]: true,
        [`${prefixCls}-layout-sider-trigger-collapsed`]: props.collapsed,
      }
    })

    const handleClick = () => {
      callEmit(props.onClick, !props.collapsed)
    }

    return () => {
      return (
        <div class={classes.value} onClick={handleClick}>
          <div class={`${prefixCls}-layout-sider-trigger-top`}></div>
          <div class={`${prefixCls}-layout-sider-trigger-bottom`}></div>
        </div>
      )
    }
  },
})
