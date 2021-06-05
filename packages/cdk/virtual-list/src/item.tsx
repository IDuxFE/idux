import { defineComponent, cloneVNode } from 'vue'
import { virtualItemPropsDef } from './types'

export default defineComponent({
  name: 'IxVirtualItem',
  props: virtualItemPropsDef,
  render() {
    const { setRef, $slots } = this
    const children = $slots.default?.()
    return children?.length ? cloneVNode(children[0], { ref: setRef }) : null
  },
})
