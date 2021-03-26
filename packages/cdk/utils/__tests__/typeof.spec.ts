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
  hasOwnProperty,
  isHTMLElement,
} from '../src/typeof'

describe('typeof.ts', () => {
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

  test('isNumber function', () => {
    expect(isNumber(1)).toEqual(true)
    expect(isNumber('1')).toEqual(false)
    expect(isNumber(false)).toEqual(false)
  })

  test('isBoolean function', () => {
    expect(isBoolean(true)).toEqual(true)
    expect(isBoolean(1)).toEqual(false)
    expect(isBoolean('true')).toEqual(false)
  })

  test('isString function', () => {
    expect(isString('clf')).toEqual(true)
    expect(isString(1)).toEqual(false)
    expect(isString(false)).toEqual(false)
  })

  test('isUndefined function', () => {
    expect(isUndefined(undefined)).toEqual(true)
    expect(isUndefined('undefined')).toEqual(false)
    expect(isUndefined(1)).toEqual(false)
  })

  test('isNull function', () => {
    expect(isNull(null)).toEqual(true)
    expect(isNull('null')).toEqual(false)
    expect(isNull(1)).toEqual(false)
  })

  test('isSymbol function', () => {
    expect(isSymbol(Symbol('1'))).toEqual(true)
    expect(isSymbol(1)).toEqual(false)
    expect(isSymbol(false)).toEqual(false)
  })

  test('isPlainObject function', () => {
    expect(isPlainObject({})).toEqual(true)
    expect(isPlainObject(function () {})).toEqual(false)
    expect(isPlainObject(null)).toEqual(false)
    expect(isPlainObject(1)).toEqual(false)
  })

  test('isObject function', () => {
    expect(isObject({})).toEqual(true)
    expect(isObject(new Date())).toEqual(true)
    expect(isObject(new Set())).toEqual(true)
    expect(isObject(new Map())).toEqual(true)
    expect(isObject(null)).toEqual(false)
    expect(isObject(1)).toEqual(false)
  })

  test('isFunction function', () => {
    expect(isFunction(function () {})).toEqual(true)
    expect(isFunction(() => {})).toEqual(true)
    expect(isFunction(11)).toEqual(false)
  })

  test('isArray function', () => {
    expect(isArray([])).toEqual(true)
    expect(isArray({})).toEqual(false)
    expect(isArray(new Map())).toEqual(false)
  })

  test('isMap function', () => {
    expect(isMap(new Map())).toEqual(true)
    expect(isMap({})).toEqual(false)
    expect(isMap([])).toEqual(false)
  })

  test('isSet function', () => {
    expect(isSet(new Set())).toEqual(true)
    expect(isSet({})).toEqual(false)
    expect(isSet([])).toEqual(false)
  })

  test('isDate function', () => {
    expect(isDate(new Date())).toEqual(true)
    expect(isDate({})).toEqual(false)
    expect(isDate('2020-01-01')).toEqual(false)
  })

  test('isPromise function', () => {
    const promise = new Promise(resolve => {
      resolve(1)
    })
    expect(isPromise(promise)).toEqual(true)
    expect(isPromise({})).toEqual(false)
    expect(isPromise(function () {})).toEqual(false)
  })

  test('hasOwnProperty work', () => {
    const object1 = { prop: 1 }
    expect(hasOwnProperty(object1, 'prop')).toEqual(true)
    expect(hasOwnProperty(object1, 'toString')).toEqual(false)
    expect(hasOwnProperty(object1, 'hasOwnProperty')).toEqual(false)

    const object2 = new Object() as { prop: unknown; test?: unknown }
    object2.prop = null
    expect(hasOwnProperty(object2, 'prop')).toEqual(true)
    object2.prop = undefined
    expect(hasOwnProperty(object2, 'prop')).toEqual(true)

    expect(hasOwnProperty(object2, 'test')).toEqual(false)
    object2.test = undefined
    expect(hasOwnProperty(object2, 'test')).toEqual(true)
  })

  test('isHTMLElement work', () => {
    const div = document.createElement('div')
    expect(isHTMLElement(div)).toBeTruthy()
    expect(isHTMLElement(false)).toBeFalsy()
    expect(isHTMLElement(10)).toBeFalsy()
    expect(isHTMLElement('hello')).toBeFalsy()
    expect(isHTMLElement({ key: 'Hello' })).toBeFalsy()
  })
})
