/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type FunctionalComponent, type HTMLAttributes, inject } from 'vue'

import { menuToken } from '../token'
import { MenuDividerProps } from '../types'

const MenuDivider: FunctionalComponent<
  HTMLAttributes & {
    data: MenuDividerProps
    index: number
  }
> = props => {
  const { props: menuProps, mergedPrefixCls } = inject(menuToken)!
  const customAdditional = menuProps.customAdditional
    ? menuProps.customAdditional({ data: props.data, index: props.index })
    : undefined

  return <li class={`${mergedPrefixCls.value}-divider`} {...customAdditional}></li>
}
MenuDivider.displayName = 'MenuDivider'

export default MenuDivider
