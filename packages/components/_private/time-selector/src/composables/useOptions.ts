/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimeSelectorCell, TimeSelectorColumnProps, TimeSelectorColumnType, TimeSelectorProps } from '../types'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { calculateValue, calculateViewHour, normalizeAmPm } from '../utils'

export function useOptions(props: TimeSelectorProps): {
  hourOptionsProps: ComputedRef<TimeSelectorColumnProps>
  minuteOptionsProps: ComputedRef<TimeSelectorColumnProps>
  secondOptionsProps: ComputedRef<TimeSelectorColumnProps>
  amPmOptionsProps: ComputedRef<TimeSelectorColumnProps>
} {
  const selectedValue = computed(() => props.value ?? props.defaultOpenValue)
  const viewHours = computed(() => calculateViewHour(selectedValue.value.getHours(), props.use12Hours))
  const ampm = computed(() => normalizeAmPm(selectedValue.value.getHours(), props.use12Hours))

  function getOptions(type: TimeSelectorColumnType): TimeSelectorCell[] {
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
          props.disabledSeconds(viewHours.value, selectedValue.value.getMinutes(), ampm.value),
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

  function getSelectedValue(type: TimeSelectorColumnType) {
    switch (type) {
      case 'AM/PM':
        return ampm.value
      case 'hour':
      default:
        return selectedValue.value.getHours()
      case 'minute':
        return selectedValue.value.getMinutes()
      case 'second':
        return selectedValue.value.getSeconds()
    }
  }

  function getOnChange(type: TimeSelectorColumnType) {
    const onChange = (type: TimeSelectorColumnType, value: string | number) => {
      const newValue = calculateValue(selectedValue.value, type, props.use12Hours, value)
      callEmit(props['onUpdate:value'], newValue)
      callEmit(props.onChange, newValue)
    }

    return (value: string | number) => onChange(type, value)
  }

  const getProps = (type: TimeSelectorColumnType) => {
    return computed(() => ({
      selectedValue: getSelectedValue(type),
      options: getOptions(type),
      onChange: getOnChange(type),
    }))
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
): TimeSelectorCell[] {
  const options: TimeSelectorCell[] = []
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

function generateAmPmOptions(disabledOption: string, hideDisabledOptions: boolean): TimeSelectorCell[] {
  disabledOption = disabledOption.toLowerCase()
  return ['am', 'pm']
    .map(item => ({
      disabled: disabledOption === item,
      value: item,
    }))
    .filter(item => !hideDisabledOptions || !item.disabled)
}
