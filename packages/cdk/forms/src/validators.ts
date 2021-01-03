/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { AsyncValidatorFn, ValidationError, ValidatorFn, ValidationErrors, ErrorMessages } from './types'
import type { AbstractControl } from './controls/abstractControl'

import { isArray, isFunction, isNil, isNonNil, isNumber, isNumeric, isString } from '@idux/cdk/utils'

/** See [this commit](https://github.com/angular/angular.js/commit/f3f5cf72e) for more details. */
const emailRegexp = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export class Validators {
  private static messages: ErrorMessages = {}

  private static getMessage(key: keyof ErrorMessages, errors: Omit<ValidationError, 'message'>): ValidationError {
    let message = ''
    const validMessage = Validators.messages[key] || Validators.messages.default
    if (isString(validMessage)) {
      message = validMessage
    } else if (isFunction(validMessage)) {
      message = validMessage(errors)
    }
    return { ...errors, message }
  }

  static setMessages(messages: ErrorMessages): void {
    Validators.messages = { ...Validators.messages, ...messages }
  }

  static required(value: any, _: AbstractControl): { required: ValidationError } | null {
    if (isEmpty(value)) {
      return { required: Validators.getMessage('required', {}) }
    }
    return null
  }

  static requiredTrue(value: any, _: AbstractControl): { requiredTrue: ValidationError } | null {
    if (value === true) {
      return null
    }
    return { requiredTrue: Validators.getMessage('requiredTrue', { actual: value }) }
  }

  static email(value: any, _: AbstractControl): { email: ValidationError } | null {
    if (isEmpty(value) || emailRegexp.test(value)) {
      return null
    }
    return { email: Validators.getMessage('email', { actual: value }) }
  }

  static min(min: number): ValidatorFn {
    return (value: any, _: AbstractControl): { min: ValidationError } | null => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min) {
        return null
      }
      return { min: Validators.getMessage('min', { min, actual: value }) }
    }
  }

  static max(max: number): ValidatorFn {
    return (value: any, _: AbstractControl): { max: ValidationError } | null => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) <= max) {
        return null
      }
      return { max: Validators.getMessage('max', { max, actual: value }) }
    }
  }

  static minLength(minLength: number): ValidatorFn {
    return (value: any, _: AbstractControl): { minLength: ValidationError } | null => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength) {
        return null
      }
      return { minLength: Validators.getMessage('minLength', { minLength, actual: value.length }) }
    }
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (value: any, _: AbstractControl): { maxLength: ValidationError } | null => {
      if (isEmpty(value) || !hasLength(value) || value.length <= maxLength) {
        return null
      }
      return { maxLength: Validators.getMessage('maxLength', { maxLength, actual: value.length }) }
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
    return (value: any, _: AbstractControl): { pattern: ValidationError } | null => {
      if (isEmpty(value) || regex.test(value)) {
        return null
      }
      return { pattern: Validators.getMessage('pattern', { pattern: regexStr, actual: value }) }
    }
  }

  static nullValidator(_: any, __: AbstractControl): null {
    return null
  }

  static compose(validators: (ValidatorFn | null | undefined)[] | null): ValidatorFn | null {
    if (!validators) {
      return null
    }
    const presentValidators: ValidatorFn[] = validators.filter(isNonNil)
    if (presentValidators.length == 0) {
      return null
    }

    return (value: any, control: AbstractControl) =>
      mergeMessages(executeValidators<ValidatorFn>(value, control, presentValidators))
  }

  static composeAsync(validators: (AsyncValidatorFn | null)[] | null): AsyncValidatorFn | null {
    if (!validators) {
      return null
    }
    const presentValidators: AsyncValidatorFn[] = validators.filter(isNonNil)
    if (presentValidators.length == 0) {
      return null
    }

    return (value: any, control: AbstractControl) => {
      const validationErrors = executeValidators<AsyncValidatorFn>(value, control, presentValidators)
      return Promise.all(validationErrors).then(mergeMessages)
    }
  }
}

/** checks whether string or array is empty */
function isEmpty(val: any): boolean {
  return isNil(val) || (val.length === 0 && (isString(val) || isArray(val)))
}

/** checks whether variable has length props */
function hasLength(val: any): boolean {
  return isNonNil(val) && isNumber(val.length)
}

type GenericValidatorFn = (value: any, _: AbstractControl) => any

function executeValidators<V extends GenericValidatorFn>(
  value: any,
  control: AbstractControl,
  validators: V[],
): ReturnType<V>[] {
  return validators.map(validator => validator(value, control))
}

function mergeMessages(validationErrors: (ValidationErrors | null)[]): ValidationErrors | null {
  let res: { [key: string]: any } = {}

  // Not using Array.reduce here due to a Chrome 80 bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  validationErrors.forEach((errors: ValidationErrors | null) => {
    res = isNonNil(errors) ? { ...res, ...errors } : res
  })

  return Object.keys(res).length === 0 ? null : res
}
