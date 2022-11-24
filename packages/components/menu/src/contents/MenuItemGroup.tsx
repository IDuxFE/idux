/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, provide } from 'vue'

import { isString } from 'lodash-es'

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
    const {
      props: menuProps,
      slots: menuSlots,
      mergedPrefixCls,
      mergedGetKey,
      indent,
      handleClick,
    } = inject(menuToken)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, null)

    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const mode = computed(() => menuProps.mode)
    const paddingLeft = usePaddingLeft(menuProps, mode, indent, level, !!menuItemGroupContext)
    const labelStyle = computed(() => ({ paddingLeft: paddingLeft.value }))

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-item-group`]: true,
        [`${prefixCls}-level-${level}`]: true,
      })
    })

    const onClick = (evt: Event) => {
      handleClick(key, 'itemGroup', evt)
    }

    return () => {
      const { icon, label, children, customIcon, customLabel } = props.data

      const iconRender = customIcon ?? 'itemGroupIcon'
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender
      const labelRender = customLabel ?? 'itemGroupLabel'
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender

      const slotProps = props.data
      const iconNode = coverIcon(iconSlot, slotProps, icon)
      const labelNode = labelSlot ? labelSlot(slotProps) : label

      const prefixCls = `${mergedPrefixCls.value}-item-group`
      const customAdditional = menuProps.customAdditional
        ? menuProps.customAdditional({ data: props.data, index: props.index })
        : undefined
      return (
        <li class={classes.value} aria-label={label} {...customAdditional}>
          <div class={`${prefixCls}-label`} style={labelStyle.value} onClick={onClick}>
            {iconNode}
            <span>{labelNode}</span>
          </div>
          <ul class={`${prefixCls}-content`}>{coverChildren(children, mergedGetKey.value)}</ul>
        </li>
      )
    }
  },
})
