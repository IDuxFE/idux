/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ModalBindings, ModalProps, ModalProviderRef } from './types'
import type { CommonConfig, ModalConfig } from '@idux/components/config'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface ModalContext {
  props: ModalProps
  slots: Slots
  common: CommonConfig
  locale: Locale
  config: ModalConfig
  mergedPrefixCls: ComputedRef<string>
  visible: ComputedRef<boolean>
  animatedVisible: Ref<boolean | undefined>
  mergedVisible: ComputedRef<boolean>
  cancelLoading: Ref<boolean>
  okLoading: Ref<boolean>
  currentZIndex: ComputedRef<number>
}

export const modalToken: InjectionKey<ModalContext> = Symbol('modalToken')

// public token
export const MODAL_TOKEN: InjectionKey<ModalBindings> = Symbol('MODAL_TOKEN')
export const MODAL_PROVIDER_TOKEN: InjectionKey<ModalProviderRef> = Symbol('MODAL_PROVIDER_TOKEN')
