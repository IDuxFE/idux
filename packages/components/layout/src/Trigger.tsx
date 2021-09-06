import { computed, defineComponent } from 'vue'
import { callEmit } from '@idux/cdk/utils'
import { triggerProps } from './types'

export default defineComponent({
  name: 'IxLayoutSiderTrigger',
  props: triggerProps,
  setup(props) {

    const classes = computed(()=>{
        return {
            'ix-layout-sider-trigger': true,
            collapsed: props.collapsed,
        }
    })

    const handleClick = () => {
        callEmit(props.onClick, !props.collapsed)
    }

    return ()=>{
      return (
        <div class={classes.value}
             onClick={handleClick}>
            <div class="ix-layout-sider-trigger-top"></div>
            <div class="ix-layout-sider-trigger-bottom"></div>
        </div>
      )
    }
  }
})
