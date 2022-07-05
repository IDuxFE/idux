/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PanelRenderContext, SearchField, Segment } from '../types'

import { type VKey, convertArray } from '@idux/cdk/utils'

import SelectPanel from '../panel/SelectPanel'

export function createOperatorSegment(
  prefixCls: string,
  searchField: SearchField,
): Segment<string | undefined> | undefined {
  if (!searchField.operators || searchField.operators.length <= 0) {
    return
  }

  const panelRenderer = (context: PanelRenderContext<string | undefined>) => {
    const { value, setValue, ok, setOnKeyDown } = context
    const handleChange = (value: string[]) => {
      setValue(value[0])
      ok()
    }
    return (
      <SelectPanel
        class={`${prefixCls}-operator-segment-panel`}
        value={convertArray(value)}
        dataSource={searchField.operators?.map(operator => ({ key: operator, label: operator }))}
        multiple={false}
        onChange={handleChange as (value: VKey[]) => void}
        onConfirm={ok}
        setOnKeyDown={setOnKeyDown}
      />
    )
  }

  return {
    name: 'operator',
    inputClassName: `${prefixCls}-operator-segment-input`,
    defaultValue: searchField.operators.find(op => op === searchField.defaultOperator),
    parse: input => parseInput(input, searchField),
    format: value => value ?? '',
    panelRenderer,
  }
}

function parseInput(input: string, searchField: SearchField): string | undefined {
  return input.match(new RegExp(`^(${searchField.operators?.join('|')})`))?.[1]
}
