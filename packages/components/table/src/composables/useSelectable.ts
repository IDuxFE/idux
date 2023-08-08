/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isNil, isString, isSymbol } from 'lodash-es'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'
import { type Locale } from '@idux/components/locales'
import { type MenuClickOptions, type MenuData } from '@idux/components/menu'

import { type TableProps } from '../types'
import { type TableColumnMerged, type TableColumnMergedSelectable } from './useColumns'
import { type DataSourceContext, type MergedData } from './useDataSource'

export function useSelectable(
  props: TableProps,
  locale: Locale,
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  { mergedMap, paginatedMap }: DataSourceContext,
): SelectableContext {
  const selectable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'selectable'),
  ) as ComputedRef<TableColumnMergedSelectable | undefined>

  const [selectedRowKeys, setSelectedRowKeys] = useControlledProp(props, 'selectedRowKeys', () => [])

  const currentPageRowKeys = computed(() => {
    const { disabled } = selectable.value || {}
    const enabledRowKeys: VKey[] = []
    const disabledRowKeys: VKey[] = []
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
    const indeterminateKeySet = new Set<VKey>()
    const selectedKeys = selectedRowKeys.value
    const { disabledRowKeys } = currentPageRowKeys.value
    const dataMap = mergedMap.value
    selectedKeys.forEach(key => {
      const { parentKey } = dataMap.get(key) || {}
      if (!isNil(parentKey)) {
        let parent = dataMap.get(parentKey)
        if (parent && !selectedKeys.includes(parent.rowKey)) {
          while (parent && !isNil(parent?.rowKey)) {
            if (!disabledRowKeys.includes(parent.rowKey)) {
              indeterminateKeySet.add(parent.rowKey)
            }
            parent = !isNil(parent.parentKey) ? dataMap.get(parent.parentKey) : undefined
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
  // 缓存已经被选中的数据，考虑到后端分页的清空，dataMap 中没有全部的数据
  const cacheSelectedMap = new Map<VKey, MergedData>()

  const emitChange = (tempRowKeys: VKey[]) => {
    setSelectedRowKeys(tempRowKeys)
    const dataMap = mergedMap.value
    const { onChange } = selectable.value || {}
    if (onChange) {
      const selectedRecords: unknown[] = []
      // 清理掉缓存中被取消选中的数据
      cacheSelectedMap.forEach((_, key) => {
        if (!tempRowKeys.includes(key)) {
          cacheSelectedMap.delete(key)
        }
      })
      tempRowKeys.forEach(key => {
        let currData = dataMap.get(key)
        if (currData) {
          cacheSelectedMap.set(key, currData)
        } else {
          currData = cacheSelectedMap.get(key)
        }
        currData && selectedRecords.push(currData.record)
      })
      callEmit(onChange, tempRowKeys, selectedRecords)
    }
  }

  const handleSelectChange = (key: VKey, record: unknown) => {
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
        tempRowKeys.push(...childrenKeys)
      }

      setParentSelected(dataMap, currData, tempRowKeys, disabledRowKeys)
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

  const mergedSelectableMenus = useMergedMenus(selectable, locale)
  const handleSelectableMenuClick = useMenuClickHandle(selectable, mergedMap, paginatedMap, selectedRowKeys, emitChange)

  return {
    selectable,
    selectedRowKeys,
    indeterminateRowKeys,
    currentPageRowKeys,
    currentPageAllSelected,
    currentPageSomeSelected,
    handleSelectChange,
    handleHeadSelectChange,
    mergedSelectableMenus,
    handleSelectableMenuClick,
  }
}

export interface SelectableContext {
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>
  selectedRowKeys: ComputedRef<VKey[]>
  indeterminateRowKeys: ComputedRef<VKey[]>
  currentPageRowKeys: ComputedRef<{
    enabledRowKeys: VKey[]
    disabledRowKeys: VKey[]
  }>
  currentPageAllSelected: ComputedRef<boolean>
  currentPageSomeSelected: ComputedRef<boolean>
  handleSelectChange: (key: VKey, record: unknown) => void
  handleHeadSelectChange: () => void
  mergedSelectableMenus: ComputedRef<MenuData[]>
  handleSelectableMenuClick: (options: MenuClickOptions) => void
}

function getChildrenKeys(currData: MergedData | undefined, disabledRowKeys: VKey[]) {
  const keys: VKey[] = []
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

function getParentKeys(dataMap: Map<VKey, MergedData>, currData: MergedData | undefined, disabledRowKeys: VKey[]) {
  const keys: VKey[] = []
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
  dataMap: Map<VKey, MergedData>,
  currData: MergedData | undefined,
  tempRowKeys: VKey[],
  disabledRowKeys: VKey[],
) {
  let parentSelected = true
  while (parentSelected && currData && !isNil(currData.parentKey)) {
    const parent = dataMap.get(currData.parentKey)
    if (parent && !disabledRowKeys.includes(currData.parentKey)) {
      parentSelected = parent.children!.every(
        item => disabledRowKeys.includes(item.rowKey) || tempRowKeys.includes(item.rowKey),
      )

      const parentKeyIdx = tempRowKeys.findIndex(key => key === currData!.parentKey)
      if (parentSelected) {
        parentKeyIdx < 0 && tempRowKeys.push(currData.parentKey)
      } else {
        parentKeyIdx > -1 && tempRowKeys.splice(parentKeyIdx, 1)
      }
    }
    currData = parent
  }
}

const allMenuItemKey = Symbol('IDUX_TABLE_KEY_selectable-all')
const invertMenuItemKey = Symbol('IDUX_TABLE_KEY_selectable-invert')
const noneMenuItemKey = Symbol('IDUX_TABLE_KEY_selectable-none')
const pageInvertMenuItemKey = Symbol('IDUX_TABLE_KEY_selectable-pageInvert')

function useMergedMenus(selectable: ComputedRef<TableColumnMergedSelectable | undefined>, locale: Locale) {
  return computed<MenuData[]>(() => {
    const { menus } = selectable.value || {}
    if (!menus || menus.length === 0) {
      return []
    }
    const { selectAll, selectInvert, selectNone, selectPageInvert } = locale.table
    return menus.map(item => {
      if (isString(item)) {
        if (item === 'all') {
          return { type: 'item', key: allMenuItemKey, label: selectAll }
        }
        if (item === 'invert') {
          return { type: 'item', key: invertMenuItemKey, label: selectInvert }
        }
        if (item === 'none') {
          return { type: 'item', key: noneMenuItemKey, label: selectNone }
        }
        if (item === 'pageInvert') {
          return { type: 'item', key: pageInvertMenuItemKey, label: selectPageInvert }
        }
        return { type: 'item', key: item, label: item }
      }
      return item
    })
  })
}

function useMenuClickHandle(
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>,
  mergedMap: ComputedRef<Map<VKey, MergedData>>,
  paginatedMap: ComputedRef<Map<VKey, MergedData>>,
  selectedRowKeys: ComputedRef<VKey[]>,
  emitChange: (tempRowKeys: VKey[]) => void,
) {
  const handleSelectAll = () => {
    const { disabled, onSelectAll } = selectable.value || {}
    const tempRowKeys: VKey[] = []
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
    const tempRowKeys: VKey[] = []
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

  const menuClickHandles = new Map<symbol, () => void>([
    [allMenuItemKey, handleSelectAll],
    [invertMenuItemKey, handleSelectInvert],
    [noneMenuItemKey, handleSelectNone],
    [pageInvertMenuItemKey, handleSelectPageInvert],
  ])

  return (options: MenuClickOptions) => {
    const key = options.key
    if (isSymbol(key) && menuClickHandles.has(key)) {
      const handle = menuClickHandles.get(key)!
      handle()
      return
    }
    const { disabled, onMenuClick } = selectable.value || {}
    if (!onMenuClick) {
      return
    }
    const tempRowKeys: VKey[] = []
    paginatedMap.value.forEach((currData, key) => {
      if (disabled?.(currData.record)) {
        return
      }
      tempRowKeys.push(key)
    })
    callEmit(onMenuClick, options, tempRowKeys)
  }
}
