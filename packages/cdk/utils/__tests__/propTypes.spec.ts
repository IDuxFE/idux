import { PropTypes } from '../src/propTypes'

describe('propTypes.ts', () => {
  test('maxLength work', async () => {
    const maxLength = PropTypes.maxLength(4)
    expect(maxLength.default).toEqual(undefined)

    const validator = maxLength.validator!.bind(undefined)

    expect(validator('test')).toEqual(true)
    expect(validator('test1')).toEqual(false)
  })

  test('minLength work', async () => {
    const minLength = PropTypes.minLength(4)
    expect(minLength.default).toEqual(undefined)

    const validator = minLength.validator!.bind(undefined)

    expect(validator('test')).toEqual(true)
    expect(validator('tes')).toEqual(false)
  })

  test('positive work', async () => {
    const positive = PropTypes.positive
    expect(positive.default).toEqual(undefined)

    const validator = positive.validator!.bind(undefined)

    expect(validator(1)).toEqual(true)
    expect(validator(0)).toEqual(false)
    expect(validator(-1)).toEqual(false)
  })

  test('bool work', async () => {
    const bool = PropTypes.bool
    expect(bool.default).toEqual(undefined)
  })
})
