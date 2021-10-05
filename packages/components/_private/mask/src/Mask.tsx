import { defineComponent, Transition } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { maskProps } from './types'

export default defineComponent({
  props: maskProps,
  setup(props) {
    const { prefixCls } = useGlobalConfig('common')

    return () => {
      const { mask, transitionName, visible, zIndex } = props
      if (!mask) {
        return null
      }

      return (
        <Transition appear name={transitionName}>
          <div v-show={visible} class={`${prefixCls}-mask`} style={{ zIndex }}></div>
        </Transition>
      )
    }
  },
})
