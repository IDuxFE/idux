import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { isElementVisible, renderWork } from '@tests'

import DrawerProvider from '../src/DrawerProvider'
import { DrawerProviderInstance } from '../src/types'

describe('DrawerProvider', () => {
  const DrawerProviderMount = (options?: MountingOptions<Record<string, never>>) => {
    return mount(DrawerProvider, {
      ...options,
    }) as VueWrapper<DrawerProviderInstance>
  }

  const wrapper = DrawerProviderMount()
  let header = 'This is header'
  const content = 'Some contents...'

  afterEach(() => {
    header = 'This is header'
    const container = document.querySelector('.ix-drawer-container')
    if (container) {
      container.innerHTML = ''
    }
  })

  describe('basic', () => {
    renderWork(DrawerProvider, { slots: { default: () => h('p', 'Some contents...') } })

    test('open work', async () => {
      const drawerRef = wrapper.vm.open({ header, content })
      await flushPromises()

      expect(document.querySelector('.ix-header-title')!.textContent).toBe(header)
      expect(document.querySelector('.ix-drawer-body')!.textContent).toBe(content)

      drawerRef.destroy()
    })

    test('update work', async () => {
      const drawerRef = wrapper.vm.open({ header, content })
      await flushPromises()

      expect(document.querySelector('.ix-header-title')!.textContent).toBe(header)
      expect(document.querySelector('.ix-drawer-body')!.textContent).toBe(content)

      header = 'This is header2'
      wrapper.vm.update(drawerRef.key, { header })
      await flushPromises()

      expect(document.querySelector('.ix-header-title')!.textContent).toBe(header)

      drawerRef.destroy()
    })

    test('destroy work', async () => {
      const drawerRef = wrapper.vm.open({ header, content })
      await flushPromises()

      expect(document.querySelectorAll('.ix-drawer-wrapper').length).toBe(1)

      wrapper.vm.destroy(drawerRef.key)
      await flushPromises()

      expect(document.querySelectorAll('.ix-drawer-wrapper').length).toBe(0)
    })

    test('destroyAll work', async () => {
      wrapper.vm.open({ header, content })
      wrapper.vm.open({ header, content })
      wrapper.vm.open({ header, content })

      await flushPromises()

      expect(document.querySelectorAll('.ix-drawer-wrapper').length).toBe(3)

      wrapper.vm.destroyAll()
      await flushPromises()

      expect(document.querySelectorAll('.ix-drawer-wrapper').length).toBe(0)
    })
  })

  describe('drawerRef', () => {
    test('open and close work', async () => {
      const onClose = jest.fn()
      const drawerRef = wrapper.vm.open({ onClose, destroyOnHide: false, header, content })
      await flushPromises()

      drawerRef.close('close')
      await flushPromises()

      expect(onClose).toBeCalledWith('close')
      expect(isElementVisible(document.querySelector('.ix-drawer'))).toBe(false)

      drawerRef.open()
      await flushPromises()

      expect(isElementVisible(document.querySelector('.ix-drawer'))).toBe(true)
    })

    test('destroy work', async () => {
      const onDestroy = jest.fn()
      const drawerRef = wrapper.vm.open({ onDestroy, header, content })
      await flushPromises()

      drawerRef.destroy()
      await flushPromises()

      expect(onDestroy).toBeCalled()
      expect(document.querySelectorAll('.ix-drawer-wrapper').length).toBe(0)
    })
  })
})
