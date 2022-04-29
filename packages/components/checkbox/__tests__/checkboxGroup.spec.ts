import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import CheckboxGroup from '../src/CheckboxGroup'
import { CheckboxGroupProps } from '../src/types'

describe('CheckboxGroup', () => {
  const defaultOptions = [
    { label: 'option1', key: 'option1' },
    { label: 'option2', key: 'option2' },
    { label: 'option3', key: 'option3' },
  ]

  const CheckboxGroupMount = (groupOptions?: MountingOptions<Partial<CheckboxGroupProps>>) => {
    const { props, ...rest } = groupOptions || {}
    return mount(CheckboxGroup, { props: { dataSource: defaultOptions, ...props }, ...rest })
  }

  renderWork<CheckboxGroupProps>(CheckboxGroup, { props: { dataSource: defaultOptions } })

  test('v-model:value work', async () => {
    const onUpdateValue = vi.fn()
    const onChange = vi.fn()
    const wrapper = CheckboxGroupMount({ props: { value: ['option1'], 'onUpdate:value': onUpdateValue, onChange } })

    expect(wrapper.findAll('.ix-checkbox-checked').length).toBe(1)

    await wrapper.setProps({ value: [] })

    expect(wrapper.findAll('.ix-checkbox')[0].classes()).not.toContain('ix-checkbox-checked')

    await wrapper.findAll('input')[0].setValue(true)

    expect(onUpdateValue).toBeCalledWith(['option1'])
    expect(onChange).toBeCalledWith(['option1'], [])
  })

  test('disabled work', async () => {
    const onChange = vi.fn()
    const wrapper = CheckboxGroupMount({
      props: {
        value: ['option1'],
        disabled: true,
        onChange,
      },
    })

    expect(wrapper.findAll('.ix-checkbox-disabled').length).toBe(3)

    await wrapper.findAll('input')[0].setValue(true)

    expect(onChange).toBeCalledTimes(0)

    await wrapper.setProps({ disabled: false })

    expect(wrapper.findAll('.ix-checkbox-disabled').length).toBe(0)

    await wrapper.findAll('input')[0].setValue(false)

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith([], ['option1'])
  })

  test('dataSource work', async () => {
    let dataSource = [
      { label: 'option1', key: 'option1' },
      { label: 'option2', key: 'option2', disabled: true },
    ]
    const wrapper = CheckboxGroupMount({ props: { dataSource } })

    expect(wrapper.findAll('.ix-checkbox').length).toBe(2)

    expect(wrapper.findAll('.ix-checkbox-disabled').length).toBe(1)

    dataSource = [
      { label: 'option1', key: 'option1' },
      { label: 'option2', key: 'option2' },
      { label: 'option3', key: 'option3' },
    ]

    await wrapper.setProps({ dataSource })

    expect(wrapper.findAll('.ix-checkbox').length).toBe(3)
  })

  test('name work', async () => {
    const dataSource = [
      { label: 'option1', key: 'option1', name: 'child' },
      { label: 'option2', key: 'option2' },
      { label: 'option3', key: 'option3' },
    ]
    const wrapper = CheckboxGroupMount({
      props: {
        name: 'group',
        dataSource,
      },
    })

    expect(wrapper.findAll('input[name=group]').length).toBe(2)
    expect(wrapper.findAll('input[name=child]').length).toBe(1)
  })

  test('buttoned work', async () => {
    const wrapper = CheckboxGroupMount({
      props: {
        buttoned: true,
      },
    })

    expect(wrapper.findAll('.ix-checkbox-button').length).toBe(3)
  })

  test('size work', async () => {
    const wrapper = CheckboxGroupMount({
      props: { buttoned: true, size: 'sm' },
    })

    expect(wrapper.findAll('.ix-checkbox-sm').length).toBe(3)
  })

  test('gap work', async () => {
    const wrapper = CheckboxGroupMount()

    expect(wrapper.classes()).not.toContain('ix-checkbox-group-with-gap')

    await wrapper.setProps({ gap: 8 })

    expect(wrapper.classes()).toContain('ix-checkbox-group-with-gap')
    expect((wrapper.element as HTMLElement).style.gap).toEqual('8px')
  })
})
