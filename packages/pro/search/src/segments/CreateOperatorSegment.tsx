/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PanelRenderContext, SearchField, Segment, SelectPanelData } from '../types'

import { isString } from 'lodash-es'

import { type VKey, convertArray } from '@idux/cdk/utils'

import SelectPanel from '../panel/SelectPanel'

export function createOperatorSegment(
  prefixCls: string,
  searchField: SearchField,
): Segment<string | undefined> | undefined {
  const { operators, operatorPlaceholder, customOperatorLabel } = searchField
  if (!operators || operators.length <= 0) {
    return
  }

  const panelRenderer = (context: PanelRenderContext<string | undefined>) => {
    const { slots, value, setValue, ok, setOnKeyDown } = context
    const handleChange = (value: string[]) => {
      setValue(value[0])
      ok()
    }

    const panelSlots = {
      optionLabel:
        customOperatorLabel &&
        (isString(customOperatorLabel)
          ? (option: SelectPanelData) => slots[customOperatorLabel]?.(option.key)
          : (option: SelectPanelData) => customOperatorLabel?.(option.key as string)),
    }

    return (
      <SelectPanel
        class={`${prefixCls}-operator-segment-panel`}
        v-slots={panelSlots}
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
    placeholder: operatorPlaceholder,
    parse: input => parseInput(input, searchField),
    format: value => value ?? '',
    panelRenderer,
  }
}

function parseInput(input: string, searchField: SearchField): string | undefined {
  return input.match(new RegExp(`^(${searchField.operators?.join('|')})`))?.[1]
}
