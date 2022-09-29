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

import { isNil, isNumber } from 'lodash-es'

import { type VKey, callEmit } from '@idux/cdk/utils'

export function useTransferTreeProps(
  props: ProTransferProps,
  transferBindings: TransferBindings,
  expandedKeysContext: TreeExpandedKeysContext,
  parentKeyMap: Map<VKey, VKey | undefined>,
  childrenKey: ComputedRef<string>,
  loadChildren: TransferTreeLoadChildren,
  isSource: boolean,
): ComputedRef<TreeProps> {
  const {
    dataKeyMap,
    paginatedData,
    paginatedDataSource,
    selectedKeys,
    selectedKeySet,
    disabledKeys,
    disabledDataSourceKeys,
    getKey,
    handleSelectChange,
  } = transferBindings
  const { sourceExpandedKeys, targetExpandedKeys, handleSourceExpandedChange, handleTargetExpandedChange } =
    expandedKeysContext

  const _disabledKeys = isSource && props.mode === 'immediate' ? disabledDataSourceKeys : disabledKeys
  const treeDataSource = isSource && props.mode === 'immediate' ? paginatedDataSource : paginatedData

  const checkedKeys = computed(() => {
    const tempKeySet = new Set(selectedKeySet.value)

    selectedKeys.value.forEach(key => {
      if (
        dataKeyMap.value.get(key)?.[childrenKey.value] &&
        (dataKeyMap.value.get(key)?.[childrenKey.value] as TransferData[]).length > 0
      ) {
        return
      }

      let currentKey: VKey | undefined = key
      while (parentKeyMap.has(currentKey!)) {
        currentKey = parentKeyMap.get(currentKey!)
        if (isNil(currentKey) || !tempKeySet.has(currentKey)) {
          return
        }

        const item = dataKeyMap.value.get(currentKey)!
        if (
          (item[childrenKey.value] as TransferData[]).some(
            (child: TransferData) => !tempKeySet.has(getKey.value(child)),
          )
        ) {
          tempKeySet.delete(currentKey)
        }
      }
    })

    return Array.from(tempKeySet)
  })

  return computed<TreeProps>(() => {
    const height = isNumber(props.scroll?.height) ? props.scroll?.height : undefined

    return {
      autoHeight: !height || !props.virtual,
      ...(props.treeProps ?? {}),
      blocked: true,
      childrenKey: childrenKey.value,
      checkable: isSource || props.mode !== 'immediate',
      cascaderStrategy: props.treeProps?.cascaderStrategy || 'all',
      checkedKeys: checkedKeys.value,
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
