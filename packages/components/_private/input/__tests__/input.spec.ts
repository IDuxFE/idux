import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Input from '../src/Input'
import { InputProps } from '../src/types'

describe('Input', () => {
  const InputMount = (options?: MountingOptions<Partial<InputProps>>) => {
    const { props, ...rest } = (options || {}) as MountingOptions<InputProps>
    return mount(Input, { props: { size: 'md', ...props }, ...rest })
  }

  renderWork<InputProps>(Input, {
    props: { size: 'md' },
  })

  renderWork<InputProps>(Input, {
    props: { size: 'md', addonAfter: 'addonAfter' },
  })

  renderWork<InputProps>(Input, {
    props: { size: 'md', suffix: 'setting' },
  })

  renderWork<InputProps>(Input, {
    props: { size: 'md', addonAfter: 'addonAfter', suffix: 'setting' },
  })

  test('addonAfter and addonBefore work', async () => {
    const wrapper = InputMount({ props: { addonAfter: 'addonAfter', addonBefore: 'addonBefore' } })

    expect(wrapper.classes()).toContain('ix-input-with-addon-after')
    expect(wrapper.classes()).toContain('ix-input-with-addon-before')

    const addons = wrapper.findAll('.ix-input-addon')

    expect(addons[0].text()).toBe('addonBefore')
    expect(addons[1].text()).toBe('addonAfter')

    await wrapper.setProps({ addonAfter: 'addonAfter change' })

    expect(addons[1].text()).toBe('addonAfter change')

    await wrapper.setProps({ addonBefore: 'addonBefore change' })

    expect(addons[0].text()).toBe('addonBefore change')

    await wrapper.setProps({ addonAfter: '' })

    expect(wrapper.classes()).not.toContain('ix-input-with-addon-after')
    expect(wrapper.findAll('.ix-input-addon').length).toBe(1)

    await wrapper.setProps({ addonBefore: '' })

    expect(wrapper.classes()).not.toContain('ix-input-with-addon-before')
    expect(wrapper.findAll('.ix-input-addon').length).toBe(0)
  })

  test('addonAfter and addonBefore slots work', async () => {
    const wrapper = InputMount({
      props: { addonAfter: 'addonAfter', addonBefore: 'addonBefore' },
      slots: { addonAfter: 'addonAfter slot', addonBefore: 'addonBefore slot' },
    })

    expect(wrapper.classes()).toContain('ix-input-with-addon-after')
    expect(wrapper.classes()).toContain('ix-input-with-addon-before')

    const addons = wrapper.findAll('.ix-input-addon')

    expect(addons[0].text()).toBe('addonBefore slot')
    expect(addons[1].text()).toBe('addonAfter slot')
  })

  test('borderless work', async () => {
    const wrapper = InputMount({ props: { borderless: true } })

    expect(wrapper.classes()).toContain('ix-input-borderless')

    await wrapper.setProps({ borderless: false })

    expect(wrapper.classes()).not.toContain('ix-input-borderless')
  })

  test('clearable work', async () => {
    const onClear = jest.fn()
    const wrapper = InputMount({ props: { clearIcon: 'close', clearable: true, onClear } })

    expect(wrapper.find('.ix-input-clear').exists()).toBe(true)

    await wrapper.setProps({ clearVisible: true })

    expect(wrapper.find('.ix-input-clear').classes()).toContain('visible')

    await wrapper.find('.ix-input-clear').trigger('click')

    expect(onClear).toBeCalled()

    await wrapper.setProps({ clearVisible: false })

    expect(wrapper.find('.ix-input-clear').classes()).not.toContain('visible')

    await wrapper.setProps({ clearable: false })

    expect(wrapper.find('.ix-input-clear').exists()).toBe(false)
  })

  test('disabled work', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()

    const wrapper = InputMount({ props: { disabled: true, onFocus, onBlur } })
    await wrapper.find('input').trigger('focus')

    expect(wrapper.classes()).toContain('ix-input-disabled')
    expect(onFocus).not.toBeCalled()

    await wrapper.find('input').trigger('blur')

    expect(onBlur).not.toBeCalled()

    await wrapper.setProps({ disabled: false })
    await wrapper.find('input').trigger('focus')

    expect(wrapper.classes()).not.toContain('ix-input-disabled')
    expect(onFocus).toBeCalled()

    await wrapper.find('input').trigger('blur')

    expect(onBlur).toBeCalled()
  })

  test('focused work', async () => {
    const wrapper = InputMount({ props: { focused: true } })

    expect(wrapper.classes()).toContain('ix-input-focused')

    await wrapper.setProps({ focused: false })

    expect(wrapper.classes()).not.toContain('ix-input-focused')
  })

  test('suffix and prefix work', async () => {
    const wrapper = InputMount({ props: { suffix: 'up', prefix: 'down' } })

    const suffix = wrapper.find('.ix-input-suffix')
    const prefix = wrapper.find('.ix-input-prefix')

    expect(suffix.find('.ix-icon-up').exists()).toBe(true)
    expect(prefix.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.setProps({ suffix: 'left' })

    expect(suffix.find('.ix-icon-left').exists()).toBe(true)

    await wrapper.setProps({ prefix: 'right' })

    expect(prefix.find('.ix-icon-right').exists()).toBe(true)

    await wrapper.setProps({ suffix: '' })

    expect(wrapper.find('.ix-input-suffix').exists()).toBe(false)

    await wrapper.setProps({ prefix: '' })

    expect(wrapper.find('.ix-input-prefix').exists()).toBe(false)
  })

  test('suffix and prefix slots work', async () => {
    const wrapper = InputMount({
      props: { suffix: 'up', prefix: 'down' },
      slots: { suffix: 'suffix slot', prefix: 'prefix slot' },
    })

    const suffix = wrapper.find('.ix-input-suffix')
    const prefix = wrapper.find('.ix-input-prefix')

    expect(suffix.find('.ix-icon-up').exists()).toBe(false)
    expect(prefix.find('.ix-icon-down').exists()).toBe(false)

    expect(suffix.text()).toBe('suffix slot')
    expect(prefix.text()).toBe('prefix slot')
  })

  test('size work', async () => {
    const wrapper = InputMount({ props: { size: 'lg' } })

    expect(wrapper.classes()).toContain('ix-input-lg')

    await wrapper.setProps({ size: 'sm' })
    expect(wrapper.classes()).toContain('ix-input-sm')

    await wrapper.setProps({ size: 'md' })
    expect(wrapper.classes()).toContain('ix-input-md')
  })
})
