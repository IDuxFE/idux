import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { VNode, createTextVNode, h } from 'vue'

import { isElementVisible, renderWork } from '@tests'

import { IxButton } from '@idux/components/button'
import { HeaderProps, IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'

import Modal from '../src/Modal'
import ModalWrapper from '../src/ModalWrapper'
import { ModalButtonProps, ModalInstance, ModalProps } from '../src/types'

describe('Modal', () => {
  const content = [h('p', 'Some contents...')]
  const ModalMount = (options?: MountingOptions<Partial<ModalProps>>) => {
    const { props, slots, ...rest } = options || {}
    const _options = {
      props: { visible: true, ...props },
      slots: { default: content, ...slots },
      attachTo: 'body',
      ...rest,
    } as MountingOptions<ModalProps>
    return mount(Modal, _options) as VueWrapper<ModalInstance>
  }

  afterEach(() => {
    document.querySelector('.ix-modal-container')!.innerHTML = ''
  })

  renderWork<ModalProps>(Modal, {
    props: { visible: true },
    slots: { default: () => content },
    attachTo: 'body',
  })

  test('v-model:visible work', async () => {
    const onUpdateVisible = vi.fn()
    const wrapper = ModalMount({ props: { visible: false, 'onUpdate:visible': onUpdateVisible } })
    expect(isElementVisible(document.querySelector('.ix-modal-wrapper'))).toBe(false)

    await wrapper.setProps({ visible: true })

    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal').isVisible()).toBe(true)

    await modalWrapper.find('.ix-button').trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('custom button work', async () => {
    let cancelText = 'No'
    const cancelButton = { mode: 'dashed' } as const
    let okText = 'Yes'
    const okButton = { mode: 'primary', danger: true } as const

    const wrapper = ModalMount({ props: { cancelText, cancelButton, okText, okButton } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    const [okButtonWrapper, cancelButtonWrapper] = await modalWrapper.findAll('.ix-button')

    expect(cancelButtonWrapper.text()).toBe(cancelText)
    expect(cancelButtonWrapper.classes()).toContain('ix-button-dashed')
    expect(okButtonWrapper.text()).toBe(okText)
    expect(okButtonWrapper.classes()).toContain('ix-button-primary')
    expect(okButtonWrapper.classes()).toContain('ix-button-danger')

    cancelText = 'No No'
    okText = 'Yes Yes'
    await wrapper.setProps({ cancelText, okText })

    expect(cancelButtonWrapper.text()).toBe(cancelText)
    expect(okButtonWrapper.text()).toBe(okText)
  })

  test('centered work', async () => {
    const wrapper = ModalMount({ props: { centered: true } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.classes()).toContain('ix-modal-centered')

    await wrapper.setProps({ centered: false })

    expect(modalWrapper.classes()).not.toContain('ix-modal-centered')
  })

  test('closable work', async () => {
    const wrapper = ModalMount({ props: { closable: false } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-icon-close').exists()).toBe(false)

    await wrapper.setProps({ closable: true })

    expect(modalWrapper.find('.ix-icon-close').exists()).toBe(true)
  })

  test('closeIcon work', async () => {
    const onClose = vi.fn()
    const wrapper = ModalMount({ props: { closeIcon: 'up', onClose } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-icon-close').exists()).toBe(false)
    expect(modalWrapper.find('.ix-icon-up').exists()).toBe(true)

    await modalWrapper.find('.ix-icon-up').trigger('click')

    expect(onClose).toBeCalledTimes(1)

    const closeIcon = h(IxIcon, { name: 'close' })
    await wrapper.setProps({ closeIcon })

    expect(modalWrapper.find('.ix-icon-close').exists()).toBe(true)
    expect(modalWrapper.find('.ix-icon-up').exists()).toBe(false)

    await modalWrapper.find('.ix-icon-close').trigger('click')

    expect(onClose).toBeCalledTimes(2)
  })

  test('closeIcon slot work', async () => {
    const wrapper = ModalMount({
      props: { closeIcon: 'up' },
      slots: {
        closeIcon: () => h(IxIcon, { name: 'close' }),
      },
    })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-icon-close').exists()).toBe(true)
    expect(modalWrapper.find('.ix-icon-up').exists()).toBe(false)
  })

  test('closeOnEsc work', async () => {
    const onUpdateVisible = vi.fn()
    const wrapper = ModalMount({ props: { closeOnEsc: false, 'onUpdate:visible': onUpdateVisible } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    await modalWrapper.trigger('keydown', { code: 'Escape' })

    expect(modalWrapper.find('.ix-modal').isVisible()).toBe(true)

    await wrapper.setProps({ closeOnEsc: true })

    await modalWrapper.trigger('keydown', { code: 'Escape' })

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('destroyOnHide work', async () => {
    const wrapper = ModalMount({ props: { visible: true, destroyOnHide: true } })
    let modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal').exists()).toBe(true)

    await wrapper.setProps({ visible: false })
    await flushPromises()

    expect(document.querySelector('.ix-modal-wrapper')).toBe(null)

    await wrapper.setProps({ visible: true })
    modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal').exists()).toBe(true)

    await wrapper.setProps({ destroyOnHide: false, visible: false })

    expect(modalWrapper.find('.ix-modal').exists()).toBe(true)
  })

  test('footer with boolean work', async () => {
    const wrapper = ModalMount({ props: { footer: false } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal-footer').exists()).toBe(false)

    await wrapper.setProps({ footer: true })

    expect(modalWrapper.find('.ix-modal-footer').exists()).toBe(true)
  })

  test('footer with buttons work', async () => {
    let footer: ModalButtonProps[] = [{ text: 'button1' }]
    const wrapper = ModalMount({ props: { footer } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.findAll('.ix-button').length).toBe(1)

    footer = [...footer, { text: 'button2' }]
    await wrapper.setProps({ footer })

    expect(modalWrapper.findAll('.ix-button').length).toBe(2)
  })

  test('footer with slot work', async () => {
    const footer: ModalButtonProps[] = [{ text: 'button1' }]
    const wrapper = ModalMount({
      props: { footer },
      slots: { footer: () => h(IxButton, {}, { default: () => 'button slot' }) },
    })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.findAll('.ix-button').length).toBe(1)
    expect(modalWrapper.find('.ix-button').text()).toBe('button slot')
  })

  test('header work', async () => {
    let header: string | HeaderProps = 'This is header'
    const wrapper = ModalMount({ props: { header } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-header').text()).toBe(header)

    header = 'This is header2'
    await wrapper.setProps({ header })

    expect(modalWrapper.find('.ix-header').text()).toBe(header)
    expect(modalWrapper.find('.ix-header').classes()).toContain('ix-header-md')

    header = { title: 'This is header2', size: 'lg' }
    await wrapper.setProps({ header })

    expect(modalWrapper.find('.ix-header').text()).toBe('This is header2')
    expect(modalWrapper.find('.ix-header').classes()).toContain('ix-header-lg')
  })

  test('header slot work', async () => {
    const header = 'This is header'
    const wrapper = ModalMount({
      props: { header },
      slots: {
        header: () => h(IxHeader, { title: 'this is header2' }),
      },
    })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-header').text()).toBe('this is header2')
  })

  test('icon work', async () => {
    const wrapper = ModalMount({ props: { type: 'confirm', icon: 'up' } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal-body-icon').find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ icon: 'down' })

    expect(modalWrapper.find('.ix-modal-body-icon').find('.ix-icon-down').exists()).toBe(true)

    await wrapper.setProps({ icon: h(IxIcon, { name: 'up' }) })

    expect(modalWrapper.find('.ix-modal-body-icon').find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ type: 'default' })
    expect(modalWrapper.find('.ix-modal-body-icon').exists()).toBe(false)
  })

  test('icon slot work', async () => {
    const wrapper = ModalMount({
      props: { type: 'confirm', icon: 'up' },
      slots: { icon: () => h(IxIcon, { name: 'down' }) },
    })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal-body-icon').find('.ix-icon-up').exists()).toBe(false)
    expect(modalWrapper.find('.ix-modal-body-icon').find('.ix-icon-down').exists()).toBe(true)
  })

  test('mask work', async () => {
    const wrapper = ModalMount({ props: { mask: false } })

    expect(isElementVisible(document.querySelector('.ix-mask'))).toBe(false)

    await wrapper.setProps({ mask: true })

    expect(isElementVisible(document.querySelector('.ix-mask'))).toBe(true)
  })

  test('maskClosable work', async () => {
    const onUpdateVisible = vi.fn()
    const wrapper = ModalMount({ props: { maskClosable: false, 'onUpdate:visible': onUpdateVisible } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    await modalWrapper.trigger('click')

    expect(onUpdateVisible).not.toBeCalled()

    await wrapper.setProps({ maskClosable: true })
    await modalWrapper.trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('offset work', async () => {
    const wrapper = ModalMount({ props: { offset: 256 } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    const contentDom = modalWrapper.find('.ix-modal').element as HTMLElement

    expect(contentDom.style.top).toBe('256px')

    await wrapper.setProps({ offset: '30%' })

    expect(contentDom.style.top).toBe('30%')
  })

  test('title work', async () => {
    let title: VNode | string = 'This is title'
    const wrapper = ModalMount({ props: { type: 'confirm', title } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal-body-title').text()).toBe(title)

    title = 'This is title2'
    await wrapper.setProps({ title })

    expect(modalWrapper.find('.ix-modal-body-title').text()).toBe(title)

    title = createTextVNode('This is title3')
    await wrapper.setProps({ title })

    expect(modalWrapper.find('.ix-modal-body-title').text()).toBe('This is title3')

    await wrapper.setProps({ type: 'default' })
    expect(modalWrapper.find('.ix-modal-body-title').exists()).toBe(false)
  })

  test('title slot work', async () => {
    const wrapper = ModalMount({
      props: { type: 'confirm', title: 'This is title' },
      slots: { title: () => 'This is title2' },
    })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal-body-title').text()).toBe('This is title2')
  })

  test('type work', async () => {
    const wrapper = ModalMount({ props: { type: 'confirm' } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)

    expect(modalWrapper.find('.ix-modal-body-confirm').exists()).toBe(true)

    await wrapper.setProps({ type: 'info' })

    expect(modalWrapper.find('.ix-modal-body-info').exists()).toBe(true)

    await wrapper.setProps({ type: 'success' })

    expect(modalWrapper.find('.ix-modal-body-success').exists()).toBe(true)

    await wrapper.setProps({ type: 'warning' })

    expect(modalWrapper.find('.ix-modal-body-warning').exists()).toBe(true)

    await wrapper.setProps({ type: 'error' })

    expect(modalWrapper.find('.ix-modal-body-error').exists()).toBe(true)
  })

  test('width work', async () => {
    const wrapper = ModalMount({ props: { width: 400 } })
    const modalWrapper = wrapper.getComponent(ModalWrapper)
    const contentDom = modalWrapper.find('.ix-modal').element as HTMLElement

    expect(contentDom.style.width).toBe('400px')

    await wrapper.setProps({ width: '200px' })

    expect(contentDom.style.width).toBe('200px')

    await wrapper.setProps({ width: '20%' })

    expect(contentDom.style.width).toBe('20%')
  })

  test('zIndex work', async () => {
    const wrapper = ModalMount({ props: { zIndex: 1001 } })
    expect(document.querySelector('.ix-modal-wrapper')!.getAttribute('style')).toContain('z-index: 1001')

    await wrapper.setProps({ zIndex: 1002 })

    expect(document.querySelector('.ix-modal-wrapper')!.getAttribute('style')).toContain('z-index: 1002')
  })

  describe('Events', () => {
    test('onClose and onBeforeClose work', async () => {
      const onClose = vi.fn()
      const onBeforeClose = vi.fn()
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onClose, onBeforeClose, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.close()
      await flushPromises()

      expect(onClose).toBeCalled()
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onBeforeClose with result work', async () => {
      const onBeforeClose = vi.fn().mockImplementation((evt: unknown) => evt === 'close')
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onBeforeClose, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.close(1)
      await flushPromises()

      expect(onBeforeClose).toBeCalledWith(1)
      expect(onUpdateVisible).not.toBeCalled()

      wrapper.vm.close('close')
      await flushPromises()

      expect(onBeforeClose).toBeCalledWith('close')
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onBeforeClose with promise work', async () => {
      const onBeforeClose = vi.fn().mockImplementation((evt: unknown) => Promise.resolve(evt === 'close'))
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onBeforeClose, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.close(1)
      await flushPromises()

      expect(onBeforeClose).toBeCalledWith(1)
      expect(onUpdateVisible).not.toBeCalled()

      wrapper.vm.close('close')
      await flushPromises()

      expect(onBeforeClose).toBeCalledWith('close')
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onCancel work', async () => {
      const onCancel = vi.fn()
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onCancel, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.cancel()
      await flushPromises()

      expect(onCancel).toBeCalled()
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onCancel with result work', async () => {
      const onCancel = vi.fn().mockImplementation((evt: unknown) => evt === 'cancel')
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onCancel, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.cancel(1)
      await flushPromises()

      expect(onCancel).toBeCalledWith(1)
      expect(onUpdateVisible).not.toBeCalled()

      wrapper.vm.cancel('cancel')
      await flushPromises()

      expect(onCancel).toBeCalledWith('cancel')
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onCancel with promise work', async () => {
      const onCancel = vi.fn().mockImplementation((evt: unknown) => Promise.resolve(evt === 'cancel'))
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onCancel, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.cancel(1)
      await flushPromises()

      expect(onCancel).toBeCalledWith(1)
      expect(onUpdateVisible).not.toBeCalled()

      wrapper.vm.cancel('cancel')
      await flushPromises()

      expect(onCancel).toBeCalledWith('cancel')
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onOk work', async () => {
      const onOk = vi.fn()
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onOk, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.ok()
      await flushPromises()

      expect(onOk).toBeCalled()
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onOk with result work', async () => {
      const onOk = vi.fn().mockImplementation((evt: unknown) => evt === 'ok')
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onOk, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.ok(1)
      await flushPromises()

      expect(onOk).toBeCalledWith(1)
      expect(onUpdateVisible).not.toBeCalled()

      wrapper.vm.ok('ok')
      await flushPromises()

      expect(onOk).toBeCalledWith('ok')
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onOk with promise work', async () => {
      const onOk = vi.fn().mockImplementation((evt: unknown) => Promise.resolve(evt === 'ok'))
      const onUpdateVisible = vi.fn()
      const wrapper = ModalMount({ props: { onOk, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.ok(1)
      await flushPromises()

      expect(onOk).toBeCalledWith(1)
      expect(onUpdateVisible).not.toBeCalled()

      wrapper.vm.ok('ok')
      await flushPromises()

      expect(onOk).toBeCalledWith('ok')
      expect(onUpdateVisible).toBeCalledWith(false)
    })
  })
})
