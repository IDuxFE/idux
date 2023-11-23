/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import Circle from './Circle'
import Line from './Line'
import { progressContext } from './tokens'
import { progressProps, progressStatus } from './types'
import { convertPercent, fullPercent } from './util'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxProgress',
  props: progressProps,
  setup(props, { slots }) {
    const { globalHashId, hashId, registerToken } = useThemeToken('progress')
    registerToken(getThemeTokens)

    const config = useGlobalConfig('progress')
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-progress`)

    const percent = computed(() => convertPercent(props.percent))
    const successPercent = computed(() => convertPercent(props.success?.percent))
    const mergedSize = computed(() => props.size ?? config.size)
    const mergedStrokeLinecap = computed(() => props.strokeLinecap ?? config.strokeLinecap)

    const status = computed(() => {
      if (
        !progressStatus.includes(props.status!) &&
        (percent.value >= fullPercent || successPercent.value >= fullPercent)
      ) {
        return 'success'
      }

      return props.status ?? 'normal'
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-${status.value}`]: !!status.value,
      }
    })

    provide(progressContext, {
      props,
      config,
      mergedPrefixCls,
      mergedSize,
      mergedStrokeLinecap,
      percent,
      successPercent,
      status,
    })

    return () => {
      const ProgressComponent = props.type === 'line' ? Line : Circle
      return <ProgressComponent v-slots={slots} class={classes.value} />
    }
  },
})
