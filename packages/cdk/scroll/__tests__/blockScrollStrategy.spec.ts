import { BlockScrollStrategy } from '../src/strategy/blockScrollStrategy'

describe.skip('blockScrollStrategy.ts', () => {
  const defaultClassName = 'cdk-scroll-block'
  let blockScrollStrategy: BlockScrollStrategy

  beforeEach(() => {
    blockScrollStrategy = new BlockScrollStrategy()
  })

  afterEach(() => {
    if (blockScrollStrategy) {
      blockScrollStrategy.disable()
    }
  })

  it('enable and disable work', () => {
    blockScrollStrategy.enable()

    expect(document.documentElement.className).toBe(defaultClassName)

    blockScrollStrategy.disable()

    expect(document.documentElement.className).toBe('')
  })

  it('className work', () => {
    const testClassName = 'test-block'
    const scrollLocker1 = new BlockScrollStrategy({ className: testClassName })

    blockScrollStrategy.enable()
    scrollLocker1.enable()

    expect(document.documentElement.classList.contains(defaultClassName)).toBeTruthy()
    expect(document.documentElement.classList.contains(testClassName)).toBeTruthy()

    blockScrollStrategy.disable()

    expect(document.documentElement.classList.contains(defaultClassName)).toBeFalsy
    expect(document.documentElement.classList.contains(testClassName)).toBeTruthy()

    scrollLocker1.disable()

    expect(document.documentElement.className).toBe('')
  })

  it('multiple enable and disable work', () => {
    blockScrollStrategy.enable()
    blockScrollStrategy.enable()

    expect(document.documentElement.className).toBe(defaultClassName)

    blockScrollStrategy.disable()

    expect(document.documentElement.className).toBe('')

    blockScrollStrategy.disable()

    expect(document.documentElement.className).toBe('')
  })

  it('multiple instance work', () => {
    const scrollLocker1 = new BlockScrollStrategy()
    const scrollLocker2 = new BlockScrollStrategy()

    blockScrollStrategy.enable()
    scrollLocker1.enable()
    scrollLocker2.enable()

    expect(document.documentElement.className).toBe(defaultClassName)

    blockScrollStrategy.disable()

    expect(document.documentElement.className).toBe(defaultClassName)

    scrollLocker1.disable()

    expect(document.documentElement.className).toBe(defaultClassName)

    scrollLocker2.disable()

    expect(document.documentElement.className).toBe('')
  })

  it('multiple instance with different target work', () => {
    const testDivElement = document.createElement('div')
    vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => 100)
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 90)

    const scrollLocker1 = new BlockScrollStrategy({ target: testDivElement })

    const scrollLocker2 = new BlockScrollStrategy({ target: testDivElement })

    blockScrollStrategy.enable()
    scrollLocker1.enable()
    scrollLocker2.enable()

    expect(document.documentElement.className).toBe(defaultClassName)
    expect(testDivElement.className).toBe(defaultClassName)

    blockScrollStrategy.disable()

    expect(document.documentElement.className).toBe('')
    expect(testDivElement.className).toBe(defaultClassName)

    scrollLocker1.disable()

    expect(document.documentElement.className).toBe('')
    expect(testDivElement.className).toBe(defaultClassName)

    scrollLocker2.disable()

    expect(document.documentElement.className).toBe('')
    expect(testDivElement.className).toBe('')

    vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockClear()
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockClear()
  })
})
