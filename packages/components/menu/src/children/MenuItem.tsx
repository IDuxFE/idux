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
  props: menuItemProps,
  setup(props) {
    const key = useKey()

    // menuContext must exist
    const {
      slots: menuSlots,
      mergedPrefixCls,
      indent,
      mode,
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
    const paddingLeft = usePaddingLeft(mode, indent, level, menuItemGroupContext)
    const style = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    const onClick = (evt: Event) => {
      evt.stopPropagation()
      handleSelected(key)
      handleClick(key, 'item', evt)
      menuSubContext?.handleItemClick()
    }

    return () => {
      const { additional, disabled, icon, label, slots = {} } = props.data
      const iconSlot = isString(slots.icon) ? menuSlots[slots.icon] : slots.icon
      // <IxMenuItem key="key">label</IxMenuItem>
      let labelSlot = slots.label ?? slots.default
      if (isString(labelSlot)) {
        labelSlot = menuSlots[labelSlot]
      }

      const slotProps = iconSlot || labelSlot ? { ...props.data, selected: isSelected.value } : undefined
      const iconNode = coverIcon(iconSlot, slotProps!, icon)
      const labelNode = labelSlot ? labelSlot(slotProps) : label

      const prefixCls = `${mergedPrefixCls.value}-item`
      return (
        <li class={classes.value} style={style.value} {...additional} onClick={disabled ? undefined : onClick}>
          {iconNode && <span class={`${prefixCls}-icon`}>{iconNode}</span>}
          <span class={`${prefixCls}-content`}>{labelNode}</span>
        </li>
      )
    }
  },
})
