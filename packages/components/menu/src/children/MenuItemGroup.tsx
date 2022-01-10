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
import { menuItemGroupProps } from '../types'
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
      const { additional, icon, label, children, slots = {} } = props.data

      const iconSlot = isString(slots.icon) ? menuSlots[slots.icon] : slots.icon
      const labelSlot = isString(slots.label) ? menuSlots[slots.label] : slots.label

      const slotProps = props.data
      const iconNode = coverIcon(iconSlot, slotProps, icon)
      const labelNode = labelSlot ? labelSlot(slotProps) : label

      const prefixCls = `${mergedPrefixCls.value}-item-group`
      return (
        <li class={prefixCls} {...additional} onClick={onClick}>
          <div class={`${prefixCls}-title`} style={titleStyle.value}>
            {iconNode && <span class={`${prefixCls}-title-icon`}>{iconNode}</span>}
            {<span class={`${prefixCls}-title-content`}> {labelNode}</span>}
          </div>
          <ul class={`${prefixCls}-content`}>{coverChildren(children)}</ul>
        </li>
      )
    }
  },
})
