/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionalComponent, HTMLAttributes } from 'vue'

import { computed } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

const MenuDivider: FunctionalComponent<HTMLAttributes> = () => {
  const common = useGlobalConfig('common')
  const mergedPrefixCls = computed(() => `${common.prefixCls}-menu-divider`)
  return <li class={mergedPrefixCls.value}></li>
}

MenuDivider.displayName = 'IxMenuDivider'

export default MenuDivider
