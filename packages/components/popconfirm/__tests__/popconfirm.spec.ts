import type { PopconfirmProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxButton } from '@idux/components/button'

import Popconfirm from '../src/Popconfirm'
import PopconfirmContent from '../src/PopconfirmContent'
import { PopconfirmButtonProps, PopconfirmInstance } from '../src/types'

describe('Popconfirm', () => {
  const content = [h('p', 'Some contents...')]
  const PopconfirmMount = (options?: MountingOptions<Partial<PopconfirmProps>>) => {
    const { props, slots, ...rest } = options || {}
    const _options = {
      props: { visible: true, ...props },
      slots: { default: content, ...slots },
      attachTo: 'body',
      ...rest,
    } as MountingOptions<PopconfirmProps>
    return mount(Popconfirm, _options) as VueWrapper<PopconfirmInstance>
  }
  const slots = { default: () => h('div', { id: 'trigger' }, 'trigger') }

  afterEach(() => {
    document.querySelector('.ix-popconfirm-overlay-container')!.innerHTML = ''
  })

  renderWork<PopconfirmProps>(Popconfirm, {
    props: { visible: true, title: 'Title' },
    slots,
    attachTo: 'body',
  })

  test('title work', async () => {
    const wrapper = PopconfirmMount({
      props: { visible: true, title: 'Title' },
      slots,
    })

    expect(document.querySelector('.ix-popconfirm-title')!.textContent).toBe('Title')

    await wrapper.setProps({ title: 'Title 2' })

    expect(document.querySelector('.ix-popconfirm-title')!.textContent).toBe('Title 2')
  })

  test('title slot work', async () => {
    PopconfirmMount({
      props: { visible: true, title: 'Title' },
      slots: { ...slots, title: () => h('div', 'Title slot') },
    })

    expect(document.querySelector('.ix-popconfirm-title')!.textContent).toBe('Title slot')
  })

  test('custom button work', async () => {
    let cancelText = 'No'
    const cancelButton = { mode: 'dashed' } as const
    let okText = 'Yes'
    const okButton = { mode: 'primary', danger: true } as const

    const wrapper = PopconfirmMount({ props: { cancelText, cancelButton, okText, okButton } })

    const [okButtonWrapper, cancelButtonWrapper] = await wrapper.getComponent(PopconfirmContent).findAll('.ix-button')

    expect(cancelButtonWrapper.text()).toBe(cancelText)
    expect(cancelButtonWrapper.classes()).toContain('ix-button-dashed')
    expect(okButtonWrapper.text()).toBe(okText)
    expect(okButtonWrapper.classes()).toContain('ix-button-primary')
    expect(okButtonWrapper.classes()).toContain('ix-button-danger')

    cancelText = 'No No'
    okText = 'Yes Yes'
    await wrapper.setProps({ cancelText, okText })

    const [okButtonWrapper1, cancelButtonWrapper1] = await wrapper.getComponent(PopconfirmContent).findAll('.ix-button')

    expect(cancelButtonWrapper1.text()).toBe(cancelText)
    expect(okButtonWrapper1.text()).toBe(okText)
  })

  test('onCancel work', async () => {
    const onCancel = vi.fn()
    const onUpdateVisible = vi.fn()
    const wrapper = PopconfirmMount({ props: { onCancel, 'onUpdate:visible': onUpdateVisible } })

    wrapper.vm.cancel()
    await flushPromises()

    expect(onCancel).toBeCalled()
    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('onCancel with result work', async () => {
    const onCancel = vi.fn().mockImplementation((evt: unknown) => evt === 'cancel')
    const onUpdateVisible = vi.fn()
    const wrapper = PopconfirmMount({ props: { onCancel, 'onUpdate:visible': onUpdateVisible } })

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
    const wrapper = PopconfirmMount({ props: { onCancel, 'onUpdate:visible': onUpdateVisible } })

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
    const wrapper = PopconfirmMount({ props: { onOk, 'onUpdate:visible': onUpdateVisible } })

    wrapper.vm.ok()
    await flushPromises()

    expect(onOk).toBeCalled()
    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('onOk with result work', async () => {
    const onOk = vi.fn().mockImplementation((evt: unknown) => evt === 'ok')
    const onUpdateVisible = vi.fn()
    const wrapper = PopconfirmMount({ props: { onOk, 'onUpdate:visible': onUpdateVisible } })

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
    const wrapper = PopconfirmMount({ props: { onOk, 'onUpdate:visible': onUpdateVisible } })

    wrapper.vm.ok(1)
    await flushPromises()

    expect(onOk).toBeCalledWith(1)
    expect(onUpdateVisible).not.toBeCalled()

    wrapper.vm.ok('ok')
    await flushPromises()

    expect(onOk).toBeCalledWith('ok')
    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('footer with boolean work', async () => {
    const wrapper = PopconfirmMount({ props: { footer: false } })
    const popconfirmWrapper = wrapper.getComponent(Popconfirm)

    expect(popconfirmWrapper.findComponent(PopconfirmContent).find('.ix-popconfirm-footer').exists()).toBe(false)

    await wrapper.setProps({ footer: undefined })

    expect(popconfirmWrapper.findComponent(PopconfirmContent).find('.ix-popconfirm-footer').exists()).toBe(true)
  })

  test('footer buttons work', async () => {
    let footer: PopconfirmButtonProps[] = [{ text: 'button1' }]
    const wrapper = PopconfirmMount({ props: { footer } })
    const popconfirmWrapper = wrapper.getComponent(Popconfirm)

    expect(popconfirmWrapper.findComponent(PopconfirmContent).findAll('.ix-button').length).toBe(1)

    footer = [...footer, { text: 'button2' }]
    await wrapper.setProps({ footer })

    expect(popconfirmWrapper.findComponent(PopconfirmContent).findAll('.ix-button').length).toBe(2)
  })

  test('footer slot work', async () => {
    const footer: PopconfirmButtonProps[] = [{ text: 'button1' }]
    const wrapper = PopconfirmMount({
      props: { footer },
      slots: { footer: () => h(IxButton, {}, { default: () => 'button slot' }) },
    })
    const popconfirmWrapper = wrapper.getComponent(Popconfirm)

    expect(popconfirmWrapper.findComponent(PopconfirmContent).findAll('.ix-button').length).toBe(1)
    expect(popconfirmWrapper.findComponent(PopconfirmContent).find('.ix-button').text()).toBe('button slot')
  })
})
