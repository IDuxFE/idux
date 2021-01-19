import { FormArray } from '../src/controls/formArray'
import { FormControl } from '../src/controls/formControl'
import { FormGroup } from '../src/controls/formGroup'
import { isAbstractControl, isFormArray, isFormControl, isFormGroup } from '../src/typeof'
import { useFormArray, useFormControl, useFormGroup } from '../src/useForms'

describe('typeof.ts', () => {
  test('isAbstractControl work', () => {
    expect(isAbstractControl(new FormGroup({}))).toEqual(true)
    expect(isAbstractControl(useFormGroup({}))).toEqual(true)
    expect(isAbstractControl(new FormControl(''))).toEqual(true)
    expect(isAbstractControl(useFormControl(''))).toEqual(true)
    expect(isAbstractControl(new FormArray([]))).toEqual(true)
    expect(isAbstractControl(useFormArray([]))).toEqual(true)

    expect(isAbstractControl(null)).toEqual(false)
    expect(isAbstractControl({})).toEqual(false)
  })

  test('isFormGroup work', () => {
    expect(isFormGroup(new FormGroup({}))).toEqual(true)
    expect(isFormGroup(useFormGroup({}))).toEqual(true)

    expect(isFormGroup(new FormControl(''))).toEqual(false)
    expect(isFormGroup(useFormControl(''))).toEqual(false)
    expect(isFormGroup(new FormArray([]))).toEqual(false)
    expect(isFormGroup(useFormArray([]))).toEqual(false)
    expect(isFormGroup(null)).toEqual(false)
    expect(isFormGroup({})).toEqual(false)
  })

  test('isFormControl work', () => {
    expect(isFormControl(new FormControl(''))).toEqual(true)
    expect(isFormControl(useFormControl(''))).toEqual(true)

    expect(isFormControl(new FormGroup({}))).toEqual(false)
    expect(isFormControl(useFormGroup({}))).toEqual(false)
    expect(isFormControl(new FormArray([]))).toEqual(false)
    expect(isFormControl(useFormArray([]))).toEqual(false)
    expect(isFormControl(null)).toEqual(false)
    expect(isFormControl({})).toEqual(false)
  })

  test('isFormArray work', () => {
    expect(isFormArray(new FormArray([]))).toEqual(true)
    expect(isFormArray(useFormArray([]))).toEqual(true)

    expect(isFormArray(new FormGroup({}))).toEqual(false)
    expect(isFormArray(useFormGroup({}))).toEqual(false)
    expect(isFormArray(new FormControl(''))).toEqual(false)
    expect(isFormArray(useFormControl(''))).toEqual(false)
    expect(isFormControl(null)).toEqual(false)
    expect(isFormControl({})).toEqual(false)
  })
})
