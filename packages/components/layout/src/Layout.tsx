import { computed, defineComponent } from 'vue'
import { layoutProps } from './types'

export default defineComponent({
  name: 'IxLayout',
  props: layoutProps,
  setup(props, { slots }) {
    const classes = computed(()=>{
      return {
          'ix-layout': true,
          'sider-out': props.siderOut
      }
    })
    return ()=>{
      return (
        <section class={classes.value}>
            { slots.default?.() }
        </section>
      )
    }
  }
})
