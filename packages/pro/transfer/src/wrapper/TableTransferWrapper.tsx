/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { IxTransfer, type TransferListSlotParams } from '@idux/components/transfer'

import ProTransferTable from '../content/ProTransferTable'
import { proTransferContext } from '../token'

export default defineComponent({
  setup() {
    const { mergedPrefixCls, props, slots, getKey } = inject(proTransferContext)!
    const renderTransferListBody = ({ isSource }: TransferListSlotParams) => <ProTransferTable isSource={isSource} />

    return () => {
      const transferProps = {
        dataSource: props.dataSource,
        defaultTargetData: props.defaultTargetData,
        value: props.value,
        sourceSelectedKeys: props.sourceSelectedKeys,
        targetSelectedKeys: props.targetSelectedKeys,
        disabled: props.disabled,
        searchable: props.searchable,
        searchFn: props.searchFn,
        clearable: props.clearable,
        clearIcon: props.clearIcon,
        showSelectAll: false,
        scroll: props.scroll,
        empty: props.empty,
        pagination: props.pagination,
        mode: props.mode,
        spin: props.spin,
        getKey: getKey.value,
        'onUpdate:value': props['onUpdate:value'],
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
        headerLabel: slots.headerLabel,
        headerSuffix: slots.headerSuffix,
        clearIcon: slots.clearIcon,
        operations: slots.operations,
      }
      return <IxTransfer class={mergedPrefixCls.value} v-slots={transferSlots} {...transferProps} />
    }
  },
})
