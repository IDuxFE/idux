/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, nextTick, ref, toRaw, watch } from 'vue'

import { type ValidateStatus, useAccessorAndControl } from '@idux/cdk/forms'
import { Logger, callEmit } from '@idux/cdk/utils'
import { type InputNumberConfig } from '@idux/components/config'
import { type FormSize, useFormItemRegister, useFormSize, useFormStatus } from '@idux/components/form'

import { type InputNumberProps } from './types'

export interface InputNumberBindings {
  mergedSize: ComputedRef<FormSize | undefined>
  mergedStatus: ComputedRef<ValidateStatus | undefined>
  displayValue: Ref<string>
  isIllegal: Ref<boolean>
  isDisabled: ComputedRef<boolean>
  isFocused: Ref<boolean>
  nowValue: ComputedRef<number | undefined>
  isDisabledDec: ComputedRef<boolean>
  isDisabledInc: ComputedRef<boolean>

  handleKeyDown: (evt: KeyboardEvent) => void
  handleDec: () => void
  handleInc: () => void
  handleInput: (evt: Event) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function useInputNumber(props: InputNumberProps, config: InputNumberConfig): InputNumberBindings {
  const { accessor, control } = useAccessorAndControl<number | null>()
  useFormItemRegister(control)
  const mergedSize = useFormSize(props, config)
  const mergedStatus = useFormStatus(props, control)

  const displayValue = ref('')
  const isIllegal = ref(true)
  const nowValue = computed(() => accessor.value ?? undefined)
  const isKeyboard = computed(() => props.keyboard ?? config.keyboard)
  const isDisabled = computed(() => accessor.disabled)
  const isDisabledDec = computed(() => props.readonly || (!!nowValue.value && nowValue.value <= props.min))
  const isDisabledInc = computed(() => props.readonly || (!!nowValue.value && nowValue.value >= props.max))

  const precision = computed(() => {
    const stepPrecision = getPrecision(props.step)
    if (props.precision !== undefined) {
      if (__DEV__ && stepPrecision > props.precision) {
        Logger.warn(
          'components/input-number',
          `The precision(${props.precision}) should not be less than the decimal point of the step(${props.step}).`,
        )
      }
      return props.precision
    }
    return Math.max(getPrecision(accessor.value), stepPrecision)
  })

  const disabledDec = computed(() => getIncValueFormAccessor(-props.step) < props.min)
  const disabledInc = computed(() => getIncValueFormAccessor(props.step) > props.max)

  function getIncValueFormAccessor(step: number) {
    const { value } = accessor
    let newVal = step
    if (typeof value === 'number' && !Number.isNaN(value)) {
      // Use the toFixed func to ensure numerical accuracy.
      newVal = parseFloat((value + step).toFixed(precision.value))
    }

    return Math.max(props.min, Math.min(props.max, newVal))
  }

  function updateDisplayValueFromAccessor() {
    const { value } = accessor
    if (value === null || value === undefined) {
      displayValue.value = ''
    } else if (Number.isNaN(value)) {
      displayValue.value = ''
      if (__DEV__) {
        Logger.warn('components/input-number', `model value(${value}) is not a number.`)
      }
    } else {
      if (displayValue.value === '' || value !== Number(displayValue.value)) {
        displayValue.value = value.toFixed(precision.value)
      }
    }
  }

  function updateModelValueFromDisplayValue() {
    const { value: strVal } = displayValue
    const numberVal = parseFloat(Number(strVal).toFixed(precision.value))

    // When the model value is `NaN`, value of input element is empty string, update the model value to `null`.
    if (strVal === '') {
      updateModelValue(null)
    } else if (Number.isNaN(numberVal)) {
      updateDisplayValueFromAccessor()
    } else {
      const newVal = Math.max(props.min, Math.min(props.max, numberVal))
      displayValue.value = newVal.toFixed(precision.value)
      updateModelValue(newVal)
    }
  }

  function updateModelValue(newVal: number | null) {
    const oldVal = toRaw(accessor.value)
    if (newVal !== oldVal) {
      accessor.setValue(newVal)
      callEmit(props.onChange, newVal, oldVal)

      nextTick(() => {
        if (newVal !== accessor.value) {
          updateDisplayValueFromAccessor()
        }
      })
    }
  }

  function handleInput(evt: Event) {
    const { value: inputVal } = evt.target as HTMLInputElement
    const strVal = inputVal.trim().replace(/。/g, '.')

    displayValue.value = strVal

    if (strVal === '') {
      updateModelValue(null)
      return
    }

    const numberVal = Number(strVal)
    if (!Number.isNaN(numberVal)) {
      if (numberVal >= props.min && numberVal <= props.max) {
        updateModelValue(numberVal)
      }
    }
  }

  function handleDec() {
    if (props.readonly || isDisabled.value || disabledDec.value) {
      return
    }

    const newVal = getIncValueFormAccessor(-props.step)
    updateModelValue(newVal)
  }

  function handleInc() {
    if (props.readonly || isDisabled.value || disabledInc.value) {
      return
    }

    const newVal = getIncValueFormAccessor(props.step)
    updateModelValue(newVal)
  }

  function handleKeyDown(evt: KeyboardEvent): void {
    if (isKeyboard.value) {
      if (evt.code === 'Enter' || evt.code === 'NumpadEnter') {
        updateModelValueFromDisplayValue()
      } else if (evt.code === 'ArrowUp') {
        evt.preventDefault()
        handleInc()
      } else if (evt.code === 'ArrowDown') {
        evt.preventDefault()
        handleDec()
      }
    }
  }

  const isFocused = ref(false)
  function handleFocus(evt: FocusEvent) {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }

  function handleBlur(evt: FocusEvent) {
    isFocused.value = false
    updateModelValueFromDisplayValue()
    accessor.markAsBlurred()
    callEmit(props.onBlur, evt)
  }

  watch(
    displayValue,
    value => {
      if (value !== '') {
        const numberVal = Number(value)
        isIllegal.value = Number.isNaN(numberVal) || numberVal < props.min || numberVal > props.max
      } else {
        isIllegal.value = false
      }
    },
    { immediate: true },
  )

  watch(
    () => accessor.value,
    () => updateDisplayValueFromAccessor(),
    { immediate: true },
  )

  return {
    mergedSize,
    mergedStatus,
    displayValue,
    isIllegal,
    isDisabled,
    isDisabledDec,
    isDisabledInc,
    isFocused,
    nowValue,
    handleKeyDown,
    handleDec,
    handleInc,
    handleInput,
    handleFocus,
    handleBlur,
  }
}

export function getPrecision(value: number | undefined | null): number {
  if (value === undefined || value === null) {
    return 0
  }

  const decimal = String(value).split('.')[1]
  return decimal ? decimal.length : 0
}
