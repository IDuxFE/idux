import { convertArray, convertNumber, convertBoolean, convertCssPixel } from '../src/convert'

describe('convert.ts', () => {
  test('convertArray work', async () => {
    expect(convertArray(null)).toEqual([])
    expect(convertArray(undefined)).toEqual([])

    const stringValue = 'string'
    expect(convertArray(stringValue)).toEqual([stringValue])

    const numberValue = 0
    expect(convertArray(numberValue)).toEqual([numberValue])

    const arrayValue = [1, '2', null]
    expect(convertArray(arrayValue)).toEqual(arrayValue)
  })

  test('convertNumber work', async () => {
    expect(convertNumber(100)).toEqual(100)
    expect(convertNumber(100, 1)).toEqual(100)

    expect(convertNumber('0')).toEqual(0)
    expect(convertNumber('0', 1)).toEqual(0)

    expect(convertNumber(undefined)).toEqual(0)
    expect(convertNumber(undefined, 1)).toEqual(1)

    expect(convertNumber(null)).toEqual(0)
    expect(convertNumber(null, 1)).toEqual(1)

    expect(convertNumber('')).toEqual(0)
    expect(convertNumber('', 1)).toEqual(1)

    expect(convertNumber('1.1')).toEqual(1.1)
    expect(convertNumber('1.1', 1)).toEqual(1.1)

    expect(convertNumber('1-1')).toEqual(0)
    expect(convertNumber('1-1', 1)).toEqual(1)
  })

  test('convertBoolean work', async () => {
    expect(convertBoolean(undefined)).toEqual(false)
    expect(convertBoolean(null)).toEqual(false)
    expect(convertBoolean(0)).toEqual(false)
    expect(convertBoolean('')).toEqual(false)
    expect(convertBoolean('false')).toEqual(false)
    expect(convertBoolean(false)).toEqual(false)

    expect(convertBoolean('0')).toEqual(true)
    expect(convertBoolean(1)).toEqual(true)
    expect(convertBoolean(true)).toEqual(true)
    expect(convertBoolean('true')).toEqual(true)
  })

  test('convertCssPixel work', async () => {
    expect(convertCssPixel(1)).toEqual('1px')
    expect(convertCssPixel('1px')).toEqual('1px')
    expect(convertCssPixel('1em')).toEqual('1em')

    expect(convertCssPixel(undefined)).toEqual('')
    expect(convertCssPixel(null)).toEqual('')
  })
})
