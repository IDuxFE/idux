/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeDataStrategyContext } from '../composables/useTreeDataStrategyContext'
import type { ProTransferProps, TreeTransferData } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { CascaderStrategy } from '@idux/components/cascader'
import type { TransferDataStrategyProp } from '@idux/components/transfer'
import type { GetKeyFn } from '@idux/components/utils'
import type { ComputedRef, Ref } from 'vue'

import { useTreeDataStrategies } from '../composables/useTreeDataStrategy'
import { type TreeExpandedKeysContext, useTreeExpandedKeys } from '../composables/useTreeExpandedKeys'

export function useTreeContext<C extends string>(
  props: ProTransferProps,
  childrenKey: ComputedRef<C>,
  cascadeStrategy: ComputedRef<CascaderStrategy>,
  getKey: ComputedRef<GetKeyFn>,
  targetKeySet: ComputedRef<Set<VKey>>,
): {
  dataStrategyContext: TreeDataStrategyContext<TreeTransferData, C>
  expandedKeysContext: TreeExpandedKeysContext
  mergedDataStrategy: Ref<TransferDataStrategyProp<TreeTransferData<TreeTransferData, C>>>
} {
  const { context: dataStrategyContext, mergedDataStrategy } = useTreeDataStrategies(
    props,
    childrenKey,
    getKey,
    cascadeStrategy,
  )
  const { parentKeyMap, dataMap } = dataStrategyContext
  const expandedKeysContext = useTreeExpandedKeys(props, childrenKey, getKey, targetKeySet, parentKeyMap, dataMap)

  return {
    dataStrategyContext,
    expandedKeysContext,
    mergedDataStrategy,
  }
}
