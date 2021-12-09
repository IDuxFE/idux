/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimeSelectorColumnProps } from './types'

import { computed, defineComponent, provide } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import PanelColumn from './TimeSelectorColumn'
import { useOptions } from './composables/useOptions'
import { timeSelectorContext } from './tokens'
import { timeSelectorProps } from './types'

export default defineComponent({
  name: 'IxTimeSelector',
  props: timeSelectorProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-selector`)
    const { hourOptionsProps, minuteOptionsProps, secondOptionsProps, amPmOptionsProps } = useOptions(props)

    provide(timeSelectorContext, { mergedPrefixCls })

    const columns = computed(() => {
      const result: TimeSelectorColumnProps[] = []
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
