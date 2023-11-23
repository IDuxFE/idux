import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxIcon } from '@idux/components/icon'

import IxTag from '../src/Tag'
import { TagProps } from '../src/types'

describe('Tag', () => {
  const TagMount = (options?: MountingOptions<Partial<TagProps>>) => mount(IxTag, { ...options })

  renderWork(IxTag, { slots: { default: () => 'test tag' } })

  test('bordered work', async () => {
    const wrapper = TagMount({ props: { bordered: true } })

    expect(wrapper.classes()).toContain('ix-tag-bordered')

    await wrapper.setProps({ bordered: false })

    expect(wrapper.classes()).not.toContain('ix-tag-bordered')
  })

  test('filled work', async () => {
    const wrapper = TagMount({ props: { filled: true } })

    expect(wrapper.classes()).toContain('ix-tag-filled')

    await wrapper.setProps({ filled: false })

    expect(wrapper.classes()).not.toContain('ix-tag-filled')
  })

  test('icon work', async () => {
    const wrapper = TagMount({ props: { icon: 'up' } })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ icon: 'down' })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)
  })

  test('icon slot work', async () => {
    const wrapper = TagMount({ props: { icon: 'up' }, slots: { icon: () => h(IxIcon, { name: 'down' }) } })

    expect(wrapper.find('.ix-icon-up').exists()).not.toBe(true)
    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)
  })

  test('number work', async () => {
    const wrapper = TagMount({ props: { number: 2 } })

    expect(wrapper.classes()).toContain('ix-tag-numeric')
    expect(wrapper.find('.ix-tag-numeric-prefix').text()).toBe('2')
  })

  test('number exceeds 9 work', async () => {
    const wrapper = TagMount({ props: { number: 10000 } })
    expect(wrapper.find('.ix-tag-numeric-prefix').text()).toBe('9+')
  })

  test('shape work', async () => {
    const wrapper = TagMount({ props: { shape: 'round' } })

    expect(wrapper.classes()).toContain('ix-tag-round')

    await wrapper.setProps({ shape: 'rect' })

    expect(wrapper.classes()).toContain('ix-tag-rect')
  })

  test('status work', async () => {
    const wrapper = TagMount({ props: { status: 'success' } })

    expect(wrapper.classes()).toContain('ix-tag-success')

    await wrapper.setProps({ status: 'fatal' })

    expect(wrapper.classes()).toContain('ix-tag-fatal')

    await wrapper.setProps({ status: undefined })

    expect(wrapper.classes()).toContain('ix-tag-normal')
  })
})
