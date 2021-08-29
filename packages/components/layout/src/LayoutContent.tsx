import { defineComponent } from 'vue'
import { layoutContentProps } from './types'

export default defineComponent({
  name: 'IxLayoutContent',
  props: layoutContentProps,
  setup(props, { slots }) {
    return ()=>{
      return (
        <main class="ix-layout-content">
            { slots.default?.() }
        </main>
      )
    }
  }
})
