import { flushPromises } from '@vue/test-utils'

import { FormControl } from '../src/models/formControl'
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

  test('useFormControl work', async () => {
    const control = useFormControl('', Validators.required)

    expect(control.getValue()).toEqual('')
    expect(control.invalid.value).toEqual(true)
    expect(control.hasError('required')).toEqual(true)

    control.setValue('test')
    await flushPromises()

    expect(control.getValue()).toEqual('test')
    expect(control.invalid.value).toEqual(false)
    expect(control.hasError('required')).toEqual(false)
  })

  test('useFormArray work', async () => {
    const array = useFormArray<string>([[''], ['test']])

    expect(array.getValue()).toEqual(['', 'test'])
    expect(array.length.value).toEqual(2)

    array.setValue(['test1', 'test2'])
    await flushPromises()

    expect(array.getValue()).toEqual(['test1', 'test2'])

    const control = new FormControl('test3')
    array.push(control)

    expect(array.length.value).toEqual(3)
    expect(array.getValue()).toEqual(['test1', 'test2', 'test3'])
  })

  test('nested form structure work', async () => {
    const group = useFormGroup({
      user: useFormGroup({
        name: ['', Validators.required],
        age: [0, Validators.min(18)],
      }),
      tags: useFormArray<string>([['tag1'], ['tag2']]),
    })

    expect(group.getValue()).toEqual({
      user: { name: '', age: 0 },
      tags: ['tag1', 'tag2'],
    })

    expect(group.invalid.value).toEqual(true)
    expect(group.hasError('required', 'user.name')).toEqual(true)
    expect(group.hasError('min', 'user.age')).toEqual(true)

    group.setValue(
      {
        user: { name: 'John', age: 25 },
        tags: ['tag1', 'tag2', 'tag3'],
      },
      { dirty: true },
    )
    await flushPromises()

    expect(group.invalid.value).toEqual(false)
  })

  test('validator options work', async () => {
    const control = useFormControl('', {
      validators: Validators.required,
      trigger: 'blur',
      disabled: false,
    })

    expect(control.trigger).toEqual('blur')
    expect(control.disabled.value).toEqual(false)

    control.setValue('')
    await flushPromises()

    expect(control.hasError('required')).toEqual(true)

    control.markAsBlurred()
    await flushPromises()

    expect(control.hasError('required')).toEqual(true)
  })
})
