/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PanelRenderContext, Segment, SelectPanelData, SelectSearchField } from '../types'

import { isNil, toString } from 'lodash-es'

import { type VKey, convertArray } from '@idux/cdk/utils'

import SelectPanel from '../panel/SelectPanel'
import {
  filterDataSource,
  filterSelectDataSourceByInput,
  findDataSourceItem,
  getSelectDataSourceKeys,
} from '../utils/selectData'

const defaultSeparator = '|'

export function createSelectSegment(
  prefixCls: string,
  searchField: SelectSearchField,
): Segment<VKey | VKey[] | undefined> {
  const {
    fieldConfig: { dataSource, separator, searchable, showSelectAll, searchFn, multiple, virtual },
    defaultValue,
    inputClassName,
  } = searchField

  const panelRenderer = (context: PanelRenderContext<VKey | VKey[] | undefined>) => {
    const { input, value, setValue, ok, cancel, setOnKeyDown } = context

    const panelValue = convertArray(value)
    const keys = getSelectDataSourceKeys(dataSource)
    const lastInputPart = input
      .trim()
      .split(separator ?? defaultSeparator)
      .pop()
      ?.trim()

    const panelDataSource =
      searchable && !findDataSourceItem(dataSource, item => item.label === lastInputPart)
        ? filterSelectDataSourceByInput(dataSource, lastInputPart, searchFn)
        : dataSource

    const handleChange = (value: VKey[]) => {
      if (!multiple) {
        setValue(value[0])
        ok()
      } else {
        setValue(value.length > 0 ? value : undefined)
      }
    }
    const handleSelectAll = (selectAll: boolean) => {
      setValue(selectAll ? keys : [])
    }

    return (
      <SelectPanel
        value={panelValue}
        allSelected={keys.length <= panelValue.length}
        dataSource={panelDataSource}
        multiple={multiple}
        virtual={virtual}
        setOnKeyDown={setOnKeyDown}
        showSelectAll={showSelectAll}
        onChange={handleChange}
        onSelectAll={handleSelectAll}
        onConfirm={ok}
        onCancel={cancel}
      />
    )
  }

  return {
    name: searchField.type,
    inputClassName: [inputClassName, `${prefixCls}-select-segment-input`],
    defaultValue,
    parse: input => parseInput(input, searchField),
    format: value => formatValue(value, searchField),
    panelRenderer,
  }
}

function parseInput(input: string, searchField: SelectSearchField): VKey | VKey[] | undefined {
  const { separator, dataSource, multiple } = searchField.fieldConfig
  const trimedInput = input.trim()

  const keys = getKeyByLabels(dataSource, trimedInput.split(separator ?? defaultSeparator))

  return multiple ? (keys.length > 0 ? keys : undefined) : keys[0]
}

function formatValue(value: VKey | VKey[] | undefined, searchField: SelectSearchField): string {
  const { dataSource, separator } = searchField.fieldConfig
  if (isNil(value)) {
    return ''
  }

  return getLabelByKeys(dataSource, convertArray(value)).join(` ${separator ?? defaultSeparator} `)
}

function getLabelByKeys(dataSource: SelectPanelData[], keys: VKey[]): (string | number)[] {
  if (keys.length <= 0) {
    return []
  }

  return filterDataSource(dataSource, option => keys.includes(option.key)).map(data => data.label)
}

function getKeyByLabels(dataSource: SelectPanelData[], labels: string[]): VKey[] {
  if (labels.length <= 0) {
    return []
  }

  return filterDataSource(
    dataSource,
    option => labels.findIndex(label => label.trim() === toString(option.label).trim()) > -1,
  ).map(data => data.key)
}
