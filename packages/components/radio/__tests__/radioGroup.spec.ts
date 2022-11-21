import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Radio from '../src/Radio'
import RadioGroup from '../src/RadioGroup'
import { RadioGroupProps } from '../src/types'

describe('RadioGroup', () => {
  const defaultDataSource = [
    { label: 'Beijing', key: 'a' },
    { label: 'Shanghai', key: 'b' },
    { label: 'Guangzhou', key: 'c' },
    { label: 'Shenzhen', key: 'd' },
  ]
  const RadioGroupMount = (groupOptions?: MountingOptions<Partial<RadioGroupProps>>) => {
    const { props, ...rest } = groupOptions || {}
    return mount(RadioGroup, { props: { dataSource: defaultDataSource, ...props }, ...rest })
  }

  renderWork<RadioGroupProps>(RadioGroup, { props: { dataSource: defaultDataSource } })

  test('value work', async () => {
    const wrapper = RadioGroupMount({ props: { value: 'a' } })

    expect(wrapper.find('.ix-radio-checked').text()).toBe('Beijing')

    await wrapper.setProps({ value: 'b' })

    expect(wrapper.find('.ix-radio-checked').text()).toBe('Shanghai')
  })

  test('onUpdate:value work', async () => {
    const onUpdate = vi.fn()
    const wrapper = RadioGroupMount({ props: { 'onUpdate:value': onUpdate } })

    await wrapper.findAll('input')[0].setValue(true)
    await flushPromises()

    expect(onUpdate).toBeCalledWith('a')

    await wrapper.findAll('input')[1].setValue(true)

    expect(onUpdate).toBeCalledWith('b')
  })

  test('buttoned work', async () => {
    const wrapper = RadioGroupMount({ props: { buttoned: true } })

    expect(wrapper.findAll('.ix-button').length).toBe(4)

    await wrapper.setProps({ buttoned: false })

    expect(wrapper.findAll('.ix-button').length).toBe(0)
  })

  test('disabled work', async () => {
    const wrapper = RadioGroupMount({ props: { disabled: true } })

    expect(wrapper.findAll('.ix-radio-disabled').length).toBe(4)

    await wrapper.setProps({ disabled: false })

    expect(wrapper.findAll('.ix-radio-disabled').length).toBe(0)
  })

  test('name work', async () => {
    const wrapper = RadioGroupMount({ props: { name: 'city' } })

    expect(wrapper.findAll('input[name="city"]').length).toBe(4)

    await wrapper.setProps({ name: 'city1' })

    expect(wrapper.findAll('input[name="city1"]').length).toBe(4)
  })

  test('mode work', async () => {
    const wrapper = RadioGroupMount({ props: { value: 'a', mode: 'primary', buttoned: true } })

    expect(wrapper.findAll('.ix-button-primary').length).toBe(1)
    expect(wrapper.findAll('.ix-button-default').length).toBe(3)

    await wrapper.setProps({ mode: 'default' })

    expect(wrapper.findAll('.ix-button-default').length).toBe(4)
  })

  test('dataSource work', async () => {
    let dataSource = [
      { label: 'Beijing', key: 'a', disabled: true },
      { label: 'Shanghai', key: 'b' },
    ]
    const wrapper = RadioGroupMount({ props: { dataSource } })

    expect(wrapper.findAll('.ix-radio-disabled').length).toBe(1)

    expect(wrapper.findAll('.ix-radio').length).toBe(2)

    dataSource = [
      { label: 'Beijing', key: 'a' },
      { label: 'Shanghai', key: 'b' },
      { label: 'Guangzhou', key: 'c' },
    ]

    await wrapper.setProps({ dataSource })

    expect(wrapper.findAll('.ix-radio').length).toBe(3)
  })

  test('default slot work', async () => {
    const dataSource = undefined
    const slots = [h(Radio, { label: 'A' }), h(Radio, { label: 'B' }), h(Radio, { label: 'C' })]
    const wrapper = RadioGroupMount({ props: { dataSource }, slots: { default: () => slots } })

    expect(wrapper.findAll('.ix-radio').length).toBe(3)
  })

  test('size work', async () => {
    const wrapper = RadioGroupMount({ props: { size: 'lg', buttoned: true } })

    expect(wrapper.findAll('.ix-radio-lg').length).toBe(4)

    await wrapper.setProps({ size: 'sm' })

    expect(wrapper.findAll('.ix-radio-sm').length).toBe(4)

    await wrapper.setProps({ size: undefined })

    expect(wrapper.findAll('.ix-radio-md').length).toBe(4)
  })
})
