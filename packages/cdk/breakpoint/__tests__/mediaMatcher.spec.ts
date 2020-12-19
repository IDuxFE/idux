import { Breakpoints } from '../src/breakpoints'
import { matchMedia } from '../src/mediaMatcher'

describe('matchMedia.ts', () => {
  test('matchMedia work', () => {
    expect(matchMedia(Breakpoints.Small).matches).toBeFalsy()
  })

  test('createEmptyStyleRule work', () => {
    const createElementSyn = jest.spyOn(document, 'createElement').mockReturnValue(document.createElement('style'))

    matchMedia(Breakpoints.Small)
    expect(createElementSyn).toBeCalledTimes(1)

    matchMedia(Breakpoints.Small)
    matchMedia(Breakpoints.Large)
    expect(createElementSyn).toBeCalledTimes(1)
  })
})
