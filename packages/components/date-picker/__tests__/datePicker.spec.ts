import { MountingOptions, VueWrapper, mount } from '@vue/test-utils'

import { renderWork } from '@tests'
import { parse } from 'date-fns'

import DatePanel from '../../_private/date-panel/src/DatePanel'
import DatePanelCell from '../../_private/date-panel/src/panel-body/PanelCell'
import { ɵTimePanelInstance } from '../../_private/time-panel'
import TimePanel from '../../_private/time-panel/src/TimePanel'
import TimePanelCell from '../../_private/time-panel/src/TimePanelCell'
import TimePanelColumn from '../../_private/time-panel/src/TimePanelColumn'
import DatePicker from '../src/DatePicker'
import Content from '../src/content/Content'
import { DatePickerInstance, DatePickerProps } from '../src/types'

describe('DatePicker', () => {
  const DatePickerMount = (options?: MountingOptions<Partial<DatePickerProps>>) => {
    const { props, ...rest } = options || {}
    return mount(DatePicker, {
      props: { open: true, ...props },
      ...(rest as MountingOptions<DatePickerProps>),
      attachTo: 'body',
    }) as VueWrapper<DatePickerInstance>
  }

  const findCell = (wrapper: VueWrapper<DatePickerInstance>, cellLabel: string) =>
    wrapper.findAllComponents(DatePanelCell).find(cell => cell.find('.ix-date-panel-cell-trigger').text() === cellLabel)

  const findTimePanelColumns = (wrapper: VueWrapper<ɵTimePanelInstance>) => wrapper.findAllComponents(TimePanelColumn)
  const findTimePanelColumn = (wrapper: VueWrapper<ɵTimePanelInstance>, idx: number) =>
    findTimePanelColumns(wrapper)?.[idx]

  const findTimePanelCellWithValue = (wrapper: ReturnType<typeof findTimePanelColumn>, value: string | number) =>
    wrapper.findAllComponents(TimePanelCell).find(comp => comp.props().value === value)

  const findTimePanelCell = (wrapper: VueWrapper<ɵTimePanelInstance>, idx: number, value: string | number) =>
    findTimePanelCellWithValue(findTimePanelColumn(wrapper, idx), value)

  renderWork<DatePickerProps>(DatePicker, {
    props: {},
  })

  test('v-model:value work', async () => {
    const onUpdateValue = vi.fn()
    const onChange = vi.fn()
    const onUpdateVisible = vi.fn()
    const wrapper = DatePickerMount({
      props: {
        value: new Date('2021-10-01'),
        'onUpdate:value': onUpdateValue,
        onChange,
        'onUpdate:open': onUpdateVisible,
      },
    })

    expect(findCell(wrapper, '1')?.classes()).toContain('ix-date-panel-cell-selected')

    await findCell(wrapper, '11')?.trigger('click')
    expect(onUpdateValue).toBeCalledWith(new Date('2021-10-11'))
    expect(onChange).toBeCalledWith(new Date('2021-10-11'), new Date('2021-10-01'))
    expect(onUpdateVisible).toBeCalledWith(false)

    await wrapper.setProps({ value: new Date('2021-10-22') })
    expect(findCell(wrapper, '1')?.classes()).not.toContain('ix-date-panel-cell-selected')
    expect(findCell(wrapper, '22')?.classes()).toContain('ix-date-panel-cell-selected')
  })

  test('v-model:open work', async () => {
    const onUpdateOpen = vi.fn()
    const wrapper = DatePickerMount({ props: { open: false, 'onUpdate:open': onUpdateOpen } })

    expect(wrapper.findComponent(Content).exists()).toBeFalsy()

    await wrapper.find('.ix-date-picker').trigger('click')
    expect(onUpdateOpen).toBeCalledWith(true)

    await wrapper.setProps({ open: true })
    expect(wrapper.findComponent(Content).isVisible()).toBeTruthy()
  })

  test('autoFocus work', async () => {
    const onUpdateOpen = vi.fn()
    DatePickerMount({ props: { open: false, autofocus: true, 'onUpdate:open': onUpdateOpen } })

    expect(onUpdateOpen).toBeCalledWith(true)
  })

  test('disabled work', async () => {
    const onUpdateOpen = vi.fn()
    const onInput = vi.fn()
    const wrapper = DatePickerMount({ props: { open: false, disabled: true, 'onUpdate:open': onUpdateOpen, onInput } })

    await wrapper.find('.ix-date-picker').trigger('click')
    expect(onUpdateOpen).not.toBeCalled()

    await wrapper.find('.ix-date-picker').find('input').setValue('2021-03-01')
    expect(onInput).not.toBeCalled()
  })

  test('clear work', async () => {
    const onUpdateValue = vi.fn()
    const onChange = vi.fn()
    const onClear = vi.fn()
    const wrapper = DatePickerMount({
      props: {
        clearable: true,
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
  })

  test('format work', async () => {
    const wrapper = DatePickerMount({ props: { value: new Date('2021-10-01'), format: 'dd/MM/yyyy' } })

    expect(wrapper.find('.ix-date-picker').find('input').element.value).toBe('01/10/2021')
  })

  test('input work', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const onUpdateValue = vi.fn()
    const wrapper = DatePickerMount({
      props: {
        value: new Date('2021-10-01'),
        format: 'yyyy-MM-dd',
        onInput,
        onChange,
        'onUpdate:value': onUpdateValue,
      },
    })

    await wrapper.find('.ix-date-picker').find('input').setValue('2021-10-11')
    expect(onInput).toBeCalled()

    const newDate = parse('2021-10-11', 'yyyy-MM-dd', new Date())
    expect(onChange).toBeCalledWith(newDate, new Date('2021-10-01'))
    expect(onUpdateValue).toBeCalledWith(newDate)
  })

  test('datetime panel switch work', async () => {
    const wrapper = DatePickerMount({
      props: {
        type: 'datetime',
        value: new Date('2021-10-11'),
        allowInput: true,
      },
    })

    expect(wrapper.findComponent(DatePanel).isVisible()).toBeTruthy()
    expect(wrapper.findComponent(TimePanel).isVisible()).toBeFalsy()

    await wrapper.findComponent(Content).find('.ix-date-picker-overlay-inputs-time-input').trigger('focus')
    expect(wrapper.findComponent(DatePanel).isVisible()).toBeFalsy()
    expect(wrapper.findComponent(TimePanel).isVisible()).toBeTruthy()

    await wrapper.findComponent(Content).find('.ix-date-picker-overlay-inputs-date-input').trigger('focus')
    expect(wrapper.findComponent(DatePanel).isVisible()).toBeTruthy()
    expect(wrapper.findComponent(TimePanel).isVisible()).toBeFalsy()

    await wrapper.findComponent(Content).find('.ix-date-picker-overlay-inputs-time-input').trigger('input')
    expect(wrapper.findComponent(DatePanel).isVisible()).toBeFalsy()
    expect(wrapper.findComponent(TimePanel).isVisible()).toBeTruthy()

    await wrapper.findComponent(Content).find('.ix-date-picker-overlay-inputs-date-input').trigger('input')
    expect(wrapper.findComponent(DatePanel).isVisible()).toBeTruthy()
    expect(wrapper.findComponent(TimePanel).isVisible()).toBeFalsy()
  })

  test('datetime time select work', async () => {
    const onChange = vi.fn()
    const onUpdateValue = vi.fn()
    const wrapper = DatePickerMount({
      props: {
        type: 'datetime',
        value: new Date('2021-10-11 00:00:00'),
        onChange,
        'onUpdate:value': onUpdateValue,
      },
    })

    await wrapper.findComponent(Content).find('.ix-date-picker-overlay-inputs-time-input').trigger('focus')

    const timePanel = wrapper.findComponent(TimePanel) as VueWrapper<ɵTimePanelInstance>

    await findTimePanelCell(timePanel, 0, 13)?.trigger('click')
    expect(onUpdateValue).toBeCalledWith(new Date('2021-10-11 13:00:00'))
    expect(onChange).toBeCalledWith(new Date('2021-10-11 13:00:00'), new Date('2021-10-11 00:00:00'))

    onUpdateValue.mockClear()
    onChange.mockClear()

    await findTimePanelCell(timePanel, 1, 3)?.trigger('click')
    expect(onUpdateValue).toBeCalledWith(new Date('2021-10-11 00:03:00'))
    expect(onChange).toBeCalledWith(new Date('2021-10-11 00:03:00'), new Date('2021-10-11 00:00:00'))

    onUpdateValue.mockClear()
    onChange.mockClear()

    await findTimePanelCell(timePanel, 2, 4)?.trigger('click')
    expect(onUpdateValue).toBeCalledWith(new Date('2021-10-11 00:00:04'))
    expect(onChange).toBeCalledWith(new Date('2021-10-11 00:00:04'), new Date('2021-10-11 00:00:00'))
  })

  test('datetime input work', async () => {
    const onChange = vi.fn()
    const onUpdateValue = vi.fn()
    const wrapper = DatePickerMount({
      props: {
        type: 'datetime',
        value: new Date('2021-10-11 00:00:00'),
        format: 'yyyy-MM-dd HH:mm:ss',
        onChange,
        'onUpdate:value': onUpdateValue,
      },
    })

    await wrapper
      .findComponent(Content)
      .find<HTMLInputElement>('.ix-date-picker-overlay-inputs-date-input')
      .setValue('2021-11-22')
    expect(onUpdateValue).toBeCalledWith(new Date('2021-11-22 00:00:00'))
    expect(onChange).toBeCalledWith(new Date('2021-11-22 00:00:00'), new Date('2021-10-11 00:00:00'))

    onUpdateValue.mockClear()
    onChange.mockClear()

    await wrapper
      .findComponent(Content)
      .find<HTMLInputElement>('.ix-date-picker-overlay-inputs-time-input')
      .setValue('13:03:04')
    expect(onUpdateValue).toBeCalledWith(new Date('2021-10-11 13:03:04'))
    expect(onChange).toBeCalledWith(new Date('2021-10-11 13:03:04'), new Date('2021-10-11 00:00:00'))

    onUpdateValue.mockClear()
    onChange.mockClear()

    await wrapper.find('.ix-date-picker').find('input').setValue('2021-11-22 13:03:04')
    expect(onUpdateValue).toBeCalledWith(new Date('2021-11-22 13:03:04'))
    expect(onChange).toBeCalledWith(new Date('2021-11-22 13:03:04'), new Date('2021-10-11 00:00:00'))
  })

  test('datetime format work', async () => {
    const wrapper = DatePickerMount({
      props: {
        type: 'datetime',
        value: new Date('2021-10-11 13:03:04'),
        format: 'yyyy-MM-dd HH/mm/ss',
        dateFormat: 'yyyy年MM月dd日',
        timeFormat: 'HH时mm分ss秒',
      },
    })

    expect(wrapper.find('.ix-date-picker').find('input').element.value).toBe('2021-10-11 13/03/04')
    expect(
      wrapper.findComponent(Content).find<HTMLInputElement>('.ix-date-picker-overlay-inputs-date-input').element.value,
    ).toBe('2021年10月11日')
    expect(
      wrapper.findComponent(Content).find<HTMLInputElement>('.ix-date-picker-overlay-inputs-time-input').element.value,
    ).toBe('13时03分04秒')
  })
})
