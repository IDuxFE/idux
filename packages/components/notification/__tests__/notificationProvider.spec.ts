import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'

import { renderWork, wait } from '@tests'

import NotificationProvider from '@idux/components/notification/src/NotificationProvider'

import { NotificationProviderInstance, NotificationProviderProps } from '../src/types'

const notificationCls = 'ix-notification'

describe('NotificationProvider', () => {
  const NotificationProviderMount = (options?: MountingOptions<NotificationProviderProps>) => {
    return mount(NotificationProvider, { ...options }) as VueWrapper<NotificationProviderInstance>
  }
  const defaultTitle = 'notification default title'
  const defaultContent = 'notification default content'

  afterEach(() => {
    const container = document.querySelector(`.${notificationCls}-container`)
    if (container) {
      container.innerHTML = ''
    }
  })

  describe('basic', () => {
    renderWork(NotificationProvider, { props: { title: defaultTitle, content: defaultContent } })

    test('open work', async () => {
      const wrapper = NotificationProviderMount()
      const title = 'open test title'
      const content = 'open test content'
      const notificationRef = wrapper.vm.open({ content, title })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}-title`)!.textContent).toBe(title)
      expect(document.querySelector(`.${notificationCls}-content`)!.textContent).toBe(content)

      notificationRef.destroy()
    })

    test('info work', async () => {
      const wrapper = NotificationProviderMount()
      const notificationRef = wrapper.vm.info({
        title: defaultTitle,
        content: defaultContent,
      })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}`)!.className).toMatch(`${notificationCls}-info`)

      notificationRef.destroy()
    })

    test('success work', async () => {
      const wrapper = NotificationProviderMount()
      const notificationRef = wrapper.vm.success({
        title: defaultTitle,
        content: defaultContent,
      })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}`)!.className).toMatch(`${notificationCls}-success`)

      notificationRef.destroy()
    })

    test('warning work', async () => {
      const wrapper = NotificationProviderMount()
      const notificationRef = wrapper.vm.warning({
        title: defaultTitle,
        content: defaultContent,
      })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}`)!.className).toMatch(`${notificationCls}-warning`)

      notificationRef.destroy()
    })

    test('error work', async () => {
      const wrapper = NotificationProviderMount()
      const notificationRef = wrapper.vm.error({
        title: defaultTitle,
        content: defaultContent,
      })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}`)!.className).toMatch(`${notificationCls}-error`)

      notificationRef.destroy()
    })

    test('update work', async () => {
      const wrapper = NotificationProviderMount()
      const title = 'open test title'
      const content = 'open test content'
      const newContent = 'open update content'
      const notificationRef = wrapper.vm.open({ title, content })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}-content`)!.textContent).toBe(content)

      wrapper.vm.update(notificationRef.key, { content: newContent })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}-content`)!.textContent).toBe(newContent)

      notificationRef.destroy()
    })

    test('destroy work', async () => {
      const wrapper = NotificationProviderMount()
      const notificationRef = wrapper.vm.open({
        title: defaultTitle,
        content: defaultContent,
      })
      await flushPromises()

      expect(document.querySelectorAll(`.${notificationCls}`).length).toBe(1)

      wrapper.vm.destroy(notificationRef.key)
      await flushPromises()

      expect(document.querySelectorAll(`.${notificationCls}`).length).toBe(0)
    })

    test('destroyAll work', async () => {
      const wrapper = NotificationProviderMount()
      wrapper.vm.open({
        title: defaultTitle,
        content: defaultContent,
      })
      wrapper.vm.open({
        title: defaultTitle,
        content: defaultContent,
      })
      wrapper.vm.open({
        title: defaultTitle,
        content: defaultContent,
      })
      await flushPromises()

      expect(document.querySelectorAll(`.${notificationCls}`).length).toBe(3)

      wrapper.vm.destroyAll()
      await flushPromises()

      expect(document.querySelectorAll(`.${notificationCls}`).length).toBe(0)
    })

    // todo 待transitionGroup测试有解决方案再处理
    // test('placement work', async () => {
    //   const wrapper = NotificationProviderMount()
    //   const notificationRef = wrapper.vm.open({
    //     title: defaultTitle,
    //     content: defaultContent,
    //     placement: 'topStart',
    //   })
    //   await flushPromises()
    //
    //   const notificationRect = document.querySelector(`.${notificationCls}-wrapper-topStart`)!.getBoundingClientRect()
    //
    //   expect(notificationRect.left).toBe('24px')
    //   expect(notificationRect.top).toBe('24px')
    //
    //   notificationRef.destroy()
    // })
  })

  describe('notificationRef', () => {
    test('update work', async () => {
      const wrapper = NotificationProviderMount()
      const newContent = 'This is new test content'
      const notificationRef = wrapper.vm.open({
        title: defaultTitle,
        content: defaultContent,
      })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}-content`)!.textContent).toBe(defaultContent)

      notificationRef.update({ content: newContent })
      await flushPromises()

      expect(document.querySelector(`.${notificationCls}-content`)!.textContent).toBe(newContent)

      notificationRef.destroy()
    })

    test('destroy work', async () => {
      const wrapper = NotificationProviderMount()
      const notificationRef = wrapper.vm.open({
        title: defaultTitle,
        content: defaultContent,
      })
      await flushPromises()

      expect(document.querySelectorAll(`.${notificationCls}`).length).toBe(1)

      notificationRef.destroy()
      await flushPromises()

      expect(document.querySelectorAll(`.${notificationCls}`).length).toBe(0)
    })
  })

  describe('props', () => {
    test('maxCount work', async () => {
      const wrapper = NotificationProviderMount({ props: { maxCount: 3 } })
      for (let i = 0; i < 5; i++) {
        wrapper.vm.open({
          title: defaultTitle,
          content: defaultContent,
          duration: 20,
        })
      }
      await flushPromises()

      expect(document.querySelectorAll(`.${notificationCls}`).length).toBe(3)

      await wait(20)

      await wrapper.setProps({ maxCount: 5 })

      for (let i = 0; i < 7; i++) {
        wrapper.vm.open({
          title: defaultTitle,
          content: defaultContent,
        })
      }
      await flushPromises()

      expect(document.querySelectorAll(`.${notificationCls}`).length).toBe(5)

      wrapper.vm.destroyAll()
    })

    //todo 待transitionGroup测试有解决方案再处理
    // test('offset work', async () => {
    //   const wrapper = NotificationProviderMount({
    //     props: { offset: 48 },
    //   })
    //   const notificationRef = wrapper.vm.open({
    //     title: defaultTitle,
    //     content: defaultContent,
    //   })
    //   await flushPromises()
    //
    //   const notificationRect = document.querySelector(`.${notificationCls}`)!.getBoundingClientRect()
    //
    //   expect(notificationRect.right).toBe('48px')
    //   expect(notificationRect.top).toBe('48px')
    //
    //   notificationRef.destroy()
    // })
  })
})
