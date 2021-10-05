import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxTimePicker from '../src/TimePicker'

import { TimePickerPublicProps } from '../src/types'
import { ComponentPublicInstance, nextTick, ref } from 'vue'
import dayjs from 'dayjs/esm'
import { addIconDefinitions, IconDefinition } from '@idux/components/icon'

const ClockCircleIcon: IconDefinition = { name: 'clock-circle', svgString: '<svg></svg>' }
const CloseIcon: IconDefinition = { name: 'close', svgString: '<svg></svg>' }
const CalendarIcon: IconDefinition = { name: 'calendar', svgString: '<svg></svg>' }

addIconDefinitions([ClockCircleIcon, CloseIcon, CalendarIcon])

describe('TimePicker', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>
  let bodyWrapper: DOMWrapper<HTMLElement>
  const props = ref<TimePickerPublicProps>({})

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

  async function clickClearIcon() {
    await wrapper.find('.ix-input-suffix .ix-icon-close-circle').trigger('click')
  }

  beforeAll(async () => {
    bodyWrapper = new DOMWrapper(document.body)
    wrapper = mount(
      {
        components: { IxTimePicker },
        template: `
          <ix-time-picker
            v-model:value="props.value"
            v-model:open="props.open"
            v-bind="props"
          />
        `,
        setup() {
          return {
            props,
          }
        },
      },
      { attachTo: 'body' },
    )

    await nextTick()
  })

  afterEach(() => {
    props.value = {}
  })

  renderWork(IxTimePicker)

  test('v-model:value work', async () => {
    props.value = {
      value: dayjs().hour(1).minute(2).second(3).toDate(),
      open: true,
      // 24hours
      format: 'HH:mm:ss',
    }
    await nextTick()

    // console.log(document.body.innerHTML)
    // test initial value
    expect(getSelectedIndex(0)).toBe(1)
    expect(getSelectedIndex(1)).toBe(2)
    expect(getSelectedIndex(2)).toBe(3)

    // test value change
    props.value.value = dayjs().hour(10).minute(20).second(30).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(10)
    expect(getSelectedIndex(1)).toBe(20)
    expect(getSelectedIndex(2)).toBe(30)

    // test click change value
    await clickOption(0, 5)
    await clickOption(1, 5)
    await clickOption(2, 5)
    expect(props.value.value.getHours()).toBe(5)
    expect(props.value.value.getMinutes()).toBe(5)
    expect(props.value.value.getSeconds()).toBe(5)

    /** test ampm */
    props.value.format = 'hh:mm:ss a'

    // 12 am
    props.value.value = dayjs().hour(0).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(3)).toBe(0)

    // 10 am
    props.value.value = dayjs().hour(10).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(10)
    expect(getSelectedIndex(3)).toBe(0)

    // 12 pm
    props.value.value = dayjs().hour(12).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(3)).toBe(1)

    // 3 pm
    props.value.value = dayjs().hour(15).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(3)
    expect(getSelectedIndex(3)).toBe(1)

    // 12 am
    props.value.value = dayjs().hour(24).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(3)).toBe(0)

    // test click change value when use ampm
    props.value.value = dayjs().hour(5).minute(5).second(5).toDate()
    await nextTick()

    await clickOption(0, 0)
    expect(props.value.value.getHours()).toBe(0)
    expect(props.value.value.getMinutes()).toBe(5)
    expect(props.value.value.getSeconds()).toBe(5)

    await clickOption(3, 1)
    expect(props.value.value.getHours()).toBe(12)
    expect(props.value.value.getMinutes()).toBe(5)
    expect(props.value.value.getSeconds()).toBe(5)

    await clickOption(0, 5)
    expect(props.value.value.getHours()).toBe(17)
    expect(props.value.value.getMinutes()).toBe(5)
    expect(props.value.value.getSeconds()).toBe(5)

    await clickOption(3, 0)
    expect(props.value.value.getHours()).toBe(5)
    expect(props.value.value.getMinutes()).toBe(5)
    expect(props.value.value.getSeconds()).toBe(5)

    // test clear value
    // await wrapper.find('.ix-time-picker').trigger('mouseenter')
    await clickClearIcon()
    expect(props.value.value).toBe(null)
  })

  test('v-model:open work', async () => {
    props.value.open = true
    await nextTick()

    function getOverlayDisplay(): string {
      return (getOverlay().element as HTMLElement).style.display
    }

    expect(getOverlayDisplay()).toBe('')

    props.value.open = false
    await nextTick()
    expect(getOverlayDisplay()).toBe('none')

    await wrapper.find('.ix-input').trigger('click')
    await nextTick()
    expect(getOverlayDisplay()).toBe('')
    expect(props.value.open).toBe(true)
  })

  test('format work', async () => {
    props.value = {
      value: dayjs().hour(1).minute(1).second(1).toDate(),
      open: true,
      format: 'hh:mm:ss',
    }
    await nextTick()
    expect(getPickerPanel().element.innerHTML).toMatchSnapshot()
    props.value.format = 'hh:mm:ss a'
    await nextTick()
    expect(getPickerPanel().element.innerHTML).toMatchSnapshot()
  })

  test('disabled & disabledOptions work', async () => {
    props.value = {
      value: dayjs().hour(0).minute(0).second(0).toDate(),
      open: true,
    }
    await nextTick()

    // test input disabled
    props.value.disabled = true
    await nextTick()
    expect(wrapper.find('.ix-input').classes()).toContain('ix-input-disabled')

    props.value.disabled = false
    await nextTick()
    expect(wrapper.find('.ix-input').classes()).not.toContain('ix-input-disabled')

    // test disabled fn
    props.value.disabledHours = () => [1, 2, 3]
    props.value.disabledMinutes = (hour: number) => (hour === 5 ? [1, 2, 3] : [])
    props.value.disabledSeconds = (hour: number, minute: number) => (hour === 5 && minute === 5 ? [1, 2, 3] : [])
    props.value.value = dayjs().hour(5).minute(5).second(0).toDate()
    await nextTick()
    expect(getDisabledIndexs(0)).toEqual([1, 2, 3])
    expect(getDisabledIndexs(1)).toEqual([1, 2, 3])
    expect(getDisabledIndexs(2)).toEqual([1, 2, 3])

    // test clicking disabled options
    await clickOption(0, 1)
    await clickOption(1, 1)
    await clickOption(2, 1)
    expect(props.value.value.getHours()).toBe(5)
    expect(props.value.value.getMinutes()).toBe(5)
    expect(props.value.value.getSeconds()).toBe(0)

    // test hiding disabled options
    props.value.hideDisabledOptions = true
    await nextTick()
    expect(getOptionsItemList(0).length).toBe(21)
    expect(getOptionsItemList(1).length).toBe(57)
    expect(getOptionsItemList(2).length).toBe(57)

    expect(getDisabledIndexs(0).length).toBe(0)
    expect(getDisabledIndexs(1).length).toBe(0)
    expect(getDisabledIndexs(2).length).toBe(0)
  })

  test('clearable & clearIcon & clearText work', async () => {
    props.value = {
      value: new Date(),
    }
    await nextTick()

    const commonIconCls = '.ix-input-suffix'
    const defaultIconCls = `${commonIconCls} .ix-icon-close-circle`

    expect(wrapper.find(defaultIconCls).exists()).toBe(true)

    // test clearIcon
    props.value.clearIcon = 'close'
    await nextTick()
    expect(wrapper.find(`${commonIconCls} .ix-icon-close`).exists()).toBe(true)

    // test clearable false
    props.value.clearable = false
    await nextTick()
    expect(wrapper.find(defaultIconCls).exists()).toBe(false)
  })

  test('focus and blur work', async () => {
    const focusCb = jest.fn()
    const blurCb = jest.fn()
    props.value = {
      value: new Date(),
      onFocus: focusCb,
      onBlur: blurCb,
    }
    await nextTick()

    await wrapper.find('input').trigger('focus')
    expect(focusCb).toBeCalled()

    await wrapper.find('input').trigger('blur')
    expect(blurCb).toBeCalled()
  })

  test('suffix work', async () => {
    props.value.suffix = 'calendar'
    await nextTick()
    expect(wrapper.find(`.ix-input-suffix .ix-icon-calendar`).exists()).toBe(true)
  })

  test('optionsStep work', async () => {
    props.value.open = true
    await nextTick()

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

    props.value.hourStep = 5
    props.value.minuteStep = 7
    props.value.secondStep = 7
    await nextTick()

    expect(isStepWork(getOptionsContent(0), 5)).toEqual(true)
    expect(isStepWork(getOptionsContent(1), 7)).toEqual(true)
    expect(isStepWork(getOptionsContent(2), 7)).toEqual(true)
  })

  test('defaultOpenValue work', async () => {
    props.value = {}
    await nextTick()

    await wrapper.find('.ix-time-picker').trigger('click')
    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(1)).toBe(0)
    expect(getSelectedIndex(2)).toBe(0)

    props.value.defaultOpenValue = dayjs().hour(12).minute(20).second(30).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(12)
    expect(getSelectedIndex(1)).toBe(20)
    expect(getSelectedIndex(2)).toBe(30)

    props.value.format = 'hh:mm:ss a'
    await nextTick()
    expect(getSelectedIndex(0)).toBe(0)
    expect(getSelectedIndex(1)).toBe(20)
    expect(getSelectedIndex(2)).toBe(30)

    props.value.defaultOpenValue = dayjs().hour(15).minute(20).second(30).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(3)
    expect(getSelectedIndex(1)).toBe(20)
    expect(getSelectedIndex(2)).toBe(30)

    props.value.value = dayjs().hour(5).minute(5).second(5).toDate()
    await nextTick()
    expect(getSelectedIndex(0)).toBe(5)
    expect(getSelectedIndex(1)).toBe(5)
    expect(getSelectedIndex(2)).toBe(5)
  })

  test('overlayClassName work', async () => {
    props.value = {
      overlayClassName: 'test-overlay-class-name',
      open: true,
    }
    await nextTick()

    expect(getOverlay().classes()).toContain('test-overlay-class-name')
  })
})
