import { MountingOptions, mount } from '@vue/test-utils'
import { computed } from 'vue'

import { renderWork } from '@tests'

import TimeSelectorCell from '../src/TimeSelectorCell'
import { timeSelectorContext } from '../src/tokens'
import { TimeSelectorCellProps } from '../src/types'

const mountGlobalOpts = {
  provide: {
    [timeSelectorContext as symbol]: {
      mergedPrefixCls: computed(() => 'ix-time-selector'),
    },
  },
}

describe('TimeSelectorCell', () => {
  const TimeSelectorCellMount = (options?: MountingOptions<Partial<TimeSelectorCellProps>>) =>
    mount(TimeSelectorCell, {
      ...(options as MountingOptions<TimeSelectorCellProps>),
      global: mountGlobalOpts,
    })

  renderWork<TimeSelectorCellProps>(TimeSelectorCell, {
    global: mountGlobalOpts,
    props: {
      value: 1,
      disabled: false,
      selected: true,
    },
  })

  test('onChange work', async () => {
    const onChange = jest.fn()
    const wrapper = TimeSelectorCellMount({ props: { value: 'cell', disabled: false, selected: false, onChange } })
    wrapper.trigger('click')

    expect(onChange).toBeCalledWith('cell')
  })
  test('disabled', async () => {
    const onChange = jest.fn()
    const wrapper = TimeSelectorCellMount({ props: { value: 'cell', disabled: true, selected: false, onChange } })
    wrapper.trigger('click')

    expect(wrapper.element.classList.contains('ix-time-selector-cell')).toBeTruthy()
    expect(onChange).not.toBeCalled()
  })

  test('selected', async () => {
    const onChange = jest.fn()
    const wrapper = TimeSelectorCellMount({ props: { value: 'cell', disabled: false, selected: true, onChange } })
    wrapper.trigger('click')

    expect(wrapper.element.classList.contains('ix-time-selector-cell')).toBeTruthy()
    expect(onChange).not.toBeCalled()
  })
})
