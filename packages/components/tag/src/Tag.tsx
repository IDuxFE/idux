/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { isNil } from 'lodash-es'

import { useKey } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { isPresetColor, isStatusColor } from '@idux/components/utils'

import { type TagContext, tagToken } from './token'
import { tagProps } from './types'

export default defineComponent({
  name: 'IxTag',
  props: tagProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('tag')
    const key = useKey()

    const {
      props: groupProps,
      mergedClosedKeys,
      handleTagClick,
      handleTagClose,
    } = inject<Partial<TagContext>>(tagToken, {})

    const mergedPrefixCls = computed(() => `${common.prefixCls}-tag`)

    const isPresetOrStatusColor = computed(() => {
      const color = props.color
      if (!color) {
        return false
      }
      return isPresetColor(color) || isStatusColor(color)
    })

    const handleClick = (evt: MouseEvent) => {
      if (groupProps?.clickable) {
        handleTagClick?.(key, evt)
      }
    }

    const handleClose = (evt: MouseEvent) => {
      if (groupProps?.closable) {
        evt.stopPropagation()
        handleTagClose?.(key)
      }
    }

    const classes = computed(() => {
      const {
        shape = groupProps?.shape || config.shape,
        bordered = groupProps?.bordered,
        color,
        filled = groupProps?.filled,
        number,
        status,
      } = props
      const prefixCls = mergedPrefixCls.value
      const isPreset = isPresetOrStatusColor.value
      const isNumeric = !isNil(number)

      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${status}`]: true,
        [`${prefixCls}-${shape}`]: !isNumeric && shape,
        [`${prefixCls}-${color}`]: isPreset,
        [`${prefixCls}-bordered`]: bordered,
        [`${prefixCls}-filled`]: filled,
        [`${prefixCls}-numeric`]: isNumeric,
        [`${prefixCls}-has-color`]: !isPreset && color,
      })
    })
    const style = computed(() => ({
      backgroundColor: isPresetOrStatusColor.value ? undefined : props.color,
    }))

    return () => {
      if (mergedClosedKeys?.value.includes(key)) {
        return null
      }
      const prefixCls = mergedPrefixCls.value
      const { icon, number } = props
      const { closable, closeIcon } = groupProps || {}
      const icoNode = slots.icon ? slots.icon() : icon && <IxIcon name={icon}></IxIcon>
      let suffixNode = slots.suffix ? slots.suffix() : closable && <IxIcon name={closeIcon}></IxIcon>
      if (closable) {
        suffixNode = (
          <span class={`${prefixCls}-close-icon`} onClick={handleClose}>
            {suffixNode}
          </span>
        )
      }
      return (
        <span class={classes.value} style={style.value} onClick={handleClick}>
          {renderNumericPrefix(prefixCls, number)}
          {icoNode}
          <span class={`${prefixCls}-content`}>{slots.default?.()}</span>
          {suffixNode}
        </span>
      )
    }
  },
})

function renderNumericPrefix(prefixCls: string, number: number | undefined) {
  if (isNil(number)) {
    return null
  }
  return <span class={`${prefixCls}-numeric-prefix`}>{number > 9 ? '9+' : number}</span>
}
