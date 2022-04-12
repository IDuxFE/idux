import { MountingOptions, VueWrapper, mount } from '@vue/test-utils'

import { renderWork } from '@tests'
import { parse } from 'date-fns'

import DatePanel from '@idux/components/_private/date-panel/src/DatePanel'

import DatePanelCell from '../../_private/date-panel/src/panel-body/PanelCell'
import { ɵTimePanelInstance } from '../../_private/time-panel'
import TimePanel from '../../_private/time-panel/src/TimePanel'
import TimePanelCell from '../../_private/time-panel/src/TimePanelCell'
import TimePanelColumn from '../../_private/time-panel/src/TimePanelColumn'
import DateRangePicker from '../src/DateRangePicker'
import RangeContent from '../src/content/RangeContent'
import { DateRangePickerInstance, DateRangePickerProps } from '../src/types'

describe('DateRangePicker', () => {
  const DateRangePickerMount = (options?: MountingOptions<Partial<DateRangePickerProps>>) => {
    const { props, ...rest } = options || {}
    return mount(DateRangePicker, {
      props: { open: true, ...props },
      ...(rest as MountingOptions<DateRangePickerProps>),
      attachTo: 'body',
    }) as VueWrapper<DateRangePickerInstance>
  }

  renderWork<DateRangePickerProps>(DateRangePicker, {
    props: {},
  })

  const findTimePanelColumns = (wrapper: VueWrapper<ɵTimePanelInstance>) => wrapper.findAllComponents(TimePanelColumn)
  const findTimePanelColumn = (wrapper: VueWrapper<ɵTimePanelInstance>, idx: number) =>
    findTimePanelColumns(wrapper)?.[idx]

  const findTimePanelCellWithValue = (wrapper: ReturnType<typeof findTimePanelColumn>, value: string | number) =>
    wrapper.findAllComponents(TimePanelCell).find(comp => comp.props().value === value)

  const findTimePanelCell = (wrapper: VueWrapper<ɵTimePanelInstance>, idx: number, value: string | number) =>
    findTimePanelCellWithValue(findTimePanelColumn(wrapper, idx), value)

  const triggerConfirm = (wrapper: VueWrapper<DateRangePickerInstance>) =>
    wrapper
      .findComponent(RangeContent)
      .findAll('.ix-date-range-picker-overlay-footer .ix-button')
      .find(btn => btn.text() === '确定')
      ?.trigger('click')

  const findCell = (wrapper: VueWrapper<DateRangePickerInstance>, type: 'from' | 'to', cellLabel: string) =>
    wrapper
      .findAllComponents(DatePanel)
      [type === 'from' ? 0 : 1].findAllComponents(DatePanelCell)
      .find(cell => cell.find('.ix-date-panel-cell-trigger').text() === cellLabel)

  test('v-model:value work', async () => {
    const onUpdateValue = vi.fn()
    const onChange = vi.fn()
    const onUpdateVisible = vi.fn()
    const wrapper = DateRangePickerMount({
      props: {
        value: [new Date('2021-10-01 00:00:00'), new Date('2021-11-11 00:00:00')],
        'onUpdate:value': onUpdateValue,
        onChange,
        'onUpdate:open': onUpdateVisible,
      },
    })

    expect(findCell(wrapper, 'from', '1')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, 'to', '11')?.classes()).toContain('ix-date-panel-cell-selected')

    await findCell(wrapper, 'from', '11')?.trigger('click')
    await findCell(wrapper, 'to', '21')?.trigger('click')
    await triggerConfirm(wrapper)

    expect(onUpdateValue).toBeCalledWith([new Date('2021-10-11 00:00:00'), new Date('2021-11-21 00:00:00')])
    expect(onChange).toBeCalledWith(
      [new Date('2021-10-11 00:00:00'), new Date('2021-11-21 00:00:00')],
      [new Date('2021-10-01 00:00:00'), new Date('2021-11-11 00:00:00')],
    )
    expect(onUpdateVisible).toBeCalledWith(false)

    await wrapper.setProps({ value: [new Date('2021-9-03 00:00:00'), new Date('2021-12-22 00:00:00')] })
    expect(findCell(wrapper, 'from', '3')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, 'to', '22')?.classes()).toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, 'from', '11')?.classes()).toContain('ix-date-panel-cell-in-range')
    expect(findCell(wrapper, 'to', '11')?.classes()).toContain('ix-date-panel-cell-in-range')
  })

  test('v-model:open work', async () => {
    const onUpdateOpen = vi.fn()
    const wrapper = DateRangePickerMount({ props: { open: false, 'onUpdate:open': onUpdateOpen } })

    expect(wrapper.findComponent(RangeContent).exists()).toBeFalsy()

    await wrapper.find('.ix-date-range-picker').trigger('click')
    expect(onUpdateOpen).toBeCalledWith(true)

    await wrapper.setProps({ open: true })
    expect(wrapper.findComponent(RangeContent).isVisible()).toBeTruthy()
  })

  test('autoFocus work', async () => {
    const onUpdateOpen = vi.fn()
    DateRangePickerMount({ props: { open: false, autofocus: true, 'onUpdate:open': onUpdateOpen } })

    expect(onUpdateOpen).toBeCalledWith(true)
  })

  test('disabled work', async () => {
    const onUpdateOpen = vi.fn()
    const onInput = vi.fn()
    const wrapper = DateRangePickerMount({
      props: { open: false, disabled: true, 'onUpdate:open': onUpdateOpen, onInput },
    })

    await wrapper.find('.ix-date-range-picker').trigger('click')
    expect(onUpdateOpen).not.toBeCalled()

    await wrapper.find('.ix-date-range-picker').find('input').setValue('2021-03-01')
    expect(onInput).not.toBeCalled()
  })

  test('clear work', async () => {
    const onUpdateValue = vi.fn()
    const onChange = vi.fn()
    const onClear = vi.fn()
    const wrapper = DateRangePickerMount({
      props: {
        clearable: true,
        value: [new Date('2021-10-01 00:00:00'), new Date('2021-11-11 00:00:00')],
        'onUpdate:value': onUpdateValue,
        onChange,
        onClear,
      },
    })

    await wrapper.find('.ix-trigger-clear-icon').trigger('click')
    expect(onClear).toBeCalled()
    expect(onChange).toBeCalledWith(undefined, [new Date('2021-10-01 00:00:00'), new Date('2021-11-11 00:00:00')])
    expect(onUpdateValue).toBeCalledWith(undefined)
  })

  test('format work', async () => {
    const wrapper = DateRangePickerMount({
      props: { value: [new Date('2021-10-01 00:00:00'), new Date('2021-11-11 00:00:00')], format: 'dd/MM/yyyy' },
    })

    expect(wrapper.find('.ix-date-range-picker').findAll('input')[0].element.value).toBe('01/10/2021')
    expect(wrapper.find('.ix-date-range-picker').findAll('input')[1].element.value).toBe('11/11/2021')
  })

  test('input work', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const onUpdateValue = vi.fn()
    const wrapper = DateRangePickerMount({
      props: {
        value: [new Date('2021-10-01 00:00:00'), new Date('2021-11-11 00:00:00')],
        format: 'yyyy-MM-dd',
        onInput,
        onChange,
        'onUpdate:value': onUpdateValue,
      },
    })

    await wrapper.find('.ix-date-range-picker').findAll('input')[0].setValue('2021-10-11')
    expect(onInput).toBeCalled()

    onInput.mockClear()

    await wrapper.find('.ix-date-range-picker').findAll('input')[1].setValue('2021-12-22')
    expect(onInput).toBeCalled()

    await triggerConfirm(wrapper)

    const newFromDate = parse('2021-10-11', 'yyyy-MM-dd', new Date())
    const newToDate = parse('2021-12-22', 'yyyy-MM-dd', new Date())
    expect(onChange).toBeCalledWith(
      [newFromDate, newToDate],
      [new Date('2021-10-01 00:00:00'), new Date('2021-11-11 00:00:00')],
    )
    expect(onUpdateValue).toBeCalledWith([newFromDate, newToDate])
  })

  test('defaultOpenValue work', async () => {
    const wrapper = DateRangePickerMount({
      props: {
        value: undefined,
        defaultOpenValue: [new Date('2021-10-11 00:00:00'), new Date('2021-11-11 00:00:00')],
      },
    })

    const [fromDatePanel, toDatePanel] = wrapper.findAllComponents(DatePanel)
    const fromHeaderContentBtns = fromDatePanel.find('.ix-date-panel-header-content').findAll('button')
    const toHeaderContentBtns = toDatePanel.find('.ix-date-panel-header-content').findAll('button')
    expect(fromHeaderContentBtns.some(btn => btn.text().indexOf('2021') > -1)).toBeTruthy()
    expect(fromHeaderContentBtns.some(btn => btn.text().indexOf('10') > -1)).toBeTruthy()
    expect(toHeaderContentBtns.some(btn => btn.text().indexOf('2021') > -1)).toBeTruthy()
    expect(toHeaderContentBtns.some(btn => btn.text().indexOf('11') > -1)).toBeTruthy()
  })

  test('datetime time select work', async () => {
    const onChange = vi.fn()
    const onUpdateValue = vi.fn()
    const wrapper = DateRangePickerMount({
      props: {
        type: 'datetime',
        value: [new Date('2021-10-11 00:00:00'), new Date('2021-11-11 00:00:00')],
        onChange,
        'onUpdate:value': onUpdateValue,
      },
    })

    await wrapper.findComponent(RangeContent).findAll('.ix-date-range-picker-board-time-input')[0].trigger('focus')

    const fromTimePanel = wrapper.findAllComponents(TimePanel)[0] as unknown as VueWrapper<ɵTimePanelInstance>
    const toTimePanel = wrapper.findAllComponents(TimePanel)[1] as unknown as VueWrapper<ɵTimePanelInstance>

    await findTimePanelCell(fromTimePanel, 0, 13)?.trigger('click')
    await findTimePanelCell(fromTimePanel, 1, 3)?.trigger('click')
    await findTimePanelCell(fromTimePanel, 2, 4)?.trigger('click')

    await findTimePanelCell(toTimePanel, 0, 14)?.trigger('click')
    await findTimePanelCell(toTimePanel, 1, 5)?.trigger('click')
    await findTimePanelCell(toTimePanel, 2, 6)?.trigger('click')

    await triggerConfirm(wrapper)

    expect(onUpdateValue).toBeCalledWith([new Date('2021-10-11 13:03:04'), new Date('2021-11-11 14:05:06')])
    expect(onChange).toBeCalledWith(
      [new Date('2021-10-11 13:03:04'), new Date('2021-11-11 14:05:06')],
      [new Date('2021-10-11 00:00:00'), new Date('2021-11-11 00:00:00')],
    )
  })

  test('datetime input work', async () => {
    const onChange = vi.fn()
    const onUpdateValue = vi.fn()
    const wrapper = DateRangePickerMount({
      props: {
        type: 'datetime',
        value: [new Date('2021-10-11 00:00:00'), new Date('2021-11-11 00:00:00')],
        format: 'yyyy-MM-dd HH:mm:ss',
        onChange,
        'onUpdate:value': onUpdateValue,
      },
    })

    const dateInputs = wrapper
      .findComponent(RangeContent)
      .findAll('.ix-date-range-picker-board-date-input')
      .map(el => el.find('input'))
    const timeInputs = wrapper
      .findComponent(RangeContent)
      .findAll('.ix-date-range-picker-board-time-input')
      .map(el => el.find('input'))
    await dateInputs[0].setValue('2021-11-22')
    await dateInputs[1].setValue('2021-12-25')
    await timeInputs[0].setValue('13:03:04')
    await timeInputs[1].setValue('14:05:06')

    await triggerConfirm(wrapper)

    expect(onUpdateValue).toBeCalledWith([new Date('2021-11-22 13:03:04'), new Date('2021-12-25 14:05:06')])
    expect(onChange).toBeCalledWith(
      [new Date('2021-11-22 13:03:04'), new Date('2021-12-25 14:05:06')],
      [new Date('2021-10-11 00:00:00'), new Date('2021-11-11 00:00:00')],
    )

    onUpdateValue.mockClear()
    onChange.mockClear()

    const triggerInputs = wrapper.find('.ix-date-range-picker').findAll('input')
    await triggerInputs[0].setValue('2021-11-22 13:03:04')
    await triggerInputs[1].setValue('2021-12-25 14:05:06')

    await triggerConfirm(wrapper)

    expect(onUpdateValue).toBeCalledWith([new Date('2021-11-22 13:03:04'), new Date('2021-12-25 14:05:06')])
    expect(onChange).toBeCalledWith(
      [new Date('2021-11-22 13:03:04'), new Date('2021-12-25 14:05:06')],
      [new Date('2021-10-11 00:00:00'), new Date('2021-11-11 00:00:00')],
    )
  })
})
