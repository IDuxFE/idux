import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Footer from '../src/Footer'
import { FooterProps } from '../src/types'

describe('Footer', () => {
  const FooterMount = (options?: MountingOptions<Partial<FooterProps>>) => {
    const { props, ...rest } = options || {}
    return mount(Footer, { props: { footer: true, ...props }, ...rest })
  }

  renderWork<FooterProps>(Footer, {
    props: { footer: true, okText: 'ok', cancelText: 'cancel' },
  })

  test('cancel work', async () => {
    const cancel = vi.fn()
    const wrapper = FooterMount({ props: { cancel } })

    expect(wrapper.findAll('.ix-button').length).toBe(1)

    await wrapper.find('.ix-button').trigger('click')

    expect(cancel).toBeCalled()
  })

  test('cancelButton work', async () => {
    const cancel = vi.fn()
    const wrapper = FooterMount({ props: { cancel, cancelButton: { mode: 'primary' } } })

    expect(wrapper.find('.ix-button').classes()).toContain('ix-button-primary')

    await wrapper.setProps({ cancelButton: { mode: 'dashed' } })

    expect(wrapper.find('.ix-button').classes()).not.toContain('ix-button-primary')
    expect(wrapper.find('.ix-button').classes()).toContain('ix-button-dashed')
  })

  test('cancelLoading work', async () => {
    const cancel = vi.fn()
    const wrapper = FooterMount({ props: { cancel, cancelLoading: true } })

    expect(wrapper.find('.ix-button').classes()).toContain('ix-button-loading')

    await wrapper.setProps({ cancelLoading: false })

    expect(wrapper.find('.ix-button').classes()).not.toContain('ix-button-loading')
  })

  test('cancelText work', async () => {
    let cancelText = 'cancel'
    const wrapper = FooterMount({ props: { cancelText } })

    expect(wrapper.find('.ix-button').text()).toBe(cancelText)

    cancelText = 'cancel 2'
    await wrapper.setProps({ cancelText })

    expect(wrapper.find('.ix-button').text()).toBe(cancelText)
  })

  test('cancelVisible work', async () => {
    const cancelText = 'cancel'
    const wrapper = FooterMount({ props: { cancelText, cancelVisible: false } })

    expect(wrapper.findAll('.ix-button').length).toBe(0)

    await wrapper.setProps({ cancelVisible: true })

    expect(wrapper.findAll('.ix-button').length).toBe(1)
  })

  test('footer with boolean work', async () => {
    const wrapper = FooterMount({ props: { footer: false } })

    expect(wrapper.isVisible()).toBe(false)

    await wrapper.setProps({ footer: true })

    expect(wrapper.isVisible()).toBe(true)
  })

  test('footer with buttonProps work', async () => {
    const wrapper = FooterMount({ props: { footer: [{ text: 'cancel' }, { text: 'ok' }] } })

    expect(wrapper.findAll('.ix-button').length).toBe(2)

    await wrapper.setProps({ footer: [{ text: 'ok' }] })

    expect(wrapper.findAll('.ix-button').length).toBe(1)
  })

  test('footer with slot work', async () => {
    const wrapper = FooterMount({
      props: { footer: [{ text: 'cancel' }, { text: 'ok' }] },
      slots: { footer: () => [h('div', { class: 'test-footer' }, 'cancel'), h('div', { class: 'test-footer' }, 'ok')] },
    })

    expect(wrapper.findAll('.ix-button').length).toBe(0)
    expect(wrapper.findAll('.test-footer').length).toBe(2)
  })

  test('ok work', async () => {
    const ok = vi.fn()
    const wrapper = FooterMount({ props: { ok } })

    expect(wrapper.findAll('.ix-button').length).toBe(1)

    await wrapper.find('.ix-button').trigger('click')

    expect(ok).toBeCalled()
  })

  test('okButton work', async () => {
    const ok = vi.fn()
    const wrapper = FooterMount({ props: { ok, okButton: { mode: 'dashed' } } })

    expect(wrapper.find('.ix-button').classes()).toContain('ix-button-dashed')

    await wrapper.setProps({ okButton: undefined })

    expect(wrapper.find('.ix-button').classes()).not.toContain('ix-button-dashed')
  })

  test('okLoading work', async () => {
    const ok = vi.fn()
    const wrapper = FooterMount({ props: { ok, okLoading: true } })

    expect(wrapper.find('.ix-button').classes()).toContain('ix-button-loading')

    await wrapper.setProps({ okLoading: false })

    expect(wrapper.find('.ix-button').classes()).not.toContain('ix-button-loading')
  })

  test('okText work', async () => {
    let okText = 'cancel'
    const wrapper = FooterMount({ props: { okText } })

    expect(wrapper.find('.ix-button').text()).toBe(okText)

    okText = 'cancel 2'
    await wrapper.setProps({ okText })

    expect(wrapper.find('.ix-button').text()).toBe(okText)
  })
})
