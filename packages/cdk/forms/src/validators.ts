/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { AbstractControl } from './models/abstractControl'
import type {
  AsyncValidatorFn,
  ValidateError,
  ValidateErrors,
  ValidateMessage,
  ValidateMessageFn,
  ValidateMessages,
  ValidatorFn,
} from './types'

import { isArray, isFunction, isNil, isNumber, isString, merge } from 'lodash-es'

import { convertArray, isNumeric } from '@idux/cdk/utils'

import { zhCNMessages } from './messages/zh-CN'

/** See [this commit](https://github.com/angular/angular.js/commit/f3f5cf72e) for more details. */
const emailRegexp =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export class Validators {
  private static messages: ValidateMessages = mergedLocaleMessages({}, zhCNMessages, 'zh-CN')

  /**
   *
   * @param messages the validation messages
   * @param locale the i18n type is optional
   */
  static setMessages(messages: ValidateMessages, locale?: string): void {
    Validators.messages = mergedLocaleMessages(Validators.messages, messages, locale)
  }

  static getMessage(key: string): ValidateMessage | undefined {
    return Validators.messages[key]
  }

  static getError(
    key: string,
    control: AbstractControl,
    errorContext: Omit<ValidateError, 'message'> = {},
  ): ValidateError {
    let message: string | ValidateMessageFn | Record<string, string | ValidateMessageFn> | undefined = undefined
    const validMessage = Validators.messages[key] || Validators.messages.default
    if (isFunction(validMessage)) {
      message = validMessage(errorContext, control)
    } else {
      message = validMessage
    }
    return { ...errorContext, message }
  }

  static required(value: any, control: AbstractControl): { required: ValidateError } | undefined {
    if (isEmpty(value)) {
      return { required: Validators.getError('required', control) }
    }
    return undefined
  }

  static requiredTrue(value: any, control: AbstractControl): { requiredTrue: ValidateError } | undefined {
    if (value === true) {
      return undefined
    }
    return { requiredTrue: Validators.getError('requiredTrue', control, { actual: value }) }
  }

  static email(value: any, control: AbstractControl): { email: ValidateError } | undefined {
    if (isEmpty(value) || emailRegexp.test(value)) {
      return undefined
    }
    return { email: Validators.getError('email', control, { actual: value }) }
  }

  static min(min: number): ValidatorFn {
    return (value: any, control: AbstractControl): { min: ValidateError } | undefined => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min) {
        return undefined
      }
      return { min: Validators.getError('min', control, { min, actual: value }) }
    }
  }

  static max(max: number): ValidatorFn {
    return (value: any, control: AbstractControl): { max: ValidateError } | undefined => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) <= max) {
        return undefined
      }
      return { max: Validators.getError('max', control, { max, actual: value }) }
    }
  }

  static range(min: number, max: number): ValidatorFn {
    return (value: any, control: AbstractControl): { range: ValidateError } | undefined => {
      if (isEmpty(value) || !isNumeric(value) || (Number(value) >= min && Number(value) <= max)) {
        return undefined
      }
      return { range: Validators.getError('range', control, { min, max, actual: value }) }
    }
  }

  static minLength(minLength: number): ValidatorFn {
    return (value: any, control: AbstractControl): { minLength: ValidateError } | undefined => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength) {
        return undefined
      }
      return {
        minLength: Validators.getError('minLength', control, {
          minLength,
          actual: value.length,
          isArray: isArray(value),
        }),
      }
    }
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (value: any, control: AbstractControl): { maxLength: ValidateError } | undefined => {
      if (isEmpty(value) || !hasLength(value) || value.length <= maxLength) {
        return undefined
      }
      return {
        maxLength: Validators.getError('maxLength', control, {
          maxLength,
          actual: value.length,
          isArray: isArray(value),
        }),
      }
    }
  }

  static rangeLength(minLength: number, maxLength: number): ValidatorFn {
    return (value: any, control: AbstractControl): { rangeLength: ValidateError } | undefined => {
      if (isEmpty(value) || !hasLength(value) || (value.length >= minLength && value.length <= maxLength)) {
        return undefined
      }
      return {
        rangeLength: Validators.getError('rangeLength', control, {
          minLength,
          maxLength,
          actual: value.length,
          isArray: isArray(value),
        }),
      }
    }
  }

  static pattern(pattern: string | RegExp): ValidatorFn {
    if (!pattern) {
      return Validators.nullValidator
    }
    let regex: RegExp
    let regexStr: string
    if (typeof pattern === 'string') {
      regexStr = ''
      if (pattern.charAt(0) !== '^') {
        regexStr += '^'
      }
      regexStr += pattern
      if (pattern.charAt(pattern.length - 1) !== '$') {
        regexStr += '$'
      }
      regex = new RegExp(regexStr)
    } else {
      regexStr = pattern.toString()
      regex = pattern
    }
    return (value: any, control: AbstractControl): { pattern: ValidateError } | undefined => {
      if (isEmpty(value) || regex.test(value)) {
        return undefined
      }
      return { pattern: Validators.getError('pattern', control, { pattern: regexStr, actual: value }) }
    }
  }

  static nullValidator(_: any, _control: AbstractControl): undefined {
    return undefined
  }

  static compose(validators?: (ValidatorFn | undefined)[]): ValidatorFn | undefined {
    if (!validators) {
      return undefined
    }
    const presentValidators: ValidatorFn[] = validators.filter(isFunction)
    if (presentValidators.length === 0) {
      return undefined
    }

    return (value: any, control: AbstractControl) =>
      mergeMessages(executeValidators<ValidatorFn>(value, control, presentValidators))
  }

  static composeAsync(validators?: (AsyncValidatorFn | undefined)[]): AsyncValidatorFn | undefined {
    if (!validators) {
      return undefined
    }
    const presentValidators: AsyncValidatorFn[] = validators.filter(isFunction)
    if (presentValidators.length === 0) {
      return undefined
    }

    return (value: any, control: AbstractControl) => {
      const validateErrors = executeValidators<AsyncValidatorFn>(value, control, presentValidators)
      return Promise.all(validateErrors).then(mergeMessages)
    }
  }
}

