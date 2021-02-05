import { toArray, toNumber, toBoolean, toCssPixel } from '../convert'

describe('convert.ts', () => {
  test('toArray work', async () => {
    expect(toArray(null)).toEqual([])
    expect(toArray(undefined)).toEqual([])

    const stringValue = 'string'
    expect(toArray(stringValue)).toEqual([stringValue])

    const numberValue = 0
    expect(toArray(numberValue)).toEqual([numberValue])

    const arrayValue = [1, '2', null]
    expect(toArray(arrayValue)).toEqual(arrayValue)
  })

  test('toNumber work', async () => {
    expect(toNumber(100)).toEqual(100)
    expect(toNumber(100, 1)).toEqual(100)

    expect(toNumber('0')).toEqual(0)
    expect(toNumber('0', 1)).toEqual(0)

    expect(toNumber(undefined)).toEqual(0)
    expect(toNumber(undefined, 1)).toEqual(1)

    expect(toNumber(null)).toEqual(0)
    expect(toNumber(null, 1)).toEqual(1)

    expect(toNumber('')).toEqual(0)
    expect(toNumber('', 1)).toEqual(1)

    expect(toNumber('1.1')).toEqual(1.1)
    expect(toNumber('1.1', 1)).toEqual(1.1)

    expect(toNumber('1-1')).toEqual(0)
    expect(toNumber('1-1', 1)).toEqual(1)
  })

  test('toBoolean work', async () => {
    expect(toBoolean(undefined)).toEqual(false)
    expect(toBoolean(null)).toEqual(false)
    expect(toBoolean(0)).toEqual(false)
    expect(toBoolean('')).toEqual(false)
    expect(toBoolean('false')).toEqual(false)
    expect(toBoolean(false)).toEqual(false)

    expect(toBoolean('0')).toEqual(true)
    expect(toBoolean(1)).toEqual(true)
    expect(toBoolean(true)).toEqual(true)
    expect(toBoolean('true')).toEqual(true)
  })

  test('toCssPixel work', async () => {
    expect(toCssPixel(1)).toEqual('1px')
    expect(toCssPixel('1px')).toEqual('1px')
    expect(toCssPixel('1em')).toEqual('1em')

    expect(toCssPixel(undefined)).toEqual('')
    expect(toCssPixel(null)).toEqual('')
  })
})
