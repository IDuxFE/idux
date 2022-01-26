/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass } from 'vue'

import { Logger } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { covertLabelVNode } from '@idux/components/utils'

import { dividerProps } from './types'

export default defineComponent({
  name: 'IxDivider',
  props: dividerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-divider`)
    const config = useGlobalConfig('divider')

    const classes = computed(() => {
      const {
        dashed = config.dashed,
        label,
        labelPlacement = config.labelPlacement,
        plain = config.plain,
        position,
        size = config.size,
        type,
        vertical,
      } = props

      __DEV__ &&
        position &&
        Logger.warn('components/divider', '`position` was deprecated, please use `labelPlacement` instead')
      __DEV__ && type && Logger.warn('components/divider', '`type` was deprecated, please use `vertical` instead')

      const withLabel = !!label || !!slots.default
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-dashed`]: dashed,
        [`${prefixCls}-horizontal`]: !(type === 'vertical' || vertical),
        [`${prefixCls}-vertical`]: type === 'vertical' || vertical,
        [`${prefixCls}-plain`]: withLabel && plain,
        [`${prefixCls}-with-label`]: withLabel,
        [`${prefixCls}-with-label-${position || labelPlacement}`]: withLabel,
      })
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      const labelNode = covertLabelVNode(slots.default, props.label)
      return <div class={classes.value}>{labelNode && <span class={`${prefixCls}-label`}>{labelNode}</span>}</div>
    }
  },
})
