import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxBadge from '../src/Badge'
import { BadgeProps } from '../src/types'

describe('Badge', () => {
  const BadgeMount = (options?: MountingOptions<Partial<BadgeProps>>) => mount(IxBadge, { ...options })

  renderWork(IxBadge, { props: { count: 9 }, slots: { default: '<a href="#"></a>' } })
  renderWork(IxBadge, { props: { count: 9 } })

  test('count work', async () => {
    const wrapper = BadgeMount({ props: { count: 10 } })

    let countCurrents = wrapper.findAll('.ix-badge-count-current')

    expect(countCurrents[0].text()).toBe('1')
    expect(countCurrents[1].text()).toBe('0')

    await wrapper.setProps({ count: '50' })
    countCurrents = wrapper.findAll('.ix-badge-count-current')

    expect(countCurrents[0].text()).toBe('5')
    expect(countCurrents[1].text()).toBe('0')

    // 非 number 情况
    await wrapper.setProps({ count: 'New' })

    expect(wrapper.find('.ix-badge-count-current').exists()).toBe(false)
    expect(wrapper.find('.ix-badge-count').text()).toBe('New')
  })

  test('count slot work', async () => {
    const wrapper = BadgeMount({ slots: { count: '<div class="count-slot"></div>' } })
    expect(wrapper.find('.count-slot').exists()).toBe(true)
  })

  test('dot work', async () => {
    const wrapper = BadgeMount({ props: { dot: true } })

    expect(wrapper.find('.ix-badge-dot').exists()).toBe(true)
    expect(wrapper.find('.ix-badge-count').exists()).toBe(false)

    await wrapper.setProps({ dot: false })

    expect(wrapper.find('.ix-badge-dot').exists()).toBe(false)
    expect(wrapper.find('.ix-badge-count').exists()).toBe(false)

    await wrapper.setProps({ count: 9 })

    expect(wrapper.find('.ix-badge-dot').exists()).toBe(false)
    expect(wrapper.find('.ix-badge-count').exists()).toBe(true)
  })

  test('overflowCount work', async () => {
    const wrapper = BadgeMount({ props: { count: 100 } })

    expect(wrapper.find('.ix-badge-count').text()).toBe('99+')

    await wrapper.setProps({ count: 1000, overflowCount: 999 })

    expect(wrapper.find('.ix-badge-count').text()).toBe('999+')

    await wrapper.setProps({ count: 1000, overflowCount: '888' })

    expect(wrapper.find('.ix-badge-count').text()).toBe('888+')

    await wrapper.setProps({ count: 1000, overflowCount: 'xxx' })

    const countCurrents = wrapper.findAll('.ix-badge-count-current')

    expect(countCurrents[0].text()).toBe('1')
    expect(countCurrents[1].text()).toBe('0')
    expect(countCurrents[2].text()).toBe('0')
  })

  test('showZero work', async () => {
    const wrapper = BadgeMount({ props: { count: 0 } })

    expect(wrapper.find('.ix-badge-count').exists()).toBe(false)

    await wrapper.setProps({ showZero: true })

    expect(wrapper.find('.ix-badge-count').exists()).toBe(true)
    expect(wrapper.find('.ix-badge-count-current').text()).toBe('0')
  })

  test('status work', async () => {
    const wrapper = BadgeMount({ props: { status: 'error' } })

    expect(wrapper.classes()).toContain('ix-badge-error')

    await wrapper.setProps({ status: 'info' })

    expect(wrapper.classes()).toContain('ix-badge-info')
  })

  test('title work', async () => {
    const wrapper = BadgeMount({ props: { count: 9 } })

    expect(wrapper.find('.ix-badge-count').attributes().title).toBe('9')

    await wrapper.setProps({ title: 'custom title' })

    expect(wrapper.find('.ix-badge-count').attributes().title).toBe('custom title')
  })
})
