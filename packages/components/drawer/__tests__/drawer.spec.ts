import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { isElementVisible, renderWork } from '@tests'

import { IxButton } from '@idux/components/button'
import { HeaderProps, IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'

import Drawer from '../src/Drawer'
import DrawerWrapper from '../src/DrawerWrapper'
import { DrawerButtonProps, DrawerInstance, DrawerProps } from '../src/types'

describe('Drawer', () => {
  const content = [h('p', 'Some contents...')]
  const DrawerMount = (options?: MountingOptions<Partial<DrawerProps>>) => {
    const { props, slots, ...rest } = options || {}
    const _options = {
      props: { visible: true, ...props },
      slots: { default: content, ...slots },
      attachTo: 'body',
      ...rest,
    } as MountingOptions<DrawerProps>
    return mount(Drawer, _options) as VueWrapper<DrawerInstance>
  }

  afterEach(() => {
    document.querySelector('.ix-drawer-container')!.innerHTML = ''
  })

  renderWork<DrawerProps>(Drawer, {
    props: { visible: true },
    slots: { default: () => content },
    attachTo: 'body',
  })

  test('v-model:visible work', async () => {
    const onUpdateVisible = vi.fn()
    const wrapper = DrawerMount({ props: { visible: false, 'onUpdate:visible': onUpdateVisible } })
    expect(isElementVisible(document.querySelector('.ix-drawer-wrapper'))).toBe(false)

    await wrapper.setProps({ visible: true })

    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.find('.ix-drawer').isVisible()).toBe(true)

    await drawerWrapper.find('.ix-icon-close').trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('closable work', async () => {
    const wrapper = DrawerMount({ props: { closable: false } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.find('.ix-icon-close').exists()).toBe(false)

    await wrapper.setProps({ closable: true })

    expect(drawerWrapper.find('.ix-icon-close').exists()).toBe(true)
  })

  test('closeIcon work', async () => {
    const onClose = vi.fn()
    const wrapper = DrawerMount({ props: { closeIcon: 'up', onClose } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.find('.ix-icon-close').exists()).toBe(false)
    expect(drawerWrapper.find('.ix-icon-up').exists()).toBe(true)

    await drawerWrapper.find('.ix-icon-up').trigger('click')

    expect(onClose).toBeCalledTimes(1)

    const closeIcon = h(IxIcon, { name: 'close' })
    await wrapper.setProps({ closeIcon })

    expect(drawerWrapper.find('.ix-icon-close').exists()).toBe(true)
    expect(drawerWrapper.find('.ix-icon-up').exists()).toBe(false)

    await drawerWrapper.find('.ix-icon-close').trigger('click')

    expect(onClose).toBeCalledTimes(2)
  })

  test('closeIcon slot work', async () => {
    const wrapper = DrawerMount({
      props: { closeIcon: 'up' },
      slots: {
        closeIcon: () => h(IxIcon, { name: 'close' }),
      },
    })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.find('.ix-icon-close').exists()).toBe(true)
    expect(drawerWrapper.find('.ix-icon-up').exists()).toBe(false)
  })

  test('closeOnEsc work', async () => {
    const onUpdateVisible = vi.fn()
    const wrapper = DrawerMount({ props: { closeOnEsc: false, 'onUpdate:visible': onUpdateVisible } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    await drawerWrapper.trigger('keydown', { code: 'Escape' })

    expect(drawerWrapper.find('.ix-drawer').isVisible()).toBe(true)

    await wrapper.setProps({ closeOnEsc: true })

    await drawerWrapper.trigger('keydown', { code: 'Escape' })

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('destroyOnHide work', async () => {
    const wrapper = DrawerMount({ props: { destroyOnHide: true } })
    let drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.find('.ix-drawer').exists()).toBe(true)

    await wrapper.setProps({ visible: false })
    await flushPromises()

    expect(document.querySelector('.ix-drawer-wrapper')).toBe(null)

    await wrapper.setProps({ visible: true })
    drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.find('.ix-drawer').exists()).toBe(true)

    await wrapper.setProps({ destroyOnHide: false, visible: false })

    expect(drawerWrapper.find('.ix-drawer').exists()).toBe(true)
  })

  test('footer buttons work', async () => {
    let footer: DrawerButtonProps[] = [{ text: 'button1' }]
    const wrapper = DrawerMount({ props: { footer } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.findAll('.ix-button').length).toBe(1)

    footer = [...footer, { text: 'button2' }]
    await wrapper.setProps({ footer })

    expect(drawerWrapper.findAll('.ix-button').length).toBe(2)
  })

  test('footer slot work', async () => {
    const footer: DrawerButtonProps[] = [{ text: 'button1' }]
    const wrapper = DrawerMount({
      props: { footer },
      slots: { footer: () => h(IxButton, {}, { default: () => 'button slot' }) },
    })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.findAll('.ix-button').length).toBe(1)
    expect(drawerWrapper.find('.ix-button').text()).toBe('button slot')
  })

  test('header work', async () => {
    let header: string | HeaderProps = 'This is header'
    const wrapper = DrawerMount({ props: { header } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.find('.ix-header').text()).toBe(header)

    header = 'This is header2'
    await wrapper.setProps({ header })

    expect(drawerWrapper.find('.ix-header').text()).toBe(header)
    expect(drawerWrapper.find('.ix-header').classes()).toContain('ix-header-md')

    header = { title: 'This is header2', size: 'lg' }
    await wrapper.setProps({ header })

    expect(drawerWrapper.find('.ix-header').text()).toBe('This is header2')
    expect(drawerWrapper.find('.ix-header').classes()).toContain('ix-header-lg')
  })

  test('header slot work', async () => {
    const header = 'This is header'
    const wrapper = DrawerMount({
      props: { header },
      slots: {
        header: () => h(IxHeader, { title: 'this is header2' }),
      },
    })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.find('.ix-header').text()).toBe('this is header2')
  })

  test('height work', async () => {
    const wrapper = DrawerMount({ props: { height: 400 } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)
    const contentDom = drawerWrapper.find('.ix-drawer').element as HTMLElement

    expect(contentDom.style.height).toBe('400px')

    await wrapper.setProps({ height: '200px' })

    expect(contentDom.style.height).toBe('200px')

    await wrapper.setProps({ height: '20%' })

    expect(contentDom.style.height).toBe('20%')
  })

  test('mask work', async () => {
    const wrapper = DrawerMount({ props: { mask: false } })

    expect(isElementVisible(document.querySelector('.ix-mask'))).toBe(false)

    await wrapper.setProps({ mask: true })

    expect(isElementVisible(document.querySelector('.ix-mask'))).toBe(true)
  })

  test('maskClosable work', async () => {
    const onUpdateVisible = vi.fn()
    const wrapper = DrawerMount({ props: { maskClosable: false, 'onUpdate:visible': onUpdateVisible } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    await drawerWrapper.trigger('click')

    expect(drawerWrapper.find('.ix-drawer').isVisible()).toBe(true)

    await wrapper.setProps({ maskClosable: true })
    await drawerWrapper.trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('offset work', async () => {
    const wrapper = DrawerMount({ props: { offset: 256 } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    const contentDom = drawerWrapper.find('.ix-drawer').element as HTMLElement

    expect(contentDom.style.top).toBe('256px')

    await wrapper.setProps({ offset: '30%' })

    expect(contentDom.style.top).toBe('30%')
  })

  test('placement work', async () => {
    const wrapper = DrawerMount({ props: { placement: 'start' } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.classes()).toContain('ix-drawer-start')

    await wrapper.setProps({ placement: 'top' })

    expect(drawerWrapper.classes()).toContain('ix-drawer-top')
  })

  test('target work', async () => {
    const wrapper = DrawerMount({ props: { target: 'ix-test-container' } })

    expect(document.querySelector('.ix-test-container')!.querySelector('.ix-drawer')).not.toBeNull()

    const target = document.createElement('div')
    target.classList.add('.ix-test-container2')
    document.body.appendChild(target)

    await wrapper.setProps({ target })

    expect(target.querySelector('.ix-drawer')).not.toBeNull()
  })

  test('width work', async () => {
    const wrapper = DrawerMount({ props: { width: 400 } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)
    const contentDom = drawerWrapper.find('.ix-drawer').element as HTMLElement

    expect(contentDom.style.width).toBe('400px')

    await wrapper.setProps({ width: '200px' })

    expect(contentDom.style.width).toBe('200px')

    await wrapper.setProps({ width: '20%' })

    expect(contentDom.style.width).toBe('20%')
  })

  test('wrapperClassName work', async () => {
    let wrapperClassName = 'test-container'
    const wrapper = DrawerMount({ props: { wrapperClassName } })
    const drawerWrapper = wrapper.getComponent(DrawerWrapper)

    expect(drawerWrapper.classes()).toContain(wrapperClassName)

    wrapperClassName = 'test-container2'

    await wrapper.setProps({ wrapperClassName })

    expect(drawerWrapper.classes()).toContain(wrapperClassName)
  })

  test('zIndex work', async () => {
    const wrapper = DrawerMount({ props: { zIndex: 1001 } })
    expect(document.querySelector('.ix-drawer-wrapper')!.getAttribute('style')).toContain('z-index: 1001')

    await wrapper.setProps({ zIndex: 1002 })

    expect(document.querySelector('.ix-drawer-wrapper')!.getAttribute('style')).toContain('z-index: 1002')
  })

  describe('Events', () => {
    test('onClose and onBeforeClose work', async () => {
      const onClose = vi.fn()
      const onBeforeClose = vi.fn()
      const onUpdateVisible = vi.fn()
      const wrapper = DrawerMount({ props: { onClose, onBeforeClose, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.close()
      await flushPromises()

      expect(onClose).toBeCalled()
      expect(onBeforeClose).toBeCalled()
      expect(onUpdateVisible).toBeCalledWith(false)
    })

    test('onBeforeClose with result work', async () => {
      const onBeforeClose = vi.fn().mockImplementation((evt: unknown) => evt === 'close')
      const onUpdateVisible = vi.fn()
      const wrapper = DrawerMount({ props: { onBeforeClose, 'onUpdate:visible': onUpdateVisible } })

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
      const wrapper = DrawerMount({ props: { onBeforeClose, 'onUpdate:visible': onUpdateVisible } })

      wrapper.vm.close(1)
      await flushPromises()

      expect(onBeforeClose).toBeCalledWith(1)
      expect(onUpdateVisible).not.toBeCalled()

      wrapper.vm.close('close')
      await flushPromises()

      expect(onBeforeClose).toBeCalledWith('close')
      expect(onUpdateVisible).toBeCalledWith(false)
    })
  })
})
