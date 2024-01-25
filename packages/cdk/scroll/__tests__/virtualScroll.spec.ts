import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import VirtualScroll from '../src/virtual/VirtualScroll'
import { VirtualColRenderFn, VirtualRowRenderFn, VirtualScrollInstance, VirtualScrollProps } from '../src/virtual/types'

const getData = (length: number, key = 'key') => {
  const data: { key: string }[] = []
  for (let index = 0; index < length; index++) {
    data.push({ key: `${key}-${index}` })
  }
  return data
}
const getGridData = (
  rowLength: number,
  colLength: number,
  rowKey = 'row',
  colKey = 'col',
): { key: string; data: { key: string }[] }[] => {
  const data = Array.from(new Array(rowLength)).map((_, rowIndex) => ({
    key: `${rowKey}-${rowIndex}`,
    data: Array.from(new Array(colLength)).map((_, colIndex) => ({ key: `${colKey}-${colIndex}` })),
  }))

  return data
}

const defaultProps = {
  height: 200,
  width: 200,
  rowHeight: 20,
  colWidth: 20,
  getKey: 'key',
} as const

const defaultRowSlot = `
<template #row="{ item, index }">
  <span class="virtual-item" style="height: 20px;">{{ item.key }} - {{ index }}</span>
</template>
`

describe('VirtualScroll', () => {
  const VirtualScrollMount = (options?: MountingOptions<Partial<VirtualScrollProps>>) => {
    const { props, ...rest } = options || {}
    const mergedOptions = {
      props: { ...defaultProps, ...props },
      ...rest,
    } as MountingOptions<VirtualScrollProps>
    const rowLength = props?.dataSource?.length
    const scrollHeight = rowLength ? rowLength * 20 : 200
    let colLength = 0

    const row = props?.dataSource?.[0] as { data: unknown[] } | undefined

    if (row?.data) {
      colLength = row.data.length
    }
    const scrollWidth = colLength ? colLength * 20 : 200

    const wrapper = mount(VirtualScroll, mergedOptions) as VueWrapper<VirtualScrollInstance>
    const holderEl = wrapper.vm.getHolderElement()

    vi.spyOn(holderEl, 'scrollHeight', 'get').mockImplementation(() => scrollHeight)
    vi.spyOn(holderEl, 'scrollWidth', 'get').mockImplementation(() => scrollWidth)
    vi.spyOn(holderEl, 'clientHeight', 'get').mockImplementation(() => 200)
    vi.spyOn(holderEl, 'clientWidth', 'get').mockImplementation(() => 200)

    return wrapper
  }

  describe('basic work', () => {
    test('render work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(20) },
        slots: { row: defaultRowSlot },
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
        slots: { item: defaultRowSlot },
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
        slots: { item: defaultRowSlot },
      })

      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ dataSource: getData(10) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(10)

      await wrapper.setProps({ dataSource: getData(15) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(11)
    })

    test('fullHeight work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(5) },
        slots: { item: defaultRowSlot },
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
        slots: { item: defaultRowSlot },
      })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('height: 200px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ dataSource: getData(20) })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('height: 200px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(11)

      await wrapper.setProps({ height: 300 })

      expect(wrapper.find('.cdk-virtual-scroll-holder').attributes('style')).toContain('height: 300px')
      expect(wrapper.findAll('.virtual-item').length).toEqual(16)
    })

    test('itemHeight work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(5) },
        slots: { item: defaultRowSlot },
      })

      expect(wrapper.findAll('.virtual-item').length).toEqual(5)

      await wrapper.setProps({ dataSource: getData(30) })

      expect(wrapper.findAll('.virtual-item').length).toEqual(11)

      await wrapper.setProps({ rowHeight: 10 })

      expect(wrapper.findAll('.virtual-item').length).toEqual(21)
    })

    test('getKey work', async () => {
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(20) },
        slots: { item: defaultRowSlot },
      })

      wrapper.findAll('.virtual-item').forEach((item, index) => expect(item.text()).toEqual(`key-${index} - ${index}`))

      await wrapper.setProps({ dataSource: getData(20, 'key'), getKey: 'key' })

      wrapper.findAll('.virtual-item').forEach((item, index) => expect(item.text()).toEqual(`key-${index} - ${index}`))
    })

    test('rowRender work', async () => {
      const rowRender: VirtualRowRenderFn = ({ item, index }) => {
        const { key } = item as { key: string }
        return h('span', { class: 'virtual-item' }, [`${key} - ${index}`])
      }
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(20), rowRender },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('scroll work', () => {
    test('scrollTo work', async () => {
      const rowRender: VirtualRowRenderFn = ({ children }) => {
        return h('div', { class: 'virtual-row' }, children)
      }
      const colRender: VirtualColRenderFn = ({ item, index }) => {
        const { key } = item as { key: string }

        return h('div', { class: 'virtual-col' }, [`${key}-${index}`])
      }

      vi.useFakeTimers()

      const wrapper = VirtualScrollMount({
        props: { dataSource: getGridData(40, 40), rowRender, colRender },
      })
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(0)

      wrapper.vm.scrollTo(100)
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(100)

      wrapper.vm.scrollTo({ rowIndex: 20, verticalAlign: 'top' })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(400)

      wrapper.vm.scrollTo({ rowIndex: 20, verticalAlign: 'bottom' })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(220)

      wrapper.vm.scrollTo({ rowKey: 'row-20', verticalAlign: 'top' })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(400)

      wrapper.vm.scrollTo({ rowKey: 'row-20', verticalAlign: 'top', verticalOffset: 20 })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(380)

      wrapper.vm.scrollTo({ top: 100, left: 100 })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(100)
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollLeft).toEqual(100)

      wrapper.vm.scrollTo({ rowIndex: 20, colIndex: 20, verticalAlign: 'top', horizontalAlign: 'start' })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(400)
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollLeft).toEqual(400)

      wrapper.vm.scrollTo({ rowIndex: 20, colIndex: 20, verticalAlign: 'bottom', horizontalAlign: 'end' })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(220)
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollLeft).toEqual(220)

      wrapper.vm.scrollTo({ rowKey: 'row-20', colKey: 'col-20', verticalAlign: 'top', horizontalAlign: 'start' })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(400)
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollLeft).toEqual(400)

      wrapper.vm.scrollTo({
        rowKey: 'row-20',
        colKey: 'col-20',
        verticalAlign: 'top',
        horizontalAlign: 'start',
        verticalOffset: 20,
        horizontalOffset: 20,
      })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(380)
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollLeft).toEqual(380)

      wrapper.vm.scrollTo(9999)
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(600)

      wrapper.vm.scrollTo({ top: 9999, left: 9999 })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(600)
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollLeft).toEqual(600)

      wrapper.vm.scrollTo(-1)
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(0)

      wrapper.vm.scrollTo({ top: -1, left: -1 })
      vi.runAllTimers()
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollTop).toEqual(0)
      expect(wrapper.find('.cdk-virtual-scroll-holder').element.scrollLeft).toEqual(0)

      vi.useRealTimers()
    })

    test('onScroll work', async () => {
      const onScroll = vi.fn()
      const wrapper = VirtualScrollMount({
        props: { dataSource: getData(100) },
        slots: { item: defaultRowSlot },
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
        slots: { item: defaultRowSlot },
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
