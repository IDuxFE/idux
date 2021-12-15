import { MountingOptions, mount } from '@vue/test-utils'
import { computed } from 'vue'

import { renderWork } from '@tests'

import TimePanelCell from '../src/TimePanelCell'
import TimePanelColumn from '../src/TimePanelColumn'
import { timePanelContext } from '../src/tokens'
import { TimePanelColumnProps } from '../src/types'

const options = [
  {
    value: 1,
    disabled: false,
  },
  {
    value: 2,
    disabled: true,
  },
  {
    value: 3,
    disabled: false,
  },
  {
    value: 4,
    disabled: false,
  },
  {
    value: 5,
    disabled: true,
  },
]
const mountGlobalOpts = {
  provide: {
    [timePanelContext as symbol]: {
      mergedPrefixCls: computed(() => 'ix-time-Panel'),
    },
  },
}

describe('TimePanelColumn', () => {
  const TimePanelColumnMount = (options?: MountingOptions<Partial<TimePanelColumnProps>>) =>
    mount(TimePanelColumn, {
      ...(options as MountingOptions<TimePanelColumnProps>),
      global: mountGlobalOpts,
    })

  const findCellWithValue = (wrapper: ReturnType<typeof TimePanelColumnMount>, value: string | number) =>
    wrapper.findAllComponents(TimePanelCell).find(comp => comp.props().value === value)

  renderWork<TimePanelColumnProps>(TimePanelColumn, {
    global: mountGlobalOpts,
    props: {
      selectedValue: 1,
      options,
    },
  })

  test('selectedValue work', async () => {
    const wrapper = TimePanelColumnMount({ props: { selectedValue: 1, options } })

    expect(findCellWithValue(wrapper, 1)?.props().selected).toBe(true)

    await wrapper.setProps({ selectedValue: 3 })
    expect(findCellWithValue(wrapper, 1)?.props().selected).toBe(false)
    expect(findCellWithValue(wrapper, 3)?.props().selected).toBe(true)
  })

  test('onChange work', async () => {
    const onChange = jest.fn()
    const wrapper = TimePanelColumnMount({ props: { selectedValue: 1, options, onChange } })

    await findCellWithValue(wrapper, 3)?.trigger('click')
    expect(onChange).toBeCalledWith(3)
  })
})
