/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { convertStringVNode } from '@idux/components/utils'

import { dividerProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxDivider',
  props: dividerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('divider')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-divider`)
    const config = useGlobalConfig('divider')

    const classes = computed(() => {
      const {
        dashed = config.dashed,
        label,
        labelPlacement = config.labelPlacement,
        plain = config.plain,
        size = config.size,
        vertical,
      } = props

      const withLabel = !!label || !!slots.default
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [`${prefixCls}`]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-dashed`]: dashed,
        [`${prefixCls}-horizontal`]: !vertical,
        [`${prefixCls}-vertical`]: vertical,
        [`${prefixCls}-plain`]: withLabel && plain,
        [`${prefixCls}-with-label`]: withLabel,
        [`${prefixCls}-with-label-${labelPlacement}`]: withLabel,
      })
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      const labelNode = convertStringVNode(slots.default, props.label)
      return <div class={classes.value}>{labelNode && <span class={`${prefixCls}-label`}>{labelNode}</span>}</div>
    }
  },
})
