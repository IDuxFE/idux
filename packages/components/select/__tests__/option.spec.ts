import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import IxOption from '../src/Option.vue'
import IxOptionGroup from '../src/OptionGroup.vue'
import { OptionProps, OptionGroupProps, OptionInstance, OptionGroupInstance } from '../src/types'

describe('Option.vue', () => {
  let OptionMount: (options?: MountingOptions<Partial<OptionProps>>) => VueWrapper<OptionInstance>

  beforeEach(() => {
    OptionMount = options => mount<OptionInstance>(IxOption, { ...options })
  })

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

describe('OptionGroup.vue', () => {
  let OptionGroupMount: (options?: MountingOptions<Partial<OptionGroupProps>>) => VueWrapper<OptionGroupInstance>

  beforeEach(() => {
    OptionGroupMount = options => mount<OptionGroupInstance>(IxOptionGroup, { ...options })
  })

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
