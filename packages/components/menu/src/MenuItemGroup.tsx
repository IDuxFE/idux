/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { useKey } from '@idux/components/utils'

import { menuItemGroupToken, menuSubToken, menuToken } from './token'
import { menuItemGroupProps } from './types'
import { usePaddingLeft } from './usePaddingLeft'
import { getIconNode } from './utils'

export default defineComponent({
  name: 'IxMenuItemGroup',
  props: menuItemGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-menu-item-group`)

    const key = useKey()

    provide(menuItemGroupToken, true)

    // menuContext must exist
    const { mode, indent, handleClick } = inject(menuToken, null)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, null)

    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(mode, indent, level, !!menuItemGroupContext)
    const titleStyle = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    const onClick = (evt: Event) => {
      evt.stopPropagation()
      handleClick(key, 'itemGroup', evt)
    }

    return () => {
      const { icon, label } = props
      const prefixCls = mergedPrefixCls.value

      const iconNode = getIconNode({ slotCfg: slots.icon, propCfg: icon })
      const iconWrapper = iconNode ? <span class={`${prefixCls}-title-icon`}>{iconNode}</span> : undefined

      const labelNode = <span> {slots.label?.() ?? label}</span>

      return (
        <li class={prefixCls} onClick={onClick}>
          <div class={`${prefixCls}-title`} style={titleStyle.value}>
            {iconWrapper}
            {labelNode}
          </div>
          <ul class={`${prefixCls}-content`}>{slots.default?.()}</ul>
        </li>
      )
    }
  },
})
