import { flushPromises } from '@vue/test-utils'
import { Ref, ref, watch } from 'vue'

import { AbstractControl } from '../src/controls'
import { zhCNMessages } from '../src/messages/zh-CN'
import { AsyncValidatorFn, ValidateErrors, ValidatorFn, ValidatorOptions } from '../src/types'
import { Validators } from '../src/validators'

class Control<T = unknown> extends AbstractControl<T> {
  _valueRef: Ref<T> = ref() as Ref<T>
  constructor(
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(undefined, validatorOrOptions, asyncValidator)

    this._watchEffect()
  }

  setValue(value: T): void {
    this._valueRef.value = value
  }
  getValue(): T {
    return this._valueRef.value
  }

  protected _forEachControls(): void {}

  protected _calculateInitValue(): T {
    return undefined as unknown as T
  }

  private _watchEffect() {
    watch([this._valueRef], () => {
      this._validate()
    })

    watch(this._errors, errors => {
      this._status.value = errors ? 'invalid' : 'valid'
    })
  }
}

describe('abstractControl.ts', () => {
  describe('basic work', () => {
    let control: AbstractControl

    beforeEach(() => {
      control = new Control()
    })

    test('init all status work', () => {
      expect(control.status.value).toEqual('valid')
      expect(control.errors.value).toBeUndefined()
      expect(control.valid.value).toEqual(true)
      expect(control.invalid.value).toEqual(false)
      expect(control.validating.value).toEqual(false)
      expect(control.disabled.value).toEqual(false)
      expect(control.blurred.value).toEqual(false)
      expect(control.unblurred.value).toEqual(true)
      expect(control.dirty.value).toEqual(false)
      expect(control.pristine.value).toEqual(true)
    })

    test('init props work', () => {
      expect(control.parent).toBeUndefined()
      expect(control.root).toEqual(control)
      expect(control.trigger).toEqual('change')
    })

    test('setValidator work', async () => {
      const { required, minLength, email } = Validators
      control.setValidator(required)

      expect(await control.validate()).toEqual({ required: { message: zhCNMessages.required({}, control) } })

      control.setValidator([email, minLength(5)])
      control.setValue('test')

      expect(await control.validate()).toEqual({
        email: { actual: 'test', message: zhCNMessages.email({ actual: 'test' }, control) },
        minLength: { actual: 4, minLength: 5, message: zhCNMessages.minLength({ actual: 4, minLength: 5 }, control) },
      })
    })

    test('setAsyncValidator work', async () => {
      const _asyncValidator = (key: string, error: unknown): AsyncValidatorFn => {
        return (_: unknown) => {
          return Promise.resolve({ [key]: error } as ValidateErrors)
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
      expect(control.errors.value).toBeUndefined()
      expect(control.getError('required')).toBeUndefined()
      expect(control.hasError('required')).toEqual(false)

      const errors = { required: {} }
      control.setErrors(errors)

      expect(control.errors.value).toEqual(errors)

      expect(control.getError('required')).toEqual(errors.required)
      expect(control.getError('max')).toBeUndefined()

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

    test('watchValue work', async () => {
      const log = vi.fn()
      const stop = control.watchValue(value => log(value))

      control.setValue('test')
      await flushPromises()

      expect(log).toBeCalledWith('test')
      expect(log).toBeCalledTimes(1)

      control.setValue('')
      await flushPromises()

      expect(log).toBeCalledWith('')
      expect(log).toBeCalledTimes(2)

      stop()

      control.setValue('test')
      await flushPromises()

      expect(log).toBeCalledTimes(2)

      control.watchValue(value => log(value), { immediate: true })
      await flushPromises()

      expect(log).toBeCalledWith('test')
      expect(log).toBeCalledTimes(3)
    })

    test('watchStatus work', async () => {
      const log = vi.fn()
      const stop = control.watchStatus(value => log(value))

      control.setValidator(Validators.required)
      control.setValue('')
      await flushPromises()

      expect(log).toBeCalledWith('invalid')
      expect(log).toBeCalledTimes(1)

      control.setValue('test')
      await flushPromises()

      expect(log).toBeCalledWith('valid')
      expect(log).toBeCalledTimes(2)

      stop()

      control.setValue('')
      await flushPromises()

      expect(log).toBeCalledTimes(2)

      control.watchValue(value => log(value), { immediate: true })
      await flushPromises()

      expect(log).toBeCalledWith('invalid')
      expect(log).toBeCalledTimes(3)
    })
  })

  describe('convert options work', () => {
    let control: AbstractControl

    test('options work', async () => {
      control = new Control({ validators: Validators.required })

      expect(await control.validate()).toEqual({ required: { message: zhCNMessages.required({}, control) } })

      expect(control.trigger).toEqual('change')

      control = new Control({ trigger: 'blur' })

      expect(control.trigger).toEqual('blur')
    })

    test('validators work', async () => {
      const _asyncValidator = (_: unknown) => Promise.resolve({ async: { message: 'async' } } as ValidateErrors)

      control = new Control(Validators.required, _asyncValidator)
      expect(await control.validate()).toEqual({ required: { message: zhCNMessages.required({}, control) } })

      control.setValue('test')
      control.validate()

      expect(control.status.value).toEqual('validating')
      expect(control.validating.value).toEqual(true)

      await flushPromises()

      expect(control.hasError('async')).toEqual(true)
    })
  })
})
