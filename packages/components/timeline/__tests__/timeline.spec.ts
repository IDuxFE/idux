import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent, defineComponent, h } from 'vue'
import { renderWork } from '@tests'
import IxTimeline from '../src/Timeline.vue'
import IxTimelineItem from '../src/TimelineItem.vue'
import type { TimelineProps } from '../src/types'

const TimelineDefaultSlots = defineComponent({
  components: { IxTimelineItem },
  render() {
    return [
      h(IxTimelineItem, {}, { default: () => 0 }),
      h(IxTimelineItem, {}, { default: () => 1 }),
      h(IxTimelineItem, {}, { default: () => 2 }),
      h(IxTimelineItem, {}, { default: () => 3 }),
    ]
  },
})

describe('Timeline.vue', () => {
  let TimelineMount: (
    options?: MountingOptions<Partial<TimelineProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<TimelineProps>>>

  beforeEach(() => {
    TimelineMount = (options = {}) => {
      return mount<TimelineProps>(IxTimeline, {
        ...options,
      })
    }
  })

  renderWork(IxTimeline)

  test('position work', async () => {
    const wrapper = TimelineMount({
      slots: {
        default: TimelineDefaultSlots,
      },
    })
    expect(wrapper.findAll('.ix-timeline-item').length).toBe(4)
    expect(wrapper.findAll('.ix-timeline-item-right').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ position: 'left' })
    expect(wrapper.findAll('.ix-timeline-item-left').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ position: 'alternate' })
    expect(wrapper.findAll('.ix-timeline-item-left').length).toBe(2)
    expect(wrapper.findAll('.ix-timeline-item-right').length).toBe(2)
    wrapper.findAll('.ix-timeline-item').forEach((item, index) => {
      const position = index % 2 ? 'left' : 'right'

      expect(item.classes()).toContain(`ix-timeline-item-${position}`)
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('reverse work', async () => {
    const wrapper = TimelineMount({
      slots: {
        default: TimelineDefaultSlots,
      },
    })
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
    const wrapper = TimelineMount({
      slots: {
        default: TimelineDefaultSlots,
      },
    })
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
      slots: {
        default: TimelineDefaultSlots,
      },
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
        default: TimelineDefaultSlots,
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
        default: TimelineDefaultSlots,
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
      slots: {
        default: TimelineDefaultSlots,
      },
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

  test('pendingDot slot work', async () => {
    const pendingDotSlotText = 'pendingDotSlotText'
    const pendingDotText = 'pendingDotText'
    const wrapper = TimelineMount({
      slots: {
        default: TimelineDefaultSlots,
        pendingDot: pendingDotSlotText,
      },
      props: {
        pending: true,
      },
    })

    expect(wrapper.findAll('.ix-timeline-item')[4].find('.ix-timeline-item-dot').findAll('.ix-icon').length).toBe(0)
    expect(wrapper.findAll('.ix-timeline-item')[4].find('.ix-timeline-item-dot').text()).toBe(pendingDotSlotText)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ pendingDot: pendingDotText })
    expect(wrapper.findAll('.ix-timeline-item')[4].find('.ix-timeline-item-dot').text()).toBe(pendingDotSlotText)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
