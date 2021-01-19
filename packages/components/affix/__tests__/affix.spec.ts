import { mount, VueWrapper } from '@vue/test-utils'
import IxAffix from '../src/Affix.vue'
import { AffixStyle, Direction, OffsetOpt } from '../src/types'
import { wait, renderWork } from '@tests'
import { nextTick, ref, ComponentPublicInstance } from 'vue'

const rectMap = {}

const affixSize = {
  width: 100,
  height: 100,
}

const containerSize = {
  width: 300,
  height: 300,
}

function AffixMount(template: string, attrs = {}) {
  return mount(
    {
      components: { IxAffix },
      template,
      setup() {
        return attrs
      },
    },
    {
      attachTo: document.body,
    },
  )
}

function judgeStyle(wrapper: VueWrapper<ComponentPublicInstance>, style: AffixStyle = {}) {
  const affixStyle = wrapper.vm.$refs.affix.affixStyle
  const attrs: (Direction | 'position')[] = ['position', 'top', 'bottom', 'left', 'right']
  return attrs.every(attr => affixStyle[attr] === style[attr] || (!affixStyle[attr] && !style[attr]))
}

function initRectMap() {
  Object.assign(rectMap, {
    'container-test': {
      top: 50,
      left: 50,
      bottom: 50 + containerSize.height,
      right: 50 + containerSize.width,
    },
    'ix-affix-wrapper': {
      top: 100,
      left: 100,
      bottom: 100 + affixSize.height,
      right: 100 + affixSize.width,
    },
  })
}

async function scrollTarget(x: number, y: number, target: Window | Element = window, timeout = 200): Promise<unknown> {
  initRectMap()
  const cls = ['ix-affix-wrapper']
  target === window && cls.push('container-test')
  cls.forEach(item => {
    rectMap[item].top -= y
    rectMap[item].bottom -= y
    rectMap[item].left -= x
    rectMap[item].right -= x
  })
  target.dispatchEvent(new Event('scroll'))
  return wait(timeout)
}

describe('Affix.vue', () => {
  beforeAll(() => {
    initRectMap()
    HTMLElement.prototype.getBoundingClientRect = function () {
      return rectMap[this.className] || {}
    }
  })

  afterEach(initRectMap)

  renderWork(IxAffix)

  // 测试offset
  test('offset work', async () => {
    const offsetRef = ref<number | string | OffsetOpt>(0)
    const wrapper = AffixMount(
      `
        <ix-affix ref="affix" :offset="offsetRef">affix</ix-affix>
      `,
      { offsetRef },
    )

    await nextTick()
    expect(judgeStyle(wrapper, {})).toBe(true)

    await scrollTarget(10, 10)
    expect(judgeStyle(wrapper, {})).toBe(true)

    await scrollTarget(10, 100)
    expect(judgeStyle(wrapper, { position: 'fixed', top: '0px', left: '90px' })).toBe(true)

    await scrollTarget(100, 100)
    expect(judgeStyle(wrapper, { position: 'fixed', top: '0px', left: '0px' })).toBe(true)

    await scrollTarget(110, 110)
    expect(judgeStyle(wrapper, { position: 'fixed', top: '0px', left: '-10px' })).toBe(true)

    offsetRef.value = { left: 0 }

    await scrollTarget(10, 10)
    expect(judgeStyle(wrapper, {})).toBe(true)

    await scrollTarget(100, 10)
    expect(judgeStyle(wrapper, { position: 'fixed', top: '90px', left: '0px' })).toBe(true)

    await scrollTarget(100, 100)
    expect(judgeStyle(wrapper, { position: 'fixed', top: '0px', left: '0px' })).toBe(true)

    await scrollTarget(110, 110)
    expect(judgeStyle(wrapper, { position: 'fixed', top: '-10px', left: '0px' })).toBe(true)

    offsetRef.value = { top: 0, left: 0 }

    await scrollTarget(110, 110)
    expect(judgeStyle(wrapper, { position: 'fixed', top: '0px', left: '0px' })).toBe(true)

    offsetRef.value = { bottom: 0, right: 0 }

    await scrollTarget(-window.innerWidth + affixSize.width + 100, -window.innerHeight + affixSize.height + 100)
    expect(judgeStyle(wrapper, { position: 'fixed', bottom: '0px', right: '0px' })).toBe(true)
  })

  // 测试container
  test('container work', async () => {
    const offsetRef = ref<number | string | OffsetOpt>(50)
    const containerRef = ref<string | HTMLElement | Window>(window)
    const wrapper = AffixMount(
      `
      <div class="container-test">
        <ix-affix ref="affix" :offset="offsetRef" :target="containerRef">affix</ix-affix>
      </div>
      `,
      { offsetRef, containerRef },
    )

    expect(judgeStyle(wrapper, {})).toBe(true)

    containerRef.value = document.querySelector('.container-test') as HTMLElement
    await nextTick()
    expect(judgeStyle(wrapper, { position: 'absolute', top: '0px', left: '0px' })).toBe(true)

    await scrollTarget(50, 50, containerRef.value)
    expect(judgeStyle(wrapper, { position: 'absolute', top: '50px', left: '0px' })).toBe(true)

    offsetRef.value = { top: 50, left: 50 }

    await scrollTarget(100, 100, containerRef.value)
    expect(judgeStyle(wrapper, { position: 'absolute', top: '100px', left: '100px' })).toBe(true)
  })

  // 测试emit事件
  test('emit work', async () => {
    const offsetRef = ref<number | string | OffsetOpt>(0)
    let isSticky = false
    function onChanged(status: boolean) {
      isSticky = status
    }
    AffixMount(
      `
        <ix-affix ref="affix" :offset="offsetRef" @status-changed="onChanged">affix</ix-affix>
      `,
      { offsetRef, onChanged },
    )

    await nextTick()
    expect(isSticky).toBe(false)

    await scrollTarget(100, 100)
    expect(isSticky).toBe(true)

    await scrollTarget(0, 0)
    expect(isSticky).toBe(false)

    offsetRef.value = 100
    await nextTick()
    expect(isSticky).toBe(true)
  })
})
