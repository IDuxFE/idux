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
    const level = menuSubContext ? menuSubContext.level + 1 : 1

    const isSelected = computed(() => selectedKeys.value.includes(key))

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-level-${level}`]: true,
        [`${prefixCls}-item-disabled`]: props.data.disabled,
        [`${prefixCls}-item-selected`]: isSelected.value,
      })
    })

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
      const { disabled, icon, label, customIcon, customLabel, customSuffix } = props.data

      const iconRender = customIcon ?? 'itemIcon'
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender
      const labelRender = customLabel ?? 'itemLabel'
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender
      const suffixRender = customSuffix ?? 'itemSuffix'
      const suffixSlot = isString(suffixRender) ? menuSlots[suffixRender] : suffixRender

      const slotProps = iconSlot || labelSlot ? { ...props.data, selected: isSelected.value } : undefined
      const iconNode = coverIcon(iconSlot, slotProps!, icon)
      const labelNode = labelSlot ? labelSlot(slotProps!) : label
      const customAdditional = menuProps.customAdditional
        ? menuProps.customAdditional({ data: props.data, index: props.index })
        : undefined
      const suffixNode = coverIcon(suffixSlot, slotProps!, props.data.suffix)
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
          {suffixNode && <span class={`${mergedPrefixCls.value}-item-suffix`}>{suffixNode}</span>}
        </li>
      )
    }
  },
})
