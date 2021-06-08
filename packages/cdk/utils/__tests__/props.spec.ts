import { IxPropTypes } from '../src/props'

describe('propTypes.ts', () => {
  test('maxLength work', async () => {
    const maxLength = IxPropTypes.maxLength(4)
    expect(maxLength.default).toEqual(undefined)

    const validator = maxLength.validator!.bind(undefined)

    expect(validator('test')).toEqual(true)
    expect(validator('test1')).toEqual(false)
  })

  test('minLength work', async () => {
    const minLength = IxPropTypes.minLength(4)
    expect(minLength.default).toEqual(undefined)

    const validator = minLength.validator!.bind(undefined)

    expect(validator('test')).toEqual(true)
    expect(validator('tes')).toEqual(false)
  })
})
