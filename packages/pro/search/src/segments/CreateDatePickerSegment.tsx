/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerSearchField, PanelRenderContext, Segment } from '../types'
import type { DateConfig } from '@idux/components/config'

import DatePickerPanel from '../panel/DatePickerPanel'

const defaultFormat = {
  date: 'yyyy-MM-dd',
  week: 'RRRR-II',
  month: 'yyyy-MM',
  quarter: "yyyy-'Q'Q",
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
} as const
const defaultType = 'date'

export function createDatePickerSegment(
  prefixCls: string,
  searchField: DatePickerSearchField,
  dateConfig: DateConfig,
): Segment<Date | undefined> {
  const {
    fieldConfig: { type, cellTooltip, disabledDate, timePanelOptions },
    inputClassName,
    containerClassName,
    onPanelVisibleChange,
  } = searchField

  const panelRenderer = (context: PanelRenderContext<Date | undefined>) => {
    const { value, renderLocation, setValue, cancel, ok } = context

    const onChange = (value: Date | undefined) => {
      setValue(value)
      if (renderLocation === 'quick-select-panel') {
        ok()
      }
    }

    return (
      <DatePickerPanel
        panelType="datePicker"
        value={value}
        cellTooltip={cellTooltip}
        disabledDate={disabledDate}
        type={type ?? defaultType}
        showFooter={renderLocation === 'individual'}
        timePanelOptions={timePanelOptions}
        onChange={onChange as ((value: Date | Date[] | undefined) => void) | undefined}
        onConfirm={ok}
        onCancel={cancel}
      />
    )
  }

  return {
    name: searchField.type,
    inputClassName: [inputClassName, `${prefixCls}-date-picker-segment-input`],
    containerClassName: [containerClassName, `${prefixCls}-date-picker-segment-container`],
    placeholder: searchField.placeholder,
    parse: input => parseInput(input, dateConfig, searchField),
    format: value => formatValue(value, dateConfig, searchField),
    panelRenderer,
    onVisibleChange: onPanelVisibleChange,
  }
}

function parseInput(input: string, dateConfig: DateConfig, searchField: DatePickerSearchField): Date | undefined {
  const {
    fieldConfig: { format, type },
  } = searchField
  const _format = format ?? defaultFormat[type ?? defaultType]
  const date = dateConfig.parse(input, _format)
  return dateConfig.isValid(date) ? date : undefined
}

function formatValue(value: Date | undefined, dateConfig: DateConfig, searchField: DatePickerSearchField): string {
  const {
    fieldConfig: { format, type },
  } = searchField
  const _format = format ?? defaultFormat[type ?? defaultType]
  return value ? dateConfig.format(value, _format) : ''
}
