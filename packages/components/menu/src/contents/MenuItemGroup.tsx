/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'
import { useKey } from '@idux/components/utils'

import { usePaddingLeft } from '../composables/usePaddingLeft'
import { menuItemGroupToken, menuSubToken, menuToken } from '../token'
import { menuItemGroupProps } from '../types'
import { coverChildren, coverIcon } from './Utils'

export default defineComponent({
  name: 'MenuItemGroup',
  props: menuItemGroupProps,
  setup(props) {
    const key = useKey()

    provide(menuItemGroupToken, true)

    // menuContext must exist
    const { props: menuProps, slots: menuSlots, mergedPrefixCls, mode, indent, handleClick } = inject(menuToken)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, null)

    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(menuProps, mode, indent, level, !!menuItemGroupContext)
    const labelStyle = computed(() => ({ paddingLeft: paddingLeft.value }))

    const onClick = (evt: Event) => {
      evt.stopPropagation()
      handleClick(key, 'itemGroup', evt)
    }

    return () => {
      const { additional, icon, label, children, slots = {}, customIcon, customLabel } = props.data
      if (__DEV__ && (slots.icon || slots.label)) {
        Logger.warn(
          'components/menu',
          '`slots` of `MenuItemGroup` was deprecated, please use `customIcon` and `customLabel` instead',
        )
      }
      const iconRender = customIcon ?? slots.icon ?? 'itemGroupIcon'
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender
      const labelRender = customLabel ?? slots.label ?? 'itemGroupLabel'
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender

      const slotProps = props.data
      const iconNode = coverIcon(iconSlot, slotProps, icon)
      const labelNode = labelSlot ? labelSlot(slotProps) : label

      const prefixCls = `${mergedPrefixCls.value}-item-group`
      return (
        <li class={prefixCls} {...additional} onClick={onClick}>
          <div class={`${prefixCls}-label`} style={labelStyle.value}>
            {iconNode}
            <span>{labelNode}</span>
          </div>
          <ul class={`${prefixCls}-content`}>{coverChildren(children)}</ul>
        </li>
      )
    }
  },
})
