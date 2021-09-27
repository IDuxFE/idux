import type { FunctionalComponent } from 'vue'

import { cloneVNode } from 'vue'

const VirtualItem: FunctionalComponent<{ setRef: (el: HTMLElement) => void }> = ({ setRef }, { slots }) => {
  const [firstChild] = slots.default!()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return firstChild ? cloneVNode(firstChild, { ref: setRef as any }) : undefined
}

export default VirtualItem
