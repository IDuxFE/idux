/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AsyncValidatorFn, ErrorMessages, Errors, ValidatorFn } from '../src/types'
import { Validators } from '../src/validators'

describe('validators.ts', () => {
  test('required work', () => {
    const required = Validators.required

    expect(required(0)).toBeNull()
    expect(required('value')).toBeNull()
    expect(required([1, 2])).toBeNull()

    const errorMessage = { required: { message: '' } }
    expect(required(null)).toEqual(errorMessage)
    expect(required(undefined)).toEqual(errorMessage)
    expect(required('')).toEqual(errorMessage)
    expect(required([])).toEqual(errorMessage)
  })

  test('requiredTrue work', () => {
    const requiredTrue = Validators.requiredTrue

    expect(requiredTrue(true)).toBeNull()

    const errorMessage = (actual: unknown) => ({ requiredTrue: { message: '', actual } })
    expect(requiredTrue(null)).toEqual(errorMessage(null))
    expect(requiredTrue(undefined)).toEqual(errorMessage(undefined))
    expect(requiredTrue('')).toEqual(errorMessage(''))
    expect(requiredTrue([])).toEqual(errorMessage([]))
    expect(requiredTrue({})).toEqual(errorMessage({}))
    expect(requiredTrue(false)).toEqual(errorMessage(false))
  })

  test('email work', () => {
    const email = Validators.email

    expect(email('')).toBeNull()
    expect(email(null)).toBeNull()
    expect(email('test@gmail.com')).toBeNull()

    const errorMessage = (actual: unknown) => ({ email: { message: '', actual } })
    expect(email({})).toEqual(errorMessage({}))
    expect(email('test')).toEqual(errorMessage('test'))
  })

  test('min work', () => {
    const minOne = Validators.min(1)

    expect(minOne('')).toBeNull()
    expect(minOne(null)).toBeNull()
    expect(minOne('test')).toBeNull()
    expect(minOne('1')).toBeNull()
    expect(minOne(1)).toBeNull()
    expect(minOne(2)).toBeNull()

    const errorMessage = (actual: unknown) => ({ min: { message: '', min: 1, actual } })
    expect(minOne(0)).toEqual(errorMessage(0))
    expect(minOne('0')).toEqual(errorMessage('0'))
  })

  test('max work', () => {
    const maxOne = Validators.max(1)

    expect(maxOne('')).toBeNull()
    expect(maxOne(null)).toBeNull()
    expect(maxOne('test')).toBeNull()
    expect(maxOne('1')).toBeNull()
    expect(maxOne(1)).toBeNull()
    expect(maxOne(0)).toBeNull()

    const errorMessage = (actual: unknown) => ({ max: { message: '', max: 1, actual } })
    expect(maxOne(2)).toEqual(errorMessage(2))
    expect(maxOne('2')).toEqual(errorMessage('2'))
  })

  test('minLength work', () => {
    const minLengthTwo = Validators.minLength(2)

    expect(minLengthTwo('')).toBeNull()
    expect(minLengthTwo(null)).toBeNull()
    expect(minLengthTwo(1)).toBeNull()
    expect(minLengthTwo('te')).toBeNull()
    expect(minLengthTwo('test')).toBeNull()
    expect(minLengthTwo([])).toBeNull()
    expect(minLengthTwo([1, 2])).toBeNull()
    expect(minLengthTwo([1, 2, 3])).toBeNull()

    const errorMessage = (actual: unknown) => ({ minLength: { message: '', minLength: 2, actual } })
    expect(minLengthTwo('t')).toEqual(errorMessage(1))
    expect(minLengthTwo([1])).toEqual(errorMessage(1))
  })

  test('maxLength work', () => {
    const maxLengthTwo = Validators.maxLength(2)

    expect(maxLengthTwo('')).toBeNull()
    expect(maxLengthTwo(1)).toBeNull()
    expect(maxLengthTwo(null)).toBeNull()
    expect(maxLengthTwo('te')).toBeNull()
    expect(maxLengthTwo('t')).toBeNull()
    expect(maxLengthTwo([])).toBeNull()
    expect(maxLengthTwo([1, 2])).toBeNull()
    expect(maxLengthTwo([1])).toBeNull()

    const errorMessage = (actual: unknown) => ({ maxLength: { message: '', maxLength: 2, actual } })
    expect(maxLengthTwo('test')).toEqual(errorMessage(4))
    expect(maxLengthTwo([1, 2, 3])).toEqual(errorMessage(3))
  })

  test('pattern work', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(Validators.pattern(null!)('test')).toBeNull()

    let stringPattern = Validators.pattern('[a-zA-Z]+')

    expect(stringPattern('')).toBeNull()
    expect(stringPattern(null)).toBeNull()
    expect(stringPattern('test')).toBeNull()

    let errorMessage = (actual: unknown) => ({ pattern: { message: '', pattern: '^[a-zA-Z]+$', actual } })
    expect(stringPattern('test1')).toEqual(errorMessage('test1'))
    expect(stringPattern(1)).toEqual(errorMessage(1))

    stringPattern = Validators.pattern('^[a-zA-Z]+$')
    expect(stringPattern('test1')).toEqual(errorMessage('test1'))
    expect(stringPattern(1)).toEqual(errorMessage(1))

    const regExpPattern = Validators.pattern(new RegExp('[a-zA-Z]+'))

    expect(regExpPattern('')).toBeNull()
    expect(regExpPattern(null)).toBeNull()
    expect(regExpPattern('test')).toBeNull()
    expect(regExpPattern('test1')).toBeNull()

    errorMessage = (actual: unknown) => ({ pattern: { message: '', pattern: '/[a-zA-Z]+/', actual } })
    expect(regExpPattern(1)).toEqual(errorMessage(1))

    const regExpPattern2 = Validators.pattern(new RegExp('^[a-zA-Z]+$'))

    expect(regExpPattern2('test')).toBeNull()

    errorMessage = (actual: unknown) => ({ pattern: { message: '', pattern: '/^[a-zA-Z]+$/', actual } })
    expect(regExpPattern2('test1')).toEqual(errorMessage('test1'))
    expect(regExpPattern2(1)).toEqual(errorMessage(1))
  })

  test('compose work', () => {
    const _validator = (key: string, error: unknown): ValidatorFn => {
      return (_: unknown) => {
        return { [key]: error } as Errors
      }
    }
    const message1 = { message: 1 }
    const message2 = { message: 2 }
    const { compose, nullValidator, required } = Validators

    expect(compose(null)).toBeNull()
    expect(compose([])).toBe(null)
    expect(compose([nullValidator, nullValidator])!('test')).toBeNull()

    expect(compose([_validator('a', message1), _validator('b', message2)])!('test')).toEqual({
      a: message1,
      b: message2,
    })
    expect(compose([_validator('a', message1), _validator('a', message2)])!('test')).toEqual({ a: message2 })
    expect(compose([null, nullValidator, required])!('')).toEqual({ required: { message: '' } })
  })

  test('composeAsync work', async () => {
    const _asyncValidator = (key: string, error: unknown): AsyncValidatorFn => {
      return (_: unknown) => {
        return Promise.resolve({ [key]: error } as Errors)
      }
    }
    const message1 = { message: 1 }
    const message2 = { message: 2 }
    const composeAsync = Validators.composeAsync

    expect(composeAsync(null)).toBe(null)
    expect(composeAsync([])).toBe(null)

    let errors = await composeAsync([_asyncValidator('a', message1), _asyncValidator('b', message2)])!('test')

    expect(errors).toEqual({ a: message1, b: message2 })

    errors = await composeAsync([_asyncValidator('a', message1), _asyncValidator('a', message2)])!('test')
    expect(errors).toEqual({ a: message2 })

    errors = await composeAsync([null, _asyncValidator('a', message1)])!('test')
    expect(errors).toEqual({ a: message1 })
  })

  test('setMessages work', () => {
    const { setMessages, required, requiredTrue } = Validators

    const messages: ErrorMessages = { default: 'invalid input', required: 'please input' }
    setMessages(messages)

    expect(required('')).toEqual({ required: { message: messages.required } })
    expect(requiredTrue(false)).toEqual({ requiredTrue: { message: messages.default, actual: false } })

    setMessages({ requiredTrue: () => 'please input true' })

    expect(requiredTrue(false)).toEqual({ requiredTrue: { message: 'please input true', actual: false } })
  })
})
