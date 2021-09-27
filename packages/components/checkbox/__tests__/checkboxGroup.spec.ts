import { mount, MountingOptions } from '@vue/test-utils'
import CheckboxGroup from '../src/CheckboxGroup'
import { renderWork } from '@tests'
import { CheckboxGroupProps } from '../src/types'

describe('CheckboxGroup.vue and Checkbox', () => {
  const defaultOptions = [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option2' },
    { label: 'option3', value: 'option3' },
  ]

  const CheckboxGroupMount = (groupOptions?: MountingOptions<Partial<CheckboxGroupProps>>) => {
    const { props, ...rest } = groupOptions || {}
    return mount(CheckboxGroup, { props: { options: defaultOptions, ...props }, ...rest })
  }

  renderWork<CheckboxGroupProps>(CheckboxGroup, { props: { options: defaultOptions } })

  test('v-model:value work', async () => {
    const wrapper = CheckboxGroupMount({ props: { value: ['option1'] } })

    expect(wrapper.findAll('.ix-checkbox-checked').length).toBe(1)

    await wrapper.setProps({ value: [] })

    expect(wrapper.findAll('.ix-checkbox')[0].classes()).not.toContain('ix-checkbox-checked')

    await wrapper.findAll('input')[0].setValue(true)
    expect(wrapper.emitted()['update:value'].slice(-1)[0]).toEqual([['option1']])
  })

  test('onChange work', async () => {
    const mockFn = jest.fn()
    const wrapper = CheckboxGroupMount({ props: { onChange: mockFn } })

    expect(mockFn).toBeCalledTimes(0)

    await wrapper.findAll('input')[0].setValue(true)

    expect(mockFn).toBeCalledTimes(1)
  })

  test('disabled work', async () => {
    const mockFn = jest.fn()
    const wrapper = CheckboxGroupMount({
      props: {
        value: ['option1'],
        disabled: true,
        onChange: mockFn,
      },
    })

    expect(wrapper.findAll('.ix-checkbox-disabled').length).toBe(3)

    await wrapper.findAll('input')[0].setValue(true)
    expect(mockFn).toBeCalledTimes(0)
    expect(wrapper.emitted()).not.toHaveProperty('update:value')

    await wrapper.setProps({ disabled: false })

    expect(wrapper.findAll('.ix-checkbox-disabled').length).toBe(0)

    await wrapper.findAll('input')[0].setValue(false)

    expect(mockFn).toBeCalledTimes(1)
    expect(wrapper.emitted()['update:value'].slice(-1)[0]).toEqual([[]])
  })

  test('options work', async () => {
    let options = [
      { label: 'option1', value: 'option1' },
      { label: 'option2', value: 'option2' },
    ]
    const wrapper = CheckboxGroupMount({ props: { options } })

    expect(wrapper.findAll('.ix-checkbox').length).toBe(2)

    options = [
      { label: 'option1', value: 'option1' },
      { label: 'option2', value: 'option2' },
      { label: 'option3', value: 'option3' },
    ]

    await wrapper.setProps({ options })

    expect(wrapper.findAll('.ix-checkbox').length).toBe(3)
  })

  test('name work', async () => {
    const options = [
      { label: 'option1', value: 'option1', name: 'child' },
      { label: 'option2', value: 'option2' },
      { label: 'option3', value: 'option3' },
    ]
    const wrapper = CheckboxGroupMount({
      props: {
        name: 'group',
        options,
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
      props: {
        buttoned: true,
        size: 'small',
      },
    })

    expect(wrapper.findAll('.ix-checkbox-button-small').length).toBe(3)
  })

  test('gap work', async () => {
    const wrapper = CheckboxGroupMount()

    expect(wrapper.classes()).toContain('ix-checkbox-group-no-gap')

    await wrapper.setProps({ gap: 20 })

    expect(wrapper.findAll('.ix-checkbox')[0].attributes()['style']).toEqual('margin-right: 20px;')
  })
})
