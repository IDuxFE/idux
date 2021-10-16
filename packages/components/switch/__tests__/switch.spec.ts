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

    expect(wrapper.classes()).toContain('ix-switch-checked')
    expect(onUpdateChecked).toBeCalledWith(true)
  })

  test('checkedChildren and unCheckedChildren props work', async () => {
    const wrapper = SwitchMount({
      props: {
        checked: true,
        checkedChildren: 'open',
        unCheckedChildren: 'close',
      },
    })
    const innerWrapper = wrapper.find('.ix-switch-inner')
    expect(innerWrapper.text()).toEqual('open')

    await wrapper.setProps({ checked: false })

    expect(innerWrapper.text()).toEqual('close')
  })

  test('children slots work', async () => {
    const wrapper = SwitchMount({
      props: {
        checked: true,
      },
      slots: {
        checkedChildren: `<span>checked</span>`,
        unCheckedChildren: `<span>unChecked</span>`,
      },
    })
    const innerWrapper = wrapper.find('.ix-switch-inner')
    const childrenElement = innerWrapper.element
    expect(childrenElement.innerHTML).toEqual('<span>checked</span>')

    await wrapper.setProps({ checked: false })
    expect(childrenElement.innerHTML).toEqual('<span>unChecked</span>')
  })

  test('when children props and slots exist meanwhile, slots work', async () => {
    const wrapper = SwitchMount({
      props: {
        checked: true,
        checkedChildren: 'open',
        unCheckedChildren: 'close',
      },
      slots: {
        checkedChildren: 'checkedSlot',
        unCheckedChildren: 'unCheckedSlot',
      },
    })
    const innerWrapper = wrapper.find('.ix-switch-inner')

    expect(innerWrapper.text()).toEqual('checkedSlot')

    await wrapper.setProps({ checked: false })

    expect(innerWrapper.text()).toEqual('unCheckedSlot')
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

    await wrapper.setProps({ size: 'md' })

    expect(wrapper.classes()).not.toContain('ix-switch-sm')
  })
})
