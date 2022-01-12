/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import Circle from './Circle'
import Line from './Line'
import { useStatus } from './composables/useStatus'
import { progressContext } from './tokens'
import { progressProps } from './types'
import { convertPercent } from './util'

export default defineComponent({
  name: 'IxProgress',
  props: progressProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('progress')
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-progress`)

    const percent = computed(() => convertPercent(props.percent))
    const formattedSuccess = computed(() => ({ ...props.success, percent: convertPercent(props.success?.percent) }))

    const status = useStatus(props, percent, formattedSuccess)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-${status.value}`]: !!status.value,
      }
    })

    provide(progressContext, {
      props,
      config,
      slots,
      mergedPrefixCls,
      percent,
      formattedSuccess,
      status,
    })

    return () => {
      const ProgressComponent = props.type === 'line' ? Line : Circle
      return <ProgressComponent class={classes.value} />
    }
  },
})
