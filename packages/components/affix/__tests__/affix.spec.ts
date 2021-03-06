import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { nextTick, ref, DefineComponent } from 'vue'
import { wait, renderWork } from '@tests'
import IxAffix from '../src/Affix.vue'
import { AffixOffset, AffixProps } from '../src/types'

interface Offset {
  top: number
  right: number
  bottom: number
  left: number
}

let rectMap = {} as { container: Offset; 'ix-affix': Offset }

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

describe('Affix.vue', () => {
  let AffixMount: (
    options?: MountingOptions<Partial<AffixProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<AffixProps>>>

  beforeEach(() => {
    AffixMount = (options = {}) => {
      return mount<AffixProps>(IxAffix, {
        ...options,
      })
    }

    initRectMap()

    const spyGetBoundingClientRect = function (this: HTMLElement) {
      const className = this.className as 'ix-affix' | 'container'
      return (rectMap[className] || {}) as DOMRect
    }

    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(spyGetBoundingClientRect)
  })

  renderWork(IxAffix)

  test('offset work', async () => {
    const wrapper = AffixMount({ props: { offset: 0 }, slots: { default: 'Test Affix' } })

    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    await scrollTarget(10, 10)
    expect(wrapper.html()).toMatchSnapshot()

    await scrollTarget(10, 100)
    expect(wrapper.html()).toMatchSnapshot()

    await scrollTarget(100, 100)
    expect(wrapper.html()).toMatchSnapshot()

    await scrollTarget(110, 110)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ offset: { left: 0 } })

    await scrollTarget(10, 10)
    expect(wrapper.html()).toMatchSnapshot()

    await scrollTarget(100, 10)
    expect(wrapper.html()).toMatchSnapshot()

    await scrollTarget(100, 100)
    expect(wrapper.html()).toMatchSnapshot()

    await scrollTarget(110, 110)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ offset: { top: 0, left: 0 } })
    await scrollTarget(110, 110)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ offset: { bottom: 0, right: 0 } })
    await scrollTarget(-window.innerWidth + affixSize.width + 100, -window.innerHeight + affixSize.height + 100)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('target work', async () => {
    const offset = ref<AffixOffset>(50)
    const target = ref<HTMLElement | undefined>(undefined)
    const wrapper = mount(
      {
        components: { IxAffix },
        template: `<div class="container"><ix-affix :offset="offset" :target="target">Test Affix</ix-affix></div>`,
        setup() {
          return { offset, target }
        },
      },
      {
        attachTo: document.body,
      },
    )

    expect(wrapper.html()).toMatchSnapshot()

    target.value = document.querySelector('.container') as HTMLElement
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    await scrollTarget(50, 50, target.value)
    expect(wrapper.html()).toMatchSnapshot()

    offset.value = { top: 50, left: 50 }

    await scrollTarget(100, 100, target.value)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('emit work', async () => {
    const onChange = jest.fn()

    const wrapper = AffixMount({ props: { offset: 0 }, attrs: { onChange }, slots: { default: 'Test Affix' } })

    await nextTick()
    expect(onChange).not.toBeCalled()

    await scrollTarget(100, 100)
    expect(onChange).toBeCalledWith(true)

    await scrollTarget(0, 0)
    expect(onChange).toBeCalledWith(false)

    wrapper.setProps({ offset: 100 })
    await nextTick()
    expect(onChange).toBeCalledWith(true)
  })
})
