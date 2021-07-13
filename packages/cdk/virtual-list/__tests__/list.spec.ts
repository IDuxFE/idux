import { h } from 'vue'
import { flushPromises, mount, MountingOptions } from '@vue/test-utils'
import IxVirtualList from '../src/List'
import { VirtualItemRenderFn, VirtualListProps } from '../src/types'

const getData = (length: number, key = 'id') => {
  const data: { id: string }[] = []
  for (let index = 0; index < length; index++) {
    data.push({ id: `${key}-${index}` })
  }
  return data
}

const defaultProps = {
  height: 200,
  itemHeight: 20,
  itemKey: 'id',
} as const

const defaultItemSlot = `
<template #item="{ item, index }">
  <span class="virtual-item" style="height: 20px;">{{ item.id }} - {{ index }}</span>
</template>
`

describe('list.ts', () => {
  const VirtualListMount = (options?: MountingOptions<Partial<VirtualListProps>>) => {
    const { props, ...rest } = options || {}
    const mergedOptions = { props: { ...defaultProps, ...props }, ...rest } as MountingOptions<VirtualListProps>
    return mount(IxVirtualList, mergedOptions)
  }

  beforeAll(() => {
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 200)
  })

  afterAll(() => {
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockClear()
  })

  describe('basic work', () => {
    test('render work', () => {
      const wrapper = VirtualListMount({
        props: { data: getData(20) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.html()).toMatchSnapshot()

      expect(() => {
        wrapper.vm.$forceUpdate()
        wrapper.unmount()
      }).not.toThrow()
    })

    test('component work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(20) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.find('.ix-virtual-list-holder').element.tagName).toEqual('DIV')

      await wrapper.setProps({ component: 'ul' })

      expect(wrapper.find('.ix-virtual-list-holder').element.tagName).toEqual('UL')

      await wrapper.setProps({ component: h('span', { class: 'ix-test-span' }) })

      expect(wrapper.find('.ix-virtual-list-holder').element.tagName).toEqual('SPAN')
      expect(wrapper.find('.ix-virtual-list-holder').classes()).toContain('ix-test-span')
    })

    test('data work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(5) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ data: getData(10) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(10)

      await wrapper.setProps({ data: getData(15) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(12)
    })

    test('fullHeight work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(5) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.find('.ix-virtual-list-holder').attributes('style')).toContain('height: 200px')

      await wrapper.setProps({ fullHeight: false })

      expect(wrapper.find('.ix-virtual-list-holder').attributes('style')).toContain('max-height: 200px')

      await wrapper.setProps({ fullHeight: true })

      expect(wrapper.find('.ix-virtual-list-holder').attributes('style')).toContain('height: 200px')
    })

    test('height work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(5) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.find('.ix-virtual-list-holder').attributes('style')).toContain('height: 200px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ data: getData(20) })

      expect(wrapper.find('.ix-virtual-list-holder').attributes('style')).toContain('height: 200px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(12)

      await wrapper.setProps({ height: 300 })

      expect(wrapper.find('.ix-virtual-list-holder').attributes('style')).toContain('height: 300px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(17)
    })

    test('itemHeight work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(5) },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ data: getData(30) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(12)

      await wrapper.setProps({ itemHeight: 10 })

      expect(wrapper.findAll('.virtual-item').length).toEqual(22)
    })

    test('itemKey work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(20) },
        slots: { item: defaultItemSlot },
      })

      wrapper.findAll('.virtual-item').forEach((item, index) => expect(item.text()).toEqual(`id-${index} - ${index}`))

      await wrapper.setProps({ data: getData(20, 'key'), itemKey: 'key' })

      wrapper.findAll('.virtual-item').forEach((item, index) => expect(item.text()).toEqual(`key-${index} - ${index}`))
    })

    test('itemRender work', async () => {
      const itemRender: VirtualItemRenderFn = ({ item, index }) => {
        const { id } = item as { id: string }
        return h('span', { class: 'virtual-item' }, [`${id} - ${index}`])
      }
      const wrapper = VirtualListMount({
        props: { data: getData(20), itemRender },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    test('virtual work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(20), virtual: false },
        slots: { item: defaultItemSlot },
      })

      expect(wrapper.find('.ix-virtual-scrollbar').exists()).toBeFalsy()

      await wrapper.setProps({ virtual: true })

      expect(wrapper.find('.ix-virtual-scrollbar').exists()).toBeTruthy()

      await wrapper.setProps({ itemHeight: 0 })

      expect(wrapper.find('.ix-virtual-scrollbar').exists()).toBeFalsy()

      await wrapper.setProps({ itemHeight: 1 })

      expect(wrapper.find('.ix-virtual-scrollbar').exists()).toBeTruthy()

      await wrapper.setProps({ height: 0 })

      expect(wrapper.find('.ix-virtual-scrollbar').exists()).toBeFalsy()

      await wrapper.setProps({ height: 10 })

      expect(wrapper.find('.ix-virtual-scrollbar').exists()).toBeTruthy()
    })
  })

  describe('scroll work', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    test('scrollTo work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(40) },
        slots: { item: defaultItemSlot },
      })
      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(0)
      expect(wrapper.find('.ix-virtual-scrollbar').attributes('style')).toContain('display: none')

      wrapper.vm.scrollTo(100)
      jest.runAllTimers()

      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(100)
      expect(wrapper.find('.ix-virtual-scrollbar-thumb').attributes('style')).not.toContain('display: none')

      wrapper.vm.scrollTo({ index: 20, align: 'top' })
      jest.runAllTimers()

      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(400)

      wrapper.vm.scrollTo({ index: 20, align: 'bottom' })
      jest.runAllTimers()

      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(220)

      wrapper.vm.scrollTo({ key: 'id-20', align: 'top' })
      jest.runAllTimers()

      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(400)

      wrapper.vm.scrollTo({ key: 'id-20', align: 'top', offset: 20 })
      jest.runAllTimers()

      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(380)

      wrapper.vm.scrollTo(9999)
      jest.runAllTimers()

      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(600)

      wrapper.vm.scrollTo(-1)
      jest.runAllTimers()

      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(0)
    })

    test('moving work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(100) },
        slots: { item: defaultItemSlot },
      })

      wrapper.find('.ix-virtual-scrollbar-thumb').trigger('mousedown', { pageY: 0 })

      const mouseMoveEvent = new Event('mousemove') as MouseEvent
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(mouseMoveEvent as any).pageY = 10
      window.dispatchEvent(mouseMoveEvent)
      await flushPromises()

      expect(wrapper.find('.ix-virtual-list-holder').attributes('style')).toContain('pointer-events: none')

      await flushPromises()
      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop).toEqual(100)

      const mouseUpEvent = new Event('mouseup') as MouseEvent
      window.dispatchEvent(mouseUpEvent)
      await flushPromises()
    })

    test('onScroll work', async () => {
      const onScroll = jest.fn()
      const wrapper = VirtualListMount({
        props: { data: getData(100) },
        slots: { item: defaultItemSlot },
        attrs: { onScroll },
      })

      wrapper.find('.ix-virtual-list-holder').trigger('scroll')

      expect(onScroll).toBeCalled()
    })
  })

  describe('touch work', () => {
    test('moving work', async () => {
      const wrapper = VirtualListMount({
        props: { data: getData(100) },
        slots: { item: defaultItemSlot },
      })

      wrapper.find('.ix-virtual-list-holder').trigger('touchstart', { touches: [{ pageY: 100 }] })
      wrapper.find('.ix-virtual-list-holder').trigger('touchmove', { touches: [{ pageY: 80 }] })
      wrapper.find('.ix-virtual-list-holder').trigger('touchend')
      await flushPromises()

      expect(wrapper.find('.ix-virtual-list-holder').element.scrollTop >= 20).toBeTruthy()
    })
  })
})
