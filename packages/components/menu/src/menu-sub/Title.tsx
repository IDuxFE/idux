/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { menuSubToken, menuToken } from '../token'
import { getIconNode } from '../utils'

export default defineComponent({
  setup() {
    const { mergedPrefixCls } = inject(menuToken)!
    const { props, slots, config, isExpanded, changeExpanded, handleMouseEvent, mode, paddingLeft } =
      inject(menuSubToken)!

    const suffix = computed(() => props.suffix ?? config.suffix)

    const events = computed(() => {
      if (props.disabled) {
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

    const rotate = computed(() => {
      if (mode.value === 'inline') {
        const suffixRotates = props.suffixRotates ?? config.suffixRotates
        return suffixRotates[isExpanded.value ? 0 : 1]
      }
      return 0
    })

    const style = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    return () => {
      const { icon, label } = props
      const prefixCls = mergedPrefixCls.value

      const iconNode = getIconNode(slots.icon, icon)
      const iconWrapper = iconNode ? <span class={`${prefixCls}-sub-title-icon`}>{iconNode}</span> : undefined

      const labelNode = <span> {slots.label?.() ?? label}</span>

      const suffixNode =
        slots.suffix?.({ rotate: rotate.value }) ?? suffix.value ? (
          <IxIcon name={suffix.value} rotate={rotate.value}></IxIcon>
        ) : undefined
      const suffixWrapper = suffixNode ? <span class={`${prefixCls}-sub-title-suffix`}>{suffixNode}</span> : undefined

      return (
        <div class={`${prefixCls}-sub-title`} style={style.value} {...events.value}>
          {iconWrapper}
          {labelNode}
          {suffixWrapper}
        </div>
      )
    }
  },
})
