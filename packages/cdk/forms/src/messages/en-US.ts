/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { AbstractControl } from '../controls'
import type { ValidateError } from '../types'

const defaultName = 'The input'

export const enUSMessages = {
  default: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name
    return name ? `Validation error on field ${name}` : 'Validation error'
  },
  required: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { name = defaultName, example } = control
    return `Please enter ${name}${example ? ', for example: ' + example : ''}`
  },
  requiredTrue: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { name = defaultName } = control
    return `${name} is must be 'true'`
  },
  email: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { example } = control
    return `Please enter your email address${example ? ', for example: ' + example : ''}`
  },
  min: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `Please enter a number not less than ${err.min}`
  },
  max: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `Please enter a number no greater than ${err.max}`
  },
  range: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `Please enter a number between ${err.min - 1}-${err.max + 1}`
  },
  minLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { minLength, isArray } = err
    return isArray ? `Please select at least ${minLength} items` : `Please enter at least ${minLength} characters`
  },
  maxLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { maxLength, isArray } = err
    return isArray ? `Please select at most ${maxLength} items` : `Please enter at most ${maxLength} characters`
  },
  rangeLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { minLength, maxLength, isArray } = err
    return isArray
      ? `Please select ${minLength}-${maxLength} items`
      : `Please enter ${minLength}-${maxLength} characters`
  },
  pattern: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { example } = control
    return `Please enter the correct pattern${example ? ', for example: ' + example : ''}`
  },
}
