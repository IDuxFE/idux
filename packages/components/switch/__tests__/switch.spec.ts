import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxSwitch from '../src/Switch'
import { SwitchProps } from '../src/types'

describe('Switch', () => {
  const SwitchMount = (options?: MountingOptions<Partial<SwitchProps>>) => mount(IxSwitch, { ...options })

  renderWork(IxSwitch)

  test('v-model:checked work', async () => {
    const onUpdateChecked = jest.fn()
    const wrapper = SwitchMount({ props: { checked: true, 'onUpdate:checked': onUpdateChecked } })

    expect(wrapper.classes()).toContain('ix-switch-checked')

    await wrapper.setProps({ checked: false })

    expect(wrapper.classes()).not.toContain('ix-switch-checked')

    await wrapper.trigger('click')

    expect(onUpdateChecked).toBeCalledWith(true)
  })

  test('labels work', async () => {
    const wrapper = SwitchMount({
      props: { checked: true, labels: ['open', 'close'] },
    })

    expect(wrapper.find('.ix-switch-label').text()).toEqual('open')

    await wrapper.setProps({ checked: false })

    expect(wrapper.find('.ix-switch-label').text()).toEqual('close')
  })

  test('label slot work', async () => {
    const wrapper = SwitchMount({
      props: { checked: true, labels: ['open', 'close'] },
      slots: {
        label: ({ checked }: { checked: boolean }) => (checked ? 'open slot' : 'close slot'),
      },
    })

    expect(wrapper.find('.ix-switch-label').text()).toEqual('open slot')

    await wrapper.setProps({ checked: false })

    expect(wrapper.find('.ix-switch-label').text()).toEqual('close slot')
  })

  test('disabled work', async () => {
    const wrapper = SwitchMount({
      props: { disabled: true },
    })

    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('ix-switch-disabled')

    await wrapper.setProps({ disabled: false })

    await wrapper.trigger('click')

    expect(wrapper.classes()).not.toContain('ix-switch-disabled')
  })

  test('loading work', async () => {
    const wrapper = SwitchMount({ props: { loading: true } })

    expect(wrapper.find('.ix-switch-loading-icon').exists()).toBeTruthy()
    expect(wrapper.classes()).toContain('ix-switch-loading')

    await wrapper.trigger('click')

    await wrapper.setProps({ loading: false })

    expect(wrapper.find('.ix-switch-loading-icon').exists()).toBeFalsy()
    expect(wrapper.classes()).not.toContain('ix-switch-loading')
  })

  test('size work', async () => {
    const wrapper = SwitchMount({ props: { size: 'sm' } })

    expect(wrapper.classes()).toContain('ix-switch-sm')

    await wrapper.setProps({ size: undefined })

    expect(wrapper.classes()).toContain('ix-switch-md')
  })
})
