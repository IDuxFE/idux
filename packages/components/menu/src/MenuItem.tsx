import type { Ref } from 'vue'
import type { MenuItemProps } from './types'

import { computed, defineComponent, inject, watch } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { useKey } from '@idux/components/utils'
import { menuItemGroupToken, menuToken, menuSubToken } from './token'
import { menuItemProps } from './types'
import { usePaddingLeft } from './usePaddingLeft'

export default defineComponent({
  name: 'IxMenuItem',
  props: menuItemProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')

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
      const iconWrapper = iconNode ? <span class={`${prefixCls}-menu-item-icon`}>{iconNode}</span> : undefined

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
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    return {
      [`${prefixCls}-menu-item`]: true,
      [`${prefixCls}-menu-item-disabled`]: props.disabled,
      [`${prefixCls}-menu-item-selected`]: selected.value,
    }
  })
}
