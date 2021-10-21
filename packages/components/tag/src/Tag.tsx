/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

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
      const { color, checkable, shape = config.shape, checked } = props
      const presetFlag = isPresetOrStatusColor.value
      const prefixCls = mergedPrefixCls.value
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-${color}`]: presetFlag,
        [`${prefixCls}-has-color`]: !presetFlag && color,
        [`${prefixCls}-checkable`]: checkable,
        [`${prefixCls}-checked`]: checked,
      }
    })
    const style = computed(() => {
      return { backgroundColor: isPresetOrStatusColor.value ? undefined : props.color }
    })

    return () => {
      const { icon } = props
      const icoNode = slots.icon ? slots.icon() : icon && <IxIcon name={icon}></IxIcon>
      return (
        <span class={classes.value} style={style.value}>
          {icoNode}
          <span class={`${mergedPrefixCls.value}-content`}>{slots.default?.()}</span>
        </span>
      )
    }
  },
})
