/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TransferData } from '../types'
import type { TransferTreeLoadChildren } from './useTransferData'
import type { TreeExpandedKeysContext } from './useTreeExpandedKeys'
import type { TransferBindings } from '@idux/components/transfer'
import type { TreeNode, TreeProps } from '@idux/components/tree'

import { type ComputedRef, computed } from 'vue'

import { isNumber } from 'lodash-es'

import { type VKey, callEmit } from '@idux/cdk/utils'

export function useTransferTreeProps(
  props: ProTransferProps,
  transferBindings: TransferBindings,
  expandedKeysContext: TreeExpandedKeysContext,
  childrenKey: ComputedRef<string>,
  loadChildren: TransferTreeLoadChildren,
  isSource: boolean,
): ComputedRef<TreeProps> {
  const {
    paginatedData,
    paginatedDataSource,
    selectedKeys,
    disabledKeys,
    disabledDataSourceKeys,
    getKey,
    handleSelectChange,
  } = transferBindings
  const { sourceExpandedKeys, targetExpandedKeys, handleSourceExpandedChange, handleTargetExpandedChange } =
    expandedKeysContext

  const _disabledKeys = isSource && props.mode === 'immediate' ? disabledDataSourceKeys : disabledKeys
  const treeDataSource = isSource && props.mode === 'immediate' ? paginatedDataSource : paginatedData

  return computed<TreeProps>(() => {
    const height = isNumber(props.scroll?.height) ? props.scroll?.height : undefined

    return {
      autoHeight: !height || !props.virtual,
      ...(props.treeProps ?? {}),
      blocked: true,
      childrenKey: childrenKey.value,
      checkable: isSource || props.mode !== 'immediate',
      cascaderStrategy: props.treeProps?.cascaderStrategy || 'all',
      checkedKeys: selectedKeys.value,
      dataSource: treeDataSource.value,
      disabled: node => _disabledKeys.value.has(getKey.value(node as TransferData)) || !!props.disabled,
      draggable: false,
      expandedKeys: isSource ? sourceExpandedKeys.value : targetExpandedKeys.value,
      height,
      getKey: getKey.value as (node: TreeNode) => VKey,
      loadChildren: loadChildren.value,
      selectable: true,
      virtual: props.virtual,
      'onUpdate:checkedKeys': handleSelectChange,
      'onUpdate:expandedKeys': isSource ? handleSourceExpandedChange : handleTargetExpandedChange,
      onScroll: evt => {
        callEmit(props.onScroll, isSource, evt)
      },
      onScrolledChange: (startIndex, endIndex, visibleData) => {
        callEmit(props.onScrolledChange, isSource, startIndex, endIndex, visibleData)
      },
      onScrolledBottom: () => {
        callEmit(props.onScrolledBottom, isSource)
      },
    }
  })
}
