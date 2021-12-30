/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbstractControl } from './controls'

export interface ValidateError {
  /**
   * There are two types of validation message:
   * * **string**: a simple string.
   * * **Record<string, string>**: you can return an object whose key is locale key, when you need for i18n.
   */
  message?: ValidateMessage
  actual?: any
  [key: string]: any
}

export type ValidateErrors = Record<string, ValidateError>

export type ValidateMessageFn = (err: Omit<ValidateError, 'message'>, control: AbstractControl) => string
export type ValidateMessage = string | ValidateMessageFn | Record<string, string | ValidateMessageFn>
export type ValidateMessages = Record<string, ValidateMessage>

export interface ValidatorFn {
  (value: any, control: AbstractControl): ValidateErrors | undefined
}

export interface AsyncValidatorFn {
  (value: any, control: AbstractControl): Promise<ValidateErrors | undefined>
}

export type TriggerType = 'change' | 'blur' | 'submit'

export interface ValidatorOptions {
  disabled?: boolean
  name?: string
  trigger?: TriggerType
  validators?: ValidatorFn | ValidatorFn[]
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[]
}

export type ValidateStatus = 'valid' | 'invalid' | 'validating'
