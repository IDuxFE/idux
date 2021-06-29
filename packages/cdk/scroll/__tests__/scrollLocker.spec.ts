import { ScrollLocker } from '../src/scrollLocker'

describe('scrollLocker.ts', () => {
  const defaultBlockClassName = 'ix-cdk-scroll-block'
  let scrollLocker: ScrollLocker

  beforeEach(() => {
    scrollLocker = new ScrollLocker()
  })

  afterEach(() => {
    if (scrollLocker) {
      scrollLocker.unLock()
    }
  })

  it('lock and unLock work', () => {
    scrollLocker.lock()

    expect(document.body.className).toBe(defaultBlockClassName)

    scrollLocker.unLock()

    expect(document.body.className).toBe('')
  })

  it('blockClassName work', () => {
    const testClassName = 'test-block'
    const scrollLocker1 = new ScrollLocker({ blockClassName: testClassName })

    scrollLocker.lock()
    scrollLocker1.lock()

    expect(document.body.classList.contains(defaultBlockClassName)).toBeTruthy()
    expect(document.body.classList.contains(testClassName)).toBeTruthy()

    scrollLocker.unLock()

    expect(document.body.classList.contains(defaultBlockClassName)).toBeFalsy
    expect(document.body.classList.contains(testClassName)).toBeTruthy()

    scrollLocker1.unLock()

    expect(document.body.className).toBe('')
  })

  it('multiple lock and unLock work', () => {
    scrollLocker.lock()
    scrollLocker.lock()

    expect(document.body.className).toBe(defaultBlockClassName)

    scrollLocker.unLock()

    expect(document.body.className).toBe('')

    scrollLocker.unLock()

    expect(document.body.className).toBe('')
  })

  it('multiple instance work', () => {
    const scrollLocker1 = new ScrollLocker()
    const scrollLocker2 = new ScrollLocker()

    scrollLocker.lock()
    scrollLocker1.lock()
    scrollLocker2.lock()

    expect(document.body.className).toBe(defaultBlockClassName)

    scrollLocker.unLock()

    expect(document.body.className).toBe(defaultBlockClassName)

    scrollLocker1.unLock()

    expect(document.body.className).toBe(defaultBlockClassName)

    scrollLocker2.unLock()

    expect(document.body.className).toBe('')
  })

  it('multiple instance with different container work', () => {
    const testDivElement = document.createElement('div')
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => 100)
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 90)

    const scrollLocker1 = new ScrollLocker({ container: testDivElement })

    const scrollLocker2 = new ScrollLocker({ container: testDivElement })

    scrollLocker.lock()
    scrollLocker1.lock()
    scrollLocker2.lock()

    expect(document.body.className).toBe(defaultBlockClassName)
    expect(testDivElement.className).toBe(defaultBlockClassName)

    scrollLocker.unLock()

    expect(document.body.className).toBe('')
    expect(testDivElement.className).toBe(defaultBlockClassName)

    scrollLocker1.unLock()

    expect(document.body.className).toBe('')
    expect(testDivElement.className).toBe(defaultBlockClassName)

    scrollLocker2.unLock()

    expect(document.body.className).toBe('')
    expect(testDivElement.className).toBe('')

    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockClear()
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockClear()
  })

  it('reLock work', () => {
    const testDivElement = document.createElement('div')

    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => 100)
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 90)

    scrollLocker.lock()

    expect(document.body.className).toBe(defaultBlockClassName)

    scrollLocker.reLock({ container: testDivElement })

    expect(document.body.className).toBe('')

    expect(testDivElement.className).toBe(defaultBlockClassName)

    const testClassName = 'test-block'
    scrollLocker.reLock({ blockClassName: testClassName })

    expect(testDivElement.className).toBe(testClassName)

    scrollLocker.reLock()

    expect(testDivElement.className).toBe(testClassName)

    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockClear()
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockClear()
  })
})
