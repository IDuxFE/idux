import {
  isNumber,
  isBoolean,
  isString,
  isUndefined,
  isNull,
  isSymbol,
  isObject,
  isFunction,
  isArray,
  isNil,
  isNonNil,
} from '../typeof'

describe('tyoeof.ts', () => {
  test('isNumber work', async () => {
    expect(isNumber(1)).toEqual(true)
    expect(isNumber('1')).toEqual(true)
    expect(isNumber('1.1')).toEqual(true)

    expect(isNumber('1-1')).toEqual(false)
    expect(isNumber('')).toEqual(false)
    expect(isNumber(NaN)).toEqual(false)
  })

  test('isNil work', async () => {
    expect(isNil(undefined)).toEqual(true)
    expect(isNil(null)).toEqual(true)

    expect(isNil(1)).toEqual(false)
    expect(isNil(0)).toEqual(false)
    expect(isNil('1')).toEqual(false)
    expect(isNil('')).toEqual(false)
    expect(isNil({})).toEqual(false)
  })

  test('isNonNil work', async () => {
    expect(isNonNil(undefined)).toEqual(false)
    expect(isNonNil(null)).toEqual(false)

    expect(isNonNil(1)).toEqual(true)
    expect(isNonNil(0)).toEqual(true)
    expect(isNonNil('1')).toEqual(true)
    expect(isNonNil('')).toEqual(true)
    expect(isNonNil({})).toEqual(true)
  })

  test('test isNumber function', () => {
    expect(isNumber(1)).toEqual(true)
  })

  test('test isBoolean function', () => {
    expect(isBoolean(true)).toEqual(true)
  })

  test('test isString function', () => {
    expect(isString('clfeng')).toEqual(true)
  })

  test('test isUndefined function', () => {
    expect(isUndefined(undefined)).toEqual(true)
  })

  test('test isNull function', () => {
    expect(isNull(null)).toEqual(true)
  })

  test('test isSymbol function', () => {
    expect(isSymbol(Symbol('1'))).toEqual(true)
  })

  test('test isObject function', () => {
    expect(isObject({})).toEqual(true)
    expect(isObject(function () {})).toEqual(false)
  })

  test('test isFunction function', () => {
    expect(isFunction(function () {})).toEqual(true)
  })

  test('test isArray function', () => {
    expect(isArray([])).toEqual(true)
  })
})
