/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { flattenNode, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { stepperItemKey, stepperToken } from './token'
import { stepperProps } from './types'

export default defineComponent({
  name: 'IxStepper',
  props: stepperProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-stepper`)
    const config = useGlobalConfig('stepper')

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { size = config.size, labelPlacement = config.labelPlacement, percent, vertical } = props
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-label-${labelPlacement}`]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-vertical`]: vertical,
        [`${prefixCls}-with-percent`]: percent != null,
      })
    })

    const [activeKey, setActiveKey] = useControlledProp(props, 'activeKey')

    provide(stepperToken, { props, slots, activeKey, setActiveKey })

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
