import { flushPromises } from '@vue/test-utils'
import { FormControl } from '../src/controls/formControl'
import { ValidationErrors } from '../src/types'
import { Validators } from '../src/validators'

describe('formControl.ts', () => {
  describe('basic work', () => {
    let control: FormControl<string>

    beforeEach(() => {
      control = new FormControl('')
    })

    test('reset work', async () => {
      control.setValue('test')
      control.markAsBlurred()
      control.markAsDirty()

      expect(control.valueRef.value).toEqual('test')
      expect(control.blurred.value).toEqual(true)
      expect(control.dirty.value).toEqual(true)

      control.reset()

      expect(control.valueRef.value).toEqual('')
      expect(control.blurred.value).toEqual(false)
      expect(control.dirty.value).toEqual(false)
    })

    test('setValue and getValue work', () => {
      expect(control.valueRef.value).toEqual('')

      control.setValue('test')

      expect(control.getValue()).toEqual('test')
      expect(control.dirty.value).toEqual(false)

      control.setValue('', { dirty: true })

      expect(control.getValue()).toEqual('')
      expect(control.dirty.value).toEqual(true)
    })

    test('markAsBlurred and markAsUnblurred work', () => {
      control.markAsBlurred()

      expect(control.blurred.value).toEqual(true)

      control.markAsUnblurred()

      expect(control.blurred.value).toEqual(false)
    })

    test('markAsDirty and markAsPristine work', () => {
      control.markAsDirty()

      expect(control.dirty.value).toEqual(true)

      control.markAsPristine()

      expect(control.dirty.value).toEqual(false)
    })

    test('validate work', async () => {
      expect(await control.validate()).toBeNull()

      control.setValidator(Validators.required)

      expect(await control.validate()).toEqual({ required: { message: '' } })
    })
  })

  describe('trigger work', () => {
    let control: FormControl<string>

    test('default change work', async () => {
      const _asyncValidator = (value: unknown) =>
        Promise.resolve(value === 'test' ? null : ({ async: { message: 'async' } } as ValidationErrors))

      control = new FormControl('test', { validators: Validators.required, asyncValidators: _asyncValidator })

      expect(control.hasError('required')).toEqual(false)
      expect(control.hasError('async')).toEqual(false)

      control.setValue('')
      await flushPromises()

      expect(control.hasError('required')).toEqual(true)
      expect(control.hasError('async')).toEqual(false)

      control.setValue('1234')
      await flushPromises()

      expect(control.hasError('required')).toEqual(false)
      expect(control.hasError('async')).toEqual(true)
    })

    test('blur trigger validate work', async () => {
      control = new FormControl('', { trigger: 'blur', validators: Validators.required })

      expect(control.hasError('required')).toEqual(true)

      control.setValue('test')
      await flushPromises()

      expect(control.hasError('required')).toEqual(true)

      control.markAsBlurred()
      await flushPromises()

      expect(control.hasError('required')).toEqual(false)

      control.setValue('')
      await flushPromises()

      expect(control.hasError('required')).toEqual(true)
    })

    test('submit trigger validate work', async () => {
      control = new FormControl('', { trigger: 'submit', validators: Validators.required })

      expect(control.hasError('required')).toEqual(true)

      control.setValue('test')
      await flushPromises()

      expect(control.hasError('required')).toEqual(true)

      control.markAsBlurred()
      await flushPromises()

      expect(control.hasError('required')).toEqual(true)

      await control.validate()

      expect(control.hasError('required')).toEqual(false)
    })
  })
})
