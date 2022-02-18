import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import IxStepper from '../src/Stepper'
import IxStepperItem from '../src/StepperItem'
import { StepperProps } from '../src/types'

const defaultSlots = [
  h(IxStepperItem, { key: 1, title: 'Finished', description: 'This is a description.' }),
  h(IxStepperItem, { key: 2, title: 'In Progress', description: 'This is a description.' }),
  h(IxStepperItem, { key: 3, title: 'Waiting', description: 'This is a description.' }),
]

describe('Stepper', () => {
  const StepperMount = (options?: MountingOptions<Partial<StepperProps>>) => {
    const { props, slots, ...rest } = options || {}
    return mount(IxStepper, {
      ...rest,
      props: { activeKey: 2, ...props },
      slots: { default: () => [...defaultSlots], ...slots },
    })
  }

  renderWork<StepperProps>(IxStepper, { props: { activeKey: 2 }, slots: { default: () => defaultSlots } })

  test('active work', async () => {
    const onUpdateActiveKey = jest.fn()
    const wrapper = StepperMount({ props: { activeKey: 1, 'onUpdate:activeKey': onUpdateActiveKey } })

    expect(wrapper.findAll('.ix-stepper-item')[0].classes()).toContain('ix-stepper-item-active')

    await wrapper.setProps({ activeKey: 2 })

    expect(wrapper.findAll('.ix-stepper-item')[0].classes()).not.toContain('ix-stepper-item-active')
    expect(wrapper.findAll('.ix-stepper-item')[1].classes()).toContain('ix-stepper-item-active')
  })

  test('clickable work', async () => {
    const onUpdateActiveKey = jest.fn()
    const wrapper = StepperMount({ props: { activeKey: 1, clickable: true, 'onUpdate:activeKey': onUpdateActiveKey } })

    expect(wrapper.findAll('.ix-stepper-item')[0].classes()).toContain('ix-stepper-item-clickable')
    expect(wrapper.findAll('.ix-stepper-item')[0].classes()).toContain('ix-stepper-item-active')

    await wrapper.findAll('.ix-stepper-item')[1].trigger('click')

    expect(onUpdateActiveKey).toBeCalledTimes(1)
    expect(onUpdateActiveKey).toBeCalledWith(2)

    await wrapper.setProps({ activeKey: 2 })
    await wrapper.findAll('.ix-stepper-item')[1].trigger('click')

    expect(onUpdateActiveKey).toBeCalledTimes(1)
  })

  test('labelPlacement work', async () => {
    const wrapper = StepperMount({ props: { labelPlacement: 'bottom' } })

    expect(wrapper.classes()).toContain('ix-stepper-label-bottom')

    await wrapper.setProps({ labelPlacement: 'end' })

    expect(wrapper.classes()).toContain('ix-stepper-label-end')
  })

  test('percent work', async () => {
    const wrapper = StepperMount({ props: { percent: 10 } })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ percent: 50 })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ percent: 100 })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('size work', async () => {
    const wrapper = StepperMount({ props: { size: 'sm' } })

    expect(wrapper.classes()).toContain('ix-stepper-sm')

    await wrapper.setProps({ size: 'md' })

    expect(wrapper.classes()).toContain('ix-stepper-md')
  })

  test('status work', async () => {
    const wrapper = StepperMount({ props: { status: 'process' } })

    let items = wrapper.findAll('.ix-stepper-item')

    expect(items[0].classes()).toContain('ix-stepper-item-finish')
    expect(items[1].classes()).toContain('ix-stepper-item-process')
    expect(items[2].classes()).toContain('ix-stepper-item-wait')

    await wrapper.setProps({ status: 'finish' })

    items = wrapper.findAll('.ix-stepper-item')

    expect(items[0].classes()).toContain('ix-stepper-item-finish')
    expect(items[1].classes()).toContain('ix-stepper-item-finish')
    expect(items[2].classes()).toContain('ix-stepper-item-wait')

    await wrapper.setProps({ status: 'error' })

    expect(items[0].classes()).toContain('ix-stepper-item-finish')
    expect(items[1].classes()).toContain('ix-stepper-item-error')
    expect(items[2].classes()).toContain('ix-stepper-item-wait')
  })
})
