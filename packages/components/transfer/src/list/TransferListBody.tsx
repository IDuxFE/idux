/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵCheckableList } from '@idux/components/_private/checkable-list'
import { ɵEmpty } from '@idux/components/_private/empty'

import { TRANSFER_OPERATIONS_TOKEN, TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN, transferContext } from '../token'
import { type TransferData, transferListBodyProps } from '../types'
import { convertToSlotParams } from '../utils'

export default defineComponent({
  props: transferListBodyProps,
  setup(props) {
    const {
      props: transferProps,
      slots,
      mergedPrefixCls,
      sourceCheckableListRef,
      targetCheckableListRef,
      getRowKey,
    } = inject(transferContext)!

    const transferBindings = props.isSource ? inject(TRANSFER_SOURCE_TOKEN)! : inject(TRANSFER_TARGET_TOKEN)!
    const { paginatedDataSource, paginatedData, selectedKeySet, disabledDataSourceKeys, handleSelectChange } =
      transferBindings
    const { triggerRemove } = inject(TRANSFER_OPERATIONS_TOKEN)!

    const checkableListRef = props.isSource ? sourceCheckableListRef : targetCheckableListRef

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
        const key = getRowKey(item)
        const _checkedKeys = new Set(selectedKeySet.value)
        checked ? _checkedKeys.add(key) : _checkedKeys.delete(key)
        handleSelectChange(_checkedKeys)
      }

      const onRemove = (item: TransferData) => {
        const key = getRowKey(item)
        triggerRemove([key])
      }

      return (
        <ɵCheckableList
          ref={checkableListRef}
          dataSource={checkListData.value}
          getRowKey={getRowKey}
          checked={item => selectedKeySet.value.has(getRowKey(item))}
          disabled={item => transferProps.disabled || disabledDataSourceKeys.value.has(getRowKey(item))}
          checkable={props.isSource || transferProps.mode === 'default'}
          removable={!props.isSource && transferProps.mode === 'immediate'}
          virtual={transferProps.virtual}
          scroll={transferProps.scroll}
          v-slots={{ label: slots.label }}
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
      const prefixCls = `${mergedPrefixCls.value}-list-body`
      return <div class={`${mergedPrefixCls.value}-list-body`}>{renderBody(prefixCls)}</div>
    }
  },
})
