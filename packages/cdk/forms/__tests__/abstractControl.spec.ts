import { flushPromises } from '@vue/test-utils'
import { Ref, ref } from 'vue'
import { AbstractControl } from '../src/controls/abstractControl'
import { AsyncValidatorFn, ValidationErrors, ValidatorFn, ValidatorOptions } from '../src/types'
import { Validators } from '../src/validators'

class Control<T = unknown> extends AbstractControl<T> {
  readonly valueRef: Ref<T | null> = ref(null)
  constructor(
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
  }
  reset(): void {}
  setValue(_: T | null): void {}
  getValue(): T {
    return this.valueRef.value as T
  }
  markAsBlurred(): void {}
  markAsUnblurred(): void {}
  async validate(): Promise<ValidationErrors | null> {
    return this._validate()
  }
}

describe('abstractControl.ts', () => {
  describe('basic work', () => {
    let control: Control

    beforeEach(() => {
      control = new Control()
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

    test('init props work', () => {
      expect(control.parent).toBeNull()
      expect(control.root).toEqual(control)
      expect(control.trigger).toEqual('change')
    })

    test('setValidator work', async () => {
      const { required, minLength, email } = Validators
      control.setValidator(required)

      expect(await control.validate()).toEqual({ required: { message: '' } })

      control.setValidator([email, minLength(5)])
      control.valueRef.value = 'test'

      expect(await control.validate()).toEqual({
        email: { message: '', actual: 'test' },
        minLength: { message: '', minLength: 5, actual: 4 },
      })
    })

    test('setAsyncValidator work', async () => {
      const _asyncValidator = (key: string, error: unknown): AsyncValidatorFn => {
        return (_: unknown) => {
          return Promise.resolve({ [key]: error } as ValidationErrors)
        }
      }
      const message1 = { message: 1 }
      const message2 = { message: 2 }

      control.setAsyncValidator(_asyncValidator('a', message1))

      expect(await control.validate()).toEqual({ a: message1 })

      control.setAsyncValidator([_asyncValidator('a', message1), _asyncValidator('b', message2)])

      expect(await control.validate()).toEqual({ a: message1, b: message2 })
    })

    test('setErrors, getError and hasError work', () => {
      expect(control.errors.value).toBeNull()
      expect(control.getError('required')).toBeNull()
      expect(control.hasError('required')).toEqual(false)

      const errors = { required: { message: '' } }
      control.setErrors(errors)

      expect(control.errors.value).toEqual(errors)

      expect(control.getError('required')).toEqual(errors.required)
      expect(control.getError('max')).toBeNull()

      expect(control.hasError('required')).toEqual(true)
      expect(control.hasError('max')).toEqual(false)
    })

    test('setParent work', () => {
      const parent = new Control()

      expect(control.parent).not.toEqual(parent)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control.setParent(parent as any)
      expect(control.parent).toEqual(parent)
      expect(control.root).toEqual(parent)

      const root = new Control()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parent.setParent(root as any)
      expect(control.root).toEqual(root)
    })
  })

  describe('convert options work', () => {
    let control: Control

    test('options work', async () => {
      control = new Control({ validators: Validators.required })

      expect(await control.validate()).toEqual({ required: { message: '' } })

      expect(control.trigger).toEqual('change')

      control = new Control({ trigger: 'blur' })

      expect(control.trigger).toEqual('blur')
    })

    test('validators work', async () => {
      const _asyncValidator = (_: unknown) => Promise.resolve({ async: { message: 'async' } } as ValidationErrors)

      control = new Control(Validators.required, _asyncValidator)
      expect(await control.validate()).toEqual({ required: { message: '' } })

      control.valueRef.value = 'test'
      control.validate()

      expect(control.status.value).toEqual('validating')
      expect(control.validating.value).toEqual(true)

      await flushPromises()

      expect(control.hasError('async')).toEqual(true)
    })
  })
})
