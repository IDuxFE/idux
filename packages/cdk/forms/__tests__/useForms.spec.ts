import { flushPromises } from '@vue/test-utils'

import { useFormArray, useFormControl, useFormGroup } from '../src/useForms'
import { Validators } from '../src/validators'

interface BasicGroup {
  control1: string
  control2?: number
  array1: (string | number)[]
  array2: { control: string }[]
  group1: {
    control: string | number
  }
  group2: {
    control: string | number
  }
}

const basicValue: BasicGroup = {
  control1: '',
  control2: undefined,
  array1: ['', 1],
  array2: [{ control: '0' }, { control: '1' }],
  group1: { control: 1 },
  group2: { control: '2' },
}

describe('useForms.ts', () => {
  test('basic work', async () => {
    const group = useFormGroup<BasicGroup>({
      control1: ['', Validators.required],
      control2: [undefined, { trigger: 'blur', validators: Validators.required }],
      array1: useFormArray<string | number>([[''], [1]]),
      array2: useFormArray([{ control: ['0'] }, { control: ['1'] }]),
      group1: useFormGroup({ control: useFormControl<string | number>(1) }),
      group2: {
        control: ['2'],
      },
    })

    expect(group.getValue()).toEqual(basicValue)
    expect(group.invalid.value).toEqual(true)
    expect(group.hasError('required', 'control1')).toEqual(true)
    expect(group.hasError('required', 'control2')).toEqual(true)

    group.setValue({ control1: 'test', control2: 1 })
    await flushPromises()

    expect(group.getValue()).toEqual({ ...basicValue, control1: 'test', control2: 1 })
    expect(group.invalid.value).toEqual(true)
    expect(group.hasError('required', 'control1')).toEqual(false)
    expect(group.hasError('required', 'control2')).toEqual(true)

    group.markAsBlurred()
    await flushPromises()

    expect(group.invalid.value).toEqual(false)
    expect(group.hasError('required', 'control1')).toEqual(false)
    expect(group.hasError('required', 'control2')).toEqual(false)
  })
})
