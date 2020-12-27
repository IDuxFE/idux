import { isNumber, isBoolean, isString, isUndefined, isNull, isSymbol, isObject, isFunction, isArray } from '../typeof'

describe('tyoeof.ts', () => {
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
