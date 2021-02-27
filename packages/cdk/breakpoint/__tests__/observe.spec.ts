import { Breakpoints } from '../src/breakpoints'
import { isMatchedBreakpoint, observeBreakpoint, cleanObservables } from '../src/observe'

describe('observe.ts', () => {
  beforeEach(() => {
    cleanObservables()
  })

  test('isMatchedBreakpoint work', () => {
    expect(isMatchedBreakpoint(Breakpoints.lg)).toBeFalsy()
    expect(isMatchedBreakpoint('all')).toBeTruthy()
    expect(isMatchedBreakpoint([Breakpoints.lg, 'all'])).toBeTruthy()
  })

  test('observeBreakpoint work', () => {
    const largeBreakpoint = observeBreakpoint(Breakpoints.lg)
    expect(largeBreakpoint.value.matches).toBeFalsy()
    expect(largeBreakpoint.value.breakpoints[Breakpoints.lg]).toBeFalsy()

    const allBreakpoint = observeBreakpoint(['all'])
    expect(allBreakpoint.value.matches).toBeTruthy()
    expect(allBreakpoint.value.breakpoints['all']).toBeTruthy()
  })
})
