/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreadcrumbProps } from './types'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface BreadcrumbContext {
  mergedPrefixCls: ComputedRef<string>
  separatorRef: Ref<BreadcrumbProps['separator']>
}

export const breadcrumbToken: InjectionKey<BreadcrumbContext> = Symbol('breadcrumbToken')
