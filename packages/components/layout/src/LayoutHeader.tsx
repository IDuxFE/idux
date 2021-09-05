import { computed, defineComponent } from 'vue'
import { layoutHeaderProps } from './types'

export default defineComponent({
  name: 'IxLayoutHeader',
  props: layoutHeaderProps,
  setup(props, { slots }) {
    const style = computed(()=>{
        return {
            height: `${props.height}px`,
            lineHeight: `${props.height}px`,
        }
    })

    const classes = computed(()=>{
        return {
            'ix-layout-header': true,
            'bordered': !props.borderless
        }
    })
    return () => {
        return (
            <header class={classes.value} style={style.value}>
                {slots.default?.()}
            </header>
        )
    }
  }
})
