import { mount, MountingOptions } from '@vue/test-utils'
import IxOption from '../src/Option.vue'
import IxOptionGroup from '../src/OptionGroup.vue'
import { OptionProps, OptionGroupProps } from '../src/types'

describe('Option', () => {
  const OptionMount = (options?: MountingOptions<Partial<OptionProps>>) => mount(IxOption, { ...options })

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

describe('OptionGroup', () => {
  const OptionGroupMount = (options?: MountingOptions<Partial<OptionGroupProps>>) =>
    mount(IxOptionGroup, { ...options })

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
