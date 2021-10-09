/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionalComponent } from 'vue'

import { cloneVNode } from 'vue'

const VirtualItem: FunctionalComponent<{ setRef: (el: HTMLElement) => void }> = ({ setRef }, { slots }) => {
  const [firstChild] = slots.default!()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return firstChild ? cloneVNode(firstChild, { ref: setRef as any }) : undefined
}

export default VirtualItem
