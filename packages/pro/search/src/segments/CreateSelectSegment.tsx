/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PanelRenderContext, Segment, SegmentState, SelectPanelData, SelectSearchField } from '../types'
import type { ProSearchLocale } from '@idux/pro/locales'

import { isNil, toString } from 'lodash-es'

import { type VKey, convertArray } from '@idux/cdk/utils'

import SelectPanel from '../panel/SelectPanel'
import { filterDataSource, getSelectDataSourceKeys, getSelectableCommonParams } from '../utils'

const defaultSeparator = '|'

export function createSelectSegment(
  prefixCls: string,
  config: SelectSearchField['fieldConfig'],
  locale: ProSearchLocale,
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
        setDefaultActiveValue={renderLocation === 'individual'}
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
    parse: input => parseInput(input, config, locale.allSelected),
    format: (value, states) => formatValue(value, states, config, locale.allSelected),
    panelRenderer,
  }
}

function parseInput(
  input: string,
  config: SelectSearchField['fieldConfig'],
  allSelected: string,
): VKey | VKey[] | undefined {
  const { concludeAllSelected, separator, dataSource, multiple } = config
  const trimedInput = input.trim()

  const keys =
    concludeAllSelected && trimedInput === allSelected
      ? dataSource.map(data => data.key)
      : getKeyByLabels(dataSource, trimedInput.split(separator ?? defaultSeparator))

  return multiple ? (keys.length > 0 ? keys : undefined) : keys[0]
}

function formatValue(
  value: VKey | VKey[] | undefined,
  states: SegmentState[] | undefined,
  config: SelectSearchField['fieldConfig'],
  allSelected: string,
): string {
  const { concludeAllSelected, dataSource, separator, searchable } = config
  if (isNil(value)) {
    return ''
  }

  const values = convertArray(value)

  if (concludeAllSelected && values.length > 0 && values.length >= dataSource.length) {
    return allSelected
  }

  const _separator = separator ?? defaultSeparator
  const labels = getLabelByKeys(dataSource, convertArray(value))

  if (searchable) {
    const inputParts = states ? states[states.length - 1]?.input?.split(_separator) ?? [] : []
    const lastInputPart = inputParts[inputParts.length - 1]?.trim() as string | undefined

    if (lastInputPart && !labels.includes(lastInputPart)) {
      return [...labels, lastInputPart].join(` ${_separator} `)
    }
  }

  return labels.join(` ${_separator} `)
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
