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
    const onUpdateValue = vi.fn()
    const onChange = vi.fn()
    const wrapper = DatePickerMount({
      props: { value: new Date('2021-10-01'), 'onUpdate:value': onUpdateValue, onChange },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
