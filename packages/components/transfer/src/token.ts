/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferOperationsContext } from './composables/useTransferOperations'
import type { TransferBindings, TransferListInstance, TransferProps, TransferSlots } from './types'
import type { TransferConfig } from '@idux/components/config'
import type { TransferLocale } from '@idux/components/locales'
import type { GetKeyFn } from '@idux/components/utils'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

interface TransferContext {
  mergedPrefixCls: ComputedRef<string>
  props: TransferProps
  slots: TransferSlots
  config: TransferConfig
  locale: TransferLocale
  sourceTransferListRef: Ref<TransferListInstance | undefined>
  targetTransferListRef: Ref<TransferListInstance | undefined>
  showSelectAll: ComputedRef<boolean>
  getKey: ComputedRef<GetKeyFn>
}

export interface TransferListContext {
  mergedPrefixCls: ComputedRef<string>
}

export const transferContext: InjectionKey<TransferContext> = Symbol('transferContext')
export const transferListContext: InjectionKey<TransferListContext> = Symbol('transferListContext')

// public token
export const TRANSFER_SOURCE_TOKEN: InjectionKey<TransferBindings> = Symbol('TRANSFER_SOURCE_TOKEN')
export const TRANSFER_TARGET_TOKEN: InjectionKey<TransferBindings> = Symbol('TRANSFER_TARGET_TOKEN')
export const TRANSFER_OPERATIONS_TOKEN: InjectionKey<TransferOperationsContext> = Symbol('TRANSFER_OPERATIONS_TOKEN')