/** checks whether string or array is empty */
function isEmpty(val: any): boolean {
  return isNil(val) || ((isString(val) || isArray(val)) && val.length === 0)
}

/** checks whether variable has length props */
function hasLength(val: any): boolean {
  return !isNil(val) && isNumber(val.length)
}

type GenericValidatorFn = (value: any, control: AbstractControl) => any

function executeValidators<V extends GenericValidatorFn>(
  value: any,
  control: AbstractControl,
  validators: V[],
): ReturnType<V>[] {
  return validators.map(validator => validator(value, control))
}

function mergeMessages(validateErrors: (ValidateErrors | undefined)[]): ValidateErrors | undefined {
  const res: ValidateErrors = {}

  // Not using Array.reduce here due to a Chrome 80 bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  for (const errors of validateErrors) {
    if (!isNil(errors)) {
      Object.assign(res, errors)
    }
  }

  return Object.keys(res).length === 0 ? undefined : res
}

function mergedLocaleMessages(
  currMessages: ValidateMessages,
  newMessages: ValidateMessages,
  locale?: string,
): ValidateMessages {
  if (!locale) {
    return merge(currMessages, newMessages)
  }
  const messageWithLocale: Record<string, Record<string, ValidateMessage>> = {}
  Object.keys(newMessages).forEach(key => {
    messageWithLocale[key] = { [locale]: newMessages[key] }
  })
  return merge(currMessages, messageWithLocale)
}

/**
 * Determines whether a validator or validators array has a given validator.
 */
export function hasValidator<T extends ValidatorFn | AsyncValidatorFn>(
  validators: T | T[] | undefined,
  validator: T | undefined,
): boolean {
  if (!validator) {
    return false
  }
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator
}

export function addValidators<T extends ValidatorFn | AsyncValidatorFn>(
  validators: T | T[],
  currentValidators: T | T[] | undefined,
): T[] {
  const current = convertArray(currentValidators)
  const validatorsToAdd = convertArray(validators)
  validatorsToAdd.forEach((v: T) => {
    if (!hasValidator(current, v)) {
      current.push(v)
    }
  })
  return current
}

export function removeValidators<T extends ValidatorFn | AsyncValidatorFn>(
  validators: T | T[],
  currentValidators: T | T[] | undefined,
): T[] {
  return convertArray(currentValidators).filter(v => !hasValidator(validators, v))
}
