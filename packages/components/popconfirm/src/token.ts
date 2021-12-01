/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopconfirmProps } from './types'
import type { CommonConfig, PopconfirmConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface PopconfirmContext {
  props: PopconfirmProps
  slots: Slots
  common: CommonConfig
  config: PopconfirmConfig
  mergedPrefixCls: ComputedRef<string>
  visible: ComputedRef<boolean>
  cancelLoading: Ref<boolean>
  okLoading: Ref<boolean>
  cancel: (evt?: unknown) => Promise<void>
  ok: (evt?: unknown) => Promise<void>
}

export const popconfirmToken: InjectionKey<PopconfirmContext> = Symbol('popconfirmToken')
