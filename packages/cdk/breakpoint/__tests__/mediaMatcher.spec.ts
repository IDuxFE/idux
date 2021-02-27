import { Breakpoints } from '../src/breakpoints'
import { matchMedia } from '../src/mediaMatcher'

describe('matchMedia.ts', () => {
  test('matchMedia work', () => {
    expect(matchMedia(Breakpoints.sm).matches).toBeFalsy()
  })

  test('createEmptyStyleRule work', () => {
    const createElementSyn = jest.spyOn(document, 'createElement').mockReturnValue(document.createElement('style'))

    matchMedia(Breakpoints.sm)
    expect(createElementSyn).toBeCalledTimes(1)

    matchMedia(Breakpoints.sm)
    matchMedia(Breakpoints.lg)
    expect(createElementSyn).toBeCalledTimes(1)
  })
})
