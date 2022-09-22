/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableInstance } from '@idux/components/table'
import type { TreeInstance } from '@idux/components/tree'

import { type ComputedRef, computed, defineComponent, provide, ref } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig as useComponentGlobalConfig } from '@idux/components/config'
import {
  IxTransfer,
  TRANSFER_DATA_STRATEGIES,
  type TransferDataStrategiesConfig,
  type TransferListInstance,
  type TransferListSlotParams,
} from '@idux/components/transfer'
import { useGetKey } from '@idux/components/utils'
import { useGlobalConfig } from '@idux/pro/config'

import { useTransferData } from './composables/useTransferData'
import { useTreeDataStrategies } from './composables/useTreeDataStrategy'
import { type TreeExpandedKeysContext, useTreeExpandedKeys } from './composables/useTreeExpandedKeys'
import ProTransferList from './content/ProTransferList'
import ProTransferTable from './content/ProTransferTable'
import ProTransferTree from './content/ProTransferTree'
import { type ProTransferContext, proTransferContext } from './token'
import {
  type ProTransferApis,
  type ProTransferProps,
  type TransferData,
  type TreeTransferData,
  proTransferProps,
} from './types'

export default defineComponent({
  name: 'IxProTransfer',
  props: proTransferProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-transfer`)

    const transferConfig = useComponentGlobalConfig('transfer')
    const transferLocale = useComponentGlobalConfig('locale').transfer

    const getKey = useGetKey(props, transferConfig, 'ProTransfer')

    const [targetKeys, setTargetKeys] = useControlledProp(props, 'value')
    const targetKeySet = computed(() => new Set(targetKeys.value))
    const childrenKey = computed(() => props.treeProps?.childrenKey ?? 'children')

    const sourceContentRef = ref<TransferListInstance | TableInstance | TreeInstance>()
    const targetContentRef = ref<TransferListInstance | TableInstance | TreeInstance>()

    const { dataKeyMap, parentKeyMap, expandedKeysContext } = useTreeContext(props, childrenKey, targetKeys)
    const { dataSource, loadSourceChildren, loadTargetChildren } = useTransferData(
      props,
      getKey,
      childrenKey,
      targetKeySet,
      setTargetKeys,
      expandedKeysContext?.sourceExpandedKeys,
      expandedKeysContext?.targetExpandedKeys,
      expandedKeysContext?.handleSourceExpandedChange,
      expandedKeysContext?.handleTargetExpandedChange,
    )

    const context: ProTransferContext = {
      props,
      slots,
      childrenKey,
      mergedPrefixCls,
      sourceContentRef,
      targetContentRef,
      parentKeyMap,
      loadSourceChildren,
      loadTargetChildren,
      expandedKeysContext,
    }

    provide(proTransferContext, context)

    const renderTransferListBody = ({ isSource }: TransferListSlotParams) => {
      if (props.type === 'tree') {
        return !isSource && props.flatTargetData ? (
          <ProTransferList isSource={isSource} />
        ) : (
          <ProTransferTree isSource={isSource} />
        )
      }

      return <ProTransferTable isSource={isSource} />
    }
    const renderTranferTreeHeaderLabel = (params: { isSource: boolean }) => {
      if (slots.headerLabel) {
        return slots.headerLabel(params)
      }

      const isSource = params.isSource
      const label = isSource ? transferLocale.toSelect : transferLocale.selected

      let count = 0
      if (isSource) {
        dataKeyMap?.forEach((item, key) => {
          if (!targetKeySet.value.has(key) && (!item[childrenKey.value] || item[childrenKey.value]!.length <= 0)) {
            ++count
          }
        })
      } else {
        targetKeys.value?.forEach(key => {
          const item = dataKeyMap?.get(key)
          if (item && (!item[childrenKey.value] || item[childrenKey.value]!.length <= 0)) {
            ++count
          }
        })
      }

      return `${label} (${count})`
    }

    const transferApi: ProTransferApis = {
      scrollTo: (isSource, ...params) => (isSource ? sourceContentRef : targetContentRef).value?.scrollTo(...params),
    }

    expose(transferApi)

    return () => {
      const transferProps = {
        dataSource: dataSource.value,
        defaultTargetData: props.defaultTargetData,
        value: targetKeys.value,
        sourceSelectedKeys: props.sourceSelectedKeys,
        targetSelectedKeys: props.targetSelectedKeys,
        disabled: props.disabled,
        searchable: props.searchable,
        searchFn: props.searchFn,
        clearable: props.clearable,
        clearIcon: props.clearIcon,
        showSelectAll: props.type !== 'table',
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
        headerLabel: props.type === 'tree' ? renderTranferTreeHeaderLabel : slots.headerLabel,
        headerSuffix: slots.headerSuffix,
        clearIcon: slots.clearIcon,
        operations: slots.operations,
      }
      return <IxTransfer class={mergedPrefixCls.value} v-slots={transferSlots} {...transferProps} />
    }
  },
})

function useTreeContext(
  props: ProTransferProps,
  childrenKey: ComputedRef<string>,
  targetKeys: ComputedRef<VKey[] | undefined>,
): {
  dataKeyMap?: Map<VKey, TreeTransferData<VKey>>
  expandedKeysContext?: TreeExpandedKeysContext
  parentKeyMap?: Map<VKey, VKey | undefined>
} {
  if (props.type !== 'tree') {
    return {}
  }

  const { dataKeyMap, parentKeyMap, dataStrategies } = useTreeDataStrategies(
    childrenKey,
    props.defaultTargetData as TreeTransferData<VKey>[] | undefined,
  )
  const expandedKeysContext = useTreeExpandedKeys(props, targetKeys, parentKeyMap)

  provide(TRANSFER_DATA_STRATEGIES, dataStrategies as unknown as TransferDataStrategiesConfig<TransferData>)

  return {
    dataKeyMap,
    expandedKeysContext,
    parentKeyMap,
  }
}
