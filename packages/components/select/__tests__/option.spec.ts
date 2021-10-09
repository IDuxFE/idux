import { MountingOptions, mount } from '@vue/test-utils'

import SelectOption from '../src/SelectOption.vue'
import SelectOptionGroup from '../src/SelectOptionGroup.vue'
import { SelectOptionGroupProps, SelectOptionProps } from '../src/types'

describe('SelectOption', () => {
  const OptionMount = (options?: MountingOptions<Partial<SelectOptionProps>>) => mount(SelectOption, { ...options })

  afterEach(() => {
    jest.spyOn(console, 'warn').mockClear()
  })

  test('render work', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = OptionMount({ props: { label: 'Tom', value: 'tom' } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warn).toBeCalledTimes(2)
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })
})

describe('SelectOptionGroup', () => {
  const OptionGroupMount = (options?: MountingOptions<Partial<SelectOptionGroupProps>>) =>
    mount(SelectOptionGroup, { ...options })

  afterEach(() => {
    jest.spyOn(console, 'warn').mockClear()
  })

  test('render work', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = OptionGroupMount({ props: { label: 'TomGroup' } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warn).toBeCalledTimes(1)
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })
})
