/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DateRangePickerSearchField, PanelRenderContext, Segment } from '../types'
import type { DateConfig } from '@idux/components/config'

import DatePickerPanel from '../panel/DatePickerPanel'

const defaultSeparator = '~'
const defaultFormat = {
  date: 'yyyy-MM-dd',
  week: 'RRRR-II',
  month: 'yyyy-MM',
  quarter: "yyyy-'Q'Q",
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
} as const
const defaultType = 'date'

export function createDateRangePickerSegment(
  prefixCls: string,
  searchField: DateRangePickerSearchField,
  dateConfig: DateConfig,
): Segment<(Date | undefined)[] | undefined> {
  const {
    fieldConfig: { type, cellTooltip, disabledDate, timePanelOptions },
    defaultValue,
    inputClassName,
    onPanelVisibleChange,
  } = searchField

  const panelRenderer = (context: PanelRenderContext<(Date | undefined)[] | undefined>) => {
    const { value, setValue, cancel, ok } = context

    return (
      <DatePickerPanel
        panelType="dateRangePicker"
        value={value as Date[]}
        cellTooltip={cellTooltip}
        disabledDate={disabledDate}
        type={type ?? defaultType}
        timePanelOptions={timePanelOptions}
        onChange={setValue as ((value: Date | Date[] | undefined) => void) | undefined}
        onConfirm={ok}
        onCancel={cancel}
      />
    )
  }

  return {
    name: searchField.type,
    inputClassName: [inputClassName, `${prefixCls}-date-range-picker-segment-input`],
    placeholder: searchField.placeholder,
    defaultValue,
    parse: input => parseInput(input, dateConfig, searchField),
    format: value => formatValue(value, dateConfig, searchField),
    panelRenderer,
    onVisibleChange: onPanelVisibleChange,
  }
}

function parseInput(
  input: string,
  dateConfig: DateConfig,
  searchField: DateRangePickerSearchField,
): (Date | undefined)[] | undefined {
  const {
    fieldConfig: { type, format, separator },
  } = searchField
  const _format = format ?? defaultFormat[type ?? defaultType]
  const _separator = separator ?? defaultSeparator

  const [fromStr, toStr] = input.split(_separator)

  const dates = [fromStr, toStr].map(str => {
    const date = str && dateConfig.parse(str.trim(), _format)
    return date && dateConfig.isValid(date) ? date : undefined
  })

  return dates && dates.every(date => !!date) ? dates : undefined
}

function formatValue(
  value: (Date | undefined)[] | undefined,
  dateConfig: DateConfig,
  searchField: DateRangePickerSearchField,
): string {
  const {
    fieldConfig: { type, format, separator },
  } = searchField
  const _format = format ?? defaultFormat[type ?? defaultType]
  const _separator = separator ?? defaultSeparator

  return value ? value.map(v => v && dateConfig.format(v, _format)).join(` ${_separator} `) : ''
}
