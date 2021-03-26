import { addClass, hasClass, off, on, removeClass } from '../src/dom'

describe('dom.ts', () => {
  let testElement: HTMLDivElement

  beforeEach(() => {
    testElement = document.createElement('div')
  })

  test('event listener', () => {
    const listener = jest.fn()
    on(testElement, 'click', listener)
    testElement.click()

    expect(listener).toBeCalledTimes(1)

    off(testElement, 'click', listener)
    testElement.click()

    expect(listener).toBeCalledTimes(1)
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
