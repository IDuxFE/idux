import {
  isNumber,
  isBoolean,
  isString,
  isUndefined,
  isNull,
  isSymbol,
  isPlainObject,
  isObject,
  isFunction,
  isArray,
  isMap,
  isSet,
  isDate,
  isPromise,
  isNil,
  isNonNil,
  isNumeric,
} from '../typeof'

describe('tyoeof.ts', () => {
  test('test isNumber function', () => {
    expect(isNumber(1)).toEqual(true)
    expect(isNumber('1')).toEqual(false)
    expect(isNumber(false)).toEqual(false)
  })

  test('test isBoolean function', () => {
    expect(isBoolean(true)).toEqual(true)
    expect(isBoolean(1)).toEqual(false)
    expect(isBoolean('true')).toEqual(false)
  })

  test('test isString function', () => {
    expect(isString('clf')).toEqual(true)
    expect(isString(1)).toEqual(false)
    expect(isString(false)).toEqual(false)
  })

  test('test isUndefined function', () => {
    expect(isUndefined(undefined)).toEqual(true)
    expect(isUndefined('undefined')).toEqual(false)
    expect(isUndefined(1)).toEqual(false)
  })

  test('test isNull function', () => {
    expect(isNull(null)).toEqual(true)
    expect(isNull('null')).toEqual(false)
    expect(isNull(1)).toEqual(false)
  })

  test('test isSymbol function', () => {
    expect(isSymbol(Symbol('1'))).toEqual(true)
    expect(isSymbol(1)).toEqual(false)
    expect(isSymbol(false)).toEqual(false)
  })

  test('test isPlainObject function', () => {
    expect(isPlainObject({})).toEqual(true)
    expect(isPlainObject(function () {})).toEqual(false)
    expect(isPlainObject(null)).toEqual(false)
    expect(isPlainObject(1)).toEqual(false)
  })

  test('test isObject function', () => {
    expect(isObject({})).toEqual(true)
    expect(isObject(new Date())).toEqual(true)
    expect(isObject(new Set())).toEqual(true)
    expect(isObject(new Map())).toEqual(true)
    expect(isObject(null)).toEqual(false)
    expect(isObject(1)).toEqual(false)
  })

  test('test isFunction function', () => {
    expect(isFunction(function () {})).toEqual(true)
    expect(isFunction(() => {})).toEqual(true)
    expect(isFunction(11)).toEqual(false)
  })

  test('test isArray function', () => {
    expect(isArray([])).toEqual(true)
    expect(isArray({})).toEqual(false)
    expect(isArray(new Map())).toEqual(false)
  })

  test('test isMap function', () => {
    expect(isMap(new Map())).toEqual(true)
    expect(isMap({})).toEqual(false)
    expect(isMap([])).toEqual(false)
  })

  test('test isSet function', () => {
    expect(isSet(new Set())).toEqual(true)
    expect(isSet({})).toEqual(false)
    expect(isSet([])).toEqual(false)
  })

  test('test isDate function', () => {
    expect(isDate(new Date())).toEqual(true)
    expect(isDate({})).toEqual(false)
    expect(isDate('2020-01-01')).toEqual(false)
  })

  test('test isPromise function', () => {
    const promise = new Promise(resolve => {
      resolve(1)
    })
    expect(isPromise(promise)).toEqual(true)
    expect(isPromise({})).toEqual(false)
    expect(isPromise(function () {})).toEqual(false)
  })

  test('isNumeric work', async () => {
    expect(isNumeric(+10)).toEqual(true)
    expect(isNumeric('+10')).toEqual(true)
    expect(isNumeric(-10)).toEqual(true)
    expect(isNumeric('-10')).toEqual(true)
    expect(isNumeric('0')).toEqual(true)
    expect(isNumeric(0xff)).toEqual(true)
    expect(isNumeric('0xff')).toEqual(true)
    expect(isNumeric('8e5')).toEqual(true)
    expect(isNumeric('3.1415')).toEqual(true)

    expect(isNumeric('-0x42')).toEqual(false)
    expect(isNumeric('7.2acdgs')).toEqual(false)
    expect(isNumeric('')).toEqual(false)
    expect(isNumeric({})).toEqual(false)
    expect(isNumeric([])).toEqual(false)
    expect(isNumeric(NaN)).toEqual(false)
    expect(isNumeric(null)).toEqual(false)
    expect(isNumeric(undefined)).toEqual(false)
    expect(isNumeric(true)).toEqual(false)
    expect(isNumeric(Infinity)).toEqual(false)
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
})
