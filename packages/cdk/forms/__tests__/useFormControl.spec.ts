import { flushPromises } from '@vue/test-utils'

import { AsyncValidatorFn, Errors } from '../src/types'
import { FormControl, useFormControl } from '../src/useFormControl'
import { Validators } from '../src/validators'

describe('useFormControl.ts', () => {
  describe('basic work', () => {
    let control: FormControl

    beforeEach(() => {
      control = useFormControl()
    })

    test('init modelRef work', () => {
      expect(control.modelRef.value).toBeNull()
    })

    test('init status work', () => {
      expect(control.status.value).toEqual('valid')
      expect(control.valid.value).toEqual(true)
      expect(control.invalid.value).toEqual(false)
      expect(control.validating.value).toEqual(false)
    })

    test('init errors work', () => {
      expect(control.errors.value).toBeNull()
    })

    test('init blurred work', () => {
      expect(control.blurred.value).toEqual(false)
      expect(control.unblurred.value).toEqual(true)
    })

    test('validate work', async () => {
      expect(await control.validate()).toBeNull()
    })

    test('reset work', async () => {
      control.setValue('test')
      control.markAsBlurred()

      expect(control.modelRef.value).toEqual('test')
      expect(control.blurred.value).toEqual(true)

      control.reset()

      expect(control.modelRef.value).toBeNull()
      expect(control.blurred.value).toEqual(false)
    })

    test('setValue work', async () => {
      expect(control.modelRef.value).toBeNull()

      control.setValue('test')

      expect(control.modelRef.value).toEqual('test')

      control.setValue('')

      expect(control.modelRef.value).toEqual('')
    })

    test('setValidator work', async () => {
      const { required, minLength, email } = Validators
      control.setValidator(required)

      expect(await control.validate()).toEqual({ required: { message: '' } })

      control.setValidator([email, minLength(5)])
      control.setValue('test')

      expect(await control.validate()).toEqual({
        email: { message: '', actual: 'test' },
        minLength: { message: '', minLength: 5, actual: 4 },
      })
    })

    test('setAsyncValidator work', async () => {
      const _asyncValidator = (key: string, error: unknown): AsyncValidatorFn => {
        return (_: unknown) => {
          return Promise.resolve({ [key]: error } as Errors)
        }
      }
      const message1 = { message: 1 }
      const message2 = { message: 2 }

      control.setAsyncValidator(_asyncValidator('a', message1))

      expect(await control.validate()).toEqual({ a: message1 })

      control.setAsyncValidator([_asyncValidator('a', message1), _asyncValidator('b', message2)])

      expect(await control.validate()).toEqual({ a: message1, b: message2 })
    })

    test('setErrors work', async () => {
      expect(control.errors.value).toBeNull()
      expect(control.getError('required')).toBeNull()

      const errors = { required: { message: '' } }
      control.setErrors(errors)

      expect(control.errors.value).toEqual(errors)

      expect(control.getError('required')).toEqual(errors.required)
      expect(control.getError('max')).toBeNull()

      expect(control.hasError('required')).toEqual(true)
      expect(control.hasError('max')).toEqual(false)
    })
  })

  describe('trigger work', () => {
    let control: FormControl

    test('default change work', async () => {
      control = useFormControl(null, { validators: Validators.required })

      control.setValue('')
      await flushPromises()

      expect(control.errors.value).toEqual({ required: { message: '' } })
    })

    test('blur trigger validate work', async () => {
      control = useFormControl(null, { trigger: 'blur', validators: Validators.required })
      control.markAsBlurred()
      await flushPromises()
      expect(control.errors.value).toEqual({ required: { message: '' } })
    })
  })

  describe('validator work', () => {
    let control: FormControl

    test('validate work', async () => {
      control = useFormControl(null, [Validators.required])

      control.setValue('test')
      await flushPromises()
      expect(control.errors.value).toBeNull()

      control.setValue('')
      await flushPromises()
      expect(control.errors.value).toEqual({ required: { message: '' } })
    })
  })
})
