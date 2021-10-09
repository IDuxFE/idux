import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { isElementVisible, renderWork } from '@tests'

import ModalProvider from '../src/ModalProvider'
import { ModalProviderInstance } from '../src/types'

describe('ModalProvider', () => {
  const ModalProviderMount = (options?: MountingOptions<Record<string, never>>) => {
    return mount(ModalProvider, {
      ...options,
    }) as VueWrapper<ModalProviderInstance>
  }

  const wrapper = ModalProviderMount()
  let header = 'This is header'
  const title = 'This is title'
  const content = 'Some contents...'

  afterEach(() => {
    header = 'This is header'
    const container = document.querySelector('.ix-modal-container')
    if (container) {
      container.innerHTML = ''
    }
  })

  describe('basic', () => {
    renderWork(ModalProvider, { slots: { default: () => h('p', 'Some contents...') } })

    test('open work', async () => {
      const modalRef = wrapper.vm.open({ header, content })
      await flushPromises()

      expect(document.querySelector('.ix-header-title')!.textContent).toBe(header)
      expect(document.querySelector('.ix-modal-body')!.textContent).toBe(content)

      modalRef.destroy()
    })

    test('confirm work', async () => {
      const modalRef = wrapper.vm.confirm({ title, content: h('div', { class: 'modal-content' }, content) })
      await flushPromises()

      expect(document.querySelector('.ix-modal-body-confirm')).not.toBeNull()
      expect(document.querySelector('.ix-modal-body-title')!.textContent).toBe(title)
      expect(document.querySelector('.modal-content')!.textContent).toBe(content)

      modalRef.destroy()
    })

    test('info work', async () => {
      const modalRef = wrapper.vm.info({ title, content: h('div', { class: 'modal-content' }, content) })
      await flushPromises()

      expect(document.querySelector('.ix-modal-body-info')).not.toBeNull()
      expect(document.querySelector('.ix-modal-body-title')!.textContent).toBe(title)
      expect(document.querySelector('.modal-content')!.textContent).toBe(content)

      modalRef.destroy()
    })

    test('success work', async () => {
      const modalRef = wrapper.vm.success({ title, content: h('div', { class: 'modal-content' }, content) })
      await flushPromises()

      expect(document.querySelector('.ix-modal-body-success')).not.toBeNull()
      expect(document.querySelector('.ix-modal-body-title')!.textContent).toBe(title)
      expect(document.querySelector('.modal-content')!.textContent).toBe(content)

      modalRef.destroy()
    })

    test('warning work', async () => {
      const modalRef = wrapper.vm.warning({ title, content: h('div', { class: 'modal-content' }, content) })
      await flushPromises()

      expect(document.querySelector('.ix-modal-body-warning')).not.toBeNull()
      expect(document.querySelector('.ix-modal-body-title')!.textContent).toBe(title)
      expect(document.querySelector('.modal-content')!.textContent).toBe(content)

      modalRef.destroy()
    })

    test('error work', async () => {
      const modalRef = wrapper.vm.error({ title, content: h('div', { class: 'modal-content' }, content) })
      await flushPromises()

      expect(document.querySelector('.ix-modal-body-error')).not.toBeNull()
      expect(document.querySelector('.ix-modal-body-title')!.textContent).toBe(title)
      expect(document.querySelector('.modal-content')!.textContent).toBe(content)

      modalRef.destroy()
    })

    test('update work', async () => {
      const modalRef = wrapper.vm.open({ header, content })
      await flushPromises()

      expect(document.querySelector('.ix-header-title')!.textContent).toBe(header)
      expect(document.querySelector('.ix-modal-body')!.textContent).toBe(content)

      header = 'This is header2'
      wrapper.vm.update(modalRef.key, { header })
      await flushPromises()

      expect(document.querySelector('.ix-header-title')!.textContent).toBe(header)

      modalRef.destroy()
    })

    test('destroy work', async () => {
      const modalRef = wrapper.vm.open({ header, content })
      await flushPromises()

      expect(document.querySelectorAll('.ix-modal-wrapper').length).toBe(1)

      wrapper.vm.destroy(modalRef.key)
      await flushPromises()

      expect(document.querySelectorAll('.ix-modal-wrapper').length).toBe(0)
    })

    test('destroyAll work', async () => {
      wrapper.vm.open({ header, content })
      wrapper.vm.open({ header, content })
      wrapper.vm.open({ header, content })

      await flushPromises()

      expect(document.querySelectorAll('.ix-modal-wrapper').length).toBe(3)

      wrapper.vm.destroyAll()
      await flushPromises()

      expect(document.querySelectorAll('.ix-modal-wrapper').length).toBe(0)
    })
  })

  describe('modalRef', () => {
    test('open and close work', async () => {
      const onClose = jest.fn()
      const modalRef = wrapper.vm.open({ onClose, destroyOnHide: false, header, content })
      await flushPromises()

      modalRef.close('close')
      await flushPromises()

      expect(onClose).toBeCalledWith('close')
      expect(isElementVisible(document.querySelector('.ix-modal'))).toBe(false)

      modalRef.open()
      await flushPromises()

      expect(isElementVisible(document.querySelector('.ix-modal'))).toBe(true)
    })

    test('cancel work', async () => {
      const onCancel = jest.fn()
      const modalRef = wrapper.vm.open({ onCancel, header, content })
      await flushPromises()

      modalRef.cancel('cancel')
      await flushPromises()

      expect(onCancel).toBeCalledWith('cancel')
    })

    test('ok work', async () => {
      const onOk = jest.fn()
      const modalRef = wrapper.vm.open({ onOk, header, content })
      await flushPromises()

      modalRef.ok('ok')
      await flushPromises()

      expect(onOk).toBeCalledWith('ok')
    })

    test('destroy work', async () => {
      const onDestroy = jest.fn()
      const modalRef = wrapper.vm.open({ onDestroy, header, content })
      await flushPromises()

      modalRef.destroy()
      await flushPromises()

      expect(onDestroy).toBeCalled()
      expect(document.querySelectorAll('.ix-modal-wrapper').length).toBe(0)
    })
  })
})
