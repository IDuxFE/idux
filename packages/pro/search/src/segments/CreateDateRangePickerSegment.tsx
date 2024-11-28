/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DateRangePickerSearchField, PanelRenderContext, Segment } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { DateRangePickerLocale } from '@idux/components/locales'

import { isArray, isString } from 'lodash-es'

import { type RangeShortcutProp, extractShortcutValue, getPresetRangeShortcutValue } from '@idux/components/date-picker'

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
  config: DateRangePickerSearchField['fieldConfig'],
  dateConfig: DateConfig,
  locale: DateRangePickerLocale,
): Segment<(Date | undefined)[] | undefined> {
  const { type, cellTooltip, disabledDate, timePanelOptions, shortcuts } = config ?? {}

  const panelRenderer = (context: PanelRenderContext<(Date | undefined)[] | undefined>) => {
    const { value, visible, active, setValue, cancel, ok } = context

    return (
      <DatePickerPanel
        panelType="dateRangePicker"
        value={value as Date[]}
        cellTooltip={cellTooltip}
        disabledDate={disabledDate}
        type={type ?? defaultType}
        showFooter={true}
        shortcuts={shortcuts}
        timePanelOptions={timePanelOptions}
        visible={visible}
        active={active}
        onChange={setValue as ((value: Date | Date[] | undefined) => void) | undefined}
        onConfirm={ok}
        onCancel={cancel}
      />
    )
  }

  return {
    name: 'dateRangePicker',
    inputClassName: [`${prefixCls}-date-range-picker-segment-input`],
    containerClassName: [`${prefixCls}-date-range-picker-segment-container`],
    parse: input => parseInput(input, dateConfig, config, locale),
    format: value => formatValue(value, dateConfig, config, locale),
    panelRenderer,
  }
}

function parseInput(
  input: string,
  dateConfig: DateConfig,
  config: DateRangePickerSearchField['fieldConfig'],
  locale: DateRangePickerLocale,
): (Date | undefined)[] | undefined {
  const { type, format, separator, shortcuts } = config ?? {}
  const _format = format ?? defaultFormat[type ?? defaultType]
  const _separator = separator ?? defaultSeparator

  const selectedSortcutValue = findMatchedShortcutValue(dateConfig, locale, input, shortcuts)

  if (selectedSortcutValue) {
    return selectedSortcutValue
  }

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
  config: DateRangePickerSearchField['fieldConfig'],
  locale: DateRangePickerLocale,
): string {
  const { type, format, separator, shortcuts } = config ?? {}
  const _format = format ?? defaultFormat[type ?? defaultType]
  const _separator = separator ?? defaultSeparator

  const selectedSortcutLabel = findMatchedShortcutSelectedLabel(dateConfig, locale, value, shortcuts)

  return (
    selectedSortcutLabel ?? (value ? value.map(v => v && dateConfig.format(v, _format)).join(` ${_separator} `) : '')
  )
}

function findMatchedShortcutSelectedLabel(
  dateConfig: DateConfig,
  locale: DateRangePickerLocale,
  value: (Date | undefined)[] | undefined,
  shortcutProp: RangeShortcutProp | undefined,
) {
  if (!shortcutProp) {
    return
  }

  const shortcuts = isArray(shortcutProp) ? shortcutProp : shortcutProp.shortcuts

  const selectedShortcut = shortcuts.find(shortcut => {
    const shortcutValue = isString(shortcut)
      ? getPresetRangeShortcutValue(dateConfig, shortcut)?.()
      : extractShortcutValue(shortcut)

    return shortcutValue && value?.every((v, i) => v?.valueOf() === shortcutValue[i].valueOf())
  })

  return (
    selectedShortcut &&
    (isString(selectedShortcut) ? locale.shortcuts[selectedShortcut] : selectedShortcut.selectedLabel)
  )
}

function findMatchedShortcutValue(
  dateConfig: DateConfig,
  locale: DateRangePickerLocale,
  input: string,
  shortcutProp: RangeShortcutProp | undefined,
) {
  if (!shortcutProp) {
    return
  }

  const shortcuts = isArray(shortcutProp) ? shortcutProp : shortcutProp.shortcuts

  const selectedShortcut = shortcuts.find(shortcut => {
    const shortcutSelectedLabel = isString(shortcut) ? locale.shortcuts[shortcut] : shortcut.selectedLabel

    return shortcutSelectedLabel && shortcutSelectedLabel === input
  })

  return (
    selectedShortcut &&
    (isString(selectedShortcut)
      ? getPresetRangeShortcutValue(dateConfig, selectedShortcut)?.()
      : extractShortcutValue(selectedShortcut))
  )
}
