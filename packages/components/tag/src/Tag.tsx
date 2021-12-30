/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { StyleValue } from 'vue'

import { computed, defineComponent, normalizeClass } from 'vue'

import { isNil } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { isPresetColor, isStatusColor } from '@idux/components/utils'

import { tagProps } from './types'

export default defineComponent({
  name: 'IxTag',
  props: tagProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tag`)
    const config = useGlobalConfig('tag')

    const isPresetOrStatusColor = computed(() => {
      const color = props.color
      if (!color) {
        return false
      }
      return isPresetColor(color) || isStatusColor(color)
    })

    const classes = computed(() => {
      const { shape = config.shape, color, number } = props
      const prefixCls = mergedPrefixCls.value
      const isPreset = isPresetOrStatusColor.value
      const isNumeric = !isNil(number)

      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${shape}`]: !isNumeric && shape,
        [`${prefixCls}-${color}`]: isPreset,
        [`${prefixCls}-numeric`]: isNumeric,
        [`${prefixCls}-has-color`]: !isPreset && color,
      })
    })
    const style = computed(() => ({
      backgroundColor: isPresetOrStatusColor.value ? undefined : props.color,
    }))

    return () => {
      const prefixCls = mergedPrefixCls.value
      const { icon, number } = props
      const icoNode = slots.icon ? slots.icon() : icon && <IxIcon name={icon}></IxIcon>
      return (
        <span class={classes.value} style={style.value}>
          {renderNumericPrefix(prefixCls, number, style.value)}
          {icoNode}
          <span class={`${prefixCls}-content`}>{slots.default?.()}</span>
        </span>
      )
    }
  },
})

function renderNumericPrefix(prefixCls: string, number: number | undefined, style: StyleValue) {
  if (isNil(number)) {
    return null
  }

  return (
    <span class={`${prefixCls}-numeric-prefix`} style={style}>
      {number}
    </span>
  )
}
