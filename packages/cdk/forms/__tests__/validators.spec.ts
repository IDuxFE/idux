import { AbstractControl } from '../src/controls/abstractControl'
import { AsyncValidatorFn, ErrorMessages, ValidationErrors, ValidatorFn } from '../src/types'
import { Validators } from '../src/validators'

describe('validators.ts', () => {
  const control = null as unknown as AbstractControl

  test('required work', () => {
    const required = Validators.required

    expect(required(0, control)).toBeNull()
    expect(required('value', control)).toBeNull()
    expect(required([1, 2], control)).toBeNull()

    const errorMessage = { required: { message: '' } }
    expect(required(null, control)).toEqual(errorMessage)
    expect(required(undefined, control)).toEqual(errorMessage)
    expect(required('', control)).toEqual(errorMessage)
    expect(required([], control)).toEqual(errorMessage)
  })

  test('requiredTrue work', () => {
    const requiredTrue = Validators.requiredTrue

    expect(requiredTrue(true, control)).toBeNull()

    const errorMessage = (actual: unknown) => ({ requiredTrue: { message: '', actual } })
    expect(requiredTrue(null, control)).toEqual(errorMessage(null))
    expect(requiredTrue(undefined, control)).toEqual(errorMessage(undefined))
    expect(requiredTrue('', control)).toEqual(errorMessage(''))
    expect(requiredTrue([], control)).toEqual(errorMessage([]))
    expect(requiredTrue({}, control)).toEqual(errorMessage({}))
    expect(requiredTrue(false, control)).toEqual(errorMessage(false))
  })

  test('email work', () => {
    const email = Validators.email

    expect(email('', control)).toBeNull()
    expect(email(null, control)).toBeNull()
    expect(email('test@gmail.com', control)).toBeNull()

    const errorMessage = (actual: unknown) => ({ email: { message: '', actual } })
    expect(email({}, control)).toEqual(errorMessage({}))
    expect(email('test', control)).toEqual(errorMessage('test'))
  })

  test('min work', () => {
    const minOne = Validators.min(1)

    expect(minOne('', control)).toBeNull()
    expect(minOne(null, control)).toBeNull()
    expect(minOne('test', control)).toBeNull()
    expect(minOne('1', control)).toBeNull()
    expect(minOne(1, control)).toBeNull()
    expect(minOne(2, control)).toBeNull()

    const errorMessage = (actual: unknown) => ({ min: { message: '', min: 1, actual } })
    expect(minOne(0, control)).toEqual(errorMessage(0))
    expect(minOne('0', control)).toEqual(errorMessage('0'))
  })

  test('max work', () => {
    const maxOne = Validators.max(1)

    expect(maxOne('', control)).toBeNull()
    expect(maxOne(null, control)).toBeNull()
    expect(maxOne('test', control)).toBeNull()
    expect(maxOne('1', control)).toBeNull()
    expect(maxOne(1, control)).toBeNull()
    expect(maxOne(0, control)).toBeNull()

    const errorMessage = (actual: unknown) => ({ max: { message: '', max: 1, actual } })
    expect(maxOne(2, control)).toEqual(errorMessage(2))
    expect(maxOne('2', control)).toEqual(errorMessage('2'))
  })

  test('minLength work', () => {
    const minLengthTwo = Validators.minLength(2)

    expect(minLengthTwo('', control)).toBeNull()
    expect(minLengthTwo(null, control)).toBeNull()
    expect(minLengthTwo(1, control)).toBeNull()
    expect(minLengthTwo('te', control)).toBeNull()
    expect(minLengthTwo('test', control)).toBeNull()
    expect(minLengthTwo([], control)).toBeNull()
    expect(minLengthTwo([1, 2], control)).toBeNull()
    expect(minLengthTwo([1, 2, 3], control)).toBeNull()

    const errorMessage = (actual: unknown) => ({ minLength: { message: '', minLength: 2, actual } })
    expect(minLengthTwo('t', control)).toEqual(errorMessage(1))
    expect(minLengthTwo([1], control)).toEqual(errorMessage(1))
  })

  test('maxLength work', () => {
    const maxLengthTwo = Validators.maxLength(2)

    expect(maxLengthTwo('', control)).toBeNull()
    expect(maxLengthTwo(1, control)).toBeNull()
    expect(maxLengthTwo(null, control)).toBeNull()
    expect(maxLengthTwo('te', control)).toBeNull()
    expect(maxLengthTwo('t', control)).toBeNull()
    expect(maxLengthTwo([], control)).toBeNull()
    expect(maxLengthTwo([1, 2], control)).toBeNull()
    expect(maxLengthTwo([1], control)).toBeNull()

    const errorMessage = (actual: unknown) => ({ maxLength: { message: '', maxLength: 2, actual } })
    expect(maxLengthTwo('test', control)).toEqual(errorMessage(4))
    expect(maxLengthTwo([1, 2, 3], control)).toEqual(errorMessage(3))
  })

  test('pattern work', () => {
    expect(Validators.pattern(null!)('test', control)).toBeNull()

    let stringPattern = Validators.pattern('[a-zA-Z]+')

    expect(stringPattern('', control)).toBeNull()
    expect(stringPattern(null, control)).toBeNull()
    expect(stringPattern('test', control)).toBeNull()

    let errorMessage = (actual: unknown) => ({ pattern: { message: '', pattern: '^[a-zA-Z]+$', actual } })
    expect(stringPattern('test1', control)).toEqual(errorMessage('test1'))
    expect(stringPattern(1, control)).toEqual(errorMessage(1))

    stringPattern = Validators.pattern('^[a-zA-Z]+$')
    expect(stringPattern('test1', control)).toEqual(errorMessage('test1'))
    expect(stringPattern(1, control)).toEqual(errorMessage(1))

    const regExpPattern = Validators.pattern(new RegExp('[a-zA-Z]+'))

    expect(regExpPattern('', control)).toBeNull()
    expect(regExpPattern(null, control)).toBeNull()
    expect(regExpPattern('test', control)).toBeNull()
    expect(regExpPattern('test1', control)).toBeNull()

    errorMessage = (actual: unknown) => ({ pattern: { message: '', pattern: '/[a-zA-Z]+/', actual } })
    expect(regExpPattern(1, control)).toEqual(errorMessage(1))

    const regExpPattern2 = Validators.pattern(new RegExp('^[a-zA-Z]+$'))

    expect(regExpPattern2('test', control)).toBeNull()

    errorMessage = (actual: unknown) => ({ pattern: { message: '', pattern: '/^[a-zA-Z]+$/', actual } })
    expect(regExpPattern2('test1', control)).toEqual(errorMessage('test1'))
    expect(regExpPattern2(1, control)).toEqual(errorMessage(1))
  })

  test('compose work', () => {
    const _validator = (key: string, error: unknown): ValidatorFn => {
      return (_: unknown) => {
        return { [key]: error } as ValidationErrors
      }
    }
    const message1 = { message: 1 }
    const message2 = { message: 2 }
    const { compose, nullValidator, required } = Validators

    expect(compose(null)).toBeNull()
    expect(compose([])).toBe(null)
    expect(compose([nullValidator, nullValidator])!('test', control)).toBeNull()

    expect(compose([_validator('a', message1), _validator('b', message2)])!('test', control)).toEqual({
      a: message1,
      b: message2,
    })
    expect(compose([_validator('a', message1), _validator('a', message2)])!('test', control)).toEqual({ a: message2 })
    expect(compose([null, nullValidator, required])!('', control)).toEqual({ required: { message: '' } })
  })

  test('composeAsync work', async () => {
    const _asyncValidator = (key: string, error: unknown): AsyncValidatorFn => {
      return (_: unknown) => {
        return Promise.resolve({ [key]: error } as ValidationErrors)
      }
    }
    const message1 = { message: 1 }
    const message2 = { message: 2 }
    const composeAsync = Validators.composeAsync

    expect(composeAsync(null)).toBe(null)
    expect(composeAsync([])).toBe(null)

    let errors = await composeAsync([_asyncValidator('a', message1), _asyncValidator('b', message2)])!('test', control)

    expect(errors).toEqual({ a: message1, b: message2 })

    errors = await composeAsync([_asyncValidator('a', message1), _asyncValidator('a', message2)])!('test', control)
    expect(errors).toEqual({ a: message2 })

    errors = await composeAsync([null, _asyncValidator('a', message1)])!('test', control)
    expect(errors).toEqual({ a: message1 })
  })

  test('setMessages work', () => {
    const { setMessages, required, requiredTrue } = Validators

    const messages: ErrorMessages = { default: 'invalid input', required: 'please input' }
    setMessages(messages)

    expect(required('', control)).toEqual({ required: { message: messages.required } })
    expect(requiredTrue(false, control)).toEqual({ requiredTrue: { message: messages.default, actual: false } })

    setMessages({ requiredTrue: () => 'please input true' })

    expect(requiredTrue(false, control)).toEqual({ requiredTrue: { message: 'please input true', actual: false } })
  })
})
