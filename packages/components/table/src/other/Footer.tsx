/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Slots, VNode } from 'vue'

export function renderFooter(slots: Slots, prefixCls: string): VNode | null {
  if (!slots.footer) {
    return null
  }

  return <div class={`${prefixCls}-footer`}>{slots.footer()}</div>
}
