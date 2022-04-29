/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TreeSelectNode, TreeSelectProps } from '../types'
import type { MergedNode } from './useDataSource'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

import { computed, toRaw } from 'vue'

import { callEmit, convertArray } from '@idux/cdk/utils'

//import { generateOption } from '../utils/generateOption'

export interface SelectedStateContext {
  selectedValue: ComputedRef<VKey[]>
  selectedNodes: ComputedRef<MergedNode[]>
  changeSelected: (value: VKey[], nodes: TreeSelectNode[]) => void
  handleRemove: (key: VKey) => void
  handleClear: (evt: MouseEvent) => void
}

export function useSelectedState(
  props: TreeSelectProps,
  accessor: ValueAccessor,
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>,
): SelectedStateContext {
  const selectedValue = computed(() => convertArray(accessor.valueRef.value))
  const selectedNodes = computed(() => {
    const nodesMap = mergedNodeMap.value
    return selectedValue.value.map(value => nodesMap.get(value)!).filter(Boolean)
  })

  const setValue = (value: VKey[]) => {
    const currValue = props.multiple ? value : value[0]

    const oldValue = toRaw(accessor.valueRef.value)
    if (currValue !== oldValue) {
      accessor.setValue(currValue)
      callEmit(props.onChange, currValue, oldValue)
    }
  }

  const changeSelected = (value: VKey[]) => {
    setValue(value)
  }

  const handleRemove = (key: VKey) => {
    setValue(selectedValue.value.filter(item => key !== item))
  }

  const handleClear = (evt: MouseEvent) => {
    evt.stopPropagation()
    setValue([])
    callEmit(props.onClear, evt)
  }

  return {
    selectedValue,
    selectedNodes,
    changeSelected,
    handleRemove,
    handleClear,
  }
}
