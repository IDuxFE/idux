import { defineComponent, Transition } from 'vue'
import { maskProps } from './types'

export default defineComponent({
  props: maskProps,
  setup(props) {
    return () => {
      const { mask, transitionName, visible, zIndex } = props
      if (!mask) {
        return null
      }

      return (
        <Transition appear name={transitionName}>
          <div v-show={visible} class="ix-mask" style={{ zIndex }}></div>
        </Transition>
      )
    }
  },
})
