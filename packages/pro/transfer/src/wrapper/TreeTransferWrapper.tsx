/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CascaderStrategy } from '@idux/components/cascader'
import type { GetKeyFn } from '@idux/components/utils'

import { type ComputedRef, type Ref, computed, defineComponent, inject, provide } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig as useComponentGlobalConfig } from '@idux/components/config'
import { IxTransfer, type TransferDataStrategyProp, type TransferListSlotParams } from '@idux/components/transfer'

import { useTransferData } from '../composables/useTransferData'
import { useTreeDataStrategies } from '../composables/useTreeDataStrategy'
import { type TreeExpandedKeysContext, useTreeExpandedKeys } from '../composables/useTreeExpandedKeys'
import ProTransferList from '../content/ProTransferList'
import ProTransferTree from '../content/ProTransferTree'
import { proTransferContext, treeTransferContext } from '../token'
import { type ProTransferProps, type TreeTransferData, proTransferProps } from '../types'

export default defineComponent({
  props: proTransferProps,
  setup() {
    const { mergedPrefixCls, props, slots, getKey } = inject(proTransferContext)!
    const transferLocale = useComponentGlobalConfig('locale').transfer

    const [targetKeys, setTargetKeys] = useControlledProp(props, 'value')
    const targetKeySet = computed(() => new Set(targetKeys.value))
    const cascaderStrategy = computed(() => props.treeProps?.cascaderStrategy ?? 'all')
    const childrenKey = computed(() => props.treeProps?.childrenKey ?? 'children')

    const { dataKeyMap, expandedKeysContext, dataStrategy } = useTreeContext(
      props,
      childrenKey,
      cascaderStrategy,
      getKey,
      targetKeys,
    )
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

    provide(treeTransferContext, {
      cascaderStrategy,
      childrenKey,
      loadSourceChildren,
      loadTargetChildren,
      expandedKeysContext,
    })

    const renderTransferListBody = ({ isSource }: TransferListSlotParams) => {
      return !isSource && (props.flatTargetData || cascaderStrategy.value === 'off') ? (
        <ProTransferList isSource={isSource} />
      ) : (
        <ProTransferTree isSource={isSource} />
      )
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

    return () => {
      const transferProps = {
        dataSource: dataSource.value,
        defaultTargetData: props.defaultTargetData,
        dataStrategy: dataStrategy.value as TransferDataStrategyProp,
        value: targetKeys.value,
        sourceSelectedKeys: props.sourceSelectedKeys,
        targetSelectedKeys: props.targetSelectedKeys,
        disabled: props.disabled,
        searchable: props.searchable,
        searchFn: props.searchFn,
        clearable: props.clearable,
        clearIcon: props.clearIcon,
        showSelectAll: true,
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
      return <IxTransfer class={mergedPrefixCls.value} v-slots={transferSlots} {...transferProps} />
    }
  },
})

function useTreeContext(
  props: ProTransferProps,
  childrenKey: ComputedRef<VKey>,
  cascadeStrategy: ComputedRef<CascaderStrategy>,
  getKey: ComputedRef<GetKeyFn>,
  targetKeys: ComputedRef<VKey[] | undefined>,
): {
  dataKeyMap?: Map<VKey, TreeTransferData<string>>
  expandedKeysContext?: TreeExpandedKeysContext
  dataStrategy: Ref<TransferDataStrategyProp<TreeTransferData<VKey>>>
} {
  const { dataKeyMap, parentKeyMap, dataStrategy } = useTreeDataStrategies(props, childrenKey, cascadeStrategy)
  const expandedKeysContext = useTreeExpandedKeys(props, childrenKey, getKey, targetKeys, parentKeyMap, dataKeyMap)

  return {
    dataKeyMap,
    expandedKeysContext,
    dataStrategy,
  }
}
