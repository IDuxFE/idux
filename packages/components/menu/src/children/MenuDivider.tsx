/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionalComponent, HTMLAttributes } from 'vue'

import { inject } from 'vue'

import { menuToken } from '../token'

const MenuDivider: FunctionalComponent<HTMLAttributes> = () => {
  const { mergedPrefixCls } = inject(menuToken)!
  return <li class={`${mergedPrefixCls.value}-divider`}></li>
}

export default MenuDivider
