import { isPromise, isNumeric, hasOwnProperty, isHTMLElement } from '../src/typeof'

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
