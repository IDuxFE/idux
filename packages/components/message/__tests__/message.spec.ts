import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork, wait } from '@tests'

import { IxIcon } from '@idux/components/icon'

import Message from '../src/Message'
import { MessageProps } from '../src/types'

describe('Message', () => {
  const content = 'This is a message'
  const MessageMount = (options?: MountingOptions<Partial<MessageProps>>) => {
    const { props, slots, ...rest } = options || {}
    const _options = {
      props: { visible: true, duration: 99, ...props },
      slots: { default: () => content, ...slots },
      attachTo: 'body',
      ...rest,
    } as MountingOptions<MessageProps>
    return mount(Message, _options)
  }

  renderWork<MessageProps>(Message, {
    props: { visible: true },
    slots: { default: () => content },
    attachTo: 'body',
  })

  test('visible work', async () => {
    const onUpdateVisible = jest.fn()
    const wrapper = MessageMount({ props: { visible: false, 'onUpdate:visible': onUpdateVisible } })
    await flushPromises()

    expect(wrapper.isVisible()).toBe(false)

    await wrapper.setProps({ visible: true })

    expect(wrapper.isVisible()).toBe(true)

    await wait(100)

    expect(wrapper.isVisible()).toBe(false)
    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('destroyOnHover work', async () => {
    const wrapper = MessageMount()
    await flushPromises()
    await wrapper.trigger('mouseenter')
    await wait(100)

    expect(wrapper.isVisible()).toBe(true)

    await wrapper.trigger('mouseleave')
    await wait(100)

    expect(wrapper.isVisible()).toBe(false)

    await wrapper.setProps({ visible: true, destroyOnHover: true })

    await wrapper.trigger('mouseenter')
    await wait(100)

    expect(wrapper.isVisible()).toBe(false)
  })

  test(`duration work`, async () => {
    const wrapper = MessageMount()
    await flushPromises()
    await wait(100)

    expect(wrapper.isVisible()).toBe(false)

    await wrapper.setProps({ visible: false })
    await wrapper.setProps({ visible: true, duration: 199 })

    expect(wrapper.isVisible()).toBe(true)

    await wait(100)

    expect(wrapper.isVisible()).toBe(true)

    await wait(100)

    expect(wrapper.isVisible()).toBe(false)

    await wrapper.setProps({ visible: false })
    await wrapper.setProps({ visible: true, duration: 98 })
    await wait(50)
    await wrapper.setProps({ duration: 99 })
    await wait(50)

    expect(wrapper.isVisible()).toBe(true)

    await wait(50)

    expect(wrapper.isVisible()).toBe(false)
  })

  test('icon work', async () => {
    const wrapper = MessageMount({ props: { icon: 'up' } })
    await flushPromises()

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ icon: 'down' })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.setProps({ icon: h(IxIcon, { name: 'up' }) })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)
  })

  test('type work', async () => {
    const wrapper = MessageMount()
    await flushPromises()

    expect(wrapper.classes()).toContain('ix-message-info')

    await wrapper.setProps({ type: 'success' })

    expect(wrapper.classes()).toContain('ix-message-success')
  })
})
