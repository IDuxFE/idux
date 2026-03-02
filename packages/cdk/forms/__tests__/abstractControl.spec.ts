import { flushPromises } from '@vue/test-utils'

import { AbstractControl } from '../src/models/abstractControl'
import { AsyncValidatorFn, ValidateErrors, ValidatorFn, ValidatorOptions } from '../src/types'
import { Validators } from '../src/validators'

class Control<T = unknown> extends AbstractControl<T> {
  constructor(
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(undefined, validatorOrOptions, asyncValidator)
  }

  setValue(value: T): void {
    this._valueRef.value = value
  }
  getValue(): T {
    return this._valueRef.value
  }

  protected _watchOtherStatuses(): void {}
  protected _forEachControls(): void {}
  protected _find(_: string | number): AbstractControl<T> | undefined {
    return undefined
  }
  protected _calculateInitValue(): T {
    return undefined as unknown as T
  }
}

describe('abstractControl.ts', () => {
  const { getError } = Validators

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

    test('validators changes work', async () => {
      const { required, email, minLength, maxLength } = Validators
      const minLength5 = minLength(5)
      const maxLength10 = maxLength(10)

      // setValidators start
      control.setValidators(required)

      expect(await control.validate()).toEqual({ required: getError('required', control) })

      control.setValidators([email])
      control.setValue('test')

      expect(await control.validate()).toEqual({ email: getError('email', control, { actual: 'test' }) })
      // setValidators end

      // addValidators start
      control.addValidators(minLength5)

      expect(await control.validate()).toEqual({
        email: getError('email', control, { actual: 'test' }),
        minLength: getError('minLength', control, { actual: 4, isArray: false, minLength: 5 }),
      })

      control.addValidators([maxLength10])
      control.setValue('test@idux.com')

      expect(await control.validate()).toEqual({
        maxLength: getError('maxLength', control, { actual: 13, isArray: false, maxLength: 10 }),
      })
      // addValidators end

      // removeValidators start
      control.removeValidators([maxLength10])

      expect(await control.validate()).toEqual(undefined)

      control.removeValidators(minLength5)
      control.setValue('test')

      expect(await control.validate()).toEqual({ email: getError('email', control, { actual: 'test' }) })
      // removeValidators end

      // hasValidator start
      expect(control.hasValidator(email)).toEqual(true)
      // hasValidator end

      // clearValidators start
      control.clearValidators()
      expect(await control.validate()).toEqual(undefined)
      // clearValidators end
    })

    test('asyncValidators changes work', async () => {
      const getAsyncValidator = (key: string, error: unknown): AsyncValidatorFn => {
        return (_: unknown) => {
          return Promise.resolve({ [key]: error } as ValidateErrors)
        }
      }
      const message1 = { message: 1 }
      const message2 = { message: 2 }
      const message3 = { message: 3 }
      const message4 = { message: 4 }

      const asyncValidator1 = getAsyncValidator('message1', message1)
      const asyncValidator2 = getAsyncValidator('message2', message2)
      const asyncValidator3 = getAsyncValidator('message3', message3)
      const asyncValidator4 = getAsyncValidator('message4', message4)

      // setAsyncValidators start
      control.setAsyncValidators(asyncValidator1)

      expect(await control.validate()).toEqual({ message1: message1 })

      control.setAsyncValidators([asyncValidator2])

      expect(await control.validate()).toEqual({ message2: message2 })

      // setAsyncValidators end

      // addAsyncValidators start
      control.addAsyncValidators(asyncValidator3)

      expect(await control.validate()).toEqual({ message2: message2, message3: message3 })

      control.addAsyncValidators([asyncValidator4])

      expect(await control.validate()).toEqual({
        message2: message2,
        message3: message3,
        message4: message4,
      })
      // addAsyncValidators end

      // removeAsyncValidators start
      control.removeAsyncValidators([asyncValidator4])

      expect(await control.validate()).toEqual({ message2: message2, message3: message3 })

      control.removeAsyncValidators(asyncValidator3)

      expect(await control.validate()).toEqual({
        message2: message2,
      })
      // removeAsyncValidators end

      // hasAsyncValidator start
      expect(control.hasAsyncValidator(asyncValidator2)).toEqual(true)
      // hasAsyncValidator end

      // clearAsyncValidators start
      control.clearAsyncValidators()
      expect(await control.validate()).toEqual(undefined)
      // clearAsyncValidators end
    })

    test('setErrors, getError, hasError and clearErrors work', () => {
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

      control.clearErrors()

      expect(control.hasError('required')).toEqual(false)
      expect(control.errors.value).toEqual(undefined)
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

      control.setValue('')
      await flushPromises()

      expect(log).toBeCalledWith('')
      expect(log).toBeCalledTimes(1)

      control.setValue('test')
      await flushPromises()

      expect(log).toBeCalledWith('test')
      expect(log).toBeCalledTimes(2)

      stop()

      control.setValue('')
      await flushPromises()

      expect(log).toBeCalledTimes(2)

      control.watchValue(value => log(value), { immediate: true })
      await flushPromises()

      expect(log).toBeCalledWith('')
      expect(log).toBeCalledTimes(3)
    })

    test('watchStatus work', async () => {
      const log = vi.fn()
      const stop = control.watchStatus(value => log(value))

      control.setValidators(Validators.required)
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

      expect(await control.validate()).toEqual({ required: getError('required', control) })

      expect(control.trigger).toEqual('change')

      control = new Control({ trigger: 'blur' })

      expect(control.trigger).toEqual('blur')
    })

    test('validators work', async () => {
      const _asyncValidator = (_: unknown) => Promise.resolve({ async: { message: 'async' } } as ValidateErrors)

      control = new Control(Validators.required, _asyncValidator)
      expect(await control.validate()).toEqual({ required: getError('required', control) })

      control.setValue('test')
      control.validate()

      expect(control.status.value).toEqual('validating')
      expect(control.validating.value).toEqual(true)

      await flushPromises()

      expect(control.hasError('async')).toEqual(true)
    })

    test('disabled work', async () => {
      control = new Control({ validators: Validators.required, disabled: true })

      expect(await control.validate()).toEqual(undefined)

      control.enable()

      expect(await control.validate()).toEqual({ required: getError('required', control) })

      control = new Control({
        validators: [Validators.required, Validators.maxLength(5)],
        disabled: (control, initializing) => (initializing ? false : control.valueRef.value === 'disabled'),
      })

      expect(await control.validate()).toEqual({ required: getError('required', control) })

      control.setValue('enabled')
      await flushPromises()

      expect(control.disabled.value).toEqual(false)
      expect(control.valid.value).toEqual(false)
      expect(await control.validate()).toEqual({
        maxLength: getError('maxLength', control, { actual: 7, isArray: false, maxLength: 5 }),
      })

      control.setValue('disabled')
      await flushPromises()

      expect(control.disabled.value).toEqual(true)
      expect(control.valid.value).toEqual(true)
      expect(await control.validate()).toEqual(undefined)
    })

    test('interactions trigger work', async () => {
      control = new Control({ trigger: 'interactions', validators: Validators.required })

      // 初始化时，如果值为空，会有错误
      expect(control.hasError('required')).toEqual(true)

      control.setValue('test')
      await flushPromises()

      // 值改变了，但还没有 dirty 和 blurred，所以验证不会触发，错误仍然存在
      expect(control.hasError('required')).toEqual(true)

      control.markAsBlurred()
      await flushPromises()

      // 只有 blurred，没有 dirty，验证不会触发
      expect(control.hasError('required')).toEqual(true)

      control.markAsDirty()
      await flushPromises()

      // 现在 dirty 和 blurred 都有了，验证应该触发，'test' 不为空，所以应该没有错误
      expect(control.hasError('required')).toEqual(false)

      control.setValue('')
      await flushPromises()

      // 值变回空了，此时 dirty 和 blurred 都是 true，验证应该触发，有错误
      expect(control.hasError('required')).toEqual(true)

      control.reset()
      control.setValue('test')
      control.markAsBlurred()
      await flushPromises()

      // 只有 blurred，没有 dirty，验证不会触发
      expect(control.hasError('required')).toEqual(true)

      control.markAsDirty()
      await flushPromises()

      // 现在 dirty 和 blurred 都有了，验证应该触发，'test' 不为空，所以应该没有错误
      expect(control.hasError('required')).toEqual(false)

      control.setValue('')
      await flushPromises()

      // 值变回空了，此时 dirty 和 blurred 都是 true，验证应该触发，有错误
      expect(control.hasError('required')).toEqual(true)

      control.reset()
      control.setValue('test')
      control.markAsDirty()
      await flushPromises()

      // 只有 dirty ，没有 blurred，验证不会触发
      expect(control.hasError('required')).toEqual(true)

      control.markAsBlurred()
      await flushPromises()

      // 现在 dirty 和 blurred 都有了，验证应该触发，'test' 不为空，所以应该没有错误
      expect(control.hasError('required')).toEqual(false)

      control.reset()
      await flushPromises()

      // 重置后，初始值为空，会有错误
      expect(control.hasError('required')).toEqual(true)
    })
  })
})
