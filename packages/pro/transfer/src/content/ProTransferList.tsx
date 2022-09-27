/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { type VKey, callEmit } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private/empty'
import { IxTransferList, TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN } from '@idux/components/transfer'

import { proTransferContext } from '../token'
import { type TreeTransferData, proTransferListContentProps } from '../types'
import { flattenTree } from '../utils'

export default defineComponent({
  props: proTransferListContentProps,
  setup(props) {
    const {
      props: proTransferProps,
      slots,
      mergedPrefixCls,
      childrenKey,
      sourceContentRef,
      targetContentRef,
    } = inject(proTransferContext)!
    const transferBindings = inject(props.isSource ? TRANSFER_SOURCE_TOKEN : TRANSFER_TARGET_TOKEN)!
    const {
      disabledKeys,
      paginatedData,
      paginatedDataSource,
      selectedKeySet,
      handleSelectChange,
      getKey,
      triggerRemove,
    } = transferBindings

    const onCheckChange = (item: TreeTransferData, checked: boolean) => {
      const key = getKey.value(item)
      const _checkedKeys = new Set(selectedKeySet.value)
      checked ? _checkedKeys.add(key) : _checkedKeys.delete(key)
      handleSelectChange(_checkedKeys)
    }

    const onRemove = (item: TreeTransferData) => {
      const key = getKey.value(item)
      triggerRemove([key])
    }

    const handleScroll = (evt: Event) => {
      callEmit(proTransferProps.onScroll, props.isSource, evt)
    }
    const handleScrolledBottom = () => {
      callEmit(proTransferProps.onScrolledBottom, props.isSource)
    }
    const handleScrolledChange = (startIndex: number, endIndex: number, visibleData: unknown[]) => {
      callEmit(proTransferProps.onScrolledChange, props.isSource, startIndex, endIndex, visibleData)
    }

    const dataSource = computed(() => {
      const data =
        props.isSource && proTransferProps.mode === 'immediate' ? paginatedDataSource.value : paginatedData.value

      return proTransferProps.type === 'tree'
        ? flattenTree(data as TreeTransferData<VKey>[], childrenKey.value, true)
        : data
    })

    return () => {
      if (!dataSource.value || dataSource.value.length <= 0) {
        return (
          <div class={`${mergedPrefixCls.value}-empty-wrapper`}>
            <ɵEmpty v-slots={slots} empty={proTransferProps.empty} />
          </div>
        )
      }

      const contentRef = props.isSource ? sourceContentRef : targetContentRef

      const listSlots = {
        label: slots.label && ((item: TreeTransferData) => slots.label?.({ item, isSource: props.isSource })),
      }

      return (
        <IxTransferList
          ref={contentRef}
          dataSource={dataSource.value}
          getKey={getKey.value}
          labelKey={proTransferProps.treeProps?.labelKey}
          checked={item => selectedKeySet.value.has(getKey.value(item))}
          disabled={item => proTransferProps.disabled || disabledKeys.value.has(getKey.value(item))}
          checkable={props.isSource || proTransferProps.mode === 'default'}
          removable={!props.isSource && proTransferProps.mode === 'immediate'}
          virtual={proTransferProps.virtual}
          scroll={proTransferProps.scroll}
          v-slots={listSlots}
          onCheckChange={onCheckChange}
          onRemove={onRemove}
          onScroll={handleScroll}
          onScrolledChange={handleScrolledChange}
          onScrolledBottom={handleScrolledBottom}
        />
      )
    }
  },
})
