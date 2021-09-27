import { defineComponent } from 'vue'
import { layoutHeaderProps } from './types'

export default defineComponent({
  name: 'IxLayoutHeader',
  props: layoutHeaderProps,
  setup(props, { slots }) {
    return () => {
      return <header class="ix-layout-header">{slots.default?.()}</header>
    }
  },
})
