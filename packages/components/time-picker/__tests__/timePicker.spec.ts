import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork, wait } from '@tests'
import { parse } from 'date-fns'

import { ɵTimePanel } from '@idux/components/_private/time-panel'
import TimePanelCell from '@idux/components/_private/time-panel/src/TimePanelCell'
import TimePanelColumn from '@idux/components/_private/time-panel/src/TimePanelColumn'
import { ɵTrigger } from '@idux/components/_private/trigger'

import IxTimePicker from '../src/TimePicker'
import { TimePickerProps } from '../src/types'

describe('TimePicker', () => {
  const TimePickerMount = (options?: MountingOptions<Partial<TimePickerProps>>) =>
    mount(IxTimePicker, { ...options, attachTo: 'body' })

  const findTrigger = (wrapper: ReturnType<typeof TimePickerMount>) => wrapper.findComponent(ɵTrigger)
  const findTimePanel = (wrapper: ReturnType<typeof TimePickerMount>) => wrapper.findComponent(ɵTimePanel)
  const findColumns = (wrapper: ReturnType<typeof TimePickerMount>) =>
    findTimePanel(wrapper).findAllComponents(TimePanelColumn)
  const findColumn = (wrapper: ReturnType<typeof TimePickerMount>, idx: number) => findColumns(wrapper)?.[idx]

  const findCellWithValue = (wrapper: ReturnType<typeof findColumn>, value: string | number) =>
    wrapper.findAllComponents(TimePanelCell).find(comp => comp.props().value === value)

  const findCell = (wrapper: ReturnType<typeof TimePickerMount>, idx: number, value: string | number) =>
    findCellWithValue(findColumn(wrapper, idx), value)

  renderWork<TimePickerProps>(IxTimePicker, { props: { open: true } })

  test('v-model:value work', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = TimePickerMount({
      props: {
        value: new Date(2021, 12, 8, 4, 5, 5, 5),
        open: true,
        format: 'hh:mm:ss a',
        'onUpdate:value': onUpdateValue,
      },
    })

    // test initial value
    expect(findTimePanel(wrapper).props().value).toEqual(new Date(2021, 12, 8, 4, 5, 5, 5))

    // test value change
    await wrapper.setProps({ value: new Date(2021, 12, 8, 4, 10, 20, 30) })

    expect(findTimePanel(wrapper).props().value).toEqual(new Date(2021, 12, 8, 4, 10, 20, 30))

    await findCell(wrapper, 1, 4)?.trigger('click')
    expect(onUpdateValue).toBeCalledWith(new Date(2021, 12, 8, 4, 4, 20, 30))

    onUpdateValue.mockClear()
    await findCell(wrapper, 2, 4)?.trigger('click')
    expect(onUpdateValue).toBeCalledWith(new Date(2021, 12, 8, 4, 10, 4, 30))

    onUpdateValue.mockClear()
    await findCell(wrapper, 3, 'pm')?.trigger('click')
    expect(onUpdateValue).toBeCalledWith(new Date(2021, 12, 8, 16, 10, 20, 30))

    await wrapper.find('.ix-trigger-clear-icon').trigger('click')
    expect(onUpdateValue).toBeCalledWith(undefined)
  })

  test('v-model:open work', async () => {
    const onUpdateOpen = vi.fn()
    const wrapper = TimePickerMount({ props: { open: false, 'onUpdate:open': onUpdateOpen } })

    expect(findTimePanel(wrapper).exists()).toBeFalsy()

    await findTrigger(wrapper).trigger('click')
    expect(onUpdateOpen).toBeCalledWith(true)

    await wrapper.setProps({ open: true })
    expect(findTimePanel(wrapper).isVisible()).toBeTruthy()
  })

  test('format work', async () => {
    const wrapper = TimePickerMount({
      props: {
        value: new Date().setHours(1, 1, 1),
        open: true,
        format: 'hh:mm:ss',
      },
    })

    expect(wrapper.find('.ix-time-picker').find('input').element.value).toBe('01:01:01')

    await wrapper.setProps({ format: 'hh:mm-ss' })

    expect(wrapper.find('.ix-time-picker').find('input').element.value).toBe('01:01-01')
  })

  test('disabled & disabledOptions work', async () => {
    const onUpdateValue = vi.fn()
    const onUpdateOpen = vi.fn()
    const onInput = vi.fn()
    const wrapper = TimePickerMount({
      props: {
        value: new Date().setHours(0, 0, 0),
        disabled: true,
        open: true,
        format: 'hh:mm:ss',
        'onUpdate:value': onUpdateValue,
        onInput,
      },
    })

    await wrapper.find('.ix-time-picker').trigger('click')
    expect(onUpdateOpen).not.toBeCalled()

    const inputEl = wrapper.find('.ix-time-picker').find('input')
    expect(inputEl.attributes().disabled).not.toBeUndefined()
    await inputEl.setValue('01:01:01')
    expect(onInput).not.toBeCalled()

    await wrapper.setProps({ disabled: false })

    expect(inputEl.attributes().disabled).toBeUndefined()

    const disabledHours = () => [1, 2, 3]
    const disabledMinutes = (hour: number) => (hour === 5 ? [1, 2, 3] : [])
    const disabledSeconds = (hour: number, minute: number) => (hour === 5 && minute === 5 ? [1, 2, 3] : [])
    // test disabled fn
    await wrapper.setProps({
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    })

    expect(findTimePanel(wrapper).props().disabledHours).toBe(disabledHours)
    expect(findTimePanel(wrapper).props().disabledMinutes).toBe(disabledMinutes)
    expect(findTimePanel(wrapper).props().disabledSeconds).toBe(disabledSeconds)
  })

  test('clearable work', async () => {
    const onUpdateValue = vi.fn()
    const onChange = vi.fn()
    const onClear = vi.fn()
    const wrapper = TimePickerMount({
      props: {
        value: new Date('2021-10-01'),
        'onUpdate:value': onUpdateValue,
        onChange,
        onClear,
      },
    })

    await wrapper.find('.ix-trigger-clear-icon').trigger('click')
    expect(onClear).toBeCalled()
    expect(onChange).toBeCalledWith(undefined, new Date('2021-10-01'))
    expect(onUpdateValue).toBeCalledWith(undefined)

    await wrapper.setProps({ clearIcon: 'close' })
    expect(findTrigger(wrapper).props().clearIcon).toBe('close')
  })

  test('input work', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const onUpdateValue = vi.fn()
    const defaultDate = new Date(2021, 12, 8, 0, 0, 0, 0)
    const wrapper = TimePickerMount({
      props: {
        value: defaultDate,
        open: true,
        format: 'hh:mm:ss',
        onInput,
        onChange,
        'onUpdate:value': onUpdateValue,
      },
    })

    await wrapper.find('.ix-time-picker').find('input').setValue('12:11:13')
    expect(onInput).toBeCalled()

    const newDate = parse('12:11:13', 'hh:mm:ss', defaultDate)
    expect(onChange).toBeCalledWith(newDate, defaultDate)
    expect(onUpdateValue).toBeCalledWith(newDate)
  })

  test('focus and blur work', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = TimePickerMount({
      props: {
        onFocus,
        onBlur,
      },
    })

    await wrapper.find('.ix-time-picker').find('input').trigger('focus')
    await wait(100)
    expect(onFocus).toBeCalled()

    await wrapper.find('.ix-time-picker').find('input').trigger('blur')
    await wait(100)
    expect(onBlur).toBeCalled()
  })

  test('suffix work', async () => {
    const wrapper = TimePickerMount({
      props: {
        suffix: 'up',
      },
    })
    expect(findTrigger(wrapper).props().suffix).toBe('up')
  })

  test('optionsStep work', async () => {
    const wrapper = TimePickerMount({
      props: {
        open: true,
        hourStep: 5,
        minuteStep: 7,
        secondStep: 7,
      },
    })

    const timePanelProps = findTimePanel(wrapper).props()
    expect(timePanelProps.hourStep).toBe(5)
    expect(timePanelProps.minuteStep).toBe(7)
    expect(timePanelProps.secondStep).toBe(7)
  })

  test('defaultOpenValue work', async () => {
    const wrapper = TimePickerMount({ props: { open: true } })

    expect(findTimePanel(wrapper).props().activeValue).toBeUndefined()

    await wrapper.setProps({ defaultOpenValue: new Date(2021, 12, 8, 15, 20, 30, 0) })
    expect(findTimePanel(wrapper).props().activeValue).toEqual(new Date(2021, 12, 8, 15, 20, 30, 0))
  })
})
