/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

import { menuSubToken, menuToken } from '../../token'
import { coverIcon } from '../Utils'

export default defineComponent({
  name: 'MenuSubLabel',
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
      const { icon, label, slots = {}, customIcon, customLabel, customSuffix } = props.data
      if (__DEV__ && (slots.icon || slots.label || slots.suffix)) {
        Logger.warn(
          'components/menu',
          '`slots` of `MenuSub` is deprecated, please use `customIcon`, `customLabel` and `customSuffix` instead',
        )
      }
      const iconRender = customIcon ?? slots.icon ?? 'subIcon'
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender
      const labelRender = customLabel ?? slots.label ?? 'subLabel'
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender
      const suffixRender = customSuffix ?? slots.suffix ?? 'subSuffix'
      const suffixSlot = isString(suffixRender) ? menuSlots[suffixRender] : suffixRender

      const slotProps =
        iconSlot || labelSlot || suffixSlot
          ? { ...props.data, expanded: isExpanded.value, selected: isSelected.value }
          : undefined
      const iconNode = coverIcon(iconSlot, slotProps!, icon)
      const labelNode = labelSlot ? labelSlot(slotProps!) : label
      const suffixNode = coverIcon(suffixSlot, slotProps!, suffix.value, rotate.value)

      const prefixCls = `${mergedPrefixCls.value}-sub-label`
      return (
        <div class={prefixCls} style={style.value} {...events.value}>
          {iconNode}
          <span>{labelNode}</span>
          {suffixNode && <span class={`${prefixCls}-suffix`}>{suffixNode}</span>}
        </div>
      )
    }
  },
})
