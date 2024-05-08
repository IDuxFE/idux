/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferData } from '../types'

import { type Ref, computed, defineComponent, inject, provide } from 'vue'

import { VKey, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig as useComponentGlobalConfig } from '@idux/components/config'
import { IxTransfer, type TransferDataStrategyProp, type TransferListSlotParams } from '@idux/components/transfer'
import { useThemeToken } from '@idux/pro/theme'

import { useTreeContext } from '../composables/useTreeContext'
import ProTransferTable from '../content/ProTransferTable'
import { proTransferContext, tableTransferContext } from '../token'

export default defineComponent({
  setup() {
    const { mergedPrefixCls, props, slots, getKey } = inject(proTransferContext)!
    const { globalHashId, hashId } = useThemeToken('proTransfer')
    const transferLocale = useComponentGlobalConfig('locale').transfer

    const [targetKeys, setTargetKeys] = useControlledProp(props, 'value')
    const targetKeySet = computed(() => new Set(targetKeys.value))
    const cascaderStrategy = computed(() => props.tableProps?.cascaderStrategy ?? 'all')
    const childrenKey = computed(() => props.tableProps?.childrenKey ?? 'children')

    let dataMap: Map<VKey, TransferData>
    let targetDataCount: Ref<number>
    let dataStrategy: Ref<TransferDataStrategyProp> | undefined
    if (props.type === 'tree-table') {
      const { dataStrategyContext, expandedKeysContext, mergedDataStrategy } = useTreeContext(
        props,
        childrenKey,
        cascaderStrategy,
        getKey,
        targetKeySet,
      )
      ;({ dataMap, targetDataCount } = dataStrategyContext)
      dataStrategy = mergedDataStrategy as Ref<TransferDataStrategyProp>

      provide(tableTransferContext, {
        childrenKey,
        expandedKeysContext,
      })
    }

    const renderTransferListBody = ({ isSource }: TransferListSlotParams) => <ProTransferTable isSource={isSource} />

    const renderTranferTreeHeaderLabel = (params: { isSource: boolean; data: TransferData[] }) => {
      if (slots.headerLabel) {
        return slots.headerLabel(params)
      }

      const label = params.isSource ? transferLocale.toSelect : transferLocale.selected
      const count =
        props.type === 'tree-table'
          ? params.isSource
            ? (dataMap?.size ?? 0) - targetDataCount.value
            : targetDataCount.value
          : params.data.length

      return `${label} (${count})`
    }

    return () => {
      const transferProps = {
        dataSource: props.dataSource,
        defaultTargetData: props.defaultTargetData,
        dataStrategy: dataStrategy?.value as TransferDataStrategyProp,
        value: targetKeys.value,
        sourceSelectedKeys: props.sourceSelectedKeys,
        targetSelectedKeys: props.targetSelectedKeys,
        disabled: props.disabled,
        searchable: props.searchable,
        searchFn: props.searchFn,
        searchPlaceholder: props.searchPlaceholder,
        clearable: props.clearable,
        clearIcon: props.clearIcon,
        showSelectAll: false,
        scroll: props.scroll,
        empty: props.empty,
        pagination: props.pagination,
        mode: props.mode,
        spin: props.spin,
        getKey: getKey.value,
        'onUpdate:value': setTargetKeys,
        'onUpdate:sourceSelectedKeys': props['onUpdate:sourceSelectedKeys'],
        'onUpdate:targetSelectedKeys': props['onUpdate:targetSelectedKeys'],
        onChange: props.onChange,
        onSearch: props.onSearch,
        onSelectAll: props.onSelectAll,
        onClear: props.onClear,
      }
      const transferSlots = {
        default: renderTransferListBody,
        header: slots.header,
        footer: slots.footer,
        headerLabel: renderTranferTreeHeaderLabel,
        headerSuffix: slots.headerSuffix,
        clearIcon: slots.clearIcon,
        operations: slots.operations,
      }
      return (
        <IxTransfer
          class={[mergedPrefixCls.value, globalHashId.value, hashId.value]}
          v-slots={transferSlots}
          {...transferProps}
        />
      )
    }
  },
})
