/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetRowKey } from './composables/useGetRowKey'
import type { TransferOperationsContext } from './composables/useTransferOperations'
import type { TransferBindings, TransferDataStrategiesConfig, TransferProps, TransferSlots } from './types'
import type { ɵCheckableListInstance } from '@idux/components/_private/checkable-list'
import type { TransferConfig } from '@idux/components/config'
import type { TransferLocale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

interface TransferContext {
  mergedPrefixCls: ComputedRef<string>
  props: TransferProps
  slots: TransferSlots
  config: TransferConfig
  locale: TransferLocale
  sourceCheckableListRef: Ref<ɵCheckableListInstance | undefined>
  targetCheckableListRef: Ref<ɵCheckableListInstance | undefined>
  showSelectAll: ComputedRef<boolean>
  getRowKey: GetRowKey
}

export const transferContext: InjectionKey<TransferContext> = Symbol('transferContext')

// public token
export const TRANSFER_SOURCE_TOKEN: InjectionKey<TransferBindings> = Symbol('TRANSFER_SOURCE_TOKEN')
export const TRANSFER_TARGET_TOKEN: InjectionKey<TransferBindings> = Symbol('TRANSFER_TARGET_TOKEN')
export const TRANSFER_OPERATIONS_TOKEN: InjectionKey<TransferOperationsContext> = Symbol('TRANSFER_OPERATIONS_TOKEN')
export const TRANSFER_DATA_STRATEGIES: InjectionKey<TransferDataStrategiesConfig | null> =
  Symbol('TRANSFER_DATA_STRATEGIES')
