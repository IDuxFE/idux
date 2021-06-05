import { AbstractControl, FormControl, FormGroup, FormArray } from './controls'

export const isAbstractControl = (val: unknown): val is AbstractControl => {
  return val instanceof AbstractControl
}

export const isFormControl = (val: unknown): val is FormControl => {
  return val instanceof FormControl
}

export const isFormGroup = (val: unknown): val is FormGroup => {
  return val instanceof FormGroup
}

export const isFormArray = (val: unknown): val is FormArray => {
  return val instanceof FormArray
}
