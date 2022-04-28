import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Trigger from '../src/Trigger'
import { TriggerProps } from '../src/types'

describe('Trigger', () => {
  const TriggerMount = (options?: MountingOptions<Partial<TriggerProps>>) =>
    mount(Trigger, { ...(options as MountingOptions<TriggerProps>) })

  renderWork<TriggerProps>(Trigger, {
    props: {},
  })

  test('borderless work', async () => {
    const wrapper = TriggerMount({ props: { borderless: true } })

    expect(wrapper.classes()).toContain('ix-trigger-borderless')

    await wrapper.setProps({ borderless: false })

    expect(wrapper.classes()).not.toContain('ix-trigger-borderless')
  })

  test('focused work', async () => {
    const wrapper = TriggerMount({ props: { focused: true } })

    expect(wrapper.classes()).toContain('ix-trigger-focused')

    await wrapper.setProps({ focused: false })

    expect(wrapper.classes()).not.toContain('ix-trigger-focused')
  })

  test('readonly work', async () => {
    const wrapper = TriggerMount({ props: { readonly: true } })

    expect(wrapper.classes()).toContain('ix-trigger-readonly')

    await wrapper.setProps({ readonly: false })

    expect(wrapper.classes()).not.toContain('ix-trigger-readonly')
  })

  test('disabled work', async () => {
    const wrapper = TriggerMount({ props: { disabled: true } })

    expect(wrapper.classes()).toContain('ix-trigger-disabled')

    await wrapper.setProps({ disabled: false })

    expect(wrapper.classes()).not.toContain('ix-trigger-disabled')
  })

  test('clearable work', async () => {
    const wrapper = TriggerMount({ props: { clearable: true, clearIcon: 'clear' } })

    expect(wrapper.find('.ix-trigger-clear-icon').exists()).toBeTruthy()

    await wrapper.setProps({ clearable: false })

    expect(wrapper.find('.ix-trigger-clear-icon').exists()).toBeFalsy()
  })

  test('clearIcon work', async () => {
    const wrapper = TriggerMount({ props: { clearable: true, clearIcon: 'clear' } })

    expect(wrapper.find('.ix-icon-clear').exists()).toBeTruthy()

    await wrapper.setProps({ clearIcon: 'close' })

    expect(wrapper.find('.ix-icon-clear').exists()).toBeFalsy()
    expect(wrapper.find('.ix-icon-close').exists()).toBeTruthy()
  })

  test('slot clearIcon work', async () => {
    const wrapper = TriggerMount({
      props: { clearable: true },
      slots: {
        clearIcon: () => h('span', { class: 'custom-clear-icon-slot' }),
      },
    })

    expect(wrapper.find('.custom-clear-icon-slot').exists()).toBeTruthy()
  })

  test('suffix work', async () => {
    const wrapper = TriggerMount({ props: { suffix: 'info' } })

    expect(wrapper.find('.ix-trigger-suffix').exists()).toBeTruthy()
    expect(wrapper.find('.ix-icon-info').exists()).toBeTruthy()
  })

  test('slot suffix work', async () => {
    const wrapper = TriggerMount({
      props: { clearable: true },
      slots: {
        clearIcon: () => h('span', { class: 'custom-suffix-slot' }),
      },
    })

    expect(wrapper.find('.custom-suffix-slot').exists()).toBeTruthy()
  })

  test('onClick work', async () => {
    const onClick = vi.fn()
    const wrapper = TriggerMount({ props: { onClick } })

    await wrapper.trigger('click')
    expect(onClick).toBeCalled()

    onClick.mockClear()

    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('click')
    expect(onClick).not.toBeCalled()
  })

  test('onClear work', async () => {
    const onClear = vi.fn()
    const wrapper = TriggerMount({ props: { clearable: true, clearIcon: 'clear', onClear } })

    await wrapper.find('.ix-trigger-clear-icon').trigger('click')
    expect(onClear).toBeCalled()

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.ix-trigger-clear-icon').exists()).toBeFalsy()
  })

  test('onKeyDown work', async () => {
    const onKeyDown = vi.fn()

    const wrapper = TriggerMount({ props: { onKeyDown } })

    await wrapper.trigger('keydown')
    expect(onKeyDown).toBeCalled()

    onKeyDown.mockClear()

    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('keydown')
    expect(onKeyDown).not.toBeCalled()
  })
})
