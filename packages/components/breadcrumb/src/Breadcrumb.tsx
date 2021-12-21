/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, toRef } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { breadcrumbToken } from './token'
import { breadcrumbProps } from './types'

export default defineComponent({
  name: 'IxBreadcrumb',
  props: breadcrumbProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-breadcrumb`)

    provide(breadcrumbToken, {
      mergedPrefixCls,
      separatorRef: toRef(props, 'separator'),
    })

    return () => (
      <nav class={mergedPrefixCls.value} aria-label="Breadcrumb">
        <ol>{slots.default?.()}</ol>
      </nav>
    )
  },
})
