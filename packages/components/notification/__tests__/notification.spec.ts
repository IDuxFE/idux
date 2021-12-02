import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork, wait } from '@tests'

import { IxButton } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'

import Notification from '../src/Notification'
import { NotificationProps } from '../src/types'

const notificationWrapCls = 'ix-notification'

describe('Notification', () => {
  const titleText = 'This is a title'
  const contentText = 'This is a notification'

  const NotificationMount = (options?: MountingOptions<Partial<NotificationProps>>) => {
    const { props, ...rest } = options || {}
    const _options = {
      props: {
        visible: true,
        title: titleText,
        content: contentText,
        ...props,
      },
      attachTo: 'body',
      ...rest,
    } as MountingOptions<NotificationProps>
    return mount(Notification, { ..._options })
  }

  renderWork<NotificationProps>(Notification, {
    props: { visible: true },
    slots: {
      title: () => titleText,
      default: () => contentText,
    },
  })

  test('visible work', async () => {
    const onUpdateVisible = jest.fn()
    const wrapper = NotificationMount({
      props: {
        visible: false,
        'onUpdate:visible': onUpdateVisible,
        duration: 50,
      },
    })
    await flushPromises()

    expect(wrapper.isVisible()).toBe(false)

    await wrapper.setProps({ visible: true })

    expect(wrapper.isVisible()).toBe(true)

    await wait(50)
    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('destroyOnHover work', async () => {
    const onUpdateVisible = jest.fn()
    const wrapper = NotificationMount({
      propsData: {
        visible: false,
        'onUpdate:visible': onUpdateVisible,
        duration: 10,
      },
    })
    const wrapperDom = wrapper.find(`.${notificationWrapCls}`)

    await wrapper.setProps({
      visible: true,
    })
    await flushPromises()
    await wrapperDom.trigger('mouseenter')
    await wait(10)

    expect(onUpdateVisible).not.toBeCalled()

    await wrapperDom.trigger('mouseleave')
    await wait(10)

    expect(onUpdateVisible).toBeCalledWith(false)

    await wrapper.setProps({
      visible: true,
      destroyOnHover: true,
    })
    await wrapperDom.trigger('mouseenter')
    await wait(10)

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('duration work', async () => {
    const onUpdateVisible = jest.fn()
    NotificationMount({
      props: {
        visible: true,
        'onUpdate:visible': onUpdateVisible,
        duration: 20,
      },
    })

    await flushPromises()

    expect(onUpdateVisible).toHaveBeenCalledTimes(0)

    await wait(20)

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('icon work', async () => {
    const wrapper = NotificationMount()
    await flushPromises()

    expect(wrapper.find(`.${notificationWrapCls}-icon`).isVisible()).toBe(false)

    await wrapper.setProps({ icon: 'up' })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ icon: h(IxIcon, { name: 'down' }) })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)
  })

  test('closeIcon work', async () => {
    const wrapper = NotificationMount()
    await flushPromises()

    expect(wrapper.find('.ix-icon-close').exists()).toBe(true)

    await wrapper.setProps({
      closeIcon: 'right',
    })

    expect(wrapper.find('.ix-icon-close').exists()).toBe(false)
    expect(wrapper.find('.ix-icon-right').exists()).toBe(true)

    await wrapper.setProps({
      closeIcon: h(IxIcon, { name: 'left' }),
    })

    expect(wrapper.find('.ix-icon-right').exists()).toBe(false)
    expect(wrapper.find('.ix-icon-left').exists()).toBe(true)
  })

  test('type work', async () => {
    const wrapper = NotificationMount({
      props: {
        type: 'info',
      },
    })
    await flushPromises()

    expect(wrapper.find(`.${notificationWrapCls}`).classes()).toContain(`${notificationWrapCls}-info`)
    expect(wrapper.find('.ix-icon-info-circle').exists()).toBe(true)
  })

  test('title work', async () => {
    const newTitle = 'new title'
    const wrapper = NotificationMount({
      props: {
        title: newTitle,
      },
    })
    await flushPromises()

    expect(wrapper.find(`.${notificationWrapCls}-title`).text()).toBe(newTitle)

    const newSlotTitle = 'new slot title'
    const newWrapper = NotificationMount({
      props: {
        title: newTitle,
      },
      slots: {
        title: newSlotTitle,
      },
    })
    await flushPromises()

    expect(newWrapper.find(`.${notificationWrapCls}-title`).text()).toBe(newSlotTitle)
  })

  test('content work', async () => {
    const newContent = 'This is new content'
    const wrapper = NotificationMount({
      props: {
        content: newContent,
      },
    })
    await flushPromises()

    expect(wrapper.find(`.${notificationWrapCls}-content`).text()).toBe(newContent)

    const newSlotContent = 'new slot content'
    const newWrapper = NotificationMount({
      props: {
        content: newSlotContent,
      },
      slots: {
        title: newSlotContent,
      },
    })
    await flushPromises()

    expect(newWrapper.find(`.${notificationWrapCls}-content`).text()).toBe(newSlotContent)
  })

  test('footer work', async () => {
    const wrapper = NotificationMount()
    await flushPromises()

    expect(wrapper.find(`.${notificationWrapCls}-footer`).text()).toBe('')

    const footerStr = 'footerStr'
    await wrapper.setProps({
      footer: footerStr,
    })

    expect(wrapper.find(`.${notificationWrapCls}-footer`).text()).toContain(footerStr)

    const footerVNode = h('div', { id: 'footVNode' }, footerStr)
    await wrapper.setProps({
      footer: footerVNode,
    })

    expect(wrapper.find('#footVNode').exists()).toBe(true)

    const clickFn = jest.fn()
    await wrapper.setProps({
      footer: [
        {
          mode: 'primary',
          text: 'ok',
          onClick: clickFn,
        },
      ],
    })
    expect(wrapper.find(`.${notificationWrapCls}-footer`).findComponent(IxButton).exists()).toBe(true)
    expect(wrapper.findComponent(IxButton).text()).toContain('ok')

    await wrapper.findComponent(IxButton).trigger('click')

    expect(clickFn).toBeCalled()
  })
})
