/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbstractControl } from './controls/abstractControl'

export interface ValidationError {
  message: string
  actual?: any
  [key: string]: any
}

type ErrorMessage = string | ((err: Omit<ValidationError, 'message'>) => string)

export interface ErrorMessages {
  default?: ErrorMessage
  required?: ErrorMessage
  requiredTrue?: ErrorMessage
  email?: ErrorMessage
  min?: ErrorMessage
  max?: ErrorMessage
  minLength?: ErrorMessage
  maxLength?: ErrorMessage
  pattern?: ErrorMessage
  [key: string]: ErrorMessage | undefined
}

export type ValidationErrors = { [key in keyof ErrorMessages]: ValidationError }

export interface ValidatorFn {
  (value: any, control: AbstractControl): ValidationErrors | null
}

export interface AsyncValidatorFn {
  (value: any, control: AbstractControl): Promise<ValidationErrors | null>
}

export type TriggerType = 'change' | 'blur' | 'submit'

export interface ValidatorOptions {
  validators?: ValidatorFn | ValidatorFn[] | null
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
  trigger?: TriggerType
}

export type ValidationStatus = 'valid' | 'invalid' | 'validating'
