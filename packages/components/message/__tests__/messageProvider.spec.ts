import { flushPromises, mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork, wait } from '@tests'
import MessageProvider from '../src/MessageProvider'
import { MessageProviderInstance, MessageProviderProps } from '../src/types'

describe('MessageProvider', () => {
  const MessageProviderMount = (options?: MountingOptions<MessageProviderProps>) => {
    return mount(MessageProvider, { ...options }) as VueWrapper<MessageProviderInstance>
  }

  let content = 'This is a message'

  afterEach(() => {
    content = 'This is a message'

    const container = document.querySelector('.ix-message-container')
    if (container) {
      container.innerHTML = ''
    }
  })

  describe('basic', () => {
    renderWork(MessageProvider, { slots: { default: () => content } })

    test('open work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.open({ content })
      await flushPromises()

      expect(document.querySelector('.ix-message-content-text')!.textContent).toBe(content)

      messageRef.destroy()
    })

    test('info work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.info(content)
      await flushPromises()

      expect(document.querySelector('.ix-message-info')!.textContent).toBe(content)

      messageRef.destroy()
    })

    test('success work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.success(content)
      await flushPromises()

      expect(document.querySelector('.ix-message-success')!.textContent).toBe(content)

      messageRef.destroy()
    })

    test('warning work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.warning(content)
      await flushPromises()

      expect(document.querySelector('.ix-message-warning')!.textContent).toBe(content)

      messageRef.destroy()
    })

    test('error work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.error(content)
      await flushPromises()

      expect(document.querySelector('.ix-message-error')!.textContent).toBe(content)

      messageRef.destroy()
    })

    test('loading work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.loading(content)
      await flushPromises()

      expect(document.querySelector('.ix-message-loading')!.textContent).toBe(content)

      messageRef.destroy()
    })

    test('update work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.open({ content })
      await flushPromises()

      expect(document.querySelector('.ix-message-content-text')!.textContent).toBe(content)

      content = 'This is a message 2 '
      wrapper.vm.update(messageRef.key, { content })
      await flushPromises()

      expect(document.querySelector('.ix-message-content-text')!.textContent).toBe(content)

      messageRef.destroy()
    })

    test('destroy work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.open({ content })
      await flushPromises()

      expect(document.querySelectorAll('.ix-message').length).toBe(1)

      wrapper.vm.destroy(messageRef.key)
      await flushPromises()

      expect(document.querySelectorAll('.ix-message').length).toBe(0)
    })

    test('destroyAll work', async () => {
      const wrapper = MessageProviderMount()
      wrapper.vm.open({ content })
      wrapper.vm.open({ content })
      wrapper.vm.open({ content })

      await flushPromises()

      expect(document.querySelectorAll('.ix-message').length).toBe(3)

      wrapper.vm.destroyAll()
      await flushPromises()

      expect(document.querySelectorAll('.ix-message').length).toBe(0)
    })
  })

  describe('messageRef', () => {
    test('update work', async () => {
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.open({ content })
      await flushPromises()

      expect(document.querySelector('.ix-message-content-text')!.textContent).toBe(content)

      content = 'This is a message 2 '
      messageRef.update({ content })
      await flushPromises()

      expect(document.querySelector('.ix-message-content-text')!.textContent).toBe(content)

      messageRef.destroy()
    })

    test('destroy work', async () => {
      const onDestroy = jest.fn()
      const wrapper = MessageProviderMount()
      const messageRef = wrapper.vm.open({ onDestroy, content })
      await flushPromises()

      messageRef.destroy()
      await flushPromises()

      expect(onDestroy).toBeCalled()
      expect(document.querySelectorAll('.ix-message').length).toBe(0)
    })
  })

  describe('props ', () => {
    test('maxCount work', async () => {
      const wrapper = MessageProviderMount({ props: { maxCount: 3 } })
      wrapper.vm.open({ content, duration: 99 })
      wrapper.vm.open({ content, duration: 99 })
      wrapper.vm.open({ content, duration: 99 })
      wrapper.vm.open({ content, duration: 99 })
      await flushPromises()

      expect(document.querySelectorAll('.ix-message').length).toBe(3)

      await wait(400)

      expect(document.querySelectorAll('.ix-message').length).toBe(0)

      await wrapper.setProps({ maxCount: 4 })

      wrapper.vm.open({ content, duration: 99 })
      wrapper.vm.open({ content, duration: 99 })
      wrapper.vm.open({ content, duration: 99 })
      wrapper.vm.open({ content, duration: 99 })
      await flushPromises()

      expect(document.querySelectorAll('.ix-message').length).toBe(4)

      wrapper.vm.destroyAll()
    })

    // TODO
    test.skip('top work', async () => {
      const wrapper = MessageProviderMount({ props: { top: 20 } })
      wrapper.vm.open({ content })
      await flushPromises()

      expect(document.querySelector('.ix-message-wrapper')!.getAttribute('style')).toContain(`top: 20px`)

      await wrapper.setProps({ props: '100px' })

      expect(document.querySelector('.ix-message-wrapper')!.getAttribute('style')).toContain(`top: 100px`)

      wrapper.vm.destroyAll()
    })
  })
})
