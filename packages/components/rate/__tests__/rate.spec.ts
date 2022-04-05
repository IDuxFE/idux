import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Rate from '../src/Rate'
import { RateProps } from '../src/types'

describe('Rate', () => {
  const RateMount = (options?: MountingOptions<Partial<RateProps>>) => mount(Rate, { ...options })

  renderWork(Rate, { props: { value: 3 } })

  test('v-model:value work', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = RateMount({
      props: { value: 3, 'onUpdate:value': onUpdateValue },
    })

    expect(wrapper.findAll('.ix-rate-item-full').length).toBe(3)

    await wrapper.setProps({ value: 2 })

    expect(wrapper.findAll('.ix-rate-item-full').length).toBe(2)

    await wrapper.findAll('.ix-rate-item > span')[4].trigger('click')

    expect(onUpdateValue).toBeCalledWith(5)
  })

  test('allowHalf work', async () => {
    const wrapper = RateMount({
      props: { allowHalf: true, value: 3.5 },
    })

    expect(wrapper.findAll('.ix-rate-item-full').length).toBe(3)
    expect(wrapper.findAll('.ix-rate-item')[3].classes()).toContain('ix-rate-item-half')

    await wrapper.setProps({ value: 2.5 })

    expect(wrapper.findAll('.ix-rate-item-full').length).toBe(2)
    expect(wrapper.findAll('.ix-rate-item')[2].classes()).toContain('ix-rate-item-half')
  })

  test('clearable work', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = RateMount({
      props: { clearable: true, value: 3, 'onUpdate:value': onUpdateValue },
    })

    expect(wrapper.findAll('.ix-rate-item-full').length).toBe(3)

    await wrapper.findAll('.ix-rate-item > span')[2].trigger('click')

    expect(onUpdateValue).toBeCalledWith(0)
  })

  test('count work', async () => {
    const wrapper = RateMount({
      props: { count: 10 },
    })

    expect(wrapper.findAll('.ix-rate-item').length).toBe(10)

    await wrapper.setProps({ count: 3 })

    expect(wrapper.findAll('.ix-rate-item').length).toBe(3)
  })

  test('disabled work', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = RateMount({
      props: { disabled: true, 'onUpdate:value': onUpdateValue },
    })

    await wrapper.findAll('.ix-rate-item > span')[0].trigger('click')

    expect(onUpdateValue).not.toBeCalled()

    await wrapper.setProps({ disabled: false })

    await wrapper.findAll('.ix-rate-item > span')[0].trigger('click')

    expect(onUpdateValue).toBeCalledWith(1)
  })

  test('icon work', async () => {
    const wrapper = RateMount({
      props: { icon: 'up' },
    })

    expect(wrapper.findAll('.ix-icon-up').length).toBe(10)

    await wrapper.setProps({ icon: 'down' })

    expect(wrapper.findAll('.ix-icon-up').length).toBe(0)
    expect(wrapper.findAll('.ix-icon-down').length).toBe(10)
  })

  test('icon slot work', async () => {
    const wrapper = RateMount({
      props: { icon: 'up' },
      slots: { icon: ({ index }) => index },
    })

    expect(wrapper.findAll('.ix-rate-item-first')[0].text()).toBe('0')
    expect(wrapper.findAll('.ix-rate-item-first')[1].text()).toBe('1')
  })

  test('tooltips work', async () => {
    const tooltips = ['Poor', 'Fair', 'Average', 'Good', 'Excellent']
    const wrapper = RateMount({
      props: { tooltips },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
