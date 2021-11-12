/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Key, TableColumnSelectableOption, TableProps } from '../types'
import type { TableColumnMerged, TableColumnMergedSelectable } from './useColumns'
import type { DataSourceContext, MergedData } from './useDataSource'
import type { TableLocale } from '@idux/components/i18n'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isString } from 'lodash-es'

import { callEmit, useControlledProp } from '@idux/cdk/utils'

export function useSelectable(
  props: TableProps,
  locale: ComputedRef<TableLocale>,
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  { mergedMap, paginatedMap }: DataSourceContext,
): SelectableContext {
  const selectable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'selectable'),
  ) as ComputedRef<TableColumnMergedSelectable | undefined>

  const [selectedRowKeys, setSelectedRowKeys] = useControlledProp(props, 'selectedRowKeys', () => [])

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
      const { parentKey } = dataMap.get(key) || {}
      if (parentKey) {
        let parent = dataMap.get(parentKey)
        if (parent && !selectedKeys.includes(parent.rowKey)) {
          if (!disabledRowKeys.includes(parentKey)) {
            indeterminateKeySet.add(parentKey)
          }
          while (parent?.parentKey) {
            if (!disabledRowKeys.includes(parent.parentKey)) {
              indeterminateKeySet.add(parent.parentKey)
            }
            parent = dataMap.get(parent.parentKey)
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

  const emitChange = (tempRowKeys: Key[]) => {
    setSelectedRowKeys(tempRowKeys)
    const dataMap = mergedMap.value
    const { onChange } = selectable.value || {}
    if (onChange) {
      const selectedRecords: unknown[] = []
      tempRowKeys.forEach(key => {
        const currData = dataMap.get(key)
        currData && selectedRecords.push(currData.record)
      })
      callEmit(onChange, tempRowKeys, selectedRecords)
    }
  }

  const handleSelectChange = (key: Key, record: unknown) => {
    const dataMap = mergedMap.value
    const { disabledRowKeys } = currentPageRowKeys.value
    const { multiple, onSelect } = selectable.value || {}
    let tempRowKeys = [...selectedRowKeys.value]
    const index = tempRowKeys.indexOf(key)
    const selected = index >= 0

    if (multiple) {
      const currData = dataMap.get(key)
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
      tempRowKeys = selected ? [] : [key]
    }

    callEmit(onSelect, !selected, record)
    emitChange(tempRowKeys)
  }

  const handleHeadSelectChange = () => {
    const { enabledRowKeys } = currentPageRowKeys.value
    const tempRowKeySet = new Set(selectedRowKeys.value)
    if (currentPageAllSelected.value) {
      enabledRowKeys.forEach(key => tempRowKeySet.delete(key))
    } else {
      enabledRowKeys.forEach(key => tempRowKeySet.add(key))
    }
    emitChange([...tempRowKeySet])
  }

  const handleSelectAll = () => {
    const { disabled, onSelectAll } = selectable.value || {}
    const tempRowKeys: Key[] = []
    mergedMap.value.forEach((currData, key) => {
      if (!disabled?.(currData.record)) {
        tempRowKeys.push(key)
      }
    })
    callEmit(onSelectAll, tempRowKeys)
    emitChange(tempRowKeys)
  }

  const handleSelectInvert = () => {
    const { disabled, onSelectInvert } = selectable.value || {}
    const tempRowKeys = [...selectedRowKeys.value]

    mergedMap.value.forEach((currData, key) => {
      if (disabled?.(currData.record)) {
        return
      }
      const index = tempRowKeys.indexOf(key)
      if (index >= 0) {
        tempRowKeys.splice(index, 1)
      } else {
        tempRowKeys.push(key)
      }
    })
    emitChange(tempRowKeys)
    callEmit(onSelectInvert, tempRowKeys)
  }

  const handleSelectNone = () => {
    const { onSelectNone } = selectable.value || {}
    callEmit(onSelectNone)
    emitChange([])
  }

  const handleSelectPageInvert = () => {
    const { disabled, onSelectPageInvert } = selectable.value || {}
    const tempRowKeys: Key[] = []
    const currSelectedRowKeys = selectedRowKeys.value
    paginatedMap.value.forEach((currData, key) => {
      if (disabled?.(currData.record) || currSelectedRowKeys.includes(key)) {
        return
      }
      tempRowKeys.push(key)
    })
    callEmit(onSelectPageInvert, tempRowKeys)
    emitChange(tempRowKeys)
  }

  const handleSelectOptionClick = (callback?: (pageRowKeys: Key[]) => void) => {
    const { disabled } = selectable.value || {}
    const tempRowKeys: Key[] = []
    paginatedMap.value.forEach((currData, key) => {
      if (disabled?.(currData.record)) {
        return
      }
      tempRowKeys.push(key)
    })
    callEmit(callback, tempRowKeys)
  }

  const mergedSelectableOptions = computed(() => {
    const { options } = selectable.value || {}
    if (!options || options.length === 0) {
      return
    }
    const { selectAll, selectInvert, selectNone, selectPageInvert } = locale.value
    return options.map(option => {
      if (isString(option)) {
        const key = `IDUX_TABLE_KEY_selectable-${option}`
        if (option === 'all') {
          return { key, label: selectAll, onClick: handleSelectAll }
        }
        if (option === 'invert') {
          return { key, label: selectInvert, onClick: handleSelectInvert }
        }
        if (option === 'none') {
          return { key, label: selectNone, onClick: handleSelectNone }
        }
        if (option === 'pageInvert') {
          return { key, label: selectPageInvert, onClick: handleSelectPageInvert }
        }
      }
      const onClick = () => handleSelectOptionClick(option.onClick)
      return { ...option, onClick }
    })
  })

  return {
    selectable,
    selectedRowKeys,
    indeterminateRowKeys,
    currentPageRowKeys,
    currentPageAllSelected,
    currentPageSomeSelected,
    handleSelectChange,
    handleHeadSelectChange,
    mergedSelectableOptions,
  }
}

export interface SelectableContext {
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>
  selectedRowKeys: ComputedRef<Key[]>
  indeterminateRowKeys: ComputedRef<Key[]>
  currentPageRowKeys: ComputedRef<{
    enabledRowKeys: Key[]
    disabledRowKeys: Key[]
  }>
  currentPageAllSelected: ComputedRef<boolean>
  currentPageSomeSelected: ComputedRef<boolean>
  handleSelectChange: (key: Key, record: unknown) => void
  handleHeadSelectChange: () => void
  mergedSelectableOptions: ComputedRef<TableColumnMergedSelectableOption[] | undefined>
}

export interface TableColumnMergedSelectableOption extends TableColumnSelectableOption {
  onClick: () => void
}

function getChildrenKeys(currData: MergedData | undefined, disabledRowKeys: Key[]) {
  const keys: Key[] = []
  const { children } = currData || {}
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

function getParentKeys(dataMap: Map<Key, MergedData>, currData: MergedData | undefined, disabledRowKeys: Key[]) {
  const keys: Key[] = []
  while (currData?.parentKey) {
    const { parentKey } = currData
    if (!disabledRowKeys.includes(currData.parentKey)) {
      keys.push(parentKey)
    }
    currData = dataMap.get(parentKey)
  }
  return keys
}

function setParentSelected(
  dataMap: Map<Key, MergedData>,
  currData: MergedData | undefined,
  tempRowKeys: Key[],
  disabledRowKeys: Key[],
) {
  let parentSelected = true
  while (parentSelected && currData?.parentKey) {
    const parent = dataMap.get(currData.parentKey)
    if (parent && !disabledRowKeys.includes(currData.parentKey)) {
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
