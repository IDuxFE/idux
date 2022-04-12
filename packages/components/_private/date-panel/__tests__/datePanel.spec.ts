import { MountingOptions, VueWrapper, mount } from '@vue/test-utils'

import { isArray } from 'lodash-es'

import { renderWork } from '@tests'
import { endOfWeek, startOfWeek } from 'date-fns'

import DatePanel from '../src/DatePanel'
import PanelCell from '../src/panel-body/PanelCell'
import { DatePanelInstance, DatePanelProps } from '../src/types'

describe('DatePanel', () => {
  const DatePanelMount = (options?: MountingOptions<Partial<DatePanelProps>>) =>
    mount(DatePanel, { ...(options as MountingOptions<DatePanelProps>) }) as VueWrapper<DatePanelInstance>

  const findCell = (wrapper: VueWrapper<DatePanelInstance>, cellLabel: string) =>
    wrapper.findAllComponents(PanelCell).find(cell => cell.find('.ix-date-panel-cell-trigger').text() === cellLabel)

  renderWork<DatePanelProps>(DatePanel, {
    props: { value: new Date('2021-10-01'), activeDate: new Date('2021-10-01') },
  })

  test('date type value work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'date',
        value: new Date('2021-10-10'),
        activeDate: new Date('2021-10-10'),
      },
    })

    expect(findCell(wrapper, '10')?.classes()).toContain('ix-date-panel-cell-selected')

    await wrapper.setProps({ value: new Date('2021-10-12') })

    expect(findCell(wrapper, '10')?.classes()).not.toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '12')?.classes()).toContain('ix-date-panel-cell-selected')

    await wrapper.setProps({ value: [new Date('2021-10-10'), new Date('2021-10-22')] })

    expect(findCell(wrapper, '10')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '22')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '10')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '22')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '11')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '21')?.classes()).toContain('ix-date-panel-cell-in-range')
  })

  test('week type value work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'week',
        value: new Date('2021-10-10'),
        activeDate: new Date('2021-10-10'),
      },
    })

    const testValue = (value: Date | Date[]) => {
      const start = startOfWeek(isArray(value) ? value[0] : value, { weekStartsOn: 1 })
      const end = endOfWeek(isArray(value) ? value[1] : value, { weekStartsOn: 1 })

      expect(findCell(wrapper, `${start.getDate()}`)?.classes()).toContain('ix-date-panel-cell-selected')
      expect(findCell(wrapper, `${start.getDate()}`)?.classes()).toContain('ix-date-panel-cell-in-range')
      expect(findCell(wrapper, `${end.getDate()}`)?.classes()).toContain('ix-date-panel-cell-selected')
      expect(findCell(wrapper, `${end.getDate()}`)?.classes()).toContain('ix-date-panel-cell-in-range')

      for (let date = start.getDate() + 1; date < end.getDate(); date++) {
        expect(findCell(wrapper, `${date}`)?.classes()).toContain('ix-date-panel-cell-in-range')
      }

      expect(findCell(wrapper, `${start.getDate() - 1}`)?.classes()).not.toContain('ix-date-panel-cell-selected')
      expect(findCell(wrapper, `${start.getDate() - 1}`)?.classes()).not.toContain('ix-date-panel-cell-in-range')
      expect(findCell(wrapper, `${end.getDate() + 1}`)?.classes()).not.toContain('ix-date-panel-cell-selected')
      expect(findCell(wrapper, `${end.getDate() + 1}`)?.classes()).not.toContain('ix-date-panel-cell-in-range')
    }

    testValue(new Date('2021-10-10'))

    await wrapper.setProps({ value: new Date('2021-10-22') })
    testValue(new Date('2021-10-22'))

    await wrapper.setProps({ value: [new Date('2021-10-10'), new Date('2021-10-22')] })
    testValue([new Date('2021-10-10'), new Date('2021-10-22')])
  })

  test('month type value work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'month',
        value: new Date('2021-10-1'),
        activeDate: new Date('2021-10-1'),
      },
    })

    expect(findCell(wrapper, '10月')?.classes()).toContain('ix-date-panel-cell-selected')

    await wrapper.setProps({ value: new Date('2021-12-1') })
    expect(findCell(wrapper, '10月')?.classes()).not.toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '12月')?.classes()).toContain('ix-date-panel-cell-selected')

    await wrapper.setProps({ value: [new Date('2021-9-1'), new Date('2021-12-1')] })
    expect(findCell(wrapper, '9月')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '12月')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '9月')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '12月')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '10月')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '11月')?.classes()).toContain('ix-date-panel-cell-in-range')
  })

  test('quarter type value work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'quarter',
        value: new Date('2021-10-1'),
        activeDate: new Date('2021-10-1'),
      },
    })

    expect(findCell(wrapper, 'Q4')?.classes()).toContain('ix-date-panel-cell-selected')

    await wrapper.setProps({ value: new Date('2021-1-1') })

    expect(findCell(wrapper, 'Q4')?.classes()).not.toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, 'Q1')?.classes()).toContain('ix-date-panel-cell-selected')

    await wrapper.setProps({ value: [new Date('2021-4-1'), new Date('2021-12-1')] })
    expect(findCell(wrapper, 'Q2')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, 'Q4')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, 'Q2')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, 'Q4')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, 'Q3')?.classes()).toContain('ix-date-panel-cell-in-range')
  })

  test('year type value work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'year',
        value: new Date('2021-1-1'),
        activeDate: new Date('2021-1-1'),
      },
    })

    expect(findCell(wrapper, '2021')?.classes()).toContain('ix-date-panel-cell-selected')

    await wrapper.setProps({ value: new Date('2023-1-1') })

    expect(findCell(wrapper, '2021')?.classes()).not.toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '2023')?.classes()).toContain('ix-date-panel-cell-selected')

    await wrapper.setProps({ value: [new Date('2021-1-1'), new Date('2025-1-1')] })
    expect(findCell(wrapper, '2021')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '2025')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '2021')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '2022')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '2023')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '2024')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, '2025')?.classes()).toContain('ix-date-panel-cell-in-range')
  })

  test('date type disabledDate work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'date',
        value: new Date('2021-10-01'),
        activeDate: new Date('2021-10-1'),
        disabledDate: date => date.getMonth() === 9 && [10, 11, 12].includes(date.getDate()),
      },
    })

    expect(findCell(wrapper, '9')?.classes()).not.toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '10')?.classes()).toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '11')?.classes()).toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '12')?.classes()).toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '13')?.classes()).not.toContain('ix-date-panel-cell-disabled')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('month type disabledDate work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'month',
        value: new Date('2021-10-01'),
        activeDate: new Date('2021-10-1'),
        disabledDate: date => [10, 11, 12].includes(date.getMonth() + 1),
      },
    })

    expect(findCell(wrapper, '9月')?.classes()).not.toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '10月')?.classes()).toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '11月')?.classes()).toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '12月')?.classes()).toContain('ix-date-panel-cell-disabled')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('year type disabledDate work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'year',
        value: new Date('2021-10-01'),
        activeDate: new Date('2021-10-1'),
        disabledDate: date => [2019, 2020, 2022].includes(date.getFullYear()),
      },
    })

    expect(findCell(wrapper, '2019')?.classes()).toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '2020')?.classes()).toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '2022')?.classes()).toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '2021')?.classes()).not.toContain('ix-date-panel-cell-disabled')
    expect(findCell(wrapper, '2023')?.classes()).not.toContain('ix-date-panel-cell-disabled')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('activeDate work', async () => {
    const wrapper = DatePanelMount({
      props: {
        type: 'date',
        value: new Date('2021-10-01'),
        activeDate: new Date('2021-10-1'),
      },
    })

    expect(wrapper.find('.ix-date-panel-header-content').text()).toContain('2021')

    await wrapper.setProps({ activeDate: new Date('2020-10-1') })

    expect(wrapper.find('.ix-date-panel-header-content').text()).not.toContain('2021')
    expect(wrapper.find('.ix-date-panel-header-content').text()).toContain('2020')
  })

  test('onCellClick onCellMouseenter work', async () => {
    const onCellClick = vi.fn()
    const onCellMouseenter = vi.fn()
    const wrapper = DatePanelMount({
      props: {
        type: 'date',
        value: new Date('2021-10-01'),
        activeDate: new Date('2021-10-1'),
        disabledDate: date => date.getDate() === 10,
        onCellClick,
        onCellMouseenter,
      },
    })

    await findCell(wrapper, '15')?.trigger('click')
    await findCell(wrapper, '15')?.trigger('mouseenter')
    expect(onCellClick).toBeCalled()
    expect(onCellMouseenter).toBeCalled()

    onCellClick.mockClear()
    onCellMouseenter.mockClear()

    await findCell(wrapper, '10')?.trigger('click')
    await findCell(wrapper, '10')?.trigger('mouseenter')
    expect(onCellClick).not.toBeCalled()
    expect(onCellMouseenter).not.toBeCalled()
  })
})
