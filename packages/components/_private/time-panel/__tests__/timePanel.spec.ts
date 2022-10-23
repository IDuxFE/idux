import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import TimePanel from '../src/TimePanel'
import TimePanelCell from '../src/TimePanelCell'
import TimePanelColumn from '../src/TimePanelColumn'
import { TimePanelProps } from '../src/types'

const newDate = () => new Date(2021, 12, 8, 0, 0, 0, 0)

describe('TimePanel', () => {
  const TimePanelMount = (options?: MountingOptions<Partial<TimePanelProps>>) =>
    mount(TimePanel, { ...(options as MountingOptions<TimePanelProps>) })

  const findColumns = (wrapper: ReturnType<typeof TimePanelMount>) => wrapper.findAllComponents(TimePanelColumn)
  const findColumn = (wrapper: ReturnType<typeof TimePanelMount>, idx: number) => findColumns(wrapper)?.[idx]
  const findColumnCells = (wrapper: ReturnType<typeof TimePanelMount>, idx: number) =>
    findColumns(wrapper)?.[idx].findAllComponents(TimePanelCell)

  const findCellWithValue = (wrapper: ReturnType<typeof findColumn>, value: string | number) =>
    wrapper.findAllComponents(TimePanelCell).find(comp => comp.props().value === value)

  const findCell = (wrapper: ReturnType<typeof TimePanelMount>, idx: number, value: string | number) =>
    findCellWithValue(findColumn(wrapper, idx), value)

  renderWork<TimePanelProps>(TimePanel, {
    props: { value: newDate() },
  })

  test('onChange work', async () => {
    const onChange = vi.fn()
    const wrapper = TimePanelMount({
      props: {
        value: newDate(),
        hourStep: 1,
        minuteStep: 1,
        secondStep: 1,
        hourEnabled: true,
        minuteEnabled: true,
        secondEnabled: true,
        use12Hours: true,
        onChange,
      },
    })

    expect(findCell(wrapper, 0, 12)?.props().selected).toBe(true)
    expect(findCell(wrapper, 1, 0)?.props().selected).toBe(true)
    expect(findCell(wrapper, 2, 0)?.props().selected).toBe(true)
    expect(findCell(wrapper, 3, 'am')?.props().selected).toBe(true)

    await findCell(wrapper, 0, 4)?.trigger('click')
    expect(onChange).toBeCalledWith(new Date(2021, 12, 8, 4, 0, 0, 0))

    onChange.mockClear()
    await findCell(wrapper, 1, 4)?.trigger('click')
    expect(onChange).toBeCalledWith(new Date(2021, 12, 8, 0, 4, 0, 0))

    onChange.mockClear()
    await findCell(wrapper, 2, 4)?.trigger('click')
    expect(onChange).toBeCalledWith(new Date(2021, 12, 8, 0, 0, 4, 0))

    onChange.mockClear()
    await findCell(wrapper, 3, 'pm')?.trigger('click')
    expect(onChange).toBeCalledWith(new Date(2021, 12, 8, 12, 0, 0, 0))
  })

  test('column enabled status', async () => {
    const baseProps = {
      value: newDate(),
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1,
    }
    const wrapper = TimePanelMount({
      props: {
        ...baseProps,
        hourEnabled: true,
        minuteEnabled: true,
        secondEnabled: true,
        use12Hours: true,
      },
    })
    expect(findColumns(wrapper).length).toBe(4)
    expect(findColumnCells(wrapper, 0).length).toBe(12)

    await wrapper.setProps({
      ...baseProps,
      hourEnabled: true,
      minuteEnabled: true,
      secondEnabled: true,
      use12Hours: false,
    })
    expect(findColumns(wrapper).length).toBe(3)
    expect(findColumnCells(wrapper, 0).length).toBe(24)

    await wrapper.setProps({
      ...baseProps,
      hourEnabled: false,
      minuteEnabled: true,
      secondEnabled: true,
      use12Hours: false,
    })
    expect(findColumns(wrapper).length).toBe(2)
    expect(findColumnCells(wrapper, 0).length).toBe(60)

    await wrapper.setProps({
      ...baseProps,
      hourEnabled: false,
      minuteEnabled: false,
      secondEnabled: true,
      use12Hours: false,
    })
    expect(findColumns(wrapper).length).toBe(1)
    expect(findColumnCells(wrapper, 0).length).toBe(60)

    await wrapper.setProps({
      ...baseProps,
      hourEnabled: false,
      minuteEnabled: false,
      secondEnabled: false,
      use12Hours: false,
    })
    expect(findColumns(wrapper).length).toBe(0)
  })

  test('step work', async () => {
    const baseProps = {
      value: newDate(),
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1,
      hourEnabled: true,
      minuteEnabled: true,
      secondEnabled: true,
      use12Hours: false,
    }

    const wrapper = TimePanelMount({
      props: {
        ...baseProps,
        hourStep: 2,
      },
    })
    expect(findColumnCells(wrapper, 0).length).toBe(12)
    expect(findCell(wrapper, 0, 0)).toBeDefined()
    expect(findCell(wrapper, 0, 1)).toBeUndefined()

    await wrapper.setProps({
      ...baseProps,
      minuteStep: 2,
    })
    expect(findColumnCells(wrapper, 1).length).toBe(30)
    expect(findCell(wrapper, 1, 0)).toBeDefined()
    expect(findCell(wrapper, 1, 1)).toBeUndefined()

    await wrapper.setProps({
      ...baseProps,
      secondStep: 2,
    })
    expect(findColumnCells(wrapper, 2).length).toBe(30)
    expect(findCell(wrapper, 2, 0)).toBeDefined()
    expect(findCell(wrapper, 2, 1)).toBeUndefined()
  })

  test('disabledHours work', async () => {
    const onChange = vi.fn()
    const wrapper = TimePanelMount({
      props: { value: newDate(), hourEnabled: true, disabledHours: () => [1, 2, 3, 4, 5], onChange },
    })

    const disabledCell1 = findCell(wrapper, 0, 1)
    const disabledCell5 = findCell(wrapper, 0, 5)
    const enabledCell = findCell(wrapper, 0, 6)
    expect(!!disabledCell1?.props().disabled).toBe(true)
    expect(!!disabledCell5?.props().disabled).toBe(true)
    expect(!!enabledCell?.props().disabled).toBe(false)

    await disabledCell1?.trigger('click')
    expect(onChange).not.toBeCalled()

    await disabledCell5?.trigger('click')
    expect(onChange).not.toBeCalled()

    await enabledCell?.trigger('click')
    expect(onChange).toBeCalled()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disableMinutes work', async () => {
    const wrapper = TimePanelMount({
      props: { value: newDate(), hourEnabled: true, minuteEnabled: true, disabledMinutes: () => [1, 2, 3, 4, 5] },
    })
    expect(findCell(wrapper, 1, 1)?.props().disabled).toBe(true)
    expect(findCell(wrapper, 1, 6)?.props().disabled).toBe(false)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disableSeconds work', async () => {
    const wrapper = TimePanelMount({
      props: {
        value: newDate(),
        hourEnabled: true,
        minuteEnabled: true,
        secondEnabled: true,
        disabledSeconds: () => [1, 2, 3, 4, 5],
      },
    })
    expect(findCell(wrapper, 2, 1)?.props().disabled).toBe(true)
    expect(findCell(wrapper, 2, 6)?.props().disabled).toBe(false)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
