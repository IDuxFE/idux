/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass } from 'vue'

import { isObject } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { layoutProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxLayout',
  props: layoutProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('layout')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout`)
    const mergedFixed = computed(() => {
      const { fixed } = props
      if (isObject(fixed)) {
        const { header = false, sider = false } = fixed
        return { header, sider }
      }
      return { header: fixed, sider: fixed }
    })
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { header, sider } = mergedFixed.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-fixed-header`]: header,
        [`${prefixCls}-fixed-sider`]: sider,
        [`${prefixCls}-float-sider`]: props.floatSider,
      })
    })

    return () => {
      return <section class={classes.value}>{slots.default?.()}</section>
    }
  },
})
