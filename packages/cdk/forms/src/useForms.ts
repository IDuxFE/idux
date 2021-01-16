/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions } from './types'
import type { AbstractControl } from './controls/abstractControl'

import { isArray } from '@idux/cdk/utils'
import { FormGroup } from './controls/formGroup'
import { FormControl } from './controls/formControl'
import { FormArray } from './controls/formArray'
import { isAbstractControl } from './typeof'

type ControlConfig<T> = [
  T | null | undefined,
  ValidatorFn | ValidatorFn[] | ValidatorOptions | null | undefined,
  AsyncValidatorFn | AsyncValidatorFn[] | null | undefined,
]

export function useFormGroup<T = any>(
  controlsConfig: Partial<Record<keyof T, AbstractControl<T> | ControlConfig<T> | any>>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormGroup<T> {
  const controls = reduceControls(controlsConfig)
  return new FormGroup(controls, validatorOrOptions, asyncValidator)
}

export function useFormControl<T = any>(
  initValue?: T | null,
  validator?: ValidatorFn | ValidatorFn[] | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormControl<T>
export function useFormControl<T = any>(initValue?: T | null, options?: ValidatorOptions | null): FormControl<T>
export function useFormControl<T = any>(
  initValue: T | null = null,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormControl<T> {
  return new FormControl(initValue, validatorOrOptions, asyncValidator)
}

export function useFormArray<T = any>(
  controlsConfig: Array<AbstractControl<T> | ControlConfig<T> | any>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormArray<T> {
  const controls = controlsConfig.map(config => createControl<T>(config))
  return new FormArray(controls, validatorOrOptions, asyncValidator)
}

function reduceControls<T>(
  controlsConfig: Partial<Record<keyof T, AbstractControl<T> | ControlConfig<T> | any>>,
): Partial<Record<keyof T, AbstractControl<T>>> {
  const controls = {} as Partial<Record<keyof T, AbstractControl<T>>>
  Object.keys(controlsConfig).forEach(controlName => {
    controls[controlName as keyof Required<T>] = createControl(controlsConfig[controlName as keyof Required<T>])
  })
  return controls
}

function createControl<T>(controlConfig: AbstractControl<T> | ControlConfig<T> | any): AbstractControl<T> {
  if (isAbstractControl(controlConfig)) {
    return controlConfig
  } else if (isArray(controlConfig)) {
    const [initValue, validatorOrOptions, asyncValidator] = controlConfig
    return useFormControl(initValue, validatorOrOptions, asyncValidator)
  } else {
    return useFormControl(controlConfig)
  }
}
