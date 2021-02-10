import { addClass, hasClass, off, on, removeClass } from '../dom'

describe('dom.ts', () => {
  let testElement: HTMLDivElement

  beforeEach(() => {
    testElement = document.createElement('div')
  })

  test('event listener', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    const listener = () => console.log('click')
    on(testElement, 'click', listener)
    testElement.click()
    expect(log).toBeCalled()
    expect(log).toBeCalledTimes(1)
    off(testElement, 'click', listener)
    expect(log).toBeCalledTimes(1)
  })

  test('hasClass work', () => {
    addClass(testElement, 'test-class')
    expect(hasClass(testElement, 'test-class')).toBeTruthy()
    expect(hasClass(testElement, '')).toBeFalsy()
  })

  test('add class work', () => {
    expect(Array.from(testElement.classList)).toEqual([])
    addClass(testElement, 'test-class')
    expect(Array.from(testElement.classList)).toEqual(['test-class'])
    addClass(testElement, ['test-class', 'test-class-2'])
    expect(Array.from(testElement.classList)).toEqual(['test-class', 'test-class-2'])
  })

  test('remove class work', () => {
    addClass(testElement, 'test-class')
    removeClass(testElement, [])
    expect(Array.from(testElement.classList)).toEqual(['test-class'])
    removeClass(testElement, 'test-class')
    expect(Array.from(testElement.classList)).toEqual([])
  })
})
