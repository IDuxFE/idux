import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import TimeSelector from '../src/TimeSelector'
import TimeSelectorCell from '../src/TimeSelectorCell'
import TimeSelectorColumn from '../src/TimeSelectorColumn'
import { TimeSelectorProps } from '../src/types'

const newDate = () => new Date(2021, 12, 8, 0, 0, 0, 0)

describe('TimeSelector', () => {
  const TimeSelectorMount = (options?: MountingOptions<Partial<TimeSelectorProps>>) =>
    mount(TimeSelector, { ...(options as MountingOptions<TimeSelectorProps>) })

  const findColumns = (wrapper: ReturnType<typeof TimeSelectorMount>) => wrapper.findAllComponents(TimeSelectorColumn)
  const findColumn = (wrapper: ReturnType<typeof TimeSelectorMount>, idx: number) => findColumns(wrapper)?.[idx]
  const findColumnCells = (wrapper: ReturnType<typeof TimeSelectorMount>, idx: number) =>
    findColumns(wrapper)?.[idx].findAllComponents(TimeSelectorCell)

  const findCellWithValue = (wrapper: ReturnType<typeof findColumn>, value: string | number) =>
    wrapper.findAllComponents(TimeSelectorCell).find(comp => comp.props().value === value)

  const findCell = (wrapper: ReturnType<typeof TimeSelectorMount>, idx: number, value: string | number) =>
    findCellWithValue(findColumn(wrapper, idx), value)

  renderWork<TimeSelectorProps>(TimeSelector, {
    props: { value: newDate() },
  })

  test('onChange work', async () => {
    const onChange = jest.fn()
    const wrapper = TimeSelectorMount({
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
    const wrapper = TimeSelectorMount({
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

    const wrapper = TimeSelectorMount({
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
    const wrapper = TimeSelectorMount({
      props: { value: newDate(), hourEnabled: true, disabledHours: () => [1, 2, 3, 4, 5] },
    })
    expect(findCell(wrapper, 0, 1)?.props().disabled).toBe(true)
    expect(findCell(wrapper, 0, 6)?.props().disabled).toBe(false)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disableMinutes work', async () => {
    const wrapper = TimeSelectorMount({
      props: { value: newDate(), hourEnabled: true, minuteEnabled: true, disabledMinutes: () => [1, 2, 3, 4, 5] },
    })
    expect(findCell(wrapper, 1, 1)?.props().disabled).toBe(true)
    expect(findCell(wrapper, 1, 6)?.props().disabled).toBe(false)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disableSeconds work', async () => {
    const wrapper = TimeSelectorMount({
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
