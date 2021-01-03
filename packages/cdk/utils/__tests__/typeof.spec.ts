import { isNumeric, isNil, isNonNil } from '../typeof'

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
})
