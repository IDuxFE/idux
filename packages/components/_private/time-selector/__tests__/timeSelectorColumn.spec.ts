import { MountingOptions, mount } from '@vue/test-utils'
import { computed } from 'vue'

import { renderWork } from '@tests'

import TimeSelectorCell from '../src/TimeSelectorCell'
import TimeSelectorColumn from '../src/TimeSelectorColumn'
import { timeSelectorContext } from '../src/tokens'
import { TimeSelectorColumnProps } from '../src/types'

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
    [timeSelectorContext as symbol]: {
      mergedPrefixCls: computed(() => 'ix-time-selector'),
    },
  },
}

describe('TimeSelectorColumn', () => {
  const TimeSelectorColumnMount = (options?: MountingOptions<Partial<TimeSelectorColumnProps>>) =>
    mount(TimeSelectorColumn, {
      ...(options as MountingOptions<TimeSelectorColumnProps>),
      global: mountGlobalOpts,
    })

  const findCellWithValue = (wrapper: ReturnType<typeof TimeSelectorColumnMount>, value: string | number) =>
    wrapper.findAllComponents(TimeSelectorCell).find(comp => comp.props().value === value)

  renderWork<TimeSelectorColumnProps>(TimeSelectorColumn, {
    global: mountGlobalOpts,
    props: {
      selectedValue: 1,
      options,
    },
  })

  test('selectedValue work', async () => {
    const wrapper = TimeSelectorColumnMount({ props: { selectedValue: 1, options } })

    expect(findCellWithValue(wrapper, 1)?.props().selected).toBe(true)

    await wrapper.setProps({ selectedValue: 3 })
    expect(findCellWithValue(wrapper, 1)?.props().selected).toBe(false)
    expect(findCellWithValue(wrapper, 3)?.props().selected).toBe(true)
  })

  test('onChange work', async () => {
    const onChange = jest.fn()
    const wrapper = TimeSelectorColumnMount({ props: { selectedValue: 1, options, onChange } })

    await findCellWithValue(wrapper, 3)?.trigger('click')
    expect(onChange).toBeCalledWith(3)
  })
})
