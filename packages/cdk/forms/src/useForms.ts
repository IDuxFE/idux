/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions } from './types'
import type { AbstractControl } from './controls/abstractControl'
import type { ArrayElement, GroupControls } from './controls/types'

import { isArray } from '@idux/cdk/utils'
import { FormGroup } from './controls/formGroup'
import { FormControl } from './controls/formControl'
import { FormArray } from './controls/formArray'
import { isAbstractControl } from './typeof'

type ControlConfig<T> =
  | T
  | [T, ValidatorFn | ValidatorFn[] | null]
  | [T, ValidatorFn | ValidatorFn[] | null, AsyncValidatorFn | AsyncValidatorFn[] | null]
  | [T, ValidatorOptions]

type GroupConfig<T> = {
  [K in keyof T]: ControlConfig<T[K]> | AbstractControl<T[K]>
}

export function useFormGroup<T extends Record<string, any> = Record<string, any>>(
  config: GroupConfig<T>,
  validators?: ValidatorFn | ValidatorFn[] | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormGroup<T>
export function useFormGroup<T extends Record<string, any> = Record<string, any>>(
  config: GroupConfig<T>,
  validatorOptions?: ValidatorOptions | null,
): FormGroup<T>
export function useFormGroup<T extends Record<string, any> = Record<string, any>>(
  config: GroupConfig<T>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormGroup<T> {
  const controls = reduceControls(config)
  return new FormGroup(controls, validatorOrOptions, asyncValidator)
}

type ArrayConfig<T> = Array<AbstractControl<ArrayElement<T>> | ControlConfig<ArrayElement<T>> | ArrayElement<T>>

export function useFormArray<T extends any[] = any[]>(
  config: ArrayConfig<T>,
  validators?: ValidatorFn | ValidatorFn[] | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormArray<T>
export function useFormArray<T extends any[] = any[]>(
  config: ArrayConfig<T>,
  validatorOptions?: ValidatorOptions | null,
): FormArray<T>
export function useFormArray<T extends any[] = any[]>(
  config: ArrayConfig<T>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormArray<T> {
  const controls = config.map(item => createControl(item))
  return new FormArray(controls, validatorOrOptions, asyncValidator)
}

export function useFormControl<T = any>(
  initValue: T,
  validator?: ValidatorFn | ValidatorFn[] | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormControl<T>
export function useFormControl<T = any>(initValue: T, options?: ValidatorOptions | null): FormControl<T>
export function useFormControl<T = any>(
  initValue: T,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormControl<T> {
  return new FormControl(initValue, validatorOrOptions, asyncValidator)
}

function reduceControls<T>(config: GroupConfig<T>): GroupControls<T> {
  const controls = {} as GroupControls<T>
  Object.keys(config).forEach(controlName => {
    controls[controlName as keyof T] = createControl(config[controlName as keyof T]) as any
  })
  return controls
}

function createControl<T>(config: AbstractControl<T> | ControlConfig<T>): AbstractControl<T> {
  if (isAbstractControl(config)) {
    return config
  } else if (isArray(config)) {
    const [initValue, validatorOrOptions, asyncValidator] = config
    return new FormControl(initValue, validatorOrOptions, asyncValidator)
  } else {
    return new FormControl(config)
  }
}
