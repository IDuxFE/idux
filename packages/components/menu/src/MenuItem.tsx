/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, watch } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { useKey } from '@idux/components/utils'

import { menuItemGroupToken, menuSubToken, menuToken } from './token'
import { menuItemProps } from './types'
import { usePaddingLeft } from './usePaddingLeft'

export default defineComponent({
  name: 'IxMenuItem',
  props: menuItemProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-menu-item`)

    const key = useKey()

    // menuContext must exist
    const { indent, mode, selectedKeys, handleClick } = inject(menuToken, null)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const isSelected = computed(() => selectedKeys.value.includes(key))
    watch(isSelected, selected => menuSubContext?.handleSelect(key, selected))

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-selected`]: isSelected.value,
      })
    })

    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(mode, indent, level, menuItemGroupContext)
    const style = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    const onClick = (evt: Event) => {
      handleClick(key, 'item', evt)
      menuSubContext?.handleItemClick()
    }

    return () => {
      const { disabled, icon, label } = props
      const prefixCls = mergedPrefixCls.value

      const iconNode = slots.icon?.() ?? icon ? <IxIcon name={icon}></IxIcon> : undefined
      const iconWrapper = iconNode ? <span class={`${prefixCls}-icon`}>{iconNode}</span> : undefined

      const labelNode = <span> {slots.default?.() ?? label}</span>

      return (
        <li class={classes.value} style={style.value} onClick={disabled ? undefined : onClick}>
          {iconWrapper}
          {labelNode}
        </li>
      )
    }
  },
})
