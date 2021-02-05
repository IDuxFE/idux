/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormArray } from './controls/formArray'
import type { FormGroup } from './controls/formGroup'
import type { FormControl } from './controls/formControl'

import { hasOwnProperty, isArray } from '@idux/cdk/utils'
import { AbstractControl } from './controls/abstractControl'

export const isAbstractControl = (val: unknown): val is AbstractControl => {
  return val instanceof AbstractControl
}

// Since AbstractControl be dependent on the function, `val instanceof FormArray` cannot be used here.
export const isFormArray = (val: unknown): val is FormArray => {
  return isAbstractControl(val) && isArray((val as FormArray).controls)
}

// Since AbstractControl be dependent on the function, `val instanceof FormGroup` cannot be used here.
export const isFormGroup = (val: unknown): val is FormGroup => {
  return isAbstractControl(val) && !isFormControl(val) && !isFormArray(val)
}

export const isFormControl = (val: unknown): val is FormControl => {
  return isAbstractControl(val) && hasOwnProperty(val, '_initValue')
}
