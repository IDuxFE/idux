import { isNumber, isNil, isNonNil } from '../typeof'

describe('typeof.ts', () => {
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
})
