import { defineComponent } from 'vue'
import { layoutFooterProps } from './types'

export default defineComponent({
  name: 'IxLayoutFooter',
  props: layoutFooterProps,
  setup(props, { slots }) {
    return ()=>{
      return (
        <footer class="ix-layout-footer">
            { slots.default?.() }
        </footer>
      )
    }
  }
})
