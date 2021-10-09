/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuItemProps } from './types'
import type { Ref } from 'vue'

import { computed, defineComponent, inject, watch } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { useKey } from '@idux/components/utils'

import { menuItemGroupToken, menuSubToken, menuToken } from './token'
import { menuItemProps } from './types'
import { usePaddingLeft } from './usePaddingLeft'

export default defineComponent({
  name: 'IxMenuItem',
  props: menuItemProps,
  setup(props, { slots }) {
    const key = useKey()

    // menuContext must exist
    const { indent, mode, selectedKeys, handleItemClick } = inject(menuToken, null)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const isSelected = computed(() => selectedKeys.value.includes(key))
    watch(isSelected, selected => menuSubContext?.handleSelect(key, selected))

    const classes = useClasses(props, isSelected)

    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(mode, indent, level, menuItemGroupContext)
    const style = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    const onClick = (evt: Event) => {
      if (!props.disabled) {
        handleItemClick(key, evt)
        menuSubContext?.handleItemClick()
      }
    }

    return () => {
      const { icon, label } = props

      const iconNode = slots.icon?.() ?? icon ? <IxIcon name={icon}></IxIcon> : undefined
      const iconWrapper = iconNode ? <span class="ix-menu-item-icon">{iconNode}</span> : undefined

      const labelNode = <span> {slots.default?.() ?? label}</span>

      return (
        <li class={classes.value} style={style.value} onClick={onClick}>
          {iconWrapper}
          {labelNode}
        </li>
      )
    }
  },
})

const useClasses = (props: MenuItemProps, selected: Ref<boolean>) => {
  return computed(() => {
    return {
      'ix-menu-item': true,
      'ix-menu-item-disabled': props.disabled,
      'ix-menu-item-selected': selected.value,
    }
  })
}
