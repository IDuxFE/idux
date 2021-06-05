import type { ComputedRef } from 'vue'
import type { AbstractControl, ValidateStatus, ValidateErrors } from '@idux/cdk/forms'
import type { ColProps } from '@idux/components/grid'
import type { FormItemProps, FormMessageFn } from './types'
import type { FormContext } from './token'

import { computed } from 'vue'
import { useValueControl, provideControlOrPath } from '@idux/cdk/forms'
import { isFunction, isNumber, isString } from '@idux/cdk/utils'
import { getLocale, LocaleType } from '@idux/components/i18n'

export const useFormItemClasses = (
  hasFeedback: ComputedRef<boolean>,
  status: ComputedRef<ValidateStatus | null>,
  message: ComputedRef<string | null>,
): ComputedRef<Record<string, boolean>> => {
  return computed(() => {
    const statusValue = status.value
    return {
      'ix-form-item': true,
      [`ix-form-item-${statusValue}`]: !!statusValue,
      'ix-form-item-has-feedback': hasFeedback.value && !!statusValue,
      'ix-form-item-has-message': !!message.value,
    }
  })
}

export const useFormItemLabelClasses = (
  props: FormItemProps,
  formContext: FormContext | undefined,
): ComputedRef<Record<string, boolean>> => {
  return computed(() => {
    const labelAlign = props.labelAlign ?? formContext?.labelAlign.value
    return {
      'ix-form-item-label': true,
      'ix-form-item-label-required': props.required,
      'ix-form-item-label-colonless': !!(props.colonless ?? formContext?.colonless.value),
      'ix-form-item-label-left': labelAlign === 'left',
    }
  })
}

const normalizeColConfig = (col: string | number | ColProps | undefined) => {
  return isNumber(col) || isString(col) ? { span: col } : col
}

export interface UseFormItemColConfig {
  labelColConfig: ComputedRef<ColProps | undefined>
  controlColConfig: ComputedRef<ColProps | undefined>
}

export const useFormItemColConfig = (
  props: FormItemProps,
  formContext: FormContext | undefined,
): UseFormItemColConfig => {
  return {
    labelColConfig: computed(() => normalizeColConfig(props.labelCol ?? formContext?.labelCol.value)),
    controlColConfig: computed(() => normalizeColConfig(props.controlCol ?? formContext?.controlCol.value)),
  }
}

const useStatus = (props: FormItemProps, control: ComputedRef<AbstractControl | null>) => {
  return computed(() => {
    if (props.status !== undefined) {
      return props.status
    }
    const currControl = control.value
    if (!currControl) {
      return null
    }
    if (currControl.blurred.value || currControl.dirty.value) {
      return currControl.status.value
    }
    return null
  })
}

const getMessageByError = (error: ValidateErrors | null | undefined, localeType: LocaleType) => {
  if (!error) {
    return null
  }

  for (const key in error) {
    const { message, ...rest } = error[key]
    if (message) {
      if (isString(message)) {
        return message
      }

      if (isFunction(message)) {
        return message(rest)
      }

      const currMessage = message[localeType]
      if (isString(currMessage)) {
        return currMessage
      }
      return currMessage(rest)
    }
  }

  return null
}

const useMessage = (
  control: ComputedRef<AbstractControl | null>,
  status: ComputedRef<ValidateStatus | null>,
  messages: ComputedRef<Partial<Record<ValidateStatus, string | FormMessageFn>>>,
  errors: ComputedRef<ValidateErrors | null | undefined>,
) => {
  const locale = getLocale()
  return computed(() => {
    const currStatus = status.value
    if (!currStatus) {
      return null
    }

    const currMessage = messages.value[currStatus]
    if (currMessage) {
      return isString(currMessage) ? currMessage : currMessage(control.value)
    }

    return getMessageByError(errors.value, locale.value.type)
  })
}

export interface UseFormItemControl {
  control: ComputedRef<AbstractControl | null>
  errors: ComputedRef<ValidateErrors | null | undefined>
  status: ComputedRef<ValidateStatus | null>
  message: ComputedRef<string | null>
  statusIcon: ComputedRef<string | null>
}

const iconTypeMap = {
  invalid: 'close-circle-filled',
  validating: 'loading',
  valid: 'check-circle-filled',
} as const

export const useFormItemControl = (props: FormItemProps): UseFormItemControl => {
  provideControlOrPath(computed(() => props.control))

  const control = useValueControl()

  const errors = computed(() => control.value?.errors.value)

  const status = useStatus(props, control)

  const messages = computed(() => {
    const message = props.message
    return isString(message) || isFunction(message) ? { invalid: message } : message || {}
  })

  const message = useMessage(control, status, messages, errors)

  const statusIcon = computed(() => {
    const currStatus = status.value
    return currStatus ? iconTypeMap[currStatus] : null
  })

  return { control, errors, status, message, statusIcon }
}
