import { FormControl } from '../src/controls'
import { enUSMessages } from '../src/messages/en-US'
import { zhCNMessages } from '../src/messages/zh-CN'
import { AsyncValidatorFn, ValidateErrors, ValidateMessages, ValidatorFn } from '../src/types'
import { Validators } from '../src/validators'

describe('validators.ts', () => {
  const control = new FormControl()

  test('required work', () => {
    const required = Validators.required

    expect(required(0, control)).toBeUndefined()
    expect(required('value', control)).toBeUndefined()
    expect(required([1, 2], control)).toBeUndefined()

    const errorMessage = {
      required: { message: zhCNMessages.required({}, control) },
    }
    expect(required(undefined, control)).toEqual(errorMessage)
    expect(required(undefined, control)).toEqual(errorMessage)
    expect(required('', control)).toEqual(errorMessage)
    expect(required([], control)).toEqual(errorMessage)
  })

  test('requiredTrue work', () => {
    const requiredTrue = Validators.requiredTrue

    expect(requiredTrue(true, control)).toBeUndefined()

    const errorMessage = (actual: unknown) => ({
      requiredTrue: { actual, message: zhCNMessages.requiredTrue({ actual }, control) },
    })
    expect(requiredTrue(undefined, control)).toEqual(errorMessage(undefined))
    expect(requiredTrue(undefined, control)).toEqual(errorMessage(undefined))
    expect(requiredTrue('', control)).toEqual(errorMessage(''))
    expect(requiredTrue([], control)).toEqual(errorMessage([]))
    expect(requiredTrue({}, control)).toEqual(errorMessage({}))
    expect(requiredTrue(false, control)).toEqual(errorMessage(false))
  })

  test('email work', () => {
    const email = Validators.email

    expect(email('', control)).toBeUndefined()
    expect(email(undefined, control)).toBeUndefined()
    expect(email('test@gmail.com', control)).toBeUndefined()

    const errorMessage = (actual: unknown) => ({
      email: { actual, message: zhCNMessages.email({ actual }, control) },
    })
    expect(email({}, control)).toEqual(errorMessage({}))
    expect(email('test', control)).toEqual(errorMessage('test'))
  })

  test('min work', () => {
    const minOne = Validators.min(1)

    expect(minOne('', control)).toBeUndefined()
    expect(minOne(undefined, control)).toBeUndefined()
    expect(minOne('test', control)).toBeUndefined()
    expect(minOne('1', control)).toBeUndefined()
    expect(minOne(1, control)).toBeUndefined()
    expect(minOne(2, control)).toBeUndefined()

    const errorMessage = (actual: unknown) => ({
      min: { actual, min: 1, message: zhCNMessages.min({ actual, min: 1 }, control) },
    })
    expect(minOne(0, control)).toEqual(errorMessage(0))
    expect(minOne('0', control)).toEqual(errorMessage('0'))
  })

  test('max work', () => {
    const maxOne = Validators.max(1)

    expect(maxOne('', control)).toBeUndefined()
    expect(maxOne(undefined, control)).toBeUndefined()
    expect(maxOne('test', control)).toBeUndefined()
    expect(maxOne('1', control)).toBeUndefined()
    expect(maxOne(1, control)).toBeUndefined()
    expect(maxOne(0, control)).toBeUndefined()

    const errorMessage = (actual: unknown) => ({
      max: { actual, max: 1, message: zhCNMessages.max({ actual, max: 1 }, control) },
    })
    expect(maxOne(2, control)).toEqual(errorMessage(2))
    expect(maxOne('2', control)).toEqual(errorMessage('2'))
  })

  test('range work', () => {
    const range3To9 = Validators.range(3, 9)

    expect(range3To9('', control)).toBeUndefined()
    expect(range3To9(undefined, control)).toBeUndefined()
    expect(range3To9('test', control)).toBeUndefined()
    expect(range3To9('3', control)).toBeUndefined()
    expect(range3To9(3, control)).toBeUndefined()
    expect(range3To9(9, control)).toBeUndefined()

    const errorMessage = (actual: unknown) => ({
      range: { actual, min: 3, max: 9, message: zhCNMessages.range({ actual, min: 3, max: 9 }, control) },
    })
    expect(range3To9(2, control)).toEqual(errorMessage(2))
    expect(range3To9('2', control)).toEqual(errorMessage('2'))
    expect(range3To9(10, control)).toEqual(errorMessage(10))
    expect(range3To9('10', control)).toEqual(errorMessage('10'))
  })

  test('minLength work', () => {
    const minLengthTwo = Validators.minLength(2)

    expect(minLengthTwo('', control)).toBeUndefined()
    expect(minLengthTwo(undefined, control)).toBeUndefined()
    expect(minLengthTwo(1, control)).toBeUndefined()
    expect(minLengthTwo('te', control)).toBeUndefined()
    expect(minLengthTwo('test', control)).toBeUndefined()
    expect(minLengthTwo([], control)).toBeUndefined()
    expect(minLengthTwo([1, 2], control)).toBeUndefined()
    expect(minLengthTwo([1, 2, 3], control)).toBeUndefined()

    const errorMessage = (actual: unknown, isArray: boolean) => ({
      minLength: {
        actual,
        isArray,
        minLength: 2,
        message: zhCNMessages.minLength({ actual, isArray, minLength: 2 }, control),
      },
    })
    expect(minLengthTwo('t', control)).toEqual(errorMessage(1, false))
    expect(minLengthTwo([1], control)).toEqual(errorMessage(1, true))
  })

  test('maxLength work', () => {
    const maxLengthTwo = Validators.maxLength(2)

    expect(maxLengthTwo('', control)).toBeUndefined()
    expect(maxLengthTwo(1, control)).toBeUndefined()
    expect(maxLengthTwo(undefined, control)).toBeUndefined()
    expect(maxLengthTwo('te', control)).toBeUndefined()
    expect(maxLengthTwo('t', control)).toBeUndefined()
    expect(maxLengthTwo([], control)).toBeUndefined()
    expect(maxLengthTwo([1, 2], control)).toBeUndefined()
    expect(maxLengthTwo([1], control)).toBeUndefined()

    const errorMessage = (actual: unknown, isArray: boolean) => ({
      maxLength: {
        actual,
        isArray,
        maxLength: 2,
        message: zhCNMessages.maxLength({ actual, isArray, maxLength: 2 }, control),
      },
    })
    expect(maxLengthTwo('test', control)).toEqual(errorMessage(4, false))
    expect(maxLengthTwo([1, 2, 3], control)).toEqual(errorMessage(3, true))
  })

  test('rangeLength work', () => {
    const rangeLength2To5 = Validators.rangeLength(2, 5)

    expect(rangeLength2To5('', control)).toBeUndefined()
    expect(rangeLength2To5(1, control)).toBeUndefined()
    expect(rangeLength2To5(undefined, control)).toBeUndefined()
    expect(rangeLength2To5('te', control)).toBeUndefined()
    expect(rangeLength2To5('test1', control)).toBeUndefined()
    expect(rangeLength2To5([], control)).toBeUndefined()
    expect(rangeLength2To5([1, 2], control)).toBeUndefined()
    expect(rangeLength2To5([1, 2, 3, 4, 5], control)).toBeUndefined()

    const errorMessage = (actual: unknown, isArray: boolean) => ({
      rangeLength: {
        actual,
        isArray,
        minLength: 2,
        maxLength: 5,
        message: zhCNMessages.rangeLength({ actual, isArray, minLength: 2, maxLength: 5 }, control),
      },
    })
    expect(rangeLength2To5('t', control)).toEqual(errorMessage(1, false))
    expect(rangeLength2To5([1, 2, 3, 4, 5, 6], control)).toEqual(errorMessage(6, true))
  })

  test('pattern work', () => {
    expect(Validators.pattern(undefined!)('test', control)).toBeUndefined()

    let stringPattern = Validators.pattern('[a-zA-Z]+')

    expect(stringPattern('', control)).toBeUndefined()
    expect(stringPattern(undefined, control)).toBeUndefined()
    expect(stringPattern('test', control)).toBeUndefined()

    let errorMessage = (actual: unknown) => ({
      pattern: {
        actual,
        pattern: '^[a-zA-Z]+$',
        message: zhCNMessages.pattern({ actual, pattern: '^[a-zA-Z]+$' }, control),
      },
    })
    expect(stringPattern('test1', control)).toEqual(errorMessage('test1'))
    expect(stringPattern(1, control)).toEqual(errorMessage(1))

    stringPattern = Validators.pattern('^[a-zA-Z]+$')
    expect(stringPattern('test1', control)).toEqual(errorMessage('test1'))
    expect(stringPattern(1, control)).toEqual(errorMessage(1))

    const regExpPattern = Validators.pattern(new RegExp('[a-zA-Z]+'))

    expect(regExpPattern('', control)).toBeUndefined()
    expect(regExpPattern(undefined, control)).toBeUndefined()
    expect(regExpPattern('test', control)).toBeUndefined()
    expect(regExpPattern('test1', control)).toBeUndefined()

    errorMessage = (actual: unknown) => ({
      pattern: {
        actual,
        pattern: '/[a-zA-Z]+/',
        message: zhCNMessages.pattern({ actual, pattern: '/[a-zA-Z]+/' }, control),
      },
    })
    expect(regExpPattern(1, control)).toEqual(errorMessage(1))

    const regExpPattern2 = Validators.pattern(new RegExp('^[a-zA-Z]+$'))

    expect(regExpPattern2('test', control)).toBeUndefined()

    errorMessage = (actual: unknown) => ({
      pattern: {
        actual,
        pattern: '/^[a-zA-Z]+$/',
        message: zhCNMessages.pattern({ actual, pattern: '/^[a-zA-Z]+$/' }, control),
      },
    })
    expect(regExpPattern2('test1', control)).toEqual(errorMessage('test1'))
    expect(regExpPattern2(1, control)).toEqual(errorMessage(1))
  })

  test('compose work', () => {
    const _validator = (key: string, error: unknown): ValidatorFn => {
      return (_: unknown) => {
        return { [key]: error } as ValidateErrors
      }
    }
    const message1 = { message: 1 }
    const message2 = { message: 2 }
    const { compose, nullValidator, required } = Validators

    expect(compose(undefined)).toBeUndefined()
    expect(compose([])).toBeUndefined()
    expect(compose([nullValidator, nullValidator])!('test', control)).toBeUndefined()

    expect(compose([_validator('a', message1), _validator('b', message2)])!('test', control)).toEqual({
      a: message1,
      b: message2,
    })
    expect(compose([_validator('a', message1), _validator('a', message2)])!('test', control)).toEqual({ a: message2 })
    expect(compose([undefined, nullValidator, required])!('', control)).toEqual({
      required: { message: zhCNMessages.required({}, control) },
    })
  })

  test('composeAsync work', async () => {
    const _asyncValidator = (key: string, error: unknown): AsyncValidatorFn => {
      return (_: unknown) => {
        return Promise.resolve({ [key]: error } as ValidateErrors)
      }
    }
    const message1 = { message: 1 }
    const message2 = { message: 2 }
    const composeAsync = Validators.composeAsync

    expect(composeAsync(undefined)).toBeUndefined()
    expect(composeAsync([])).toBeUndefined()

    let errors = await composeAsync([_asyncValidator('a', message1), _asyncValidator('b', message2)])!('test', control)

    expect(errors).toEqual({ a: message1, b: message2 })

    errors = await composeAsync([_asyncValidator('a', message1), _asyncValidator('a', message2)])!('test', control)
    expect(errors).toEqual({ a: message2 })

    errors = await composeAsync([undefined, _asyncValidator('a', message1)])!('test', control)
    expect(errors).toEqual({ a: message1 })
  })

  test('setMessages enUSMessages work', () => {
    const { setMessages, required, requiredTrue } = Validators

    setMessages(enUSMessages)

    expect(required('', control)).toEqual({ required: { message: enUSMessages.required({}, control) } })
    expect(requiredTrue(false, control)).toEqual({
      requiredTrue: { message: enUSMessages.requiredTrue({ actual: false }, control), actual: false },
    })
  })

  test('setMessages custom messages work', () => {
    const { setMessages, required, requiredTrue } = Validators

    const messages: ValidateMessages = { required: 'please input', requiredTrue: 'invalid input' }
    setMessages(messages)

    expect(required('', control)).toEqual({ required: { message: messages.required } })
    expect(requiredTrue(false, control)).toEqual({ requiredTrue: { message: messages.requiredTrue, actual: false } })

    setMessages({ requiredTrue: () => 'please input true' })

    expect(requiredTrue(false, control)).toEqual({ requiredTrue: { message: 'please input true', actual: false } })
  })
})
