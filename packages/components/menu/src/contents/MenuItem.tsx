/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { isString } from 'lodash-es'

import { useKey } from '@idux/components/utils'

import { usePaddingLeft } from '../composables/usePaddingLeft'
import { menuItemGroupToken, menuSubToken, menuToken } from '../token'
import { menuItemProps } from '../types'
import { coverIcon } from './Utils'

export default defineComponent({
  name: 'MenuItem',
  props: menuItemProps,
  setup(props) {
    const key = useKey()

    // menuContext must exist
    const {
      props: menuProps,
      slots: menuSlots,
      mergedPrefixCls,
      indent,
      selectedKeys,
      handleSelected,
      handleClick,
    } = inject(menuToken)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const isSelected = computed(() => selectedKeys.value.includes(key))

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-item`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.data.disabled,
        [`${prefixCls}-selected`]: isSelected.value,
      })
    })

    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const mode = computed(() => menuProps.mode)
    const paddingLeft = usePaddingLeft(menuProps, mode, indent, level, menuItemGroupContext)
    const style = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    const onClick = (evt: Event) => {
      handleSelected(key)
      handleClick(key, 'item', evt)
      menuSubContext?.handleItemClick()
    }

    return () => {
      const { disabled, icon, label, customIcon, customLabel } = props.data

      const iconRender = customIcon ?? 'itemIcon'
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender
      const labelRender = customLabel ?? 'itemLabel'
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender

      const slotProps = iconSlot || labelSlot ? { ...props.data, selected: isSelected.value } : undefined
      const iconNode = coverIcon(iconSlot, slotProps!, icon)
      const labelNode = labelSlot ? labelSlot(slotProps!) : label
      const customAdditional = menuProps.customAdditional
        ? menuProps.customAdditional({ data: props.data, index: props.index })
        : undefined
      return (
        <li
          class={classes.value}
          style={style.value}
          aria-label={label}
          aria-selected={isSelected.value}
          role="menuitem"
          onClick={disabled ? undefined : onClick}
          {...customAdditional}
        >
          {iconNode}
          <span>{labelNode}</span>
        </li>
      )
    }
  },
})
