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
  setup(_, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout`)

    return () => {
      return <section class={mergedPrefixCls.value}>{slots.default?.()}</section>
    }
  },
})
