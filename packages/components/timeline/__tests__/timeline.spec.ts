import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import IxTimeline from '../src/Timeline'
import IxTimelineItem from '../src/TimelineItem'
import { TimelineProps } from '../src/types'

const TimelineMount = (options?: MountingOptions<Partial<TimelineProps>>) => {
  const { slots = {}, ...rest } = options || {}

  const wrapper = mount(IxTimeline, {
    ...rest,
    slots: {
      default: [
        h(IxTimelineItem, {}, { default: () => 0 }),
        h(IxTimelineItem, {}, { default: () => 1 }),
        h(IxTimelineItem, {}, { default: () => 2 }),
        h(IxTimelineItem, {}, { default: () => 3 }),
      ],
      ...slots,
    },
  })

  return wrapper
}

describe('Timeline', () => {
  renderWork(IxTimeline)

  test('placement work', async () => {
    const wrapper = TimelineMount()

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.findAll('.ix-timeline-item').length).toBe(4)
    expect(wrapper.findAll('.ix-timeline-item-end').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ placement: 'start' })
    expect(wrapper.findAll('.ix-timeline-item-start').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ placement: 'alternate' })
    expect(wrapper.findAll('.ix-timeline-item-start').length).toBe(2)
    expect(wrapper.findAll('.ix-timeline-item-end').length).toBe(2)
    wrapper.findAll('.ix-timeline-item').forEach((item, index) => {
      const placement = index % 2 ? 'start' : 'end'

      expect(item.classes()).toContain(`ix-timeline-item-${placement}`)
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('placement with item placement work', async () => {
    const wrapper = TimelineMount({
      slots: {
        default: [
          h(IxTimelineItem, { placement: 'start' }, { default: () => 0 }),
          h(IxTimelineItem, { placement: 'start' }, { default: () => 1 }),
          h(IxTimelineItem, { placement: 'start' }, { default: () => 2 }),
          h(IxTimelineItem, { placement: 'start' }, { default: () => 3 }),
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.findAll('.ix-timeline-item').length).toBe(4)
    expect(wrapper.findAll('.ix-timeline-item-end').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ placement: 'start' })
    expect(wrapper.findAll('.ix-timeline-item-start').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ placement: 'alternate' })
    expect(wrapper.findAll('.ix-timeline-item-start').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('reverse work', async () => {
    const wrapper = TimelineMount()
    wrapper.findAll('.ix-timeline-item').forEach((item, index) => {
      expect(item.text()).toBe(index.toString())
    })
    expect(wrapper.html()).toMatchSnapshot()

    const reverseWrapper = TimelineMount({
      props: {
        reverse: true,
      },
    })
    reverseWrapper.findAll('.ix-timeline-item').forEach((item, index) => {
      expect(item.text()).toBe((3 - index).toString())
    })
    expect(reverseWrapper.html()).toMatchSnapshot()
  })

  test('pending work', async () => {
    const wrapper = TimelineMount()
    const pendingText = 'pendingText'

    expect(wrapper.findAll('.ix-timeline-item').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ pending: true })
    expect(wrapper.findAll('.ix-timeline-item').length).toBe(5)
    expect(wrapper.findAll('.ix-timeline-item')[3].classes()).toContain('ix-timeline-item-pending')
    expect(wrapper.findAll('.ix-timeline-item')[4].classes()).toContain('ix-timeline-item-pending-dot')
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ pending: pendingText })
    expect(wrapper.findAll('.ix-timeline-item').length).toBe(5)
    expect(wrapper.findAll('.ix-timeline-item')[3].classes()).toContain('ix-timeline-item-pending')
    expect(wrapper.findAll('.ix-timeline-item')[4].classes()).toContain('ix-timeline-item-pending-dot')
    expect(wrapper.findAll('.ix-timeline-item')[4].text()).toBe(pendingText)
    expect(wrapper.html()).toMatchSnapshot()

    const reverseWrapper = TimelineMount({
      props: {
        pending: true,
        reverse: true,
      },
    })

    reverseWrapper.findAll('.ix-timeline-item').forEach((item, index) => {
      if (index === 0) {
        expect(item.classes()).toContain('ix-timeline-item-pending')
        expect(item.classes()).toContain('ix-timeline-item-pending-dot')
      } else {
        expect(item.text()).toBe((4 - index).toString())
      }
    })
    expect(reverseWrapper.html()).toMatchSnapshot()
  })

  test('pending slot work', async () => {
    const pendingSlotText = 'pendingSlotText'
    const pendingText = 'pendingText'
    const wrapper = TimelineMount({
      slots: {
        pending: pendingSlotText,
      },
    })

    expect(wrapper.findAll('.ix-timeline-item').length).toBe(5)
    expect(wrapper.findAll('.ix-timeline-item')[3].classes()).toContain('ix-timeline-item-pending')
    expect(wrapper.findAll('.ix-timeline-item')[4].classes()).toContain('ix-timeline-item-pending-dot')
    expect(wrapper.findAll('.ix-timeline-item')[4].text()).toBe(pendingSlotText)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ pending: pendingText })
    expect(wrapper.findAll('.ix-timeline-item')[4].text()).toBe(pendingSlotText)
    expect(wrapper.html()).toMatchSnapshot()

    const reverseWrapper = TimelineMount({
      slots: {
        pending: pendingSlotText,
      },
      props: {
        reverse: true,
      },
    })

    reverseWrapper.findAll('.ix-timeline-item').forEach((item, index) => {
      if (index === 0) {
        expect(item.classes()).toContain('ix-timeline-item-pending')
        expect(item.classes()).toContain('ix-timeline-item-pending-dot')
      } else {
        expect(item.text()).toBe((4 - index).toString())
      }
    })
    expect(reverseWrapper.html()).toMatchSnapshot()
  })

  test('pendingDot work', async () => {
    const wrapper = TimelineMount({
      props: {
        pending: true,
      },
    })
    const pendingDotText = 'pendingDotText'

    expect(wrapper.findAll('.ix-timeline-item')[4].find('.ix-timeline-item-dot').find('.ix-icon').classes()).toContain(
      'ix-icon-loading',
    )
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ pendingDot: pendingDotText })
    expect(wrapper.findAll('.ix-timeline-item')[4].find('.ix-timeline-item-dot').text()).toBe(pendingDotText)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('both work', async () => {
    const wrapper = TimelineMount({
      props: {
        both: false,
      },
    })

    expect(wrapper.classes()).toContain('ix-timeline-not-both')
  })
})

