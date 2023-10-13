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
  config: SelectSearchField['fieldConfig'],
): Segment<VKey | VKey[] | undefined> {
  const { dataSource, separator, searchable, showSelectAll, searchFn, multiple, virtual, onSearch } = config

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
        setInactiveOnMouseLeave={renderLocation === 'quick-select-panel'}
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
    name: 'select',
    inputClassName: [`${prefixCls}-select-segment-input`],
    containerClassName: [`${prefixCls}-select-segment-container`],
    parse: input => parseInput(input, config),
    format: value => formatValue(value, config),
    panelRenderer,
  }
}

function parseInput(input: string, config: SelectSearchField['fieldConfig']): VKey | VKey[] | undefined {
  const { separator, dataSource, multiple } = config
  const trimedInput = input.trim()

  const keys = getKeyByLabels(dataSource, trimedInput.split(separator ?? defaultSeparator))

  return multiple ? (keys.length > 0 ? keys : undefined) : keys[0]
}

function formatValue(value: VKey | VKey[] | undefined, config: SelectSearchField['fieldConfig']): string {
  const { dataSource, separator } = config
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
