import { flushPromises } from '@vue/test-utils'
import { FormArray } from '../src/controls/formArray'
import { FormControl } from '../src/controls/formControl'
import { FormGroup } from '../src/controls/formGroup'
import { ValidationErrors } from '../src/types'
import { Validators } from '../src/validators'

interface BasicGroup {
  control: string
  array: string[]
  group: {
    control: string
  }
  add?: string
}

const basicValue = { control: '', array: ['', ''], group: { control: '' } }

describe('formGroup.ts', () => {
  describe('basic work', () => {
    let group: FormGroup<BasicGroup>

    beforeEach(() => {
      group = new FormGroup<BasicGroup>({
        control: new FormControl(''),
        array: new FormArray<string[]>([new FormControl(''), new FormControl('')]),
        group: new FormGroup({
          control: new FormControl(''),
        }),
      })
    })

    test('addControl and removeControl work', async () => {
      expect(group.getValue()).toEqual(basicValue)

      const control = new FormControl('')
      group.addControl('add', control)
      control.markAsBlurred()
      await flushPromises()

      expect(group.blurred.value).toEqual(true)
      expect(group.getValue()).toEqual({ ...basicValue, add: '' })

      group.addControl('add', new FormControl('test'))

      expect(group.getValue()).toEqual({ ...basicValue, add: '' })

      control.markAsUnblurred()
      await flushPromises()

      expect(group.blurred.value).toEqual(false)

      group.removeControl('add')
      expect(group.getValue()).toEqual(basicValue)

      control.markAsBlurred()
      await flushPromises()
      expect(group.blurred.value).toEqual(false)
    })

    test('setControl work', async () => {
      expect(group.getValue()).toEqual(basicValue)

      const _control = new FormControl('test')
      group.setControl('control', _control)

      expect(group.getValue()).toEqual({ ...basicValue, control: 'test' })

      _control?.markAsBlurred()
      await flushPromises()

      expect(group.blurred.value).toEqual(true)
    })

    test('reset work', async () => {
      expect(group.getValue()).toEqual(basicValue)

      group.setValue({ control: 'test' })
      group.markAsBlurred()
      await flushPromises()

      expect(group.getValue()).toEqual({ ...basicValue, control: 'test' })
      expect(group.blurred.value).toEqual(true)

      group.reset()
      await flushPromises()

      expect(group.getValue()).toEqual(basicValue)
      expect(group.blurred.value).toEqual(false)
    })

    test('setValue and getValue work', () => {
      expect(group.getValue()).toEqual(basicValue)

      group.setValue({ control: 'test' })

      expect(group.getValue()).toEqual({ ...basicValue, control: 'test' })

      group.setValue({ control: 'test1' })

      expect(group.getValue()).toEqual({ ...basicValue, control: 'test1' })
    })

    test('markAsBlurred and markAsUnblurred work', async () => {
      group.markAsBlurred()
      await flushPromises()

      expect(group.blurred.value).toEqual(true)

      group.markAsUnblurred()
      await flushPromises()

      expect(group.blurred.value).toEqual(false)
    })

    test('markAsDirty and markAsPristine work', async () => {
      group.markAsDirty()
      await flushPromises()

      expect(group.dirty.value).toEqual(true)

      group.markAsPristine()
      await flushPromises()

      expect(group.dirty.value).toEqual(false)
    })

    test('validate work', async () => {
      expect(await group.validate()).toBeNull()

      const _validator = (_: unknown) => ({ test: { message: '' } } as ValidationErrors)

      group.setValidator(_validator)

      expect(await group.validate()).toEqual({ test: { message: '' } })
    })

    test('get work', async () => {
      const { control, array, group: groupChild } = group.controls
      expect(group.get('control')).toEqual(control)
      expect(group.get('array')).toEqual(array)
      expect(group.get('group')).toEqual(groupChild)
      expect(group.get('group.control')).toEqual((groupChild as FormGroup<{ control: string }>).controls.control)
      expect(group.get(['array', 0])).toEqual((array as FormArray<string[]>).controls[0])

      expect(group.get(undefined as never)).toBeNull()
      expect(group.get('')).toBeNull()
      expect(group.get([])).toBeNull()
      expect(group.get('add')).toBeNull()
      expect(group.get(['array', 2])).toBeNull()
      expect(group.get('group.control.test')).toBeNull()
    })
  })

  describe('trigger work', () => {
    let group: FormGroup<BasicGroup>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _validator = (value: any) => {
      return value.control === 'test' ? null : ({ test: { message: '' } } as ValidationErrors)
    }

    test('default change work', async () => {
      group = new FormGroup<BasicGroup>({
        control: new FormControl('', Validators.required),
        array: new FormArray<string[]>([new FormControl(''), new FormControl('')]),
        group: new FormGroup({
          control: new FormControl(''),
        }),
      })

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('required', 'control')).toEqual(true)
      expect(group.hasError('test')).toEqual(false)

      group.setValue({ control: 'test' })
      await flushPromises()

      expect(group.invalid.value).toEqual(false)
      expect(group.hasError('required', 'control')).toEqual(false)
      expect(group.hasError('test')).toEqual(false)

      group.setValidator(_validator)
      group.setValue({ control: '1234' })
      await flushPromises()

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('required', 'control')).toEqual(false)
      expect(group.hasError('test')).toEqual(true)

      group.setValue({ control: 'test' })
      await flushPromises()

      expect(group.invalid.value).toEqual(false)
      expect(group.hasError('test')).toEqual(false)
      expect(group.hasError('required', 'control')).toEqual(false)
    })

    test('blur trigger validate work', async () => {
      group = new FormGroup<BasicGroup>(
        {
          control: new FormControl('', Validators.required),
          array: new FormArray<string[]>([new FormControl(''), new FormControl('')]),
          group: new FormGroup({
            control: new FormControl('', {
              validators: Validators.required,
              trigger: 'submit',
            }),
          }),
        },
        { trigger: 'blur', validators: _validator },
      )

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('test')).toEqual(true)
      expect(group.hasError('required', 'control')).toEqual(true)
      expect(group.hasError('required', 'group.control')).toEqual(true)

      group.setValue({ control: 'test', group: { control: 'test' } })
      await flushPromises()

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('test')).toEqual(true)
      expect(group.hasError('required', 'control')).toEqual(true)
      expect(group.hasError('required', 'group.control')).toEqual(true)

      group.markAsBlurred()
      await flushPromises()

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('test')).toEqual(false)
      expect(group.hasError('required', 'control')).toEqual(false)
      expect(group.hasError('required', 'group.control')).toEqual(true)

      await group.validate()

      expect(group.invalid.value).toEqual(false)
      expect(group.hasError('required', 'group.control')).toEqual(false)
    })

    test('submit trigger validate work', async () => {
      const _asyncValidator = (_: unknown) => Promise.resolve({ async: { message: 'async' } } as ValidationErrors)

      group = new FormGroup<BasicGroup>(
        {
          control: new FormControl('', Validators.required),
          array: new FormArray<string[]>([new FormControl(''), new FormControl('')]),
          group: new FormGroup({
            control: new FormControl('', { asyncValidators: _asyncValidator }),
          }),
        },
        { trigger: 'submit', validators: _validator },
      )

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('test')).toEqual(true)
      expect(group.hasError('required', 'control')).toEqual(true)
      expect(group.hasError('async', 'group.control')).toEqual(false)

      await flushPromises()

      expect(group.hasError('async', 'group.control')).toEqual(true)

      group.setValue({ control: 'test' })
      await flushPromises()

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('test')).toEqual(true)
      expect(group.hasError('required', 'control')).toEqual(true)
      expect(group.hasError('async', 'group.control')).toEqual(true)

      group.markAsBlurred()
      await flushPromises()

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('test')).toEqual(true)
      expect(group.hasError('required', 'control')).toEqual(true)
      expect(group.hasError('async', 'group.control')).toEqual(true)

      await group.validate()

      expect(group.invalid.value).toEqual(true)
      expect(group.hasError('test')).toEqual(false)
      expect(group.hasError('required', 'control')).toEqual(false)
      expect(group.hasError('async', 'group.control')).toEqual(true)
    })
  })
})
