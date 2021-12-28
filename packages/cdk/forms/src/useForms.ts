/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl, ArrayElement, GroupControls } from './controls'
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions } from './types'

import { FormArray, FormControl, FormGroup } from './controls'
import { isAbstractControl } from './typeof'

type ControlConfig<T> =
  | [T]
  | [T, ValidatorFn | ValidatorFn[]]
  | [T, ValidatorFn | ValidatorFn[], AsyncValidatorFn | AsyncValidatorFn[]]
  | [T, ValidatorOptions]

type GroupConfig<T> = {
  [K in keyof T]: ControlConfig<T[K]> | AbstractControl<T[K]> | FormGroup<T[K]>
}

export function useFormGroup<T extends Record<string, any> = Record<string, any>>(
  config: GroupConfig<T>,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormGroup<T>
export function useFormGroup<T extends Record<string, any> = Record<string, any>>(
  config: GroupConfig<T>,
  validatorOptions?: ValidatorOptions,
): FormGroup<T>
export function useFormGroup<T extends Record<string, any> = Record<string, any>>(
  config: GroupConfig<T>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormGroup<T> {
  const controls = reduceControls(config)
  return new FormGroup(controls, validatorOrOptions, asyncValidators)
}

type ArrayConfig<T> = Array<AbstractControl<ArrayElement<T>> | ControlConfig<ArrayElement<T>>>

export function useFormArray<T extends any[] = any[]>(
  config: ArrayConfig<T>,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormArray<T>
export function useFormArray<T extends any[] = any[]>(
  config: ArrayConfig<T>,
  validatorOptions?: ValidatorOptions,
): FormArray<T>
export function useFormArray<T extends any[] = any[]>(
  config: ArrayConfig<T>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormArray<T> {
  const controls = config.map(item => createControl(item))
  return new FormArray(controls, validatorOrOptions, asyncValidators)
}

export function useFormControl<T = any>(
  initValue?: T,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormControl<T>
export function useFormControl<T = any>(initValue?: T, validatorOptions?: ValidatorOptions): FormControl<T>
export function useFormControl<T = any>(
  initValue?: T,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormControl<T> {
  return new FormControl(initValue, validatorOrOptions, asyncValidators)
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
  } else {
    const [initValue, validatorOrOptions, asyncValidator] = config as ControlConfig<T>
    return new FormControl(initValue, validatorOrOptions, asyncValidator)
  }
}
