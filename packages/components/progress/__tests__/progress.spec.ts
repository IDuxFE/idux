import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import IxProgress from '../src/Progress.vue'
import { ProgressProps } from '../src/types'

describe('Progress.vue', () => {
  let ProgressMount: (options?: MountingOptions<Partial<ProgressProps>>) => VueWrapper<InstanceType<typeof IxProgress>>

  beforeEach(() => {
    ProgressMount = options => mount(IxProgress, { ...options })
  })

  test('render line progress work', () => {
    const wrapper = ProgressMount({ props: { percent: 50 } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render circle progress work', () => {
    const wrapper = ProgressMount({ props: { type: 'circle', percent: 50 } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render dashboard progress work', () => {
    const wrapper = ProgressMount({ props: { type: 'dashboard', percent: 50 } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render info content', async () => {
    const wrapper = ProgressMount({ props: { percent: 0 } })
    expect(wrapper.text()).toBe('0%')

    await wrapper.setProps({ percent: 50 })
    expect(wrapper.text()).toBe('50%')

    await wrapper.setProps({ percent: 100 })
    expect(wrapper.text()).toBe('')
  })

  test('render out-of-range info content', async () => {
    const wrapper = ProgressMount({ props: { percent: -10 } })
    expect(wrapper.text()).toBe('0%')

    await wrapper.setProps({ percent: 110 })
    expect(wrapper.text()).toBe('')
  })

  test('render info content with hideInfo', () => {
    const wrapper = ProgressMount({ props: { percent: 50, hideInfo: true } })
    expect(wrapper.classes('ix-progress-text')).toBe(false)
  })

  test('render info content by format', () => {
    const wrapper = ProgressMount({ props: { percent: 50, format: percent => `format: ${percent}` } })
    expect(wrapper.text()).toBe('format: 50')
  })

  test('render info content by slot', () => {
    const text = 'render by slot'
    const wrapper = ProgressMount({ props: { percent: 50 }, slots: { format: text } })
    expect(wrapper.text()).toBe(text)
  })

  test('status work', async () => {
    const wrapper = ProgressMount({ props: { percent: 50, status: 'normal' } })
    expect(wrapper.classes('ix-progress-status-normal')).toBe(true)

    await wrapper.setProps({ status: 'success' })
    expect(wrapper.classes('ix-progress-status-success')).toBe(true)

    await wrapper.setProps({ status: 'exception' })
    expect(wrapper.classes('ix-progress-status-exception')).toBe(true)

    await wrapper.setProps({ status: 'active' })
    expect(wrapper.classes('ix-progress-status-active')).toBe(true)
  })

  test('should show success status when percent = 100', () => {
    const wrapper = ProgressMount({ props: { percent: 100 } })
    expect(wrapper.classes('ix-progress-status-success')).toBe(true)
  })

  test('strokeLinecap work', async () => {
    const wrapper = ProgressMount({ props: { percent: 50, strokeLinecap: 'round' } })
    expect(wrapper.classes('ix-progress-round')).toBe(true)

    await wrapper.setProps({ strokeLinecap: 'square' })
    expect(wrapper.classes('ix-progress-round')).toBe(false)
  })

  test('strokeColor work', async () => {
    const wrapperLine = ProgressMount({ props: { percent: 50, strokeColor: 'red' } })
    const wrapperCircle = ProgressMount({
      props: { type: 'circle', percent: 50, strokeColor: { '0%': '#108ee9', '100%': '#87d068' } },
    })
    expect(wrapperLine.html()).toMatchSnapshot()
    expect(wrapperCircle.html()).toMatchSnapshot()

    await wrapperLine.setProps({ strokeColor: { from: '#108ee9', to: '#87d068' } })
    expect(wrapperLine.html()).toMatchSnapshot()

    await wrapperLine.setProps({ strokeColor: { '0%': '#108ee9', '100%': '#87d068' } })
    expect(wrapperLine.html()).toMatchSnapshot()
  })

  test('render successColor progress', () => {
    const wrapper = ProgressMount({ props: { percent: 50, success: { percent: 20, strokeColor: 'red' } } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('trailColor work', () => {
    const wrapper = ProgressMount({ props: { percent: 50, trailColor: 'red' } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('gapPosition work', async () => {
    const wrapper = ProgressMount({ props: { type: 'dashboard', percent: 50, trailColor: 'red' } })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ gapPosition: 'left' })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ gapPosition: 'right' })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
