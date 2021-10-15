import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxIcon } from '@idux/components/icon'

import IxTag from '../src/Tag'
import { TagProps } from '../src/types'

describe('Tag', () => {
  const TagMount = (options?: MountingOptions<Partial<TagProps>>) => mount(IxTag, { ...options })

  renderWork(IxTag, { slots: { default: () => 'test tag' } })

  test('checkable work', async () => {
    const wrapper = TagMount({ props: { checkable: true } })

    expect(wrapper.classes()).toContain('ix-tag-checkable')

    await wrapper.setProps({ checkable: false })

    expect(wrapper.classes()).not.toContain('ix-tag-checkable')
  })

  test('checked work', async () => {
    const wrapper = TagMount({ props: { checked: true } })

    expect(wrapper.classes()).toContain('ix-tag-checked')

    await wrapper.setProps({ checked: false })

    expect(wrapper.classes()).not.toContain('ix-tag-checked')
  })

  test('color work', async () => {
    const wrapper = TagMount({ props: { color: 'red' } })

    expect(wrapper.classes()).toContain('ix-tag-red')

    await wrapper.setProps({ color: 'success' })

    expect(wrapper.classes()).toContain('ix-tag-success')

    await wrapper.setProps({ color: '#123456' })

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
})
