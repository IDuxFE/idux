/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PanelRenderContext, SearchField, Segment } from '../types'

import { type VKey, convertArray } from '@idux/cdk/utils'

import SelectPanel from '../panel/SelectPanel'
import { filterSelectDataSourceByInput } from '../utils/selectData'

export const defaultNameSegmentEndSymbol = ':'

export function createNameSegment(
  prefixCls: string,
  searchFields: SearchField[] | undefined,
  showEndSymbol: boolean,
): Segment<VKey | undefined> {
  const names = getSearchOptionNameList(searchFields ?? [])
  const panelRenderer = (context: PanelRenderContext<VKey | undefined>) => {
    const { input, value, setValue, ok, setOnKeyDown } = context
    const handleChange = (value: VKey[]) => {
      setValue(value[0])
      ok()
    }
    const filteredDataSource = filterSelectDataSourceByInput(names, getRawInput(input))
    if (!filteredDataSource?.length) {
      return
    }

    return (
      <SelectPanel
        class={`${prefixCls}-name-segment-panel`}
        value={convertArray(value)}
        dataSource={filteredDataSource}
        multiple={false}
        onChange={handleChange}
        onConfirm={ok}
        setOnKeyDown={setOnKeyDown}
      />
    )
  }

  return {
    name: 'name',
    inputClassName: `${prefixCls}-name-segment-input`,
    parse: input => parseInput(input, names),
    format: value => formatValue(value, names, showEndSymbol),
    panelRenderer,
  }
}

function getRawInput(input: string): string {
  return input.trim().replace(new RegExp(`${defaultNameSegmentEndSymbol}$`), '')
}

function getSearchOptionNameList(dataSource: SearchField[]): { key: VKey; label: string }[] {
  return dataSource.map(data => ({ key: data.key, label: data.label }))
}

function parseInput(input: string, names: { key: VKey; label: string }[]): VKey | undefined {
  const name = getRawInput(input)

  return names.find(item => item.label === name)?.key
}

function formatValue(value: VKey | undefined, names: { key: VKey; label: string }[], showEndSymbol: boolean): string {
  if (!value) {
    return ''
  }

  const name = names.find(item => item.key === value)?.label ?? ''

  return name && showEndSymbol ? name + defaultNameSegmentEndSymbol : name
}
