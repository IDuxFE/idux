import { defineComponent, cloneVNode } from 'vue'
import { virtualItemProps } from './types'

export default defineComponent({
  name: 'IxVirtualItem',
  props: virtualItemProps,
  render() {
    const { setRef, $slots } = this
    const children = $slots.default?.()
    return children?.length ? cloneVNode(children[0], { ref: setRef as any }) : null
  },
})
