import { computed, defineComponent } from 'vue'
import { layoutFooterProps } from './types'

export default defineComponent({
  name: 'IxLayoutFooter',
  props: layoutFooterProps,
  setup(props, { slots }) {
    const style = computed(()=>{
      return {
          height: `${props.height}px`,
          lineHeight: `${props.height}px`,
      }
    })

    const classes = computed(()=>{
        return {
            'ix-layout-footer': true,
            'bordered': !props.borderless
        }
    })

    return ()=>{
      return (
        <footer class={classes.value} style={style.value}>
            { slots.default?.() }
        </footer>
      )
    }
  }
})
