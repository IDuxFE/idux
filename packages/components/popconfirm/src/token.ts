/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopconfirmProps } from './types'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface PopconfirmContext {
  props: PopconfirmProps
  locale: Locale
  mergedPrefixCls: ComputedRef<string>
  visible: ComputedRef<boolean>
  cancelLoading: Ref<boolean>
  okLoading: Ref<boolean>
  cancel: (evt?: unknown) => Promise<void>
  ok: (evt?: unknown) => Promise<void>
}

export const popconfirmToken: InjectionKey<PopconfirmContext> = Symbol('popconfirmToken')
