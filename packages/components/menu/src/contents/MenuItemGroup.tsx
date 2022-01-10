/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide } from 'vue'

import { isString } from 'lodash-es'

import { useKey } from '@idux/components/utils'

import { usePaddingLeft } from '../composables/usePaddingLeft'
import { menuItemGroupToken, menuSubToken, menuToken } from '../token'
import { MenuItemGroup, menuItemGroupProps } from '../types'
import { coverChildren, coverIcon } from './Utils'

export default defineComponent({
  props: menuItemGroupProps,
  setup(props) {
    const key = useKey()

    provide(menuItemGroupToken, true)

    // menuContext must exist
    const { slots: menuSlots, mergedPrefixCls, mode, indent, handleClick } = inject(menuToken)!
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
      const { icon, label, children } = props
      const slotProps = { ...props, key } as MenuItemGroup

      const slots = props.slots || {}
      const iconSlot = isString(slots.icon) ? menuSlots[slots.icon] : slots.icon
      const iconNode = coverIcon(iconSlot, slotProps, icon)
      const labelSlot = isString(slots.label) ? menuSlots[slots.label] : slots.label

      const prefixCls = `${mergedPrefixCls.value}-item-group`
      return (
        <li class={prefixCls} onClick={onClick}>
          <div class={`${prefixCls}-title`} style={titleStyle.value}>
            {iconNode && <span class={`${prefixCls}-title-icon`}>{iconNode}</span>}
            {<span> {labelSlot ? labelSlot(slotProps) : label}</span>}
          </div>
          <ul class={`${prefixCls}-content`}>{coverChildren(children)}</ul>
        </li>
      )
    }
  },
})
