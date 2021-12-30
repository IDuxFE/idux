import { flushPromises } from '@vue/test-utils'

import { FormControl } from '../src/controls'
import { zhCNMessages } from '../src/messages/zh-CN'
import { ValidateErrors } from '../src/types'
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
      expect(await control.validate()).toBeUndefined()

      control.setValidator(Validators.required)

      expect(await control.validate()).toEqual({ required: { message: zhCNMessages.required({}, control) } })
    })
  })

  describe('trigger work', () => {
    let control: FormControl<string>

    test('default change work', async () => {
      const _asyncValidator = (value: unknown) =>
        Promise.resolve(value === 'test' ? undefined : ({ async: { message: 'async' } } as ValidateErrors))

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

      expect(control.hasError('required')).toEqual(false)

      control.markAsBlurred()
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

  describe('disabled work', () => {
    let control: FormControl<string>

    test('default disabled work', async () => {
      control = new FormControl('', { validators: Validators.required, disabled: true })

      expect(control.disabled.value).toEqual(true)
      expect(control.status.value).toEqual('valid')
      expect(control.hasError('required')).toEqual(false)
    })

    test('disable and enable work', async () => {
      control = new FormControl('', { validators: Validators.required, disabled: true })

      control.enable()
      await flushPromises()

      expect(control.disabled.value).toEqual(false)
      expect(control.status.value).toEqual('invalid')
      expect(control.hasError('required')).toEqual(true)

      control.disable()
      await flushPromises()

      expect(control.disabled.value).toEqual(true)
      expect(control.status.value).toEqual('valid')
      expect(control.hasError('required')).toEqual(false)
    })
  })
})
