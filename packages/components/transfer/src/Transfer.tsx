/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵCheckableListInstance } from '@idux/components/_private/checkable-list'

import { computed, defineComponent, provide, ref } from 'vue'

import { isBoolean, isNil } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'

import TransferOperations from './TransferOperations'
import { usePagination } from './composables/usePagination'
import { useSearchable } from './composables/useSearchable'
import { useTransferBindings } from './composables/useTransferBindings'
import { useTransferData } from './composables/useTransferData'
import { useTransferDataStrategies } from './composables/useTransferDataStrategies'
import { useTransferOperations } from './composables/useTransferOperations'
import { useTransferSelectState } from './composables/useTransferSelectState'
import TransferList from './list/TransferList'
import { TRANSFER_OPERATIONS_TOKEN, TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN, transferContext } from './token'
import { type TransferApis, type TransferScrollTo, transferProps } from './types'

export default defineComponent({
  name: 'IxTransfer',
  props: transferProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('transfer')
    const locale = useGlobalConfig('locale').transfer
    const mergedPrefixCls = computed(() => `${common.prefixCls}-transfer`)

    const showSelectAll = computed(() => props.showSelectAll ?? config.showSelectAll)
    const { source: sourceSearchable, target: targetSearchable } = useSearchable(props, config)
    const transferDataStrategies = useTransferDataStrategies()
    const transferPaginationContext = usePagination(props)
    const transferDataContext = useTransferData(props, config, transferDataStrategies, transferPaginationContext)
    const transferSelectStateContext = useTransferSelectState(props, transferDataContext)
    const transferOperationsContext = useTransferOperations(props, transferDataContext, transferSelectStateContext)

    const { sourceBindings, targetBindings } = useTransferBindings(
      props,
      transferDataContext,
      transferOperationsContext,
      transferSelectStateContext,
      transferPaginationContext,
      showSelectAll,
      sourceSearchable,
      targetSearchable,
    )

    const sourceCheckableListRef = ref<ɵCheckableListInstance>()
    const targetCheckableListRef = ref<ɵCheckableListInstance>()

    const transferApi: TransferApis = {
      scrollTo: ((options, isSource) => {
        if (isNil(options) && isNil(isSource)) {
          return sourceCheckableListRef.value?.scrollTo()
        }

        if (isBoolean(options)) {
          return (options ? sourceCheckableListRef : targetCheckableListRef).value?.scrollTo()
        }

        if (isNil(isSource)) {
          return sourceCheckableListRef.value?.scrollTo(options)
        }

        return (isSource ? sourceCheckableListRef : targetCheckableListRef).value?.scrollTo(options)
      }) as TransferScrollTo,
    }

    expose(transferApi)

    provide(transferContext, {
      props,
      slots,
      locale,
      config,
      mergedPrefixCls,
      sourceCheckableListRef,
      targetCheckableListRef,
      showSelectAll,
      getRowKey: transferDataContext.getRowKey,
    })
    provide(TRANSFER_SOURCE_TOKEN, sourceBindings)
    provide(TRANSFER_TARGET_TOKEN, targetBindings)
    provide(TRANSFER_OPERATIONS_TOKEN, transferOperationsContext)

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={prefixCls}>
          <TransferList isSource={true} />
          <TransferOperations />
          <TransferList isSource={false} />
        </div>
      )
    }
  },
})
