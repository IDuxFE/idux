/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionalComponent } from 'vue'

const Item: FunctionalComponent = (_, { slots }) => {
  const [firstChild] = slots.default!()
  return firstChild
}

export default Item
