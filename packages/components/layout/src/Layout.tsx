/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { layoutProps } from './types'

export default defineComponent({
  name: 'IxLayout',
  props: layoutProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout`)
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-out-sider`]: props.outSider,
      }
    })
    return () => {
      return <section class={classes.value}>{slots.default?.()}</section>
    }
  },
})
