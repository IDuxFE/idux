/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbstractControl } from './controls'

export interface ValidateError {
  /**
   * There are two types of validation message:
   * * **string**: a simple string.
   * * **Record<string, string>**: you can return an object whose key is locale id, when you need for i18n.
   */
  message: string | ValidateMessageFn | Record<string, string | ValidateMessageFn> | null
  actual?: any
  [key: string]: any
}

export type ValidateErrors = Record<string, ValidateError>

export type ValidateMessageFn = (err: Omit<ValidateError, 'message'>) => string

export type ValidateMessages = Record<string, string | ValidateMessageFn | Record<string, string | ValidateMessageFn>>

export interface ValidatorFn {
  (value: any, control: AbstractControl): ValidateErrors | null
}

export interface AsyncValidatorFn {
  (value: any, control: AbstractControl): Promise<ValidateErrors | null>
}

export type TriggerType = 'change' | 'blur' | 'submit'

export interface ValidatorOptions {
  validators?: ValidatorFn | ValidatorFn[] | null
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
  trigger?: TriggerType
  disabled?: boolean
}

export type ValidateStatus = 'valid' | 'invalid' | 'validating'
