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
import { filterDataSource, getSelectDataSourceKeys, getSelectableCommonParams } from '../utils'

const defaultSeparator = '|'

export function createSelectSegment(
  prefixCls: string,
  searchField: SelectSearchField,
): Segment<VKey | VKey[] | undefined> {
  const {
    fieldConfig: { dataSource, separator, searchable, showSelectAll, searchFn, multiple, virtual, onSearch },
    inputClassName,
    containerClassName,
    onPanelVisibleChange,
  } = searchField

  const panelRenderer = (context: PanelRenderContext<VKey | VKey[] | undefined>) => {
    const { setValue, ok, cancel, setOnKeyDown, renderLocation } = context
    const keys = getSelectDataSourceKeys(dataSource)
    const { panelValue, searchInput, handleChange } = getSelectableCommonParams(
      context,
      !!multiple,
      renderLocation === 'individual' ? separator ?? defaultSeparator : undefined,
      !multiple || renderLocation === 'quick-select-panel',
    )

    const handleSelectAll = () => {
      const selectableKeys = getSelectDataSourceKeys(filterDataSource(dataSource, option => !option.disabled))
      setValue(selectableKeys.length !== panelValue?.length ? selectableKeys : undefined)
    }

    return (
      <SelectPanel
        value={panelValue}
        allSelected={panelValue && panelValue.length > 0 && keys.length <= panelValue.length}
        dataSource={dataSource}
        multiple={multiple}
        virtual={virtual}
        autoHeight={renderLocation === 'quick-select-panel'}
        setOnKeyDown={setOnKeyDown}
        showSelectAll={renderLocation === 'individual' && showSelectAll}
        showFooter={renderLocation === 'individual'}
        searchValue={searchable ? searchInput : ''}
        searchFn={searchFn}
        onChange={handleChange}
        onSelectAllClick={handleSelectAll}
        onConfirm={ok}
        onCancel={cancel}
        onSearch={onSearch}
      />
    )
  }

  return {
    name: searchField.type,
    inputClassName: [inputClassName, `${prefixCls}-select-segment-input`],
    containerClassName: [containerClassName, `${prefixCls}-select-segment-container`],
    placeholder: searchField.placeholder,
    parse: input => parseInput(input, searchField),
    format: value => formatValue(value, searchField),
    panelRenderer,
    onVisibleChange: onPanelVisibleChange,
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
