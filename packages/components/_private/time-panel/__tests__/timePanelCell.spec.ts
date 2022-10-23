import { MountingOptions, mount } from '@vue/test-utils'
import { computed } from 'vue'

import { renderWork } from '@tests'

import TimePanelCell from '../src/TimePanelCell'
import { timePanelContext } from '../src/tokens'
import { TimePanelCellProps } from '../src/types'

const mountGlobalOpts = {
  provide: {
    [timePanelContext as symbol]: {
      mergedPrefixCls: computed(() => 'ix-time-panel'),
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

  test('onActive work', async () => {
    const onActive = vi.fn()
    const wrapper = TimePanelCellMount({ props: { value: 'cell', disabled: false, selected: false, onActive } })
    wrapper.trigger('click')

    expect(onActive).toBeCalledWith({ value: 'cell', disabled: false })
  })
  test('disabled', async () => {
    const onActive = vi.fn()
    const wrapper = TimePanelCellMount({ props: { value: 'cell', disabled: true, selected: false, onActive } })
    wrapper.trigger('click')

    expect(wrapper.element.classList.contains('ix-time-panel-cell-disabled')).toBeTruthy()
    expect(onActive).not.toBeCalled()
  })

  test('selected', async () => {
    const onActive = vi.fn()
    const wrapper = TimePanelCellMount({ props: { value: 'cell', disabled: false, selected: true, onActive } })
    wrapper.trigger('click')

    expect(wrapper.element.classList.contains('ix-time-panel-cell-selected')).toBeTruthy()
    expect(onActive).not.toBeCalled()
  })
})
