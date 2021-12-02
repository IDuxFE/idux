import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import TimeSelector from '../src/TimeSelector'
import { TimeSelectorProps } from '../src/types'

describe('DatePanel', () => {
  const DatePanelMount = (options?: MountingOptions<Partial<TimeSelectorProps>>) =>
    mount(TimeSelector, { ...(options as MountingOptions<TimeSelectorProps>) })

  renderWork<TimeSelectorProps>(TimeSelector, {
    props: { value: new Date('2021-12-01') },
  })

  test('disabledDate work', async () => {
    const wrapper = DatePanelMount({ props: { value: new Date('2021-12-01'), disabledDate: () => true } })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
