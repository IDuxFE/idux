import { flushPromises } from '@vue/test-utils'
import { useFormArray, useFormControl, useFormGroup } from '../src/useForms'
import { Validators } from '../src/validators'

interface BasicGroup {
  control1: string
  control2: number
  array: string[]
  group: {
    control: string
  }
}

const basicValue = { control1: null, control2: '', array: ['', null], group: { control: null } }

describe('useForms.ts', () => {
  test('basic work', async () => {
    const group = useFormGroup<BasicGroup>({
      control1: [null, Validators.required],
      control2: ['', { trigger: 'blur', validators: Validators.required }],
      array: useFormArray(['', null]),
      group: useFormGroup({
        control: useFormControl(),
      }),
    })

    expect(group.getValue()).toEqual(basicValue)
    expect(group.invalid.value).toEqual(false)
    expect(group.hasError('required', 'control1')).toEqual(false)
    expect(group.hasError('required', 'control2')).toEqual(false)

    group.setValue({ control1: '' })
    await flushPromises()

    expect(group.getValue()).toEqual({ ...basicValue, control1: '' })
    expect(group.invalid.value).toEqual(true)
    expect(group.hasError('required', 'control1')).toEqual(true)
    expect(group.hasError('required', 'control2')).toEqual(false)

    group.markAsBlurred()
    await flushPromises()

    expect(group.hasError('required', 'control2')).toEqual(true)
  })
})
