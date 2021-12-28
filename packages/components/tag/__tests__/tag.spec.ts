import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxIcon } from '@idux/components/icon'

import IxTag from '../src/Tag'
import { TagProps } from '../src/types'

describe('Tag', () => {
  const TagMount = (options?: MountingOptions<Partial<TagProps>>) => mount(IxTag, { ...options })

  renderWork(IxTag, { slots: { default: () => 'test tag' } })

  test('color work', async () => {
    const wrapper = TagMount({ props: { color: 'red' } })

    expect(wrapper.classes()).toContain('ix-tag-red')

    await wrapper.setProps({ color: 'success' })

    expect(wrapper.classes()).toContain('ix-tag-success')

    await wrapper.setProps({ color: '#123456' })

    expect(['#123456', 'rgb(18, 52, 86)'].includes(getComputedStyle(wrapper.element).backgroundColor)).toBe(true)

    expect(wrapper.classes()).toContain('ix-tag-has-color')
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

  test('shape work', async () => {
    const wrapper = TagMount({ props: { shape: 'round' } })

    expect(wrapper.classes()).toContain('ix-tag-round')

    await wrapper.setProps({ shape: 'rect' })

    expect(wrapper.classes()).toContain('ix-tag-rect')
  })

  test('number work', async () => {
    const wrapper = TagMount({ props: { number: 2 } })

    expect(wrapper.classes()).toContain('ix-tag-numeric')
    expect(wrapper.find('.ix-tag-numeric-prefix').text()).toBe('2')
  })
})
