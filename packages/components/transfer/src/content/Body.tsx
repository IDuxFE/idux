/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private/empty'

import TransferList from '../list/List'
import { TRANSFER_OPERATIONS_TOKEN, TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN, transferContext } from '../token'
import { type TransferData, transferBodyProps } from '../types'
import { convertToSlotParams } from '../utils'

export default defineComponent({
  props: transferBodyProps,
  setup(props) {
    const {
      props: transferProps,
      slots,
      mergedPrefixCls,
      sourceTransferListRef,
      targetTransferListRef,
      getKey,
    } = inject(transferContext)!

    const transferBindings = props.isSource ? inject(TRANSFER_SOURCE_TOKEN)! : inject(TRANSFER_TARGET_TOKEN)!
    const {
      paginatedDataSource,
      paginatedData,
      selectedKeySet,
      disabledDataSourceKeys,
      disabledKeys,
      handleSelectChange,
    } = transferBindings
    const { triggerRemove } = inject(TRANSFER_OPERATIONS_TOKEN)!

    const transferListRef = props.isSource ? sourceTransferListRef : targetTransferListRef

    const handleScroll = (evt: Event) => {
      callEmit(transferProps.onScroll, props.isSource, evt)
    }
    const handleScrolledBottom = () => {
      callEmit(transferProps.onScrolledBottom, props.isSource)
    }
    const handleScrolledChange = (startIndex: number, endIndex: number, visibleData: unknown[]) => {
      callEmit(transferProps.onScrolledChange, props.isSource, startIndex, endIndex, visibleData)
    }

    const checkListData = computed(() =>
      props.isSource && transferProps.mode === 'immediate' ? paginatedDataSource.value : paginatedData.value,
    )
    const checkListDisabledKeys = computed(() =>
      props.isSource && transferProps.mode === 'immediate' ? disabledDataSourceKeys.value : disabledKeys.value,
    )

    const defaultBodyRenderer = (prefixCls: string) => {
      const data =
        props.isSource && transferProps.mode === 'immediate' ? paginatedDataSource.value : paginatedData.value

      if (data.length <= 0) {
        return (
          <div class={`${prefixCls}-empty-wrapper`}>
            <ɵEmpty v-slots={slots} empty={transferProps.empty} />
          </div>
        )
      }

      const onCheckChange = (item: TransferData, checked: boolean) => {
        const key = getKey.value(item)
        const _checkedKeys = new Set(selectedKeySet.value)
        checked ? _checkedKeys.add(key) : _checkedKeys.delete(key)
        handleSelectChange(_checkedKeys)
      }

      const onRemove = (item: TransferData) => {
        const key = getKey.value(item)
        triggerRemove([key])
      }

      const listSlots = {
        label: slots.label && ((item: TransferData) => slots.label?.({ item, isSource: props.isSource })),
      }

      return (
        <TransferList
          ref={transferListRef}
          dataSource={checkListData.value}
          getKey={getKey.value}
          checked={item => selectedKeySet.value.has(getKey.value(item))}
          disabled={item => transferProps.disabled || checkListDisabledKeys.value.has(getKey.value(item))}
          checkable={props.isSource || transferProps.mode === 'default'}
          removable={!props.isSource && transferProps.mode === 'immediate'}
          virtual={transferProps.virtual}
          virtualItemHeight={transferProps.virtualItemHeight}
          virtualScrollMode={transferProps.virtualScrollMode}
          scroll={transferProps.scroll}
          v-slots={listSlots}
          onCheckChange={onCheckChange}
          onRemove={onRemove}
          onScroll={handleScroll}
          onScrolledChange={handleScrolledChange}
          onScrolledBottom={handleScrolledBottom}
        />
      )
    }

    const renderBody = (prefixCls: string) => {
      if (slots.default) {
        return slots.default({ ...convertToSlotParams(transferBindings), isSource: props.isSource })
      }

      return defaultBodyRenderer(prefixCls)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-body`
      return <div class={`${mergedPrefixCls.value}-body`}>{renderBody(prefixCls)}</div>
    }
  },
})
