import { MountingOptions, VueWrapper, mount } from '@vue/test-utils'

import { renderWork, wait } from '@tests'
import { parse } from 'date-fns'

import { ɵTimePanel, ɵTimePanelInstance } from '@idux/components/_private/time-panel'
import TimePanelCell from '@idux/components/_private/time-panel/src/TimePanelCell'
import TimePanelColumn from '@idux/components/_private/time-panel/src/TimePanelColumn'
import { ɵTrigger } from '@idux/components/_private/trigger'

import IxTimeRangePicker from '../src/TimeRangePicker'
import RangeContent from '../src/content/RangeContent'
import { TimeRangePickerProps } from '../src/types'

describe('TimePicker', () => {
  const TimeRangePickerMount = (options?: MountingOptions<Partial<TimeRangePickerProps>>) =>
    mount(IxTimeRangePicker, { ...options, attachTo: 'body' })

  const findTrigger = (wrapper: ReturnType<typeof TimeRangePickerMount>) => wrapper.findComponent(ɵTrigger)
  const findTimePanel = (wrapper: ReturnType<typeof TimeRangePickerMount>, type: 'from' | 'to') =>
    wrapper.findAllComponents(ɵTimePanel)[type === 'from' ? 0 : 1] as VueWrapper<ɵTimePanelInstance>
  const findColumns = (wrapper: VueWrapper<ɵTimePanelInstance>) => wrapper.findAllComponents(TimePanelColumn)
  const findColumn = (wrapper: VueWrapper<ɵTimePanelInstance>, idx: number) => findColumns(wrapper)?.[idx]

  const findCellWithValue = (wrapper: ReturnType<typeof findColumn>, value: string | number) =>
    wrapper.findAllComponents(TimePanelCell).find(comp => comp.props().value === value)

  const findCell = (wrapper: VueWrapper<ɵTimePanelInstance>, idx: number, value: string | number) =>
    findCellWithValue(findColumn(wrapper, idx), value)

  const triggerConfirm = async (wrapper: ReturnType<typeof TimeRangePickerMount>) => {
    wrapper
      .findComponent(RangeContent)
      .findAll('.ix-time-range-picker-overlay-footer .ix-button')
      .find(btn => btn.text() === '确定')
      ?.trigger('click')

    await wrapper.setProps({ open: false })
    await wrapper.setProps({ open: true })
  }
  renderWork<TimeRangePickerProps>(IxTimeRangePicker, { props: { open: true } })

  test('v-model:value work', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = TimeRangePickerMount({
      props: {
        value: [new Date(2021, 12, 8, 4, 5, 5, 5), new Date(2021, 12, 8, 12, 5, 5, 5)],
        open: true,
        format: 'hh:mm:ss a',
        'onUpdate:value': onUpdateValue,
      },
    })

    expect(findTimePanel(wrapper, 'from').props().value).toEqual(new Date(2021, 12, 8, 4, 5, 5, 5))
    expect(findTimePanel(wrapper, 'to').props().value).toEqual(new Date(2021, 12, 8, 12, 5, 5, 5))

    await wrapper.setProps({ value: [new Date(2021, 12, 8, 1, 5, 5, 5), new Date(2021, 12, 8, 3, 5, 5, 5)] })

    expect(findTimePanel(wrapper, 'from').props().value).toEqual(new Date(2021, 12, 8, 1, 5, 5, 5))
    expect(findTimePanel(wrapper, 'to').props().value).toEqual(new Date(2021, 12, 8, 3, 5, 5, 5))

    await findCell(findTimePanel(wrapper, 'from'), 0, 4)?.trigger('click')
    await findCell(findTimePanel(wrapper, 'to'), 0, 6)?.trigger('click')
    await triggerConfirm(wrapper)

    expect(onUpdateValue).toBeCalledWith([new Date(2021, 12, 8, 4, 5, 5, 5), new Date(2021, 12, 8, 6, 5, 5, 5)])

    await findCell(findTimePanel(wrapper, 'from'), 0, 8)?.trigger('click')
    await findCell(findTimePanel(wrapper, 'to'), 0, 6)?.trigger('click')
    await triggerConfirm(wrapper)
    expect(onUpdateValue).toBeCalledWith([new Date(2021, 12, 8, 6, 5, 5, 5), new Date(2021, 12, 8, 8, 5, 5, 5)])

    await findCell(findTimePanel(wrapper, 'from'), 1, 4)?.trigger('click')
    await findCell(findTimePanel(wrapper, 'to'), 1, 4)?.trigger('click')
    await triggerConfirm(wrapper)
    expect(onUpdateValue).toBeCalledWith([new Date(2021, 12, 8, 1, 4, 5, 5), new Date(2021, 12, 8, 3, 4, 5, 5)])

    await findCell(findTimePanel(wrapper, 'from'), 2, 4)?.trigger('click')
    await findCell(findTimePanel(wrapper, 'to'), 2, 4)?.trigger('click')
    await triggerConfirm(wrapper)
    expect(onUpdateValue).toBeCalledWith([new Date(2021, 12, 8, 1, 5, 4, 5), new Date(2021, 12, 8, 3, 5, 4, 5)])

    await findCell(findTimePanel(wrapper, 'from'), 3, 'pm')?.trigger('click')
    await findCell(findTimePanel(wrapper, 'to'), 3, 'pm')?.trigger('click')
    await triggerConfirm(wrapper)
    expect(onUpdateValue).toBeCalledWith([new Date(2021, 12, 8, 13, 5, 5, 5), new Date(2021, 12, 8, 15, 5, 5, 5)])
  })

  test('v-model:open work', async () => {
    const onUpdateOpen = vi.fn()
    const wrapper = TimeRangePickerMount({ props: { open: false, 'onUpdate:open': onUpdateOpen } })

    expect(!!findTimePanel(wrapper, 'from')?.exists()).toBeFalsy()
    expect(!!findTimePanel(wrapper, 'to')?.exists()).toBeFalsy()

    await findTrigger(wrapper).trigger('click')
    expect(onUpdateOpen).toBeCalledWith(true)

    await wrapper.setProps({ open: true })
    expect(!!findTimePanel(wrapper, 'from')?.exists()).toBeTruthy()
    expect(!!findTimePanel(wrapper, 'to')?.exists()).toBeTruthy()
  })

  test('format work', async () => {
    const wrapper = TimeRangePickerMount({
      props: {
        value: [new Date(2021, 12, 8, 4, 5, 5, 5), new Date(2021, 12, 8, 12, 5, 5, 5)],
        open: true,
        format: 'hh:mm:ss',
      },
    })

    expect(wrapper.find('.ix-time-range-picker').findAll('input')[0].element.value).toBe('04:05:05')
    expect(wrapper.find('.ix-time-range-picker').findAll('input')[1].element.value).toBe('12:05:05')

    await wrapper.setProps({ format: 'hh:mm-ss' })

    expect(wrapper.find('.ix-time-range-picker').findAll('input')[0].element.value).toBe('04:05-05')
    expect(wrapper.find('.ix-time-range-picker').findAll('input')[1].element.value).toBe('12:05-05')
  })

  test('disabled & disabledOptions work', async () => {
    const onUpdateValue = vi.fn()
    const onUpdateOpen = vi.fn()
    const onInput = vi.fn()
    const wrapper = TimeRangePickerMount({
      props: {
        value: [new Date(2021, 12, 8, 4, 5, 5, 5), new Date(2021, 12, 8, 12, 5, 5, 5)],
        disabled: true,
        open: true,
        format: 'hh:mm:ss',
        'onUpdate:value': onUpdateValue,
        onInput,
      },
    })

    await findTrigger(wrapper).trigger('click')
    expect(onUpdateOpen).not.toBeCalled()

    const [fromInputEl, toInputEl] = wrapper.find('.ix-time-range-picker').findAll('input')
    expect(fromInputEl.attributes().disabled).not.toBeUndefined()
    expect(toInputEl.attributes().disabled).not.toBeUndefined()

    await fromInputEl.setValue('01:01:01')
    await toInputEl.setValue('02:02:02')
    expect(onInput).not.toBeCalled()

    await wrapper.setProps({ disabled: false })

    expect(fromInputEl.attributes().disabled).toBeUndefined()
    expect(toInputEl.attributes().disabled).toBeUndefined()

    const disabledHours = () => [1, 2, 3]
    const disabledMinutes = (hour: number) => (hour === 5 ? [1, 2, 3] : [])
    const disabledSeconds = (hour: number, minute: number) => (hour === 5 && minute === 5 ? [1, 2, 3] : [])

    await wrapper.setProps({
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    })

    const fromTimePanel = findTimePanel(wrapper, 'from')
    const toTimePanel = findTimePanel(wrapper, 'to')

    expect(fromTimePanel.props().disabledHours).toBe(disabledHours)
    expect(fromTimePanel.props().disabledMinutes).toBe(disabledMinutes)
    expect(fromTimePanel.props().disabledSeconds).toBe(disabledSeconds)
    expect(toTimePanel.props().disabledHours).toBe(disabledHours)
    expect(toTimePanel.props().disabledMinutes).toBe(disabledMinutes)
    expect(toTimePanel.props().disabledSeconds).toBe(disabledSeconds)
  })

  test('clearable work', async () => {
    const onUpdateValue = vi.fn()
    const onChange = vi.fn()
    const onClear = vi.fn()
    const wrapper = TimeRangePickerMount({
      props: {
        value: [new Date(2021, 12, 8, 4, 5, 5, 5), new Date(2021, 12, 8, 12, 5, 5, 5)],
        'onUpdate:value': onUpdateValue,
        onChange,
        onClear,
      },
    })

    await wrapper.find('.ix-trigger-clear-icon').trigger('click')
    expect(onClear).toBeCalled()
    expect(onChange).toBeCalledWith(undefined, [new Date(2021, 12, 8, 4, 5, 5, 5), new Date(2021, 12, 8, 12, 5, 5, 5)])
    expect(onUpdateValue).toBeCalledWith(undefined)

    await wrapper.setProps({ clearIcon: 'close' })
    expect(findTrigger(wrapper).props().clearIcon).toBe('close')
  })

  test('input work', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const onUpdateValue = vi.fn()
    const defaultFromDate = new Date(2021, 12, 8, 0, 0, 0, 0)
    const defaultToDate = new Date(2021, 12, 8, 1, 0, 0, 0)
    const wrapper = TimeRangePickerMount({
      props: {
        value: [defaultFromDate, defaultToDate],
        open: true,
        format: 'hh:mm:ss',
        onInput,
        onChange,
        'onUpdate:value': onUpdateValue,
      },
    })

    const [fromInputEl, toInputEl] = wrapper.find('.ix-time-range-picker').findAll('input')

    await fromInputEl.setValue('12:11:13')
    expect(onInput).toBeCalled()

    onInput.mockClear()

    await toInputEl.setValue('12:11:14')
    expect(onInput).toBeCalled()

    const newFromDate = parse('12:11:13', 'hh:mm:ss', defaultFromDate)
    const newToDate = parse('12:11:14', 'hh:mm:ss', defaultToDate)
    await triggerConfirm(wrapper)
    expect(onChange).toBeCalledWith([newFromDate, newToDate], [defaultFromDate, defaultToDate])
    expect(onUpdateValue).toBeCalledWith([newFromDate, newToDate])
  })

  test('focus and blur work', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = TimeRangePickerMount({
      props: {
        onFocus,
        onBlur,
      },
    })

    await wrapper.find('.ix-time-range-picker').find('input').trigger('focus')
    await wait(100)
    expect(onFocus).toBeCalled()

    await wrapper.find('.ix-time-range-picker').find('input').trigger('blur')
    await wait(100)
    expect(onBlur).toBeCalled()
  })

  test('suffix work', async () => {
    const wrapper = TimeRangePickerMount({
      props: {
        suffix: 'up',
      },
    })
    expect(findTrigger(wrapper).props().suffix).toBe('up')
  })

  test('optionsStep work', async () => {
    const wrapper = TimeRangePickerMount({
      props: {
        open: true,
        hourStep: 5,
        minuteStep: 7,
        secondStep: 7,
      },
    })

    const fromTimePanelProps = findTimePanel(wrapper, 'from').props()
    const toTimePanelProps = findTimePanel(wrapper, 'from').props()
    expect(fromTimePanelProps.hourStep).toBe(5)
    expect(fromTimePanelProps.minuteStep).toBe(7)
    expect(fromTimePanelProps.secondStep).toBe(7)
    expect(toTimePanelProps.hourStep).toBe(5)
    expect(toTimePanelProps.minuteStep).toBe(7)
    expect(toTimePanelProps.secondStep).toBe(7)
  })

  test('defaultOpenValue work', async () => {
    const wrapper = TimeRangePickerMount({ props: { open: true } })

    expect(findTimePanel(wrapper, 'from').props().activeValue).toBeUndefined()

    await wrapper.setProps({
      defaultOpenValue: [new Date(2021, 12, 8, 15, 20, 30, 0), new Date(2021, 12, 8, 15, 30, 30, 0)],
    })
    expect(findTimePanel(wrapper, 'from').props().activeValue).toEqual(new Date(2021, 12, 8, 15, 20, 30, 0))
    expect(findTimePanel(wrapper, 'to').props().activeValue).toEqual(new Date(2021, 12, 8, 15, 30, 30, 0))
  })
})
