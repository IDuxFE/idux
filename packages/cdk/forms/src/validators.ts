/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { AbstractControl } from './controls'
import type {
  AsyncValidatorFn,
  ValidateError,
  ValidateErrors,
  ValidateMessageFn,
  ValidateMessages,
  ValidatorFn,
} from './types'

import { isArray, isFunction, isNil, isNumber, isString } from 'lodash-es'

import { isNumeric } from '@idux/cdk/utils'

/** See [this commit](https://github.com/angular/angular.js/commit/f3f5cf72e) for more details. */
const emailRegexp =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export class Validators {
  private static messages: ValidateMessages = {}

  static setMessages(messages: ValidateMessages): void {
    Validators.messages = { ...Validators.messages, ...messages }
  }

  static getError(key: string, errorContext: Omit<ValidateError, 'message'> = {}): ValidateError {
    let message: string | ValidateMessageFn | Record<string, string | ValidateMessageFn> | undefined = undefined
    const validMessage = Validators.messages[key] || Validators.messages.default || undefined
    if (isFunction(validMessage)) {
      message = validMessage(errorContext)
    } else {
      message = validMessage
    }
    return { ...errorContext, message }
  }

  static required(value: any, _: AbstractControl): { required: ValidateError } | undefined {
    if (isEmpty(value)) {
      return { required: Validators.getError('required') }
    }
    return undefined
  }

  static requiredTrue(value: any, _: AbstractControl): { requiredTrue: ValidateError } | undefined {
    if (value === true) {
      return undefined
    }
    return { requiredTrue: Validators.getError('requiredTrue', { actual: value }) }
  }

  static email(value: any, _: AbstractControl): { email: ValidateError } | undefined {
    if (isEmpty(value) || emailRegexp.test(value)) {
      return undefined
    }
    return { email: Validators.getError('email', { actual: value }) }
  }

  static min(min: number): ValidatorFn {
    return (value: any, _: AbstractControl): { min: ValidateError } | undefined => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min) {
        return undefined
      }
      return { min: Validators.getError('min', { min, actual: value }) }
    }
  }

  static max(max: number): ValidatorFn {
    return (value: any, _: AbstractControl): { max: ValidateError } | undefined => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) <= max) {
        return undefined
      }
      return { max: Validators.getError('max', { max, actual: value }) }
    }
  }

  static minLength(minLength: number): ValidatorFn {
    return (value: any, _: AbstractControl): { minLength: ValidateError } | undefined => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength) {
        return undefined
      }
      return { minLength: Validators.getError('minLength', { minLength, actual: value.length }) }
    }
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (value: any, _: AbstractControl): { maxLength: ValidateError } | undefined => {
      if (isEmpty(value) || !hasLength(value) || value.length <= maxLength) {
        return undefined
      }
      return { maxLength: Validators.getError('maxLength', { maxLength, actual: value.length }) }
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
    return (value: any, _: AbstractControl): { pattern: ValidateError } | undefined => {
      if (isEmpty(value) || regex.test(value)) {
        return undefined
      }
      return { pattern: Validators.getError('pattern', { pattern: regexStr, actual: value }) }
    }
  }

  static nullValidator(_: any, __: AbstractControl): undefined {
    return undefined
  }

  static compose(validators?: (ValidatorFn | undefined)[]): ValidatorFn | undefined {
    if (!validators) {
      return undefined
    }
    const presentValidators: ValidatorFn[] = validators.filter(isFunction)
    if (presentValidators.length == 0) {
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
    if (presentValidators.length == 0) {
      return undefined
    }

    return (value: any, control: AbstractControl) => {
      const ValidateErrors = executeValidators<AsyncValidatorFn>(value, control, presentValidators)
      return Promise.all(ValidateErrors).then(mergeMessages)
    }
  }
}

/** checks whether string or array is empty */
function isEmpty(val: any): boolean {
  return isNil(val) || (val.length === 0 && (isString(val) || isArray(val)))
}

/** checks whether variable has length props */
function hasLength(val: any): boolean {
  return !isNil(val) && isNumber(val.length)
}

type GenericValidatorFn = (value: any, _: AbstractControl) => any

function executeValidators<V extends GenericValidatorFn>(
  value: any,
  control: AbstractControl,
  validators: V[],
): ReturnType<V>[] {
  return validators.map(validator => validator(value, control))
}

function mergeMessages(validateErrors: (ValidateErrors | undefined)[]): ValidateErrors | undefined {
  let res: { [key: string]: any } = {}

  // Not using Array.reduce here due to a Chrome 80 bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  validateErrors.forEach((errors: ValidateErrors | undefined) => {
    res = isNil(errors) ? res : { ...res, ...errors }
  })

  return Object.keys(res).length === 0 ? undefined : res
}
