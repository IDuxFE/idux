/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { layoutHeaderProps } from './types'

export default defineComponent({
  name: 'IxLayoutHeader',
  props: layoutHeaderProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-header`)
    return () => {
      const prefixCls = mergedPrefixCls.value
      return <header class={prefixCls}>{slots.default?.()}</header>
    }
  },
})
