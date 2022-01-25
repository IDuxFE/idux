/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { buttonToken } from './token'
import { buttonGroupProps } from './types'

export default defineComponent({
  name: 'IxButtonGroup',
  props: buttonGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-button-group`)

    provide(buttonToken, props)

    return () => <div class={mergedPrefixCls.value}>{slots.default && slots.default()}</div>
  },
})
