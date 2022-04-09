import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxAvatar } from '@idux/components/avatar'
import { IxIcon } from '@idux/components/icon'

import IxHeader from '../src/Header'
import { HeaderProps } from '../src/types'

describe('Header', () => {
  const HeaderMount = (options?: MountingOptions<Partial<HeaderProps>>) => mount(IxHeader, { ...options })

  renderWork(IxHeader)

  test('avatar work', async () => {
    const wrapper = HeaderMount({ props: { avatar: 'user' } })

    expect(wrapper.find('.ix-avatar').find('.ix-icon-user').exists()).toBe(true)

    const avatarText = 'avatar'
    await wrapper.setProps({ avatar: { text: avatarText } })

    expect(wrapper.find('.ix-avatar').find('.ix-avatar-text').text()).toBe(avatarText)
  })

  test('avatar slot work', async () => {
    const wrapper = HeaderMount({
      props: { avatar: 'user' },
      slots: { avatar: () => h(IxAvatar, { icon: 'up' }) },
    })

    expect(wrapper.find('.ix-avatar').find('.ix-icon-up').exists()).toBe(true)
  })

  test('description slot work', async () => {
    const wrapper = HeaderMount({ slots: { description: 'slot description' } })

    expect(wrapper.find('.ix-header-description').text()).toBe('slot description')
  })

  test('prefix work', async () => {
    const onPrefixClick = vi.fn()
    const wrapper = HeaderMount({
      props: { prefix: 'up', onPrefixClick },
    })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

    await wrapper.find('.ix-header-prefix').trigger('click')

    expect(onPrefixClick).toBeCalledTimes(1)

    await wrapper.setProps({ prefix: 'down' })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.find('.ix-header-prefix').trigger('click')

    expect(onPrefixClick).toBeCalledTimes(2)
  })

  test('prefix slot work', async () => {
    const wrapper = HeaderMount({
      props: { prefix: 'up' },
      slots: { prefix: '<span class="test-slot-prefix">prefix</span>' },
    })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(false)
    expect(wrapper.find('.test-slot-prefix').exists()).toBe(true)
  })

  test('suffix work', async () => {
    const onSuffixClick = vi.fn()
    const wrapper = HeaderMount({
      props: { suffix: 'up', onSuffixClick },
    })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

    await wrapper.find('.ix-header-suffix').trigger('click')

    expect(onSuffixClick).toBeCalledTimes(1)

    const suffix = h(IxIcon, { name: 'down' })
    await wrapper.setProps({ suffix })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.find('.ix-header-suffix').trigger('click')

    expect(onSuffixClick).toBeCalledTimes(2)
  })

  test('suffix slot work', async () => {
    const wrapper = HeaderMount({
      props: { suffix: 'up' },
      slots: { suffix: '<span class="test-slot-suffix">suffix</span>' },
    })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(false)
    expect(wrapper.find('.test-slot-suffix').exists()).toBe(true)
  })

  test('size work', async () => {
    const wrapper = HeaderMount({ props: { size: 'xl', title: 'title' } })

    expect(wrapper.classes()).toContain('ix-header-xl')

    await wrapper.setProps({ size: undefined })

    expect(wrapper.classes()).toContain('ix-header-md')

    await wrapper.setProps({ size: 'lg' })

    expect(wrapper.classes()).toContain('ix-header-lg')

    await wrapper.setProps({ size: 'sm' })

    expect(wrapper.classes()).toContain('ix-header-sm')
  })

  test('showBar work', async () => {
    const wrapper = HeaderMount({ props: { showBar: true } })

    expect(wrapper.classes()).toContain('ix-header-with-bar')

    await wrapper.setProps({ showBar: false })

    expect(wrapper.classes()).not.toContain('ix-header-with-bar')
  })

  test('subTitle work', async () => {
    const wrapper = HeaderMount({ props: { subTitle: 'subTitle' } })

    expect(wrapper.find('.ix-header-sub-title').text()).toBe('subTitle')

    await wrapper.setProps({ subTitle: 'change subTitle' })

    expect(wrapper.find('.ix-header-sub-title').text()).toBe('change subTitle')
  })

  test('subTitle slot work', async () => {
    const wrapper = HeaderMount({ props: { subTitle: 'subTitle' }, slots: { subTitle: 'slot subTitle' } })

    expect(wrapper.find('.ix-header-sub-title').text()).toBe('slot subTitle')
  })

  test('title work', async () => {
    const wrapper = HeaderMount({ props: { title: 'title' } })

    expect(wrapper.find('.ix-header-title').text()).toBe('title')

    await wrapper.setProps({ title: 'change title' })

    expect(wrapper.find('.ix-header-title').text()).toBe('change title')
  })

  test('title slot work', async () => {
    const wrapper = HeaderMount({ props: { title: 'title' }, slots: { default: 'slot title' } })

    expect(wrapper.find('.ix-header-title').text()).toBe('slot title')
  })
})
