/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeTransferContext } from '../token'
import type { ProTransferProps, TreeTransferData } from '../types'
import type { TransferBindings } from '@idux/components/transfer'
import type { TreeNode, TreeProps } from '@idux/components/tree'

import { type ComputedRef, computed } from 'vue'

import { isNumber } from 'lodash-es'

import { type TreeTypeData, type VKey, callEmit, getTreeKeys } from '@idux/cdk/utils'

export function useTransferTreeProps<V extends TreeTransferData<V, C>, C extends string>(
  props: ProTransferProps,
  treeTransferContext: TreeTransferContext<V, C>,
  transferBindings: TransferBindings<V>,
  isSource: boolean,
): ComputedRef<TreeProps> {
  const {
    paginatedData,
    selectedKeys,
    searchValue,
    pagination,
    paginatedDataSource,
    disabledKeys,
    disabledDataSourceKeys,
    getKey,
    handleSelectChange,
  } = transferBindings
  const {
    cascaderStrategy,
    childrenKey,
    dataStrategyContext: { checkStateResolver },
    expandedKeysContext,
    loadSourceChildren,
    loadTargetChildren,
  } = treeTransferContext
  const { sourceExpandedKeys, targetExpandedKeys, handleSourceExpandedChange, handleTargetExpandedChange } =
    expandedKeysContext

  const _disabledKeys = isSource && props.mode === 'immediate' ? disabledDataSourceKeys : disabledKeys
  const treeDataSource = isSource && props.mode === 'immediate' ? paginatedDataSource : paginatedData
  const loadChildren = isSource ? loadSourceChildren! : loadTargetChildren!

  // when tree data is paginated or filtered,
  // using internal checked keys logic will cause checked keys to change unexpectedly because checked keys won't be resolved by the whole tree but paginated or filtered tree
  // then target keys could be miscalulated when mode is 'immediate'
  // so we manage check state outside the tree component
  const shouldUseExternalCheckStateResolver = computed(
    () => props.mode === 'immediate' && (!!pagination.value || !!searchValue.value),
  )

  const handleChecked = (checked: boolean, node: TreeNode) => {
    if (shouldUseExternalCheckStateResolver.value) {
      const keys = getTreeKeys([node] as TreeTypeData<TreeNode, C>[], childrenKey.value, getKey.value, true).filter(
        key => !_disabledKeys.value.has(key),
      )
      handleSelectChange(checkStateResolver[checked ? 'appendKeys' : 'removeKeys'](selectedKeys.value, keys))
    }
  }
  const handleCheckedKeysUpdate = (keys: VKey[]) => {
    if (!shouldUseExternalCheckStateResolver.value) {
      handleSelectChange(keys)
      return
    }
  }

  const disabled = computed(() => {
    const keySet = _disabledKeys.value
    const _getKey = getKey.value

    if (props.disabled) {
      return () => true
    }

    return (node => keySet.has(_getKey(node))) as TreeProps['disabled']
  })

  const onScroll: TreeProps['onScroll'] = evt => callEmit(props.onScroll, isSource, evt)
  const onScrolledChange: TreeProps['onScrolledChange'] = (startIndex, endIndex, visibleData) =>
    callEmit(props.onScrolledChange, isSource, startIndex, endIndex, visibleData)
  const onScrolledBottom: TreeProps['onScrolledBottom'] = () => callEmit(props.onScrolledBottom, isSource)

  return computed<TreeProps>(() => {
    const height = isNumber(props.scroll?.height) ? props.scroll?.height : undefined

    return {
      autoHeight: !height || !props.virtual,
      ...(props.treeProps ?? {}),
      blocked: true,
      childrenKey: childrenKey.value,
      checkable: isSource || props.mode !== 'immediate',
      cascaderStrategy: cascaderStrategy.value,
      checkedKeys: selectedKeys.value,
      dataSource: treeDataSource.value,
      disabled: disabled.value,
      draggable: false,
      expandedKeys: isSource ? sourceExpandedKeys.value : targetExpandedKeys.value,
      height,
      getKey: getKey.value as (node: TreeNode) => VKey,
      loadChildren: loadChildren.value,
      selectable: true,
      virtual: props.virtual,
      virtualScrollMode: props.virtualScrollMode,
      virtualItemHeight: props.virtualItemHeight,
      onCheck: handleChecked,
      'onUpdate:checkedKeys': handleCheckedKeysUpdate,
      'onUpdate:expandedKeys': isSource ? handleSourceExpandedChange : handleTargetExpandedChange,
      onScroll,
      onScrolledChange,
      onScrolledBottom,
    }
  })
}
