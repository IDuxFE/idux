/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionalComponent } from 'vue'

import { getFirstValidNode } from '@idux/cdk/utils'

const ProxyNode: FunctionalComponent = (_, { slots }) => {
  return getFirstValidNode(slots.default?.())
}

export default ProxyNode
