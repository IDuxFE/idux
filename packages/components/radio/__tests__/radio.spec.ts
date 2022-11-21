import { MountingOptions, flushPromises, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Radio from '../src/Radio'
import { RadioProps } from '../src/types'

describe('Radio', () => {
  const RadioMount = (options?: MountingOptions<Partial<RadioProps>>) => mount(Radio, { ...options })

  renderWork<RadioProps>(Radio, { slots: { default: () => 'Radio' } })

  test('checked work', async () => {
    const wrapper = RadioMount({ props: { checked: true } })

    expect(wrapper.classes()).toContain('ix-radio-checked')

    await wrapper.setProps({ checked: false })

    expect(wrapper.classes()).not.toContain('ix-radio-checked')
  })

  test('onUpdate:checked work', async () => {
    const onUpdate = vi.fn()
    const wrapper = RadioMount({ props: { 'onUpdate:checked': onUpdate } })

    expect(wrapper.classes()).not.toContain('ix-radio-checked')

    await wrapper.find('input').setValue(true)

    expect(onUpdate).toBeCalledWith(true)
  })

  // TODO fix
  test.skip('autofocus work', async () => {
    const onFocus = vi.fn()
    RadioMount({ props: { autofocus: true, onFocus } })
    await flushPromises()

    expect(onFocus).toBeCalled()
  })

  test('buttoned work', async () => {
    const wrapper = RadioMount({ props: { buttoned: true } })

    expect(wrapper.classes()).toContain('ix-button')

    await wrapper.setProps({ buttoned: false })

    expect(wrapper.classes()).not.toContain('ix-button')
  })

  test('disabled work', async () => {
    const wrapper = RadioMount({ props: { disabled: true } })

    expect(wrapper.classes()).toContain('ix-radio-disabled')

    await wrapper.setProps({ disabled: false })

    expect(wrapper.classes()).not.toContain('ix-radio-disabled')
  })

  test('label work', async () => {
    let label = 'radio'
    const wrapper = RadioMount({ props: { label } })

    expect(wrapper.find('.ix-radio-label').text()).toBe(label)

    label = 'radio2'
    await wrapper.setProps({ label })

    expect(wrapper.find('.ix-radio-label').text()).toBe(label)
  })

  test('default slot work', async () => {
    const label = 'radio'
    const defaultSlot = 'radio slot'
    const wrapper = RadioMount({ props: { label }, slots: { default: () => defaultSlot } })

    expect(wrapper.find('.ix-radio-label').text()).toBe(defaultSlot)
  })

  test('mode work', async () => {
    const wrapper = RadioMount({ props: { checked: true, buttoned: true, mode: 'primary' } })

    expect(wrapper.classes()).toContain('ix-button-primary')

    await wrapper.setProps({ mode: 'default' })

    expect(wrapper.classes()).toContain('ix-button-default')

    await wrapper.setProps({ checked: false, mode: 'primary' })

    expect(wrapper.classes()).not.toContain('ix-button-primary')

    await wrapper.setProps({ buttoned: false })

    expect(wrapper.classes()).not.toContain('ix-button-default')
  })

  test('size work', async () => {
    const wrapper = RadioMount({ props: { buttoned: true, size: 'lg' } })

    expect(wrapper.classes()).toContain('ix-radio-lg')

    await wrapper.setProps({ size: 'sm' })

    expect(wrapper.classes()).toContain('ix-radio-sm')

    await wrapper.setProps({ buttoned: false, size: 'lg' })

    expect(wrapper.classes()).not.toContain('ix-radio-lg')
  })
})
