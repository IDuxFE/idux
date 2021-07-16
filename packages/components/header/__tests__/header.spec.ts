import { mount, MountingOptions } from '@vue/test-utils'
import { h } from 'vue'
import { renderWork } from '@tests'
import { IxIcon } from '@idux/components/icon'
import IxHeader from '../src/Header'
import { HeaderProps } from '../src/types'
import { IxAvatar } from '@idux/components/avatar'

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

  test('extra work', async () => {
    const onExtraClick = jest.fn()
    const wrapper = HeaderMount({
      props: { extra: 'up', onExtraClick },
    })

    expect(wrapper.find('.ix-header-extra').exists()).toBe(true)

    await wrapper.find('.ix-icon-up').trigger('click')

    expect(onExtraClick).toBeCalledTimes(1)

    const extra = h(IxIcon, { name: 'down' })
    await wrapper.setProps({ extra })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.find('.ix-icon-down').trigger('click')

    expect(onExtraClick).toBeCalledTimes(2)
  })

  test('extra slot work', async () => {
    const wrapper = HeaderMount({
      props: { extra: 'up' },
      slots: { extra: '<span class="test-slot-extra">extra</span>' },
    })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(false)
    expect(wrapper.find('.test-slot-extra').exists()).toBe(true)
  })

  test('description work', async () => {
    const wrapper = HeaderMount({ props: { description: 'description' } })

    expect(wrapper.find('.ix-header-description').text()).toBe('description')

    await wrapper.setProps({ description: 'change description' })

    expect(wrapper.find('.ix-header-description').text()).toBe('change description')
  })

  test('description slot work', async () => {
    const wrapper = HeaderMount({ props: { description: 'description' }, slots: { description: 'slot description' } })

    expect(wrapper.find('.ix-header-description').text()).toBe('slot description')
  })

  test('prefix work', async () => {
    const onPrefixClick = jest.fn()
    const wrapper = HeaderMount({
      props: { prefix: 'up', onPrefixClick },
    })

    expect(wrapper.find('.ix-header-prefix').exists()).toBe(true)

    await wrapper.find('.ix-icon-up').trigger('click')

    expect(onPrefixClick).toBeCalledTimes(1)

    await wrapper.setProps({ prefix: 'down' })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.find('.ix-icon-down').trigger('click')

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

  test('size work', async () => {
    const wrapper = HeaderMount({ props: { size: 'extraLarge', title: 'title' } })

    expect(wrapper.classes()).toContain('ix-header-extraLarge')

    await wrapper.setProps({ size: undefined })

    expect(wrapper.classes()).toContain('ix-header-large')

    await wrapper.setProps({ size: 'medium' })

    expect(wrapper.classes()).toContain('ix-header-medium')

    await wrapper.setProps({ size: 'small' })

    expect(wrapper.classes()).toContain('ix-header-small')
  })

  test('showBar work', async () => {
    const wrapper = HeaderMount({ props: { showBar: true } })

    expect(wrapper.find('.ix-header-bar').exists()).toBe(true)

    await wrapper.setProps({ showBar: false })

    expect(wrapper.find('.ix-header-bar').exists()).toBe(false)
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
