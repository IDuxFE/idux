/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, toRef } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { breadcrumbToken } from './token'
import { breadcrumbProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxBreadcrumb',
  props: breadcrumbProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('breadcrumb')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-breadcrumb`)

    provide(breadcrumbToken, {
      mergedPrefixCls,
      separatorRef: toRef(props, 'separator'),
    })

    return () => (
      <nav class={[mergedPrefixCls.value, globalHashId.value, hashId.value]} aria-label="Breadcrumb">
        <ol>{slots.default?.()}</ol>
      </nav>
    )
  },
})