describe('TimelineItem', () => {
  test('color work', async () => {
    const wrapper = TimelineMount({
      slots: {
        default: [
          h(IxTimelineItem, { color: 'red' }, { default: () => 0 }),
          h(IxTimelineItem, { color: 'black' }, { default: () => 1 }),
        ],
      },
    })

    const items = wrapper.findAll('.ix-timeline-item')
    expect(items[0].find('.ix-timeline-item-dot').classes()).toContain('ix-timeline-item-dot-red')

    expect(items[1].find('.ix-timeline-item-dot-black').exists()).toBe(false)
    expect(items[1].find('.ix-timeline-item-dot').html()).toContain('style="color: black; border-color: black;"')
  })

  test('dot work', async () => {
    const dotText = 'dotText'
    const wrapper = TimelineMount({
      slots: {
        default: [h(IxTimelineItem, { dot: 'dotText' }, { default: () => 0 })],
      },
    })

    const items = wrapper.findAll('.ix-timeline-item')

    expect(items[0].find('.ix-timeline-item-dot-custom').exists()).toBe(true)
    expect(items[0].find('.ix-timeline-item-dot').classes()).toContain('ix-timeline-item-dot-custom')
    expect(items[0].find('.ix-timeline-item-dot').text()).toBe(dotText)
  })

  test('dot slot work', async () => {
    const dotSlotText = 'dotSlotText'
    const wrapper = TimelineMount({
      slots: {
        default: [h(IxTimelineItem, { dot: 'dotText' }, { dot: () => dotSlotText })],
      },
    })

    const items = wrapper.findAll('.ix-timeline-item')

    expect(items[0].find('.ix-timeline-item-dot-custom').exists()).toBe(true)
    expect(items[0].find('.ix-timeline-item-dot').classes()).toContain('ix-timeline-item-dot-custom')
    expect(items[0].find('.ix-timeline-item-dot').text()).toBe(dotSlotText)
  })

  test('label work', async () => {
    const labelText = 'labelText'
    const wrapper = TimelineMount({
      slots: {
        default: [h(IxTimelineItem, { label: labelText }, { dot: () => 0 })],
      },
    })

    const items = wrapper.findAll('.ix-timeline-item')

    expect(items[0].find('.ix-timeline-item-label').exists()).toBe(true)
    expect(items[0].find('.ix-timeline-item-label').text()).toBe(labelText)
  })

  test('label slot work', async () => {
    const labelText = 'labelText'
    const labelSlotText = 'dotSlotText'
    const wrapper = TimelineMount({
      slots: {
        default: [h(IxTimelineItem, { label: labelText }, { label: () => labelSlotText })],
      },
    })

    const items = wrapper.findAll('.ix-timeline-item')

    expect(items[0].find('.ix-timeline-item-label').exists()).toBe(true)
    expect(items[0].find('.ix-timeline-item-label').text()).toBe(labelSlotText)
  })
})
