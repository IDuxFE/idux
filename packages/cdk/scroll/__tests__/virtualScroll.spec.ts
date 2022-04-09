import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import VirtualScroll from '../src/virtual/VirtualScroll'
import { VirtualItemRenderFn, VirtualScrollInstance, VirtualScrollProps } from '../src/virtual/types'

const getData = (length: number, key = 'key') => {
  const data: { key: string }[] = []
  for (let index = 0; index < length; index++) {
    data.push({ key: `${key}-${index}` })
  }
  return data
}

const defaultProps = {
  height: 200,
  itemHeight: 20,
  itemKey: 'key',
} as const

const defaultItemSlot = `
<template #item="{ item, index }">
  <span class="virtual-item" style="height: 20px;">{{ item.key }} - {{ index }}</span>
</template>
`

describe('VirtualScroll', () => {
  const VirtualScrollMount = (options?: MountingOptions<Partial<VirtualScrollProps>>) => {
    const { props, ...rest } = options || {}
    const mergedOptions = { props: { ...defaultProps, ...props }, ...rest } as MountingOptions<VirtualScrollProps>
    return mount(VirtualScroll, mergedOptions) as VueWrapper<VirtualScrollInstance>
  }

  beforeAll(() => {
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 200)
  })

  afterAll(() => {
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockClear()
  })

  describe('basic work', () => {
    test('render work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(20) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.html()).toMatchSnapshot()

      expect(() => {
        wrapper.vm.$forceUpdate()
        wrapper.unmount()
      }).not.toThrow()
    })

    test.skip('tag work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(20) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.tagName).toEqual('DIV')

      await wrapper.setProps({ component: 'ul' })

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.tagName).toEqual('UL')

      await wrapper.setProps({ component: h('span', { class: 'test-span' }) })

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.tagName).toEqual('SPAN')
      expect(wrapper.find('.cdk-virtual-scroll-holder').classes()).toContain('test-span')
    })

    test('dataSource work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(5) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ dataSource: getData(10) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(10)

      await wrapper.setProps({ dataSource: getData(15) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(12)
    })

    test('fullHeight work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(5) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('height: 200px')

      await wrapper.setProps({ fullHeight: false })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('max-height: 200px')

      await wrapper.setProps({ fullHeight: true })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('height: 200px')
    })

    test('height work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(5) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('height: 200px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ dataSource: getData(20) })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('height: 200px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(12)

      await wrapper.setProps({ height: 300 })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('height: 300px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(17)
    })

    test('itemHeight work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(5) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ dataSource: getData(30) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(12)

      await wrapper.setProps({ itemHeight: 10 })

      expect(wrapper.findAll('.virtual-item').length).toEqual(22)
    })

    test('itemKey work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(20) },
        slots: { item: defaultItemSlot },
      })

      wrapper.findAll('.virtual-item').forEach((item, index) => expect(item.text()).toEqual(`key-${index} - ${index}`))

      await wrapper.setProps({ dataSource: getData(20, 'key'), itemKey: 'key' })

      wrapper.findAll('.virtual-item').forEach((item, index) => expect(item.text()).toEqual(`key-${index} - ${index}`))
    })

    test('itemRender work', async () => {
      const itemRender: VirtualItemRenderFn = ({ item, index }) => {
        const { key } = item as { key: string }
        return h('span', { class: 'virtual-item' }, [`${key} - ${index}`])
      }
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(20), itemRender },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('scroll work', () => {
    test('scrollBar show work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(40) },
        slots: { item: defaultItemSlot },
      })

      await wrapper.trigger('mouseenter')

      expect(wrapper.find('.cdk-virtual-scroll-bar').isVisible()).toBe(true)

      await wrapper.trigger('mouseleave')

      expect(wrapper.find('.cdk-virtual-scroll-bar').isVisible()).toBe(false)
    })

    test('scrollTo work', async () => {
      vi.useFakeTimers()

      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(40) },
        slots: { item: defaultItemSlot },
      })
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(0)
      expect(wrapper.find('.cdk-virtual-scroll-bar').attributes('style')).toContain('display: none')

      wrapper.vm.scrollTo(100)
      vi.runAllTimers()

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(100)
      expect(wrapper.find('.cdk-virtual-scroll-thumb').attributes('style')).not.toContain('display: none')

      wrapper.vm.scrollTo({ index: 20, align: 'top' })
      vi.runAllTimers()

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(400)

      wrapper.vm.scrollTo({ index: 20, align: 'bottom' })
      vi.runAllTimers()

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(220)

      wrapper.vm.scrollTo({ key: 'key-20', align: 'top' })
      vi.runAllTimers()

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(400)

      wrapper.vm.scrollTo({ key: 'key-20', align: 'top', offset: 20 })
      vi.runAllTimers()

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(380)

      wrapper.vm.scrollTo(9999)
      vi.runAllTimers()

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(600)

      wrapper.vm.scrollTo(-1)
      vi.runAllTimers()

      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(0)
      vi.useRealTimers()
    })

    test('moving work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(100) },
        slots: { item: defaultItemSlot },
      })

      wrapper.find('.cdk-virtual-scroll-thumb').trigger('mousedown', { pageY: 0 })

      const mouseMoveEvent = new Event('mousemove') as MouseEvent
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(mouseMoveEvent as any).pageY = 10
      window.dispatchEvent(mouseMoveEvent)
      await flushPromises()

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('pointer-events: none')

      await flushPromises()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(100)

      const mouseUpEvent = new Event('mouseup') as MouseEvent
      window.dispatchEvent(mouseUpEvent)
      await flushPromises()
    })

    test('onScroll work', async () => {
      const onScroll = vi.fn()
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(100) },
        slots: { item: defaultItemSlot },
        attrs: { onScroll },
      })

      wrapper.find('.cdk-virtual-scroll-holder').trigger('scroll')

      expect(onScroll).toBeCalled()
    })
  })

  describe('touch work', () => {
    test('moving work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(100) },
        slots: { item: defaultItemSlot },
      })

      wrapper.find('.cdk-virtual-scroll-holder').trigger('touchstart', { touches: [{ pageY: 100 }] })
      wrapper.find('.cdk-virtual-scroll-holder').trigger('touchmove', { touches: [{ pageY: 80 }] })
      wrapper.find('.cdk-virtual-scroll-holder').trigger('touchend')
      await flushPromises()
      // todo fix: vi
      // expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop >= 20).toBeTruthy()
    })
  })
})
