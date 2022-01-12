/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { menuSubToken, menuToken } from '../../token'
import { coverIcon } from '../Utils'

export default defineComponent({
  setup() {
    const { slots: menuSlots, config, mergedPrefixCls } = inject(menuToken)!
    const { props, isExpanded, isSelected, changeExpanded, handleMouseEvent, mode, paddingLeft } = inject(menuSubToken)!

    const suffix = computed(() => props.data.suffix ?? config.suffix)
    const rotate = computed(() => {
      if (mode.value === 'inline') {
        return isExpanded.value ? -90 : 90
      }
      return 0
    })

    const events = computed(() => {
      if (props.data.disabled) {
        return undefined
      }
      if (mode.value === 'inline') {
        return {
          onClick: () => changeExpanded(!isExpanded.value),
        }
      } else {
        return {
          onMouseenter: () => handleMouseEvent(true),
          onMouseleave: () => handleMouseEvent(false),
        }
      }
    })

    const style = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    return () => {
      const { icon, label, slots = {} } = props.data
      const iconSlot = isString(slots.icon) ? menuSlots[slots.icon] : slots.icon
      const labelSlot = isString(slots.label) ? menuSlots[slots.label] : slots.label
      const suffixSlot = isString(slots.suffix) ? menuSlots[slots.suffix] : slots.suffix

      const slotProps =
        iconSlot || labelSlot || suffixSlot
          ? { ...props.data, expanded: isExpanded.value, selected: isSelected.value }
          : undefined

      const iconNode = coverIcon(iconSlot, slotProps!, icon)
      const labelNode = labelSlot ? labelSlot(slotProps!) : label
      const suffixNode = coverIcon(suffixSlot, slotProps!, suffix.value, rotate.value)

      const prefixCls = `${mergedPrefixCls.value}-sub-title`
      return (
        <div class={prefixCls} style={style.value} {...events.value}>
          {iconNode && <span class={`${prefixCls}-icon`}>{iconNode}</span>}
          <span class={`${prefixCls}-content`}>{labelNode}</span>
          {suffixNode && <span class={`${prefixCls}-suffix`}>{suffixNode}</span>}
        </div>
      )
    }
  },
})
