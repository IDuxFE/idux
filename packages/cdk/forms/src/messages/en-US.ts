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
    const name = control.name || defaultName
    return `${name} is required`
  },
  requiredTrue: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name} is must be 'true'`
  },
  email: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name} is not a valid email`
  },
  min: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name} cannot be less than ${err.min}`
  },
  max: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name
    return `${name} cannot be greater than ${err.max}`
  },
  minLength: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name} cannot be less than ${err.minLength} in length, current is ${err.actual}`
  },
  maxLength: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name} cannot be greater than ${err.minLength} in length, current is ${err.actual}`
  },
  pattern: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name} does not match pattern '${err.pattern}'`
  },
}
