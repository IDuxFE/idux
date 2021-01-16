import { flushPromises } from '@vue/test-utils'
import { FormControl } from '../src/controls/formControl'
import { Validators } from '../src/validators'

describe('formControl.ts', () => {
  describe('basic work', () => {
    let control: FormControl

    beforeEach(() => {
      control = new FormControl()
    })

    test('reset work', async () => {
      control.setValue('test')
      control.markAsBlurred()

      expect(control.valueRef.value).toEqual('test')
      expect(control.blurred.value).toEqual(true)

      control.reset()

      expect(control.valueRef.value).toBeNull()
      expect(control.blurred.value).toEqual(false)
    })

    test('setValue and getValue work', () => {
      expect(control.valueRef.value).toBeNull()

      control.setValue('test')

      expect(control.getValue()).toEqual('test')

      control.setValue('')

      expect(control.getValue()).toEqual('')
    })

    test('markAsBlurred and markAsUnblurred work', () => {
      control.markAsBlurred()

      expect(control.blurred.value).toEqual(true)

      control.markAsUnblurred()

      expect(control.blurred.value).toEqual(false)
    })

    test('validate work', async () => {
      expect(await control.validate()).toBeNull()

      control.setValidator(Validators.required)

      expect(await control.validate()).toEqual({ required: { message: '' } })
    })
  })

  describe('trigger work', () => {
    let control: FormControl

    test('default change work', async () => {
      control = new FormControl(null, { validators: Validators.required })

      expect(control.hasError('required')).toEqual(false)

      control.setValue('')
      await flushPromises()

      expect(control.hasError('required')).toEqual(true)
    })

    test('blur trigger validate work', async () => {
      control = new FormControl(null, { trigger: 'blur', validators: Validators.required })

      expect(control.hasError('required')).toEqual(false)

      control.markAsBlurred()
      await flushPromises()

      expect(control.hasError('required')).toEqual(true)

      control.setValue('test')
      await flushPromises()

      expect(control.hasError('required')).toEqual(false)
    })

    test('submit trigger validate work', async () => {
      control = new FormControl(null, { trigger: 'submit', validators: Validators.required })

      expect(control.hasError('required')).toEqual(false)

      control.markAsBlurred()
      await flushPromises()

      expect(control.hasError('required')).toEqual(false)

      await control.validate()

      expect(control.hasError('required')).toEqual(true)
    })
  })
})
