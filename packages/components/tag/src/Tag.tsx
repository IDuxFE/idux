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
    const config = useGlobalConfig('tag')
    const common = useGlobalConfig('common')
    const prefixCls = computed(() => `${common.prefixCls}-tag`)

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
      return {
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-${shape}`]: shape,
        [`${prefixCls.value}-${color}`]: presetFlag,
        [`${prefixCls.value}-has-color`]: !presetFlag && color,
        [`${prefixCls.value}-checkable`]: checkable,
        [`${prefixCls.value}-checked`]: checked,
      }
    })
    const style = computed(() => {
      return { backgroundColor: isPresetOrStatusColor.value ? undefined : props.color }
    })

    return () => {
      const _prefixCls = prefixCls.value
      const { icon } = props
      const icoNode = slots.icon ? slots.icon() : icon && <IxIcon name={icon}></IxIcon>
      return (
        <span class={classes.value} style={style.value}>
          {icoNode}
          <span class={`${_prefixCls}-content`}>{slots.default?.()}</span>
        </span>
      )
    }
  },
})
