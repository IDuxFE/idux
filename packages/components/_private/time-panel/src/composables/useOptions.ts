/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePanelCell, TimePanelColumnProps, TimePanelColumnType, TimePanelProps } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'

import { calculateValue, calculateViewHour, normalizeAmPm } from '../utils'

export function useOptions(
  props: TimePanelProps,
  dateConfig: DateConfig,
): {
  hourOptionsProps: ComputedRef<TimePanelColumnProps>
  minuteOptionsProps: ComputedRef<TimePanelColumnProps>
  secondOptionsProps: ComputedRef<TimePanelColumnProps>
  amPmOptionsProps: ComputedRef<TimePanelColumnProps>
} {
  const { get } = dateConfig
  const [activeValue, setActiveValue] = useControlledProp(props, 'activeValue', () => dateConfig.now())
  const [selectedValue, setSelectedValue] = useControlledProp(props, 'value')

  const viewHours = computed(
    () => selectedValue.value && calculateViewHour(get(selectedValue.value, 'hour'), props.use12Hours),
  )
  const ampm = computed(() => selectedValue.value && normalizeAmPm(get(selectedValue.value, 'hour'), props.use12Hours))

  function getOptions(type: TimePanelColumnType): TimePanelCell[] {
    const getHourOptions = () => {
      const options = generateNumericOptions(
        props.use12Hours ? 12 : 24,
        props.hourStep,
        props.disabledHours(ampm.value),
        props.hideDisabledOptions,
      )
      if (props.use12Hours) {
        // if is12Hours, there is no 0, it should be 12 am or 12 pm
        const zeroOpt = options.find(opt => opt.value === 0)
        zeroOpt && (zeroOpt.value = 12)
      }

      return options
    }

    switch (type) {
      case 'AM/PM':
        return generateAmPmOptions('', props.hideDisabledOptions)
      case 'second':
        return generateNumericOptions(
          60,
          props.secondStep,
          props.disabledSeconds!(
            viewHours.value,
            selectedValue.value && get(selectedValue.value, 'minute'),
            ampm.value,
          ),
          props.hideDisabledOptions,
        )
      case 'minute':
        return generateNumericOptions(
          60,
          props.minuteStep,
          props.disabledMinutes(viewHours.value, ampm.value),
          props.hideDisabledOptions,
        )
      case 'hour':
        return getHourOptions()
      default:
        return []
    }
  }

  const getHourValue = (value: Date) => {
    const hour = ampm.value === 'pm' ? get(value, 'hour') % 12 : get(value, 'hour')

    if (ampm.value) {
      return hour === 0 ? 12 : hour
    }

    return hour
  }

  function getColumnValue(value: Date, type: TimePanelColumnType) {
    switch (type) {
      case 'AM/PM':
        return ampm.value
      case 'hour':
      default:
        return getHourValue(value)
      case 'minute':
        return get(value, 'minute')
      case 'second':
        return get(value, 'second')
    }
  }

  function getOnActiveChange(type: TimePanelColumnType) {
    const onActiveChange = (type: TimePanelColumnType, cell: TimePanelCell) => {
      const newValue = calculateValue(
        dateConfig,
        selectedValue.value ?? activeValue.value,
        type,
        props.use12Hours,
        cell.value,
      )

      !cell.disabled && setSelectedValue(newValue)
      setActiveValue(newValue)
      callEmit(props.onChange, newValue)
    }

    return (cell: TimePanelCell) => onActiveChange(type, cell)
  }

  const getProps = (type: TimePanelColumnType) => {
    return computed(
      () =>
        ({
          activeValue: getColumnValue(activeValue.value, type),
          selectedValue: selectedValue.value && getColumnValue(selectedValue.value, type),
          options: getOptions(type),
          onActiveChange: getOnActiveChange(type),
        } as TimePanelColumnProps),
    )
  }

  return {
    hourOptionsProps: getProps('hour'),
    minuteOptionsProps: getProps('minute'),
    secondOptionsProps: getProps('second'),
    amPmOptionsProps: getProps('AM/PM'),
  }
}

function generateNumericOptions(
  total: number,
  step: number,
  disabledOption: number[],
  hideDisabledOptions: boolean,
): TimePanelCell[] {
  const options: TimePanelCell[] = []
  for (let index = 0; index < total; index += step) {
    const isDisabled = disabledOption.includes(index)
    if (!isDisabled || !hideDisabledOptions) {
      options.push({
        value: index,
        disabled: isDisabled,
      })
    }
  }
  return options
}

function generateAmPmOptions(disabledOption: string, hideDisabledOptions: boolean): TimePanelCell[] {
  disabledOption = disabledOption.toLowerCase()
  return ['am', 'pm']
    .map(item => ({
      disabled: disabledOption === item,
      value: item,
    }))
    .filter(item => !hideDisabledOptions || !item.disabled)
}
