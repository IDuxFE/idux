/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectPanelData } from '../types'
import type { VKey } from '@idux/cdk/utils'

import { isNil } from 'lodash-es'

export function getSelectDataSourceKeys(dataSource: SelectPanelData[]): VKey[] {
  const keys = []
  for (const option of dataSource) {
    if (option.children && option.children.length > 0) {
      keys.push(...option.children.map((child: SelectPanelData) => child.key))
    } else {
      keys.push(option.key)
    }
  }

  return keys
}
export function findDataSourceItem(
  dataSource: SelectPanelData[],
  searchFn: (option: SelectPanelData) => boolean,
): SelectPanelData | undefined {
  for (const option of dataSource) {
    if (option.children) {
      for (const child of option.children as SelectPanelData[]) {
        if (searchFn(child)) {
          return child
        }
      }
    }

    if (searchFn(option)) {
      return option
    }
  }

  return
}
export function filterDataSource(
  dataSource: SelectPanelData[],
  filterFn: (option: SelectPanelData) => boolean,
): SelectPanelData[] {
  const filteredData: SelectPanelData[] = []
  for (const option of dataSource) {
    const children = []
    if (option.children) {
      for (const child of option.children as SelectPanelData[]) {
        filterFn(child) && children.push(child)
      }
    }

    if (children.length > 0 || filterFn(option)) {
      filteredData.push({
        ...option,
        children,
      })
    }
  }

  return filteredData
}

export function filterSelectDataSourceByInput(
  dataSource: SelectPanelData[],
  input: string | undefined,
  searchFn?: (data: SelectPanelData, searchText: string) => boolean,
): SelectPanelData[] {
  if (!input) {
    return dataSource
  }

  const filterFn = searchFn
    ? (option: SelectPanelData) => searchFn(option, input.trim())
    : (option: SelectPanelData) => matchRule(option.label, input.trim())

  return filterDataSource(dataSource, filterFn)
}

function matchRule(srcString: string | number | undefined, targetString: string): boolean {
  return !isNil(srcString) && String(srcString).toLowerCase().includes(targetString.toLowerCase())
}
