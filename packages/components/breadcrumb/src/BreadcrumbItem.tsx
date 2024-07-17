/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { Logger } from '@idux/cdk/utils'

import { breadcrumbToken } from './token'
import { breadcrumbItemProps } from './types'

export default defineComponent({
  name: 'IxBreadcrumbItem',
  props: breadcrumbItemProps,
  setup(props, { slots }) {
    const breadcrumbInjection = inject(breadcrumbToken, null)
    if (!breadcrumbInjection) {
      if (__DEV__) {
        Logger.error('components/breadcrumb', '`breadcrumb-item` must be placed inside `breadcrumb`.')
      }
      return () => null
    }

    const { mergedPrefixCls, separatorRef } = breadcrumbInjection
    return () => (
      <li class={`${mergedPrefixCls.value}-item`}>
        <span class={`${mergedPrefixCls.value}-item-link`}>{slots.default?.()}</span>
        <span class={`${mergedPrefixCls.value}-item-separator`} aria-hidden="true">
          {slots.separator ? slots.separator() : (props.separator ?? separatorRef.value)}
        </span>
      </li>
    )
  },
})
