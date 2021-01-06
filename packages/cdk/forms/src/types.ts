/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ValidationError {
  message: string
  actual?: any
  [key: string]: any
}

type ErrorMessage = string | ((info: Omit<ValidationError, 'message'>) => string)

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

export type Errors = { [key in keyof ErrorMessages]: ValidationError }

export interface ValidatorFn {
  (value: any): Errors | null
}

export interface AsyncValidatorFn {
  (value: any): Promise<Errors | null>
}

export type TriggerType = 'change' | 'blur' | 'submit'

export interface ValidatorOptions {
  validators?: ValidatorFn | ValidatorFn[] | null
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
  trigger?: TriggerType
}

export type ValidStatus = 'valid' | 'invalid' | 'validating'
