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

const defaultName = 'This field'

export const enUSMessages = {
  default: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name
    return name ? `${name}: Verification failed.` : 'Verification failed.'
  },
  required: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { name = defaultName, example } = control
    return `${name} is required.${example ? ' Example: ' + example : ''}`
  },
  requiredTrue: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { name = defaultName } = control
    return `${name} must be "true".`
  },
  email: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { example } = control
    return `Must be a valid email address.${example ? '. Example: ' + example : ''}`
  },
  min: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `Must be a number greater than or equal to ${err.min}`
  },
  max: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `Must be a number less than or equal to ${err.max}.`
  },
  range: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `Must be a number ranging from ${err.min} to ${err.max}.`
  },
  minLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { minLength, isArray } = err
    return isArray ? `Please select at least ${minLength} entries.` : `Must contain at least ${minLength} characters.`
  },
  maxLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { maxLength, isArray } = err
    return isArray ? `Cannot exceed ${maxLength} entries.` : `Cannot exceed ${maxLength} characters.`
  },
  rangeLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { minLength, maxLength, isArray } = err
    return isArray
      ? `Please select ${minLength}-${maxLength} entries.`
      : `Must be ${minLength}-${maxLength} characters long.`
  },
  pattern: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { example } = control
    return `Must be a valid value.${example ? ' Example: ' + example : ''}`
  },
}
