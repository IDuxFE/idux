import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxButton from '../src/Button'
import { ButtonProps } from '../src/types'

describe('Button', () => {
  const ButtonMount = (options?: MountingOptions<Partial<ButtonProps>>) => mount(IxButton, { ...options })

  renderWork(IxButton)

  test('mode work', async () => {
    const wrapper = ButtonMount()

    expect(wrapper.classes()).toContain('ix-button-default')
    expect(wrapper.element.tagName).toEqual('BUTTON')

    await wrapper.setProps({ mode: 'primary' })

    expect(wrapper.classes()).toContain('ix-button-primary')
    expect(wrapper.element.tagName).toEqual('BUTTON')

    await wrapper.setProps({ mode: 'dashed' })

    expect(wrapper.classes()).toContain('ix-button-dashed')
    expect(wrapper.element.tagName).toEqual('BUTTON')

    await wrapper.setProps({ mode: 'link' })

    expect(wrapper.classes()).toContain('ix-button-link')
    expect(wrapper.element.tagName).toEqual('BUTTON')

    await wrapper.setProps({ href: '#' })
    expect(wrapper.element.tagName).toEqual('A')
  })

  test('danger work', async () => {
    const wrapper = ButtonMount()

    expect(wrapper.classes()).not.toContain('ix-button-danger')

    await wrapper.setProps({ danger: true })

    expect(wrapper.classes()).toContain('ix-button-danger')
  })

  test('ghost work', async () => {
    const wrapper = ButtonMount()

    expect(wrapper.classes()).not.toContain('ix-button-ghost')

    await wrapper.setProps({ ghost: true })

    expect(wrapper.classes()).toContain('ix-button-ghost')
  })

  test('disabled work', async () => {
    const wrapper = ButtonMount({ props: { mode: 'primary' } })

    expect(wrapper.classes()).not.toContain('ix-button-disabled')

    await wrapper.setProps({ disabled: true })

    expect(wrapper.classes()).toContain('ix-button-disabled')
  })

  test('disabled with link mode work', async () => {
    const onClick = vi.fn()
    const wrapper = ButtonMount({ props: { mode: 'link', disabled: true, onClick } })

    await wrapper.trigger('click')

    expect(onClick).not.toBeCalled()

    await wrapper.setProps({ disabled: false })
    await wrapper.trigger('click')

    expect(onClick).toBeCalled()
  })

  test('loading work', async () => {
    const wrapper = ButtonMount({ props: { icon: 'up', loading: true } })

    expect(wrapper.findAll('.ix-icon').length).toEqual(1)
    expect(wrapper.find('.ix-icon-loading').exists()).toBeTruthy()
    expect(wrapper.classes()).toContain('ix-button-loading')
  })

  test('size work', async () => {
    const wrapper = ButtonMount({ props: { size: 'lg' } })

    expect(wrapper.classes()).toContain('ix-button-lg')

    await wrapper.setProps({ size: 'sm' })

    expect(wrapper.classes()).not.toContain('ix-button-lg')
    expect(wrapper.classes()).toContain('ix-button-sm')
  })

  test('shape work', async () => {
    const wrapper = ButtonMount({ props: { shape: 'circle' } })

    expect(wrapper.classes()).toContain('ix-button-circle')

    await wrapper.setProps({ shape: 'round' })

    expect(wrapper.classes()).not.toContain('ix-button-circle')
    expect(wrapper.classes()).toContain('ix-button-round')
  })

  test('block work', async () => {
    const wrapper = ButtonMount()

    expect(wrapper.classes()).not.toContain('ix-button-block')

    await wrapper.setProps({ block: true })

    expect(wrapper.classes()).toContain('ix-button-block')
  })

  test('icon work', async () => {
    const wrapper = ButtonMount({ props: { icon: 'up' } })

    expect(wrapper.find('.ix-icon-up').exists()).toBeTruthy()

    await wrapper.setProps({ icon: 'down' })

    expect(wrapper.find('.ix-icon-down').exists()).toBeTruthy()

    expect(wrapper.classes()).toContain('ix-button-icon-only')
  })

  test('slot work', async () => {
    const text = 'Button'
    const wrapper = ButtonMount({
      slots: {
        default: text,
      },
    })
    expect(wrapper.text()).toEqual(text)
  })

  test('waveless work', async () => {
    const text = 'Button'
    const wrapper = ButtonMount({
      slots: {
        default: text,
      },
    })

    expect(wrapper.find('.ix-wave').exists()).toBeTruthy()

    await wrapper.setProps({ waveless: true })

    expect(wrapper.find('.ix-wave').exists()).toBeFalsy()

    await wrapper.setProps({ waveless: false, mode: 'text' })

    expect(wrapper.find('.ix-wave').exists()).toBeFalsy()

    await wrapper.setProps({ mode: 'link' })

    expect(wrapper.find('.ix-wave').exists()).toBeFalsy()

    await wrapper.setProps({ mode: 'default' })

    expect(wrapper.find('.ix-wave').exists()).toBeTruthy()
  })
})
