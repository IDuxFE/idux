import { mount, DOMWrapper, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxTimePicker from '../src/TimePicker'
import { TimePickerProps } from '../src/types'
import dayjs from 'dayjs/esm'

describe.skip('TimePicker', () => {
  const TimePickerMount = (options?: MountingOptions<Partial<TimePickerProps>>) =>
    mount(IxTimePicker, { ...options, attachTo: 'body' })
  let bodyWrapper: DOMWrapper<HTMLElement>

  function getPickerPanel() {
    return bodyWrapper.find('.ix-time-picker-panel')
  }

  function getOverlay() {
    return bodyWrapper.find('.ix-overlay')
  }

  function getOptionList() {
    return getPickerPanel().findAll('.ix-time-picker-panel-column')
  }

  function getOptionsItemList(listIndex: number) {
    return getOptionList()[listIndex].findAll('.ix-time-picker-panel-cell')
  }

  function getSelectedIndex(listIndex: number): number {
    return getOptionsItemList(listIndex).findIndex(item =>
      item.classes().includes('ix-time-picker-panel-cell-selected'),
    )
  }

  function getDisabledIndexs(listIndex: number): number[] {
    return getOptionsItemList(listIndex)
      .map((item, index) => ({
        index,
        cls: item.classes(),
      }))
      .filter(item => item.cls.includes('ix-time-picker-panel-cell-disabled'))
      .map(item => item.index)
  }

  async function clickOption(listIndex: number, optionIndex: number) {
    await getOptionsItemList(listIndex)[optionIndex].trigger('click')
  }

  beforeAll(async () => {
    bodyWrapper = new DOMWrapper(document.body)
  })

  afterEach(() => {
    document.querySelector('.ix-time-picker-panel-container')!.innerHTML = ''
  })

  renderWork<TimePickerProps>(IxTimePicker, { props: { open: true } })

  test('v-model:value work', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = TimePickerMount({
      props: {
        value: dayjs().hour(1).minute(2).second(3).toDate(),
        open: true,
        format: 'HH:mm:ss',
        'onUpdate:value': onUpdateValue,
      },
    })

    // test initial value
    expect(getSelectedIndex(0)).toBe(1)
    expect(getSelectedIndex(1)).toBe(2)
    expect(getSelectedIndex(2)).toBe(3)

    // test value change
    await wrapper.setProps({ value: dayjs().hour(10).minute(20).second(30).toDate() })

    expect(getSelectedIndex(0)).toBe(10)
    expect(getSelectedIndex(1)).toBe(20)
    expect(getSelectedIndex(2)).toBe(30)

    // test click change value
    await clickOption(0, 5)
    await clickOption(1, 5)
    await clickOption(2, 5)

    // 毫秒数对不上。
    // expect(onUpdateValue).lastCalledWith(dayjs().hour(5).minute(5).second(5).toDate())

    /** test ampm, 12 am */
    await wrapper.setProps({ format: 'hh:mm:ss a', value: dayjs().hour(0).toDate() })

    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(3)).toBe(0)

    // 10 am
    await wrapper.setProps({ value: dayjs().hour(10).toDate() })

    expect(getSelectedIndex(0)).toBe(10)
    expect(getSelectedIndex(3)).toBe(0)

    // 12 pm
    await wrapper.setProps({ value: dayjs().hour(12).toDate() })

    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(3)).toBe(1)

    // 3 pm
    await wrapper.setProps({ value: dayjs().hour(15).toDate() })
    expect(getSelectedIndex(0)).toBe(3)
    expect(getSelectedIndex(3)).toBe(1)

    // 12 am
    await wrapper.setProps({ value: dayjs().hour(24).toDate() })
    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(3)).toBe(0)

    // test click change value when use ampm
    await wrapper.setProps({ value: dayjs().hour(5).minute(5).second(5).toDate() })

    await clickOption(0, 0)
    // expect(onUpdateValue).toBeCalledWith(dayjs().hour(0).minute(5).second(5).toDate())

    await clickOption(3, 1)
    // expect(onUpdateValue).toBeCalledWith(dayjs().hour(12).minute(5).second(5).toDate())

    await clickOption(0, 5)
    // expect(onUpdateValue).toBeCalledWith(dayjs().hour(17).minute(5).second(5).toDate())

    await clickOption(3, 0)
    // expect(onUpdateValue).toBeCalledWith(dayjs().hour(5).minute(5).second(5).toDate())

    // test clear value
    // await wrapper.find('.ix-time-picker').trigger('mouseenter')
    await wrapper.find('.ix-input-suffix .ix-icon-close-circle').trigger('click')
    expect(onUpdateValue).toBeCalledWith(null)
  })

  test('v-model:open work', async () => {
    const onUpdateOpen = jest.fn()
    const wrapper = TimePickerMount({
      props: {
        open: true,
        'onUpdate:open': onUpdateOpen,
      },
    })

    expect(getOverlay().isVisible()).toBe(true)

    await wrapper.setProps({ open: false })

    // 可能会报错，因为有动画。
    expect(getOverlay().isVisible()).toBe(false)

    await wrapper.find('.ix-input').trigger('click')

    expect(getOverlay().isVisible()).toBe(true)
    expect(onUpdateOpen).toBeCalledWith(true)
  })

  test('format work', async () => {
    const wrapper = TimePickerMount({
      props: {
        value: dayjs().hour(1).minute(1).second(1).toDate(),
        open: true,
        format: 'hh:mm:ss',
      },
    })

    expect(getPickerPanel().element.innerHTML).toMatchSnapshot()

    await wrapper.setProps({ format: 'hh:mm:ss a' })

    expect(getPickerPanel().element.innerHTML).toMatchSnapshot()
  })

  test('disabled & disabledOptions work', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = TimePickerMount({
      props: {
        value: dayjs().hour(0).minute(0).second(0).toDate(),
        open: true,
        disabled: true,
        'onUpdate:value': onUpdateValue,
      },
    })

    expect(wrapper.find('.ix-input').classes()).toContain('ix-input-disabled')

    await wrapper.setProps({ disabled: false })

    expect(wrapper.find('.ix-input').classes()).not.toContain('ix-input-disabled')

    // test disabled fn
    await wrapper.setProps({
      disabledHours: () => [1, 2, 3],
      disabledMinutes: (hour: number) => (hour === 5 ? [1, 2, 3] : []),
      disabledSeconds: (hour: number, minute: number) => (hour === 5 && minute === 5 ? [1, 2, 3] : []),
      value: dayjs().hour(5).minute(5).second(0).toDate(),
    })

    expect(getDisabledIndexs(0)).toEqual([1, 2, 3])
    expect(getDisabledIndexs(1)).toEqual([1, 2, 3])
    expect(getDisabledIndexs(2)).toEqual([1, 2, 3])

    // test clicking disabled options
    await clickOption(0, 1)
    await clickOption(1, 1)
    await clickOption(2, 1)
    // expect(onUpdateValue).toBeCalledWith(dayjs().hour(5).minute(5).second(0).toDate())

    // test hiding disabled options
    await wrapper.setProps({ hideDisabledOptions: true })

    expect(getOptionsItemList(0).length).toBe(21)
    expect(getOptionsItemList(1).length).toBe(57)
    expect(getOptionsItemList(2).length).toBe(57)

    expect(getDisabledIndexs(0).length).toBe(0)
    expect(getDisabledIndexs(1).length).toBe(0)
    expect(getDisabledIndexs(2).length).toBe(0)
  })

  test('clearable & clearIcon & clearText work', async () => {
    const wrapper = TimePickerMount({
      props: {
        value: new Date(),
      },
    })

    const commonIconCls = '.ix-input-suffix'
    const defaultIconCls = `${commonIconCls} .ix-icon-close-circle`

    expect(wrapper.find(defaultIconCls).exists()).toBe(true)

    // test clearIcon
    await wrapper.setProps({ clearIcon: 'close' })
    expect(wrapper.find(`${commonIconCls} .ix-icon-close`).exists()).toBe(true)

    // test clearable false
    await wrapper.setProps({ clearable: false })
    expect(wrapper.find(defaultIconCls).exists()).toBe(false)
  })

  test('focus and blur work', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const wrapper = TimePickerMount({
      props: {
        value: new Date(),
        onFocus,
        onBlur,
      },
    })

    await wrapper.find('input').trigger('focus')
    expect(onFocus).toBeCalled()

    await wrapper.find('input').trigger('blur')
    expect(onBlur).toBeCalled()
  })

  test('suffix work', async () => {
    const wrapper = TimePickerMount({
      props: {
        suffix: 'calendar',
      },
    })
    expect(wrapper.find(`.ix-input-suffix .ix-icon-calendar`).exists()).toBe(true)
  })

  test('optionsStep work', async () => {
    TimePickerMount({
      props: {
        open: true,
        hourStep: 5,
        minuteStep: 7,
        secondStep: 7,
      },
    })

    function getOptionsContent(listIndex: number) {
      return getOptionsItemList(listIndex).map(item => Number(item.element.innerHTML))
    }

    // is every option equal the last option plus step
    function isStepWork(list: number[], step = 1): boolean {
      let worked = true

      list.forEach((item, idx) => {
        if (idx > 0 && item !== list[idx - 1] + step) {
          worked = false
        }
      })

      return worked
    }

    expect(isStepWork(getOptionsContent(0), 5)).toEqual(true)
    expect(isStepWork(getOptionsContent(1), 7)).toEqual(true)
    expect(isStepWork(getOptionsContent(2), 7)).toEqual(true)
  })

  test('defaultOpenValue work', async () => {
    const wrapper = TimePickerMount({})

    await wrapper.find('.ix-time-picker').trigger('click')

    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(1)).toBe(0)
    expect(getSelectedIndex(2)).toBe(0)

    await wrapper.setProps({ defaultOpenValue: dayjs().hour(12).minute(20).second(30).toDate() })

    expect(getSelectedIndex(0)).toBe(12)
    expect(getSelectedIndex(1)).toBe(20)
    expect(getSelectedIndex(2)).toBe(30)

    await wrapper.setProps({ format: 'hh:mm:ss a' })

    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(1)).toBe(20)
    expect(getSelectedIndex(2)).toBe(30)

    await wrapper.setProps({ defaultOpenValue: dayjs().hour(15).minute(20).second(30).toDate() })

    expect(getSelectedIndex(0)).toBe(3)
    expect(getSelectedIndex(1)).toBe(20)
    expect(getSelectedIndex(2)).toBe(30)

    await wrapper.setProps({ value: dayjs().hour(5).minute(5).second(5).toDate() })

    expect(getSelectedIndex(0)).toBe(5)
    expect(getSelectedIndex(1)).toBe(5)
    expect(getSelectedIndex(2)).toBe(5)
  })

  test('overlayClassName work', async () => {
    TimePickerMount({
      props: {
        overlayClassName: 'test-overlay-class-name',
        open: true,
      },
    })

    expect(getOverlay().classes()).toContain('test-overlay-class-name')
  })
})
