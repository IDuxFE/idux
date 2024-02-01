/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, reactive, toRefs } from 'vue'

import { flattenNode, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { stepperItemKey, stepperToken } from './token'
import { stepperProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxStepper',
  props: stepperProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('stepper')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-stepper`)
    const config = useGlobalConfig('stepper')

    const size = computed(() => props.size ?? config.size)
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { labelPlacement = config.labelPlacement, percent, vertical } = props
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-label-${labelPlacement}`]: true,
        [`${prefixCls}-${size.value}`]: true,
        [`${prefixCls}-vertical`]: vertical,
        [`${prefixCls}-with-percent`]: percent != null,
      })
    })

    const [activeKey, setActiveKey] = useControlledProp(props, 'activeKey')

    provide(stepperToken, { props: reactive({ ...toRefs(props), size }), slots, activeKey, setActiveKey })

    return () => {
      const children = flattenNode(slots.default?.(), { key: stepperItemKey }).map((item, index) => {
        if (item.key == null) {
          item.key = index + 1
        }
        return item
      })
      return <div class={classes.value}>{children}</div>
    }
  },
})
