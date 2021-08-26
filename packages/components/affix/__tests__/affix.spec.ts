import { mount, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance, nextTick, reactive, UnwrapRef } from 'vue'
import { wait, renderWork } from '@tests'
import IxAffix from '../src/Affix'
import { AffixProps } from '../src/types'
interface Offset {
  top: number
  right: number
  bottom: number
  left: number
}

let rectMap = {} as { container: Offset; 'ix-affix': Offset }

function isPositionCorrect(wrapper: VueWrapper<ComponentPublicInstance>, style: Record<string, string> = {}) {
  const affixStyle = (wrapper.find('.ix-affix-content').element as HTMLElement).style as unknown as Record<
    string,
    string
  >

  const attrsToCheck: string[] = ['position', 'top', 'bottom', 'left', 'right']
  return attrsToCheck.every(attr => affixStyle[attr] === style[attr] || (!affixStyle[attr] && !style[attr]))
}

const affixSize = {
  width: 100,
  height: 100,
}

const containerSize = {
  width: 300,
  height: 300,
}

function initRectMap() {
  rectMap = {
    'ix-affix': {
      top: 100,
      right: 100 + affixSize.width,
      bottom: 100 + affixSize.height,
      left: 100,
    },
    container: {
      top: 50,
      right: 50 + containerSize.width,
      bottom: 50 + containerSize.height,
      left: 50,
    },
  }
}

async function scrollTarget(x: number, y: number, target: Window | Element = window, timeout = 200): Promise<unknown> {
  initRectMap()
  const cls = ['ix-affix']
  target === window && cls.push('container')
  ;(cls as ['ix-affix', 'container']).forEach(item => {
    rectMap[item].top -= y
    rectMap[item].bottom -= y
    rectMap[item].left -= x
    rectMap[item].right -= x
  })
  target.dispatchEvent(new Event('scroll'))
  return wait(timeout)
}

describe('Affix', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>

  async function initWrapper(
    props: UnwrapRef<Partial<AffixProps>>,
    listeners: Record<string, (...args: unknown[]) => unknown> = {},
  ) {
    wrapper = mount(
      {
        components: { IxAffix },
        template: `
          <div class="container">
            <IxAffix v-bind="props"
              v-on="listeners"
              >Test Affix</IxAffix>
          </div>
        `,
        setup() {
          return {
            props,
            listeners,
          }
        },
      },
      { attachTo: 'body' },
    )
  }

  beforeEach(() => {
    initRectMap()

    const spyGetBoundingClientRect = function (this: HTMLElement) {
      const className = this.className as 'ix-affix' | 'container'
      return (rectMap[className] || {}) as DOMRect
    }

    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(spyGetBoundingClientRect)
  })

  renderWork(IxAffix)

  test('offset work', async () => {
    const props = reactive<Partial<AffixProps>>({})
    initWrapper(props)

    await nextTick()
    expect(isPositionCorrect(wrapper, {})).toBe(true)

    await scrollTarget(10, 10)
    expect(isPositionCorrect(wrapper, {})).toBe(true)

    await scrollTarget(10, 100)
    expect(isPositionCorrect(wrapper, { position: 'fixed', top: '0px', left: '90px' })).toBe(true)

    await scrollTarget(100, 100)
    expect(isPositionCorrect(wrapper, { position: 'fixed', top: '0px', left: '0px' })).toBe(true)

    await scrollTarget(110, 110)
    expect(isPositionCorrect(wrapper, { position: 'fixed', top: '0px', left: '-10px' })).toBe(true)

    props.offset = { left: 0 }

    await scrollTarget(10, 10)
    expect(isPositionCorrect(wrapper, {})).toBe(true)

    await scrollTarget(100, 10)
    expect(isPositionCorrect(wrapper, { position: 'fixed', top: '90px', left: '0px' })).toBe(true)

    await scrollTarget(100, 100)
    expect(isPositionCorrect(wrapper, { position: 'fixed', top: '0px', left: '0px' })).toBe(true)

    await scrollTarget(110, 110)
    expect(isPositionCorrect(wrapper, { position: 'fixed', top: '-10px', left: '0px' })).toBe(true)

    props.offset = { top: 0, left: 0 }

    await scrollTarget(110, 110)
    expect(isPositionCorrect(wrapper, { position: 'fixed', top: '0px', left: '0px' })).toBe(true)

    props.offset = { bottom: 0, right: 0 }

    await scrollTarget(-window.innerWidth + affixSize.width + 100, -window.innerHeight + affixSize.height + 100)
    expect(isPositionCorrect(wrapper, { position: 'fixed', bottom: '0px', right: '0px' })).toBe(true)
  })

  test('target work', async () => {
    const props = reactive<Partial<AffixProps>>({
      offset: 50,
    })
    initWrapper(props)
    await nextTick()

    const target = document.querySelector('.container') as HTMLElement

    expect(isPositionCorrect(wrapper, {})).toBe(true)

    props.target = target
    await nextTick()
    expect(isPositionCorrect(wrapper, { position: 'absolute', top: '0px', left: '0px' })).toBe(true)

    await scrollTarget(50, 50, target)
    expect(isPositionCorrect(wrapper, { position: 'absolute', top: '50px', left: '0px' })).toBe(true)

    props.offset = { top: 50, left: 50 }

    await scrollTarget(100, 100, target)
    expect(isPositionCorrect(wrapper, { position: 'absolute', top: '100px', left: '100px' })).toBe(true)
  })

  test('onChange work', async () => {
    const onChange = jest.fn()
    const props = reactive<Partial<AffixProps>>({
      onChange,
    })
    initWrapper(props)

    await nextTick()
    expect(onChange).not.toBeCalled()

    await scrollTarget(100, 100)
    expect(onChange).toBeCalledWith(true)

    await scrollTarget(0, 0)
    expect(onChange).toBeCalledWith(false)

    props.offset = 100
    await nextTick()
    expect(onChange).toBeCalledWith(true)
  })
})
