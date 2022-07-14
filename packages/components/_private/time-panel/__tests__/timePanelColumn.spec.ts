import { MountingOptions, mount } from '@vue/test-utils'
import { computed } from 'vue'

import { renderWork, scrollTarget, wait } from '@tests'

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
      mergedPrefixCls: computed(() => 'ix-time-panel'),
    },
  },
}
const cellHeight = 50

describe('TimePanelColumn', () => {
  const TimePanelColumnMount = (options?: MountingOptions<Partial<TimePanelColumnProps>>) => {
    const wrapper = mount(TimePanelColumn, {
      ...(options as MountingOptions<TimePanelColumnProps>),
      global: mountGlobalOpts,
    })

    Object.defineProperty(wrapper.element, 'offsetHeight', {
      get() {
        return cellHeight
      },
    })
    wrapper.findAll('.ix-time-panel-cell').forEach(li => {
      Object.defineProperty(li.element, 'offsetHeight', {
        get() {
          return cellHeight
        },
      })
    })

    return wrapper
  }

  const findCellWithValue = (wrapper: ReturnType<typeof TimePanelColumnMount>, value: string | number) =>
    wrapper.findAllComponents(TimePanelCell).find(comp => comp.props().value === value)

  renderWork<TimePanelColumnProps>(TimePanelColumn, {
    global: mountGlobalOpts,
    props: {
      selectedValue: 1,
      activeValue: 1,
      options,
    },
  })

  test('selectedValue work', async () => {
    const wrapper = TimePanelColumnMount({ props: { selectedValue: 1, activeValue: 1, options } })

    expect(findCellWithValue(wrapper, 1)?.props().selected).toBe(true)

    await wrapper.setProps({ selectedValue: 3 })
    expect(findCellWithValue(wrapper, 1)?.props().selected).toBe(false)
    expect(findCellWithValue(wrapper, 3)?.props().selected).toBe(true)
  })

  test('activeValue work', async () => {
    const wrapper = TimePanelColumnMount({ props: { selectedValue: 1, activeValue: 1, options } })
    const list = wrapper.find('.ix-time-panel-column-inner')

    expect(list.element.scrollTop).toBe(0)

    await wrapper.setProps({ activeValue: 3 })
    await wait(400)
    expect(list.element.scrollTop).toBe(2 * cellHeight)
  })

  test('onActiveChange work', async () => {
    const onActiveChange = vi.fn()
    const wrapper = TimePanelColumnMount({ props: { selectedValue: 1, activeValue: 1, options, onActiveChange } })

    await findCellWithValue(wrapper, 3)?.trigger('click')
    expect(onActiveChange).toBeCalledWith({ value: 3, disabled: false })
  })

  test('wheel work', async () => {
    const onActiveChange = vi.fn()
    const wrapper = TimePanelColumnMount({ props: { selectedValue: 1, activeValue: 2, options, onActiveChange } })

    await wrapper.trigger('wheel', { deltaY: 1 })
    expect(onActiveChange).toBeCalledWith({ value: 3, disabled: false })

    onActiveChange.mockClear()

    await wrapper.trigger('wheel', { deltaY: -1 })
    expect(onActiveChange).toBeCalledWith({ value: 1, disabled: false })
  })

  test('scroll work', async () => {
    const onActiveChange = vi.fn()
    const wrapper = TimePanelColumnMount({ props: { selectedValue: 1, activeValue: 1, options, onActiveChange } })
    const list = wrapper.find('.ix-time-panel-column-inner')

    await scrollTarget(3 * cellHeight, list.element)
    expect(onActiveChange).toBeCalledWith({ value: 4, disabled: false })

    onActiveChange.mockClear()

    await wrapper.trigger('wheel', { deltaY: 1 })
    await scrollTarget(3 * cellHeight, list.element)

    expect(onActiveChange).toBeCalledWith({ value: 2, disabled: true })
  })
})
