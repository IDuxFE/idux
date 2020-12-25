import { isDefined, isNumeric } from '../src/utils'

describe('utils.ts', () => {
  test('isDefined', async () => {
    const testCases = [
      { q: '', r: true },
      { q: 'string', r: true },
      { q: 1, r: true },
      { q: {}, r: true },
      { q: [], r: true },
      { q: null, r: false },
      { q: undefined, r: false },
    ]
    for (let i = 0; i < testCases.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { q, r }: any = testCases[i]

      expect(isDefined(q)).toEqual(r)
    }
  })

  test('isNumeric', async () => {
    const testCases = [
      { q: '1', r: true },
      { q: '-1', r: true },
      { q: '+1', r: true },
      { q: '1-', r: false },
      { q: '1-1', r: false },
      { q: 1, r: true },
      { q: -1, r: true },
    ]
    for (let i = 0; i < testCases.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { q, r }: any = testCases[i]
      expect(isNumeric(q)).toEqual(r)
    }
  })
})
