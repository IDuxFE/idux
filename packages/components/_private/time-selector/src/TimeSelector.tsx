/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimeSelectorCell, TimeSelectorColumnProps, TimeSelectorColumnType, TimeSelectorProps } from './types'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, provide } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import PanelColumn from './TimeSelectorColumn'
import { timeSelectorContext } from './tokens'
import { timeSelectorProps } from './types'
import { calculateValue, calculateViewHour, normalizeAmPm } from './utils'

export default defineComponent({
  name: 'IxTimePickerPanel',
  props: timeSelectorProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker-selector`)
    const { hourOptionsProps, minuteOptionsProps, secondOptionsProps, amPmOptionsProps } = useOptions(props)

    provide(timeSelectorContext, { mergedPrefixCls })

    const columns = computed(() => {
      const result: TimeSelectorColumnProps[] = []
      props.hourEnabled && result.push(hourOptionsProps.value)
      props.minuteEnabled && result.push(minuteOptionsProps.value)
      props.secondEnabled && result.push(secondOptionsProps.value)
      props.use12Hours && result.push(amPmOptionsProps.value)
      return result
    })

    return () => (
      <div class={`${mergedPrefixCls.value}`}>
        {columns.value.map((item, index) => (
          <PanelColumn key={index} {...item} visible={props.visible} />
        ))}
      </div>
    )
  },
})

function useOptions(props: TimeSelectorProps) {
  const selectedValue = computed(() => props.value ?? props.defaultOpenValue)
  const viewHours = computed(() => calculateViewHour(selectedValue.value.getHours(), props.use12Hours))
  const ampm = computed(() => normalizeAmPm(selectedValue.value.getHours(), props.use12Hours, props.amPmCapital))

  const [onHourChange, onMinuteChange, onSecondChange, onAmPmChange] = generateOnChanges(props, selectedValue)

  const hourOptions = computed(() =>
    generateHourOptions(props.use12Hours, props.hourStep, props.disabledHours(ampm.value), props.hideDisabledOptions),
  )
  const hourOptionsProps = computed(() => ({
    selectedValue: viewHours.value,
    options: hourOptions.value,
    onChange: onHourChange,
  }))

  const minuteOptions = computed(() =>
    generateOptions(
      60,
      props.minuteStep,
      props.disabledMinutes(viewHours.value, ampm.value),
      props.hideDisabledOptions,
    ),
  )
  const minuteOptionsProps = computed(() => ({
    selectedValue: selectedValue.value.getMinutes(),
    options: minuteOptions.value,
    onChange: onMinuteChange,
  }))

  const secondOptions = computed(() =>
    generateOptions(
      60,
      props.secondStep,
      props.disabledSeconds(viewHours.value, selectedValue.value.getMinutes(), ampm.value),
      props.hideDisabledOptions,
    ),
  )
  const secondOptionsProps = computed(() => ({
    selectedValue: selectedValue.value.getSeconds(),
    options: secondOptions.value,
    onChange: onSecondChange,
  }))

  const amPmOptions = computed(() => generateAmPmOptions('', props.amPmCapital, props.hideDisabledOptions))
  const amPmOptionsProps = computed(() => ({
    selectedValue: ampm.value,
    options: amPmOptions.value,
    onChange: onAmPmChange,
  }))

  return { hourOptionsProps, minuteOptionsProps, secondOptionsProps, amPmOptionsProps }
}

function generateOnChanges(props: TimeSelectorProps, selectedValue: ComputedRef<Date>) {
  const genChange = (type: TimeSelectorColumnType, value: string | number) => {
    const newValue = calculateValue(selectedValue.value, type, props.use12Hours, value)
    callEmit(props['onUpdate:value'], newValue)
    callEmit(props.onChange, newValue)
  }

  const types = ['hour', 'minute', 'second', 'AM/PM'] as const
  return types.map(type => (value: string | number) => genChange(type, value))
}

function generateHourOptions(
  is12Hours: boolean,
  step: number,
  disabledOptions: number[],
  hideDisabledOptions: boolean,
) {
  const options = generateOptions(is12Hours ? 12 : 24, step, disabledOptions, hideDisabledOptions)
  if (is12Hours) {
    // if is12Hours, there is no 0, it should be 12 am or 12 pm
    const zeroOpt = options.find(opt => opt.value === 0)
    zeroOpt && (zeroOpt.value = 12)
  }

  return options
}

function generateOptions(total: number, step: number, disabledOptions: number[], hideDisabledOptions: boolean) {
  const options: TimeSelectorCell[] = []
  for (let index = 0; index < total; index += step) {
    const isDisabled = disabledOptions.includes(index)
    if (!isDisabled || !hideDisabledOptions) {
      options.push({
        value: index,
        disabled: isDisabled,
      })
    }
  }
  return options
}

function generateAmPmOptions(disabledOption: string, amPmCapital: boolean, hideDisabledOptions: boolean) {
  disabledOption = disabledOption.toLowerCase()
  return ['am', 'pm']
    .map(item => ({
      disabled: disabledOption === item,
      value: amPmCapital ? item.toUpperCase() : item,
    }))
    .filter(item => !hideDisabledOptions || !item.disabled)
}
