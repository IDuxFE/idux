/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePanelColumnProps } from './types'

import { computed, defineComponent, provide } from 'vue'

import { useDateConfig, useGlobalConfig } from '@idux/components/config'

import PanelColumn from './TimePanelColumn'
import { useOptions } from './composables/useOptions'
import { timePanelContext } from './tokens'
import { timePanelProps } from './types'

export default defineComponent({
  name: 'IxTimePanel',
  props: timePanelProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-panel`)
    const dateConfig = useDateConfig()
    const { hourOptionsProps, minuteOptionsProps, secondOptionsProps, amPmOptionsProps } = useOptions(props, dateConfig)

    provide(timePanelContext, { mergedPrefixCls })

    const columns = computed(() => {
      const result: TimePanelColumnProps[] = []
      props.hourEnabled && result.push(hourOptionsProps.value)
      props.minuteEnabled && result.push(minuteOptionsProps.value)
      props.secondEnabled && result.push(secondOptionsProps.value)
      props.use12Hours && result.push(amPmOptionsProps.value)
      return result
    })

    return () => (
      <div class={`${mergedPrefixCls.value}`}>
        {columns.value.map((item, index) => (
          <PanelColumn key={index} {...item} visible={props.visible} />
        ))}
      </div>
    )
  },
})
