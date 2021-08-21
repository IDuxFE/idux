import type { ComputedRef, Ref } from 'vue'
import type { Key, TableProps } from '../types'
import type { TableColumnMergedSelectable, TableColumnMerged } from './useColumns'
import type { DataSourceContext, MergedData } from './useDataSource'

import { computed, unref, ref, watch } from 'vue'
import { callEmit } from '@idux/cdk/utils'

export function useSelectable(
  props: TableProps,
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  { mergedMap, paginatedMap }: DataSourceContext,
): SelectableContext {
  const selectable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'selectable'),
  ) as ComputedRef<TableColumnMergedSelectable | undefined>

  const selectedRowKeys = ref(props.selectedRowKeys)
  watch(
    () => props.selectedRowKeys,
    value => (selectedRowKeys.value = value),
  )

  const currentPageRowKeys = computed(() => {
    const { disabled } = selectable.value || {}
    const enabledRowKeys: Key[] = []
    const disabledRowKeys: Key[] = []
    paginatedMap.value.forEach((currData, key) => {
      if (disabled?.(currData.record)) {
        disabledRowKeys.push(key)
      } else {
        enabledRowKeys.push(key)
      }
    })
    return { enabledRowKeys, disabledRowKeys }
  })

  const indeterminateRowKeys = computed(() => {
    const indeterminateKeySet = new Set<Key>()
    const selectedKeys = selectedRowKeys.value
    const { disabledRowKeys } = currentPageRowKeys.value
    const dataMap = mergedMap.value
    selectedKeys.forEach(key => {
      const { parentKey } = dataMap.get(key)!
      if (parentKey) {
        let parent = dataMap.get(parentKey)!
        if (!selectedKeys.includes(parent.rowKey)) {
          if (!disabledRowKeys.includes(parentKey)) {
            indeterminateKeySet.add(parentKey)
          }
          while (parent.parentKey) {
            if (!disabledRowKeys.includes(parent.parentKey)) {
              indeterminateKeySet.add(parent.parentKey)
            }
            parent = dataMap.get(parent.parentKey)!
          }
        }
      }
    })
    return [...indeterminateKeySet]
  })

  // 统计当前页中被选中行的数量（过滤掉被禁用的）
  const countCurrentPageSelected = computed(() => {
    const selectedKeys = selectedRowKeys.value
    const { disabledRowKeys } = currentPageRowKeys.value
    let total = 0
    paginatedMap.value.forEach((_, key) => {
      if (!disabledRowKeys.includes(key) && selectedKeys.includes(key)) {
        total++
      }
    }, 0)
    return total
  })

  // 当前页是否全部被选中
  const currentPageAllSelected = computed(() => {
    const dataCount = paginatedMap.value.size
    const disabledCount = currentPageRowKeys.value.disabledRowKeys.length
    if (dataCount === 0 || dataCount === disabledCount) {
      return false
    }
    return dataCount === disabledCount + countCurrentPageSelected.value
  })

  // 当前页是否部分被选中
  const currentPageSomeSelected = computed(() => !currentPageAllSelected.value && countCurrentPageSelected.value > 0)

  const handleSelectChange = (key: Key, record: unknown) => {
    const dataMap = mergedMap.value
    const { disabledRowKeys } = currentPageRowKeys.value
    const { multiple, onChange, onSelect } = selectable.value || {}
    let tempRowKeys = unref(selectedRowKeys)
    const index = tempRowKeys.indexOf(key)
    const selected = index >= 0

    if (multiple) {
      const currData = dataMap.get(key)!
      const childrenKeys = getChildrenKeys(currData, disabledRowKeys)
      if (selected) {
        tempRowKeys.splice(index, 1)
        const parentKeys = getParentKeys(dataMap, currData, disabledRowKeys)
        tempRowKeys = tempRowKeys.filter(key => !parentKeys.includes(key) && !childrenKeys.includes(key))
      } else {
        tempRowKeys.push(key)
        setParentSelected(dataMap, currData, tempRowKeys, disabledRowKeys)
        tempRowKeys.push(...childrenKeys)
      }
    } else {
      tempRowKeys.length = 0
      if (!selected) {
        tempRowKeys.push(key)
      }
    }
    selectedRowKeys.value = tempRowKeys
    callEmit(onSelect, selected, record)
    callEmit(
      onChange,
      tempRowKeys,
      tempRowKeys.map(key => dataMap.get(key)!.record),
    )
    callEmit(props['onUpdate:selectedRowKeys'], tempRowKeys)
  }

  const handleHeadSelectChange = () => {
    const dataMap = mergedMap.value
    const { onChange } = selectable.value || {}
    const { enabledRowKeys } = currentPageRowKeys.value
    const tempRowKeySet = new Set(unref(selectedRowKeys))
    if (currentPageAllSelected.value) {
      enabledRowKeys.forEach(key => tempRowKeySet.delete(key))
    } else {
      enabledRowKeys.forEach(key => tempRowKeySet.add(key))
    }
    const tempRowKeys = [...tempRowKeySet]
    selectedRowKeys.value = tempRowKeys
    callEmit(
      onChange,
      tempRowKeys,
      tempRowKeys.map(key => dataMap.get(key)!.record),
    )
    callEmit(props['onUpdate:selectedRowKeys'], tempRowKeys)
  }

  return {
    selectable,
    selectedRowKeys,
    indeterminateRowKeys,
    currentPageRowKeys,
    currentPageAllSelected,
    currentPageSomeSelected,
    handleSelectChange,
    handleHeadSelectChange,
  }
}

export interface SelectableContext {
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>
  selectedRowKeys: Ref<Key[]>
  indeterminateRowKeys: ComputedRef<Key[]>
  currentPageRowKeys: ComputedRef<{
    enabledRowKeys: Key[]
    disabledRowKeys: Key[]
  }>
  currentPageAllSelected: ComputedRef<boolean>
  currentPageSomeSelected: ComputedRef<boolean>
  handleSelectChange: (key: Key, record: unknown) => void
  handleHeadSelectChange: () => void
}

function getChildrenKeys(currData: MergedData, disabledRowKeys: Key[]) {
  const keys: Key[] = []
  const { children } = currData
  children &&
    children.forEach(item => {
      const { rowKey } = item
      if (!disabledRowKeys.includes(rowKey)) {
        keys.push(item.rowKey)
      }
      keys.push(...getChildrenKeys(item, disabledRowKeys))
    })
  return keys
}

function getParentKeys(dataMap: Map<Key, MergedData>, currData: MergedData, disabledRowKeys: Key[]) {
  const keys: Key[] = []
  while (currData.parentKey) {
    const { parentKey } = currData
    if (!disabledRowKeys.includes(currData.parentKey)) {
      keys.push(parentKey)
    }
    currData = dataMap.get(parentKey)!
  }
  return keys
}

function setParentSelected(
  dataMap: Map<Key, MergedData>,
  currData: MergedData,
  tempRowKeys: Key[],
  disabledRowKeys: Key[],
) {
  let parentSelected = true
  while (parentSelected && currData.parentKey) {
    const parent = dataMap.get(currData.parentKey)!
    if (!disabledRowKeys.includes(currData.parentKey)) {
      parentSelected = parent.children!.every(
        item => disabledRowKeys.includes(item.rowKey) || tempRowKeys.includes(item.rowKey),
      )
      if (parentSelected) {
        tempRowKeys.push(currData.parentKey)
      }
    }
    currData = parent
  }
}
