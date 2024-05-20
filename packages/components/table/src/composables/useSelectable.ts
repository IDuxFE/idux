/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, ref } from 'vue'

import { isString, isSymbol } from 'lodash-es'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'
import { type Locale } from '@idux/components/locales'
import { type MenuClickOptions, type MenuData } from '@idux/components/menu'
import {
  type TreeCheckStateContext,
  type TreeCheckStateResolverContext,
  useTreeCheckState,
} from '@idux/components/utils'

import { type TableColumnMerged, type TableColumnMergedSelectable } from './useColumns'
import { type DataSourceContext, type MergedData } from './useDataSource'
import { type TableProps } from '../types'

export interface SelectableContext {
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>
  selectedRowKeys: ComputedRef<VKey[]>
  isChecked: (key: VKey) => boolean
  isIndeterminate: (key: VKey) => boolean
  isCheckDisabled: (key: VKey) => boolean
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

export function useSelectable(
  props: TableProps,
  locale: Locale,
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  { mergedData, mergedMap, paginatedData, paginatedMap, parentKeyMap, depthMap }: DataSourceContext,
): SelectableContext {
  const selectable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'selectable'),
  ) as ComputedRef<TableColumnMergedSelectable | undefined>

  const [selectedRowKeys, setSelectedRowKeys] = useControlledProp(props, 'selectedRowKeys', () => [])

  const resolverContext = computed<TreeCheckStateResolverContext<MergedData, 'children'>>(() => {
    return {
      data: mergedData.value,
      dataMap: mergedMap.value,
      parentKeyMap: parentKeyMap.value,
      depthMap: depthMap.value,
    }
  })
  const childrenKey = ref('children' as const)
  const getKey = ref((item: MergedData) => item.rowKey)
  const cascaderStrategy = computed(() => (selectable.value?.multiple ? props.cascaderStrategy : 'off'))

  const isDisabled = computed(() => {
    const disabled = selectable.value?.disabled

    return (data: MergedData) => !!disabled?.(data.record)
  })

  const checkStateContext = useTreeCheckState(
    selectedRowKeys,
    resolverContext,
    childrenKey,
    getKey,
    cascaderStrategy,
    isDisabled,
  )
  const { checkStateResolver, isCheckDisabled, isChecked, isIndeterminate, toggle } = checkStateContext

  const currentPageRowKeys = computed(() => {
    const enabledRowKeys: VKey[] = []
    const disabledRowKeys: VKey[] = []
    paginatedMap.value.forEach((_, key) => {
      if (isCheckDisabled(key)) {
        disabledRowKeys.push(key)
      } else {
        enabledRowKeys.push(key)
      }
    })
    return { enabledRowKeys, disabledRowKeys }
  })

  const currentPageAllSelectState = computed(() => {
    let checked = !!paginatedMap.value.size
    let allSelected = !!paginatedMap.value.size
    let someSelected = false

    for (const key of paginatedMap.value.keys()) {
      if (isChecked(key) || isIndeterminate(key)) {
        someSelected = true
      } else {
        allSelected = false

        if (!isCheckDisabled(key)) {
          checked = false
        }
      }
    }

    return { checked, allSelected, someSelected }
  })

  // 当前页全选是否被勾选
  const currentPageAllSelected = computed(() => currentPageAllSelectState.value.checked)

  // 当前页是否部分被选中

  const currentPageSomeSelected = computed(
    () => !currentPageAllSelectState.value.allSelected && currentPageAllSelectState.value.someSelected,
  )
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
    const currData = dataMap.get(key)

    if (!currData) {
      return
    }

    const { multiple, onSelect } = selectable.value || {}

    let tempRowKeys = [...selectedRowKeys.value]
    let _checked

    if (multiple) {
      const { checked, checkedKeys } = toggle(currData)
      _checked = checked
      tempRowKeys = checkedKeys
    } else {
      _checked = !isChecked(key)
      tempRowKeys = _checked ? [key] : []
    }

    callEmit(onSelect, _checked, record)
    emitChange(tempRowKeys)
  }

  const handleHeadSelectChange = () => {
    const { disabledRowKeys } = currentPageRowKeys.value
    let newSelectedKeys: VKey[]
    if (currentPageAllSelected.value) {
      newSelectedKeys = checkStateResolver.getAllUncheckedKeys(
        paginatedData.value,
        disabledRowKeys.filter(key => isChecked(key)),
      )
    } else {
      newSelectedKeys = checkStateResolver.getAllCheckedKeys(
        paginatedData.value,
        disabledRowKeys.filter(key => !isChecked(key)),
      )
    }

    emitChange(newSelectedKeys)
  }

  const mergedSelectableMenus = useMergedMenus(selectable, locale)
  const handleSelectableMenuClick = useMenuClickHandle(
    selectable,
    checkStateContext,
    mergedMap,
    paginatedMap,
    selectedRowKeys,
    emitChange,
  )

  return {
    selectable,
    selectedRowKeys,
    isChecked,
    isIndeterminate,
    isCheckDisabled,
    currentPageRowKeys,
    currentPageAllSelected,
    currentPageSomeSelected,
    handleSelectChange,
    handleHeadSelectChange,
    mergedSelectableMenus,
    handleSelectableMenuClick,
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
  checkStateContext: TreeCheckStateContext<MergedData, 'children'>,
  mergedMap: ComputedRef<Map<VKey, MergedData>>,
  paginatedMap: ComputedRef<Map<VKey, MergedData>>,
  selectedRowKeys: ComputedRef<VKey[]>,
  emitChange: (tempRowKeys: VKey[]) => void,
) {
  const { checkDisabledKeySet, checkStateResolver, isChecked, isCheckDisabled } = checkStateContext
  const handleSelectAll = () => {
    const { onSelectAll } = selectable.value || {}
    const newSelectedKeys = checkStateResolver.getAllCheckedKeys(
      [...checkDisabledKeySet.value].filter(key => !isChecked(key)),
    )
    callEmit(onSelectAll, newSelectedKeys)
    emitChange(newSelectedKeys)
  }

  const handleSelectInvert = () => {
    const { onSelectInvert } = selectable.value || {}
    const appendedKeys: VKey[] = []
    const removedKeys: VKey[] = []

    mergedMap.value.forEach((_, key) => {
      if (isCheckDisabled(key)) {
        return
      }

      if (isChecked(key)) {
        removedKeys.push(key)
      } else {
        appendedKeys.push(key)
      }
    })

    const newSelectedKeys = checkStateResolver.removeKeys(
      checkStateResolver.appendKeys(selectedRowKeys.value, appendedKeys),
      removedKeys,
    )

    emitChange(newSelectedKeys)
    callEmit(onSelectInvert, newSelectedKeys)
  }

  const handleSelectNone = () => {
    const { onSelectNone } = selectable.value || {}
    callEmit(onSelectNone)
    emitChange([])
  }

  const handleSelectPageInvert = () => {
    const { onSelectPageInvert } = selectable.value || {}
    const appendedKeys: VKey[] = []
    const removedKeys: VKey[] = []

    paginatedMap.value.forEach((_, key) => {
      if (isCheckDisabled(key)) {
        return
      }

      if (isChecked(key)) {
        removedKeys.push(key)
      } else {
        appendedKeys.push(key)
      }
    })

    const newSelectedKeys = checkStateResolver.removeKeys(
      checkStateResolver.appendKeys(selectedRowKeys.value, appendedKeys),
      removedKeys,
    )

    emitChange(newSelectedKeys)
    callEmit(onSelectPageInvert, newSelectedKeys)
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
    const { onMenuClick } = selectable.value || {}
    if (!onMenuClick) {
      return
    }
    const tempRowKeys: VKey[] = []
    paginatedMap.value.forEach((_, key) => {
      if (isCheckDisabled(key)) {
        return
      }
      tempRowKeys.push(key)
    })
    callEmit(onMenuClick, options, tempRowKeys)
  }
}
