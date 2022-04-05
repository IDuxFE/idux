import { MountingOptions, mount } from '@vue/test-utils'
import { computed } from 'vue'

import { renderWork } from '@tests'

import TimePanelCell from '../src/TimePanelCell'
import { timePanelContext } from '../src/tokens'
import { TimePanelCellProps } from '../src/types'

const mountGlobalOpts = {
  provide: {
    [timePanelContext as symbol]: {
      mergedPrefixCls: computed(() => 'ix-time-Panel'),
    },
  },
}

describe('TimePanelCell', () => {
  const TimePanelCellMount = (options?: MountingOptions<Partial<TimePanelCellProps>>) =>
    mount(TimePanelCell, {
      ...(options as MountingOptions<TimePanelCellProps>),
      global: mountGlobalOpts,
    })

  renderWork<TimePanelCellProps>(TimePanelCell, {
    global: mountGlobalOpts,
    props: {
      value: 1,
      disabled: false,
      selected: true,
    },
  })

  test('onChange work', async () => {
    const onChange = vi.fn()
    const wrapper = TimePanelCellMount({ props: { value: 'cell', disabled: false, selected: false, onChange } })
    wrapper.trigger('click')

    expect(onChange).toBeCalledWith('cell')
  })
  test('disabled', async () => {
    const onChange = vi.fn()
    const wrapper = TimePanelCellMount({ props: { value: 'cell', disabled: true, selected: false, onChange } })
    wrapper.trigger('click')

    expect(wrapper.element.classList.contains('ix-time-Panel-cell')).toBeTruthy()
    expect(onChange).not.toBeCalled()
  })

  test('selected', async () => {
    const onChange = vi.fn()
    const wrapper = TimePanelCellMount({ props: { value: 'cell', disabled: false, selected: true, onChange } })
    wrapper.trigger('click')

    expect(wrapper.element.classList.contains('ix-time-Panel-cell')).toBeTruthy()
    expect(onChange).not.toBeCalled()
  })
})
