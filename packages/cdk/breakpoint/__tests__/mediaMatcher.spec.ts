import { BREAKPOINTS } from '../src/breakpoints'
import { matchMedia } from '../src/mediaMatcher'

describe('matchMedia.ts', () => {
  test('matchMedia work', () => {
    expect(matchMedia(BREAKPOINTS.sm).matches).toBeFalsy()
  })

  test('createEmptyStyleRule work', () => {
    const createElementSyn = jest.spyOn(document, 'createElement').mockReturnValue(document.createElement('style'))

    matchMedia(BREAKPOINTS.sm)
    expect(createElementSyn).toBeCalledTimes(1)

    matchMedia(BREAKPOINTS.sm)
    matchMedia(BREAKPOINTS.lg)
    expect(createElementSyn).toBeCalledTimes(1)
  })
})
