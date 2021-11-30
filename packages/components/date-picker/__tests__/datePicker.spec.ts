import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import DatePicker from '../src/DatePicker'
import { DatePickerProps } from '../src/types'

describe('DatePicker', () => {
  const DatePickerMount = (options?: MountingOptions<Partial<DatePickerProps>>) =>
    mount(DatePicker, { ...(options as MountingOptions<DatePickerProps>) })

  renderWork<DatePickerProps>(DatePicker, {
    props: {},
  })

  test('v-model:value work', async () => {
    const onUpdateValue = jest.fn()
    const onChange = jest.fn()
    const wrapper = DatePickerMount({ props: { value: Date.now(), 'onUpdate:value': onUpdateValue, onChange } })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
