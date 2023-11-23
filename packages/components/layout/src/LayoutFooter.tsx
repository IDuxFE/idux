/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { layoutFooterProps } from './types'

export default defineComponent({
  name: 'IxLayoutFooter',
  props: layoutFooterProps,
  setup(_, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId } = useThemeToken('layout')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-footer`)
    return () => {
      const prefixCls = mergedPrefixCls.value
      return <footer class={[prefixCls, globalHashId.value, hashId.value]}>{slots.default?.()}</footer>
    }
  },
})
