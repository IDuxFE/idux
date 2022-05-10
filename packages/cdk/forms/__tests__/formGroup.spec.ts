import { flushPromises } from '@vue/test-utils'

import { FormArray, FormControl, FormGroup } from '../src/controls'
import { ValidateErrors } from '../src/types'
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
        array: new FormArray([new FormControl(''), new FormControl('')]),
        group: new FormGroup({
          control: new FormControl(''),
        }),
      })
    })

    test('addControl and removeControl work', async () => {
      expect(group.getValue()).toEqual(basicValue)

      const control = new FormControl<string | undefined>('')
      group.addControl('add', control)
      control.markAsBlurred()
      await flushPromises()

      expect(group.blurred.value).toEqual(true)
      expect(group.getValue()).toEqual({ ...basicValue, add: '' })

      group.addControl('add', new FormControl<string | undefined>('test'))

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

      group.get('control')!.disable()

      expect(group.getValue()).toEqual({ ...basicValue, control: 'test1' })
      const { control, ...rest } = basicValue
      expect(group.getValue({ skipDisabled: true })).toEqual(rest)
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
      expect(await group.validate()).toBeUndefined()

      const _validator = (_: unknown) => ({ test: {} })

      group.setValidator(_validator)

      expect(await group.validate()).toEqual({ test: {} })
    })

    test('get work', async () => {
      const { control, array, group: groupChild } = group.controls.value
      expect(group.get('control')).toEqual(control)
      expect(group.get('array')).toEqual(array)
      expect(group.get('group')).toEqual(groupChild)
      expect(group.get('group.control')).toEqual((groupChild as FormGroup<{ control: string }>).controls.value.control)
      expect(group.get(['array', 0])).toEqual((array as FormArray<string[]>).controls.value[0])
      expect(group.get('array')!.get(0)).toEqual((array as FormArray<string[]>).controls.value[0])

      expect(group.get(undefined as never)).toBeUndefined()
      expect(group.get('')).toBeUndefined()
      expect(group.get([])).toBeUndefined()
      expect(group.get('add')).toBeUndefined()
      expect(group.get(['array', 2])).toBeUndefined()
      expect(group.get('group.control.test')).toBeUndefined()
    })
  })

  describe('trigger work', () => {
    let group: FormGroup<BasicGroup>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _validator = (value: any) => {
      return value.control === 'test' ? undefined : { test: {} }
    }

    test('default change work', async () => {
      group = new FormGroup({
        control: new FormControl('', Validators.required),
        array: new FormArray([new FormControl(''), new FormControl('')]),
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
      group = new FormGroup(
        {
          control: new FormControl('', Validators.required),
          array: new FormArray([new FormControl(''), new FormControl('')]),
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
      const _asyncValidator = (_: unknown) => Promise.resolve({ async: { message: 'async' } } as ValidateErrors)

      group = new FormGroup(
        {
          control: new FormControl('', Validators.required),
          array: new FormArray([new FormControl(''), new FormControl('')]),
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

  describe('disabled work', () => {
    let group: FormGroup<BasicGroup>

    test('default disabled work', async () => {
      group = new FormGroup(
        {
          control: new FormControl('', [Validators.required]),
          array: new FormArray([new FormControl(''), new FormControl('')]),
          group: new FormGroup({ control: new FormControl('') }),
        },
        { disabled: true },
      )

      await flushPromises()

      expect(group.disabled.value).toEqual(true)
      expect(group.status.value).toEqual('valid')
      expect(group.get('control').disabled.value).toEqual(true)
      expect(group.get('array').disabled.value).toEqual(true)
      expect(group.get('group').disabled.value).toEqual(true)
      expect(group.get('group.control')!.disabled.value).toEqual(true)
    })

    test('disable and enable work', async () => {
      group = new FormGroup<BasicGroup>(
        {
          control: new FormControl('', [Validators.required]),
          array: new FormArray([new FormControl(''), new FormControl('')]),
          group: new FormGroup({ control: new FormControl('') }),
        },
        { disabled: true },
      )

      group.enable()
      await flushPromises()

      expect(group.disabled.value).toEqual(false)
      expect(group.status.value).toEqual('invalid')
      expect(group.get('control')!.disabled.value).toEqual(false)
      expect(group.get('array')!.disabled.value).toEqual(false)
      expect(group.get('group')!.disabled.value).toEqual(false)
      expect(group.get('group.control')!.disabled.value).toEqual(false)

      group.disable()
      await flushPromises()

      expect(group.disabled.value).toEqual(true)
      expect(group.status.value).toEqual('valid')
      expect(group.get('control')!.disabled.value).toEqual(true)
      expect(group.get('array')!.disabled.value).toEqual(true)
      expect(group.get('group')!.disabled.value).toEqual(true)
      expect(group.get('group.control')!.disabled.value).toEqual(true)
    })
  })
})
