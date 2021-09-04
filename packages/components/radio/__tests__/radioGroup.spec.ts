import { flushPromises, mount, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'
import Radio from '../src/Radio'
import RadioGroup from '../src/RadioGroup'
import { RadioGroupProps } from '../src/types'
import { h } from 'vue'

describe('RadioGroup', () => {
  const defaultOptions = [
    { label: 'Beijing', value: 'a' },
    { label: 'Shanghai', value: 'b' },
    { label: 'Guangzhou', value: 'c' },
    { label: 'Shenzhen', value: 'd' },
  ]
  const RadioGroupMount = (groupOptions?: MountingOptions<Partial<RadioGroupProps>>) => {
    const { props, ...rest } = groupOptions || {}
    return mount(RadioGroup, { props: { options: defaultOptions, ...props }, ...rest })
  }

  renderWork<RadioGroupProps>(Radio, { props: { label: 'Test', options: defaultOptions } })

  test('value work', async () => {
    const wrapper = RadioGroupMount({ props: { value: 'a' } })

    expect(wrapper.find('.ix-radio-checked').text()).toBe('Beijing')

    await wrapper.setProps({ value: 'b' })

    expect(wrapper.find('.ix-radio-checked').text()).toBe('Shanghai')
  })

  test('onUpdate:checked work', async () => {
    const onUpdate = jest.fn()
    const wrapper = RadioGroupMount({ props: { 'onUpdate:value': onUpdate } })

    await wrapper.findAll('input')[0].setValue(true)
    await flushPromises()

    expect(onUpdate).toBeCalledWith('a')

    await wrapper.findAll('input')[1].setValue(true)

    expect(onUpdate).toBeCalledWith('b')
  })

  test('buttoned work', async () => {
    const wrapper = RadioGroupMount({ props: { buttoned: true } })

    expect(wrapper.findAll('.ix-radio-button').length).toBe(4)

    await wrapper.setProps({ buttoned: false })

    expect(wrapper.findAll('.ix-radio-button').length).toBe(0)
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
    const wrapper = RadioGroupMount({ props: { mode: 'primary', buttoned: true } })

    expect(wrapper.findAll('.ix-radio-primary').length).toBe(4)

    await wrapper.setProps({ mode: 'default' })

    expect(wrapper.findAll('.ix-radio-default').length).toBe(4)
  })

  test('options work', async () => {
    let options = [
      { label: 'Beijing', value: 'a' },
      { label: 'Shanghai', value: 'b' },
    ]
    const wrapper = RadioGroupMount({ props: { options } })

    expect(wrapper.findAll('.ix-radio').length).toBe(2)

    options = [
      { label: 'Beijing', value: 'a' },
      { label: 'Shanghai', value: 'b' },
      { label: 'Guangzhou', value: 'c' },
    ]

    await wrapper.setProps({ options })

    expect(wrapper.findAll('.ix-radio').length).toBe(3)
  })

  test('size work', async () => {
    const wrapper = RadioGroupMount({ props: { size: 'large', buttoned: true } })

    expect(wrapper.findAll('.ix-radio-large').length).toBe(4)

    await wrapper.setProps({ size: 'medium' })

    expect(wrapper.findAll('.ix-radio-medium').length).toBe(4)
  })

  test('default slot work', async () => {
    const options = undefined
    const slots = [h(Radio, { label: 'A' }), h(Radio, { label: 'B' }), h(Radio, { label: 'C' })]
    const wrapper = RadioGroupMount({ props: { options }, slots: { default: () => slots } })

    expect(wrapper.findAll('.ix-radio').length).toBe(3)
  })
})
