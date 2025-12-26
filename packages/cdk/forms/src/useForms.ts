/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type AbstractControl, type GroupControls } from './models/abstractControl'
import { FormArray } from './models/formArray'
import { FormControl } from './models/formControl'
import { FormGroup } from './models/formGroup'
import { isAbstractControl } from './typeof'
import { type AsyncValidatorFn, type ValidatorFn, type ValidatorOptions } from './types'

type ControlConfig<T> =
  | [T | undefined]
  | [T | undefined, ValidatorOptions]
  | [T | undefined, ValidatorFn | ValidatorFn[]]
  | [T | undefined, ValidatorFn | ValidatorFn[], AsyncValidatorFn | AsyncValidatorFn[]]

type GroupConfig<T> = {
  [K in keyof T]: ControlConfig<T[K]> | GroupConfig<T[K]> | AbstractControl<T[K]>
}

type ArrayConfig<T> = Array<ControlConfig<T> | GroupConfig<T> | AbstractControl<T>>

export function useFormGroup<T extends object = object>(
  config: GroupConfig<T>,
  validatorOptions?: ValidatorOptions,
): FormGroup<T>
export function useFormGroup<T extends object = object>(
  config: GroupConfig<T>,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormGroup<T>
export function useFormGroup<T extends object = object>(
  config: GroupConfig<T>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormGroup<T> {
  const controls = reduceControls(config)
  return new FormGroup(controls, validatorOrOptions, asyncValidators)
}

export function useFormArray<T = any>(config: ArrayConfig<T>, validatorOptions?: ValidatorOptions): FormArray<T>
export function useFormArray<T = any>(
  config: ArrayConfig<T>,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormArray<T>
export function useFormArray<T = any>(
  config: ArrayConfig<T>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormArray<T> {
  const controls = config.map(item => createControl(item))
  return new FormArray(controls, validatorOrOptions, asyncValidators)
}

export function useFormControl<T = any>(initValue?: T, validatorOptions?: ValidatorOptions): FormControl<T>
export function useFormControl<T = any>(
  initValue?: T,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormControl<T>
export function useFormControl<T = any>(
  initValue?: T,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormControl<T> {
  return new FormControl(initValue, validatorOrOptions, asyncValidators)
}

function reduceControls<T>(config: GroupConfig<T>): GroupControls<T> {
  const controls = {} as GroupControls<T>
  for (const [key, options] of Object.entries(config)) {
    controls[key as keyof T] = createControl(options as AbstractControl<T[keyof T]>)
  }
  return controls
}

function createControl<T>(config: AbstractControl<T> | ControlConfig<T> | GroupConfig<T>): AbstractControl<T> {
  if (isAbstractControl(config)) {
    return config
  }

  if (Array.isArray(config)) {
    const [initValue, validatorOrOptions, asyncValidator] = config
    return new FormControl(initValue, validatorOrOptions, asyncValidator)
  }

  const controls = reduceControls(config as GroupConfig<T>)
  return new FormGroup(controls) as unknown as AbstractControl<T>
}
