import { flushPromises } from '@vue/test-utils'
import { useFormArray, useFormGroup } from '../src/useForms'
import { Validators } from '../src/validators'

interface BasicGroup {
  control1: string
  control2?: number
  array: (string | number)[]
  group: {
    control: string | number
  }
}

const basicValue: BasicGroup = { control1: '', control2: undefined, array: ['', 1], group: { control: '' } }

describe('useForms.ts', () => {
  test('basic work', async () => {
    const group = useFormGroup<BasicGroup>({
      control1: ['', Validators.required],
      control2: [undefined, { trigger: 'blur', validators: Validators.required }],
      array: useFormArray<(string | number)[]>(['', 1]),
      group: useFormGroup({ control: '' }),
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
