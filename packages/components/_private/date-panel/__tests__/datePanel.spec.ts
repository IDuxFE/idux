import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import DatePanel from '../src/DatePanel'
import { DatePanelProps } from '../src/types'

describe('DatePanel', () => {
  const DatePanelMount = (options?: MountingOptions<Partial<DatePanelProps>>) =>
    mount(DatePanel, { ...(options as MountingOptions<DatePanelProps>) })

  renderWork<DatePanelProps>(DatePanel, {
    props: { value: new Date('2021-10-01') },
  })

  test('disabledDate work', async () => {
    const wrapper = DatePanelMount({ props: { value: new Date('2021-10-01'), disabledDate: () => true } })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
