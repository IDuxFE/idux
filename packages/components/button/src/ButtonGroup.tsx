import { defineComponent, provide } from 'vue'
import { buttonGroupProps } from './types'
import { buttonToken } from './token'

export default defineComponent({
  name: 'IxButtonGroup',
  props: buttonGroupProps,
  setup(props, { slots }) {
    provide(buttonToken, props)

    return () => <div class="ix-button-group">{slots.default?.()}</div>
  },
})
